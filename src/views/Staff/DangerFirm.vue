<template>
    <div>
        <el-header>
            <div style="font-size: x-large; margin-bottom: 40px">风险企业管理</div>
        </el-header>
        <el-container>
            <el-header style="height: 100px">
                <el-form :inline="true" :model="formInline">

                    <el-form-item label="企业的ID">
                        <el-input v-model="formInline.id" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="企业名称">
                        <el-input v-model="formInline.name" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="企业地址">
                        <el-input v-model="formInline.address" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item style="margin-left: 15px">
                        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-form :inline="true" :model="formInline">
                    <el-form-item label="企业法人">
                        <el-input v-model="formInline.person" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="法人电话">
                        <el-input v-model="formInline.phone" placeholder="不限"></el-input>
                    </el-form-item>

                    <el-form-item label="企业类型">
                        <el-select v-model="formInline.type" filterable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="danger" icon="el-icon-refresh" @click="refreshInput">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <div style="height: 300px">
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
                            >
                        </el-table-column>

                        <el-table-column
                            prop="id"
                            label="ID"
                            width="120"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="name"
                            label="企业名称"
                            width="200">
                        </el-table-column>

                        <el-table-column
                            prop="address"
                            label="企业地址"
                            width="200"
                            show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column
                            label="企业位置"
                            width="200"
                            >


                        </el-table-column>

                        <el-table-column
                            prop="person"
                            label="企业法人"
                            width="200"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="phone"
                            label="法人电话"
                            width="200"
                            sortable>
                        </el-table-column>

                        <el-table-column
                            prop="type"
                            label="企业类型"
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

                <!--                 修改条目信息的对话框 -->
                <el-dialog
                    title="编辑流程信息"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <div>
                        <el-form ref="form" :model="editObj" label-width="80px">

                            <el-form-item label="流程ID">
                                <el-input v-model="editObj.id" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="处理名称">
                                <el-input v-model="editObj.name"></el-input>
                            </el-form-item>

                            <el-form-item label="事件类型">
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


            <!--                 增加条目的对话框 -->
            <el-dialog
                title="新增流程"
                :visible.sync="dialogFormVisible"
                width="30%"
                :before-close="handleCloseAdd"
            >
                <div>
                    <el-form ref="form" :model="editObj" label-width="80px">

                        <el-form-item label="流程ID">
                            <el-input v-model="editObj.id" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="处理名称">
                            <el-input v-model="editObj.name"></el-input>
                        </el-form-item>

                        <el-form-item label="事件类型">
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

                        <el-form-item label="类型编码">
                            <el-input v-model="editObj.number"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirm">确 定</el-button>
                    </span>
            </el-dialog>

        </el-container>
    </div>
</template>

<script>
// import SmallMap from "@/components/SmallMap";
export default {
    name: "DangerFirm",
    // components: {SmallMap},
    data() {
        return {
            //修改信息对话框的显示属性
            dialogVisible: false,
            itemIndex: 0,
            //分页的参数
            currentPage: 1,
            pageSize: 6,

            //增加的对话框
            dialogFormVisible: false,

            editObj: {
                id: '',
                name: '',
                address: '',
                location: {
                    lat: 0,
                    lng: 0,
                },
                person: '',
                phone: '',
                type: '',
            },
            //查询表单
            formInline: {
                id: '',
                name: '',
                address: '',
                person: '',
                phone: '',
                type: '',
            },

            options: [
                {
                    value: 'software',
                    label: 'software'
                },
                {
                    value: 'hardware',
                    label: 'hardware'
                }
            ],
            //通过store获得flows的数据，放到表格中
            tableData: this.$store.getters.getFirms,
            multipleSelection: []
        }
    },
    methods: {
        getFirm(firmID) {
            const firm = this.$store.getters.getFirm(firmID)

            return firm
        },
        //查询按钮
        search() {
            let searchList = this.$store.getters.getFirms
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
            if (this.formInline.address !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.address === this.formInline.address
                })
            }
            if (this.formInline.person !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.person === this.formInline.person
                })
            }
            if (this.formInline.phone !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.phone === this.formInline.phone
                })
            }
            if (this.formInline.type !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.type === this.formInline.type
                })
            }
            this.tableData = searchList
            this.$message.success("共查找到 " + this.tableData.length + " 条记录！")
        },
        //清空查询输入
        refreshInput() {
            this.formInline.id = ""
            this.formInline.name = ""
            this.formInline.address = ""
            this.formInline.location.lat = 0
            this.formInline.location.lng = 0
            this.formInline.person = ""
            this.formInline.phone = ""
            this.formInline.type = ""
            this.tableData = this.$store.getters.getFirms
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
                    let tmp = this.$store.getters.getFirms;
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
            this.dialogVisible = true;
            this.editObj = {
                id: item.id,
                name: item.name,
                type: item.type,
                number: item.number
            };
        },
        //add a flow
        addFlow() {
            this.dialogFormVisible = true

            this.editObj = {
                id: parseInt(this.tableData[this.tableData.length - 1].id) + 1,
                name: '',
                type: '',
                number: ''
            };
        },
        //关闭弹窗
        handleClose() {
            this.dialogVisible = false;
        },
        //关闭弹窗
        handleCloseAdd() {
            this.dialogFormVisible = false;
        },
        //确认编辑信息
        confirm() {
            this.dialogVisible = false;
            this.tableData.splice(this.itemIndex, 1, this.editObj);
            this.$store.dispatch("asyncUpdateFlow", this.tableData);
            this.$message.success("流程修改成功！");
        },
        //确认添加的信息
        addConfirm() {
            this.dialogFormVisible = false;
            this.tableData.push(this.editObj);
            this.$store.dispatch("asyncUpdateFlow", this.tableData);
            this.$message.success("流程添加成功！");
        },
    },


}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>