<template>
    <div>
        <el-header>
            <div style="font-size: x-large; margin-bottom: 40px">流程维护界面</div>
        </el-header>
        <el-container>
            <el-header>
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="处理名称">
                        <el-input v-model="formInline.name" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="所属事件类型">
                        <el-select v-model="formInline.type" filterable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="类型编码">
                        <el-input v-model="formInline.number" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                            <el-button type="danger" icon="el-icon-refresh" @click="refreshInput">重置</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <div style="height: 380px; margin-bottom: 0px">
                    <el-table
                        ref="multipleTable"
                        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        stripe
                        tooltip-effect="light"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="id"
                            label="ID"
                            width="120"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="name"
                            label="处理名称"
                            width="200">
                        </el-table-column>

                        <el-table-column
                            prop="type"
                            label="所属事件类型"
                            width="300"
                            show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column
                            prop="number"
                            label="类型编码"
                            width="200"
                            sortable>
                        </el-table-column>

                        <el-table-column label="操作"
                                         width="200"
                        >
                            <template slot-scope="scope">
                                <el-popover
                                    placement="top"
                                    title="步骤"
                                    trigger="click"
                                    transition="el-zoom-in-bottom"
                                    style="margin-right:12px">
                                    <div style="height: 200px;">
                                        <el-steps direction="vertical" :active="10">
                                            <el-step v-for="item in steps" :key="item.key" :title="item.step"
                                                     :description="item.content"></el-step>

                                        </el-steps>
                                    </div>
                                    <el-button
                                        type="info"
                                        icon="el-icon-document"
                                        slot="reference"
                                        circle
                                    ></el-button>
                                </el-popover>

                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    circle
                                    @click="editFlow(scope.row, scope.$index)"
                                ></el-button>
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="delFlow(scope.row, scope.$index)"
                                ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>


            </el-main>
            <el-footer>
                <el-row :gutter="20" style="margin-top: 40px">
                    <el-col :span="10">
                        <div>
                            <el-button type="primary" icon="el-icon-plus" @click="addFlow"> 增加
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <el-pagination
                            @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="100">
                        </el-pagination>
                    </el-col>
                </el-row>

            </el-footer>


            <!--                 修改条目信息的对话框 -->
            <el-dialog
                title="编辑流程信息"
                :visible.sync="editFormVisible"
                width="600px"
                :before-close="handleClose"
            >
                <div>
                    <el-form ref="form" :model="editObj" :rules="flowRules" label-width="80px">

                        <el-form-item label="流程ID" prop="id">
                            <el-input v-model="editObj.id" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="处理名称" prop="name">
                            <el-input v-model="editObj.name"></el-input>
                        </el-form-item>

                        <el-form-item label="事件类型" prop="type">
                            <el-select
                                v-model="editObj.type"
                                placeholder="请选择类型"
                            >
                                <el-option label="自然灾害水旱灾害一级" value="自然灾害水旱灾害一级"></el-option>
                                <el-option label="公共卫生事件矿泉水污染一级" value="公共卫生事件矿泉水污染一级"></el-option>
                                <el-option label="事故灾难公交车倒翻二级" value="事故灾难公交车倒翻二级"></el-option>
                                <el-option label="事故灾难工人猝死四级" value="事故灾难工人猝死四级"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类型编码" prop="number">
                            <el-input v-model="editObj.number"></el-input>
                        </el-form-item>

                        <el-form-item label="步骤">
                            <el-button type="primary" plain @click="addStep" style="margin-left: 10px">新增步骤</el-button>
                        </el-form-item>

                        <el-form-item
                            v-for="(step, index) in steps"
                            :label="'步骤' + (parseInt(index)+1).toString()"
                            :key="step.key"
                        >
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-input v-model="step.step"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-input v-model="step.content"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="danger" plain v-if="index!==0" @click.prevent="removeStep(step)">删除
                                    </el-button>
                                </el-col>

                            </el-row>
                        </el-form-item>
                    </el-form>

                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editFormCancel('form')">取 消</el-button>
                <el-button type="primary" @click="confirm('form')">确 定</el-button>
                    </span>
            </el-dialog>

            <!--                 增加条目的对话框 -->
            <el-dialog
                title="新增流程"
                :visible.sync="addFormVisible"
                width="600px"
                :before-close="handleCloseAdd"
            >
                <div>
                    <el-form ref="form" :model="editObj" :rules="flowRules" label-width="80px">

                        <el-form-item label="流程ID" prop="id">
                            <el-input v-model="editObj.id" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="处理名称" prop="name">
                            <el-input v-model="editObj.name"></el-input>
                        </el-form-item>

                        <el-form-item label="事件类型" prop="type">
                            <el-select
                                v-model="editObj.type"
                                placeholder="请选择类型"
                            >
                                <el-option label="自然灾害水旱灾害一级" value="自然灾害水旱灾害一级"></el-option>
                                <el-option label="公共卫生事件矿泉水污染一级" value="公共卫生事件矿泉水污染一级"></el-option>
                                <el-option label="事故灾难公交车倒翻二级" value="事故灾难公交车倒翻二级"></el-option>
                                <el-option label="事故灾难工人猝死四级" value="事故灾难工人猝死四级"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类型编码" prop="number">
                            <el-input v-model="editObj.number"></el-input>
                        </el-form-item>

                        <el-form-item label="步骤">
                            <el-button type="primary" plain @click="addStep" style="margin-left: 10px">新增步骤</el-button>
                        </el-form-item>

                        <el-form-item
                            v-for="(step, index) in steps"
                            :label="'步骤' + (parseInt(index)+1).toString()"
                            :key="step.key"
                        >
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-input v-model="step.step"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-input v-model="step.content"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="danger" plain v-if="index!==0" @click.prevent="removeStep(step)">删除
                                    </el-button>
                                </el-col>

                            </el-row>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addFormCancel('form')">取 消</el-button>
                <el-button type="primary" @click="addConfirm('form')">确 定</el-button>
                    </span>
            </el-dialog>

        </el-container>
    </div>
