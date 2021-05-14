<template>
    <div>
        <el-header>
            <div style="font-size: x-large; margin-bottom: 40px">流程维护界面</div>
        </el-header>
        <el-container>
            <el-header>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">

                    <el-form-item label="处理名称">
                        <el-input v-model="formInline.name" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="类型编码">
                        <el-input v-model="formInline.number" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="所属事件类型">
                        <el-input v-model="formInline.type" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <!--                    <el-button type="primary" @click="onSubmit">查询</el-button>-->
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                            <el-button type="primary" icon="el-icon-refresh" @click="refreshInput">重置</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
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
                        width="300"
                        sortable>
                    </el-table-column>

                    <el-table-column label="操作"
                                     width="300"
                    >
                        <template slot-scope="scope">
                            <el-popover
                                placement="top"
                                title="步骤"
                                trigger="click"
                                transition="el-zoom-in-bottom"
                                style="margin-right:12px">
                                <div style="height: 200px;">
                                    <el-steps direction="vertical" :active="3">
                                        <el-step title="拨打120" description="呼叫救护车"></el-step>
                                        <el-step title="拨打110" description="呼叫警车"></el-step>
                                        <el-step title="拨打119" description="呼叫消防车"></el-step>
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
                                @click="editUser(scope.row, scope.$index)"
                            ></el-button>
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="delUser(scope.$index)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 修改条目信息的对话框 -->
                <el-dialog
                    title="编辑流程信息"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <div>
                        <el-form ref="form" :model="editObj" label-width="80px">

                            <el-form-item label="流程ID">
                                <el-input v-model="editObj.id"></el-input>
                            </el-form-item>

                            <el-form-item label="处理名称">
                                <el-input v-model="editObj.name"></el-input>
                            </el-form-item>

                            <el-form-item label="所属事件类型">
                                <el-select
                                    v-model="editObj.type"
                                    placeholder="请选择类型"
                                >
                                    <el-option label="自然灾害水旱灾害一级" value="自然灾害水旱灾害一级"></el-option>
                                    <el-option label="事故灾难公交车倒翻二级" value="事故灾难公交车倒翻二级"></el-option>
                                    <el-option label="公共卫生事件矿泉水污染一级" value="公共卫生事件矿泉水污染一级"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="类型编码">
                                <el-input v-model="editObj.number"></el-input>
                            </el-form-item>

                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
              </span>
                </el-dialog>


            </el-main>
            <el-footer>
                <div>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="100">
                    </el-pagination>
                    <el-button type="plain" icon="el-icon-circle-plus">新建</el-button>
                </div>

            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Flow",
    data() {
        return {

            dialogVisible: false,//弹窗的显示属性
            userIndex: 0,

            editObj: {
                id: '',
                name: '',
                type: '',
                number: ''
            },

            formInline: {
                id: '',
                name: '',
                type: '',
                number: ''
            },

            tableData: this.$store.getters.getFlows,
        //     [{
        //         id: '1',
        //         name: '流程一',
        //         type: '自然灾害水旱灾害一级',
        //         number: '001001'
        //     }, {
        //     id: '2',
        //         name: '模板二',
        //         type: '自然灾害水旱灾害一级',
        //         number: '001001'
        // }, {
        //     id: '3',
        //         name: '矿泉水',
        //         type: '公共卫生事件矿泉水污染一级',
        //         number: '201001'
        // }, {
        //     id: '4',
        //         name: '流程三',
        //         type: '事故灾难公交车倒翻二级',
        //         number: '001001'
        // }, {
        //     id: '5',
        //         name: '流程一',
        //         type: '自然灾害水旱灾害一级',
        //         number: '001001'
        // },]
            multipleSelection: []


        }
    },
    methods: {
        //查询按钮
        search() {
            this.$message.success("查找到1条记录")
        },

        refreshInput() {
            this.formInline.id = ""
            this.name = ""
            this.type = ""
            this.number = ""
        },

        //处理表格的多行选择
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //delete a item
        delUser(idx) {
            // 就这一点儿就可以产生dialog确定
            this.$confirm('确认删除？')
                // eslint-disable-next-line no-unused-vars
                .then(_ => {
                    // 确定的方法
                    this.tableData.splice(idx, 1);
                    this.$message.success("流程删除成功！");
                })
                // eslint-disable-next-line no-unused-vars
                .catch(_ => {
                });

        },
        //edit a user
        editUser(item, idx) {
            this.userIndex = idx;
            this.dialogVisible = true;
            this.editObj = {
                id: item.id,
                name: item.name,
                type: item.type,
                number: item.number
            };

        },
        //关闭弹窗
        handleClose() {
            this.dialogVisible = false;
        },
        //确认编辑信息
        confirm() {
            this.dialogVisible = false;
            this.tableData.splice(this.userIndex, 1, this.editObj);
            this.$message.success("流程修改成功！");
        },
    },


}
</script>

<style scoped>

</style>