</template>

<script>
export default {
    name: "Flow",
    data() {
        return {
            //修改信息对话框的显示属性
            editFormVisible: false,
            itemIndex: 0,
            //分页的参数
            currentPage: 1,
            pageSize: 5,

            //增加的对话框
            addFormVisible: false,

            editObj: {
                id: '',
                name: '',
                type: '',
                number: '',
            },
            //查询表单
            formInline: {
                id: '',
                name: '',
                type: '',
                number: ''
            },

            steps: [
                {
                    step: '拨打120',
                    content: '呼叫救护车'
                }, {
                    step: '拨打110',
                    content: '呼叫警车'
                }, {
                    step: '拨打119',
                    content: '呼叫救护车'
                },
            ],

            options: [
                {
                    value: '自然灾害水旱灾害一级',
                    label: '自然灾害水旱灾害一级'
                },
                {
                    value: '公共卫生事件矿泉水污染一级',
                    label: '公共卫生事件矿泉水污染一级'
                },
                {
                    value: '事故灾难公交车倒翻二级',
                    label: '事故灾难公交车倒翻二级'
                },
                {
                    value: '事故灾难工人猝死四级',
                    label: '事故灾难工人猝死四级'
                }
            ],
            flowRules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                ],
                number: [
                    {required: true, message: '请填写类型编码', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请选择事件类型', trigger: 'change'}
                ],
            },
            //通过store获得flows的数据，放到表格中
            tableData: this.$store.getters.getFlows,
            multipleSelection: []
        }
    },
    methods: {
        //查询按钮
        search() {
            let searchList = this.$store.getters.getFlows
            if (this.formInline.id !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.id.indexOf(this.formInline.id) !== -1
                })
            }
            if (this.formInline.name !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.name.indexOf(this.formInline.name) !== -1
                })
            }
            if (this.formInline.type !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.type === this.formInline.type
                })
            }
            if (this.formInline.number !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.number.indexOf(this.formInline.number) !== -1
                })
            }
            this.tableData = searchList
            this.$message.success("共查找到 " + this.tableData.length + " 条记录！")
        },
        //清空查询输入
        refreshInput() {
            this.formInline.id = ""
            this.formInline.name = ""
            this.formInline.type = ""
            this.formInline.number = ""
            this.tableData = this.$store.getters.getFlows
        },

        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },

        //处理表格的多行选择
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //delete a item
        delFlow(item, idx) {
            // 就这一点儿就可以产生dialog确定
            this.$confirm('确认删除？')
                // eslint-disable-next-line no-unused-vars
                .then(_ => {

                    this.tableData.splice(idx, 0);
                    // eslint-disable-next-line no-unused-vars
                    let tmp = this.$store.getters.getFlows;
                    tmp = tmp.filter((obj) => {
                        return obj.id !== item.id
                    })
                    this.tableData = tmp;
                    this.$store.dispatch("asyncUpdateFlow", tmp);
                    this.$message.success("流程删除成功！");
                })
                // eslint-disable-next-line no-unused-vars
                .catch(_ => {
                });
        },

        //edit a flow
        editFlow(item, idx) {
            this.itemIndex = idx;
            this.editFormVisible = true;
            this.editObj = {
                id: item.id,
                name: item.name,
                type: item.type,
                number: item.number
            };
        },
        //add a flow
        addFlow() {
            this.addFormVisible = true

            this.editObj = {
                id: parseInt(this.tableData[this.tableData.length - 1].id) + 1,
                name: '',
                type: '',
                number: ''
            };
        },
        //关闭弹窗
        handleClose() {
            this.editFormVisible = false;
        },
        //关闭弹窗
        handleCloseAdd() {
            this.addFormVisible = false;
        },
        //确认编辑信息
        confirm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editFormVisible = false;
                    this.tableData.splice(this.itemIndex, 1, this.editObj);
                    this.$store.dispatch("asyncUpdateFlow", this.tableData);
                    this.$message.success("流程修改成功！");

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //确认添加的信息
        addConfirm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addFormVisible = false;
                    this.tableData.push(this.editObj);
                    this.$store.dispatch("asyncUpdateFlow", this.tableData);
                    this.$message.success("流程添加成功！");
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        editFormCancel(formName) {
            this.editFormVisible = false
            this.$refs[formName].resetFields();
        },
        addFormCancel(formName) {
            this.addFormVisible = false
            this.$refs[formName].resetFields();
        },

        removeStep(item) {
            var index = this.steps.indexOf(item)
            if (index !== -1) {
                this.steps.splice(index, 1)
            }
        },
        addStep() {
            this.steps.push({
                value: '',
                key: Date.now()
            });
        }
    },


}
</script>

<style scoped>

</style>