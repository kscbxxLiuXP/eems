<template>
    <div>
        <div style="font-size: x-large; margin-bottom: 40px">用户管理</div>
        <el-row :gutter="20" style="margin-bottom: 40px">
            <el-col :span="8">
                <div>员工姓名：
                    <el-input v-model="staffName" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>员工ID：
                    <el-input v-model="staffID" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" icon="el-icon-search" @click="search"> 查询 </el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div>员工编号：
                    <el-input v-model="staffCode" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>员工类型：
                    <el-select v-model="staffType" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="6">
                <el-button type="danger" icon="el-icon-refresh" @click="refreshInput"> 重置 </el-button>
            </el-col>
        </el-row>

        <div style="height: 300px">
            <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                stripe
                style="width: 100%; margin-top: 80px"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="ID"
                    width="70">
                    <template slot-scope="scope">
                        <span >{{ scope.row.staffID }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="账号"
                    width="180">
                    <template slot-scope="scope">
                        <span >{{ scope.row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="密码"
                    width="180">
                    <template slot-scope="scope">
                        <span >{{ scope.row.password }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    width="180">
                    <template slot-scope="scope">
                        <span >{{ scope.row.staffName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="性别"
                    width="90">
                    <template slot-scope="scope">
                        <span >{{ scope.row.gender }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="生日"
                    width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.birth }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="人员编号"
                    width="120">
                    <template slot-scope="scope">
                        <span >{{ scope.row.staffCode }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="人员类型"
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.type==='工作人员'" size="medium" type="danger">{{ scope.row.type }}</el-tag>
                        <el-tag v-if="scope.row.type==='专家'" size="medium" type="warning">{{ scope.row.type }}</el-tag>
                        <el-tag v-if="scope.row.type==='指挥人员'" size="medium" type="success">{{ scope.row.type }}</el-tag>
                        <el-tag v-if="scope.row.type==='超级管理员'" size="medium" type="primary">{{ scope.row.type }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="账号状态"
                    width="90">
                    <template slot-scope="scope">
                        <span >{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            icon="el-icon-edit">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            icon="el-icon-delete-solid">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>



        <el-row :gutter="20" style="margin-top: 40px">
            <el-col :span="17">
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"> 增加</el-button>
                </div>
            </el-col>
            <el-col :span="7">
                <el-pagination
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>

        <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="staffName">
                    <el-input v-model="form.staffName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                    <template>
                        <el-radio v-model="form.gender" label="男" value="男">男</el-radio>
                        <el-radio v-model="form.gender" label="女" value="女">女</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="员工类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddNewStaff">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="编辑用户信息" :visible.sync="editFormVisible" width="500px">
            <el-form :model="editForm" :rules="rules" ref="editForm">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="editForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="editForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="staffName">
                    <el-input v-model="editForm.staffName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                    <template>
                        <el-radio v-model="editForm.gender" label="男" value="男">男</el-radio>
                        <el-radio v-model="editForm.gender" label="女" value="女">女</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="editForm.birth"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="员工类型" prop="type">
                    <el-select v-model="editForm.type" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditStaff">取 消</el-button>
                <el-button type="primary" @click="editStaff">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
export default {
    name: "UserManager",
    data() {
        return {
            staffName: "",
            staffID: "",
            staffCode: "",
            staffType: "",
            options: [
                {
                    value: '工作人员',
                    label: '工作人员'
                },
                {
                    value: '超级管理员',
                    label: '超级管理员'
                },
                {
                    value: '指挥人员',
                    label: '指挥人员'
                },
                {
                    value: '专家',
                    label: '专家'
                }
            ],
            form: {
                username: "",
                password: "",
                type: "",
                staffName: "",
                staffID: "",
                staffCode: "",
                gender: "",
                birth: "",
                status: "正常"
            },
            editForm: {
                username: "",
                password: "",
                type: "",
                staffName: "",
                staffID: "",
                staffCode: "",
                gender: "",
                birth: "",
                status: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                staffName: [
                    { required: true, message: '请填写用户姓名', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择员工类型', trigger: 'change' }
                ],
            },
            selectedUsers: [],
            currentPage: 1,
            pageSize: 5,
            dialogFormVisible: false,
            editFormVisible: false,
            tableData: this.$store.getters.getUsers,
            formLabelWidth: '60px',
            selectedIdEdit: ''
        }
    },
    methods: {
        refreshInput(){
            this.staffName = ""
            this.staffID = ""
            this.staffType = ""
            this.staffCode = ""
            this.tableData = this.$store.getters.getUsers
        },
        search(){
            // eslint-disable-next-line no-unused-vars
            let searchList = this.$store.getters.getUsers
            if(this.staffName !== ""){
                searchList = searchList.filter((obj) => {
                    return obj.staffName.indexOf(this.staffName) !== -1
                })
            }
            if(this.staffCode !== ""){
                searchList = searchList.filter((obj) => {
                    return obj.staffCode.indexOf(this.staffCode) !== -1
                })
            }
            if(this.staffType !== ""){
                searchList = searchList.filter((obj) => {
                    return obj.type === this.staffType
                })
            }
            if(this.staffID !== ""){
                searchList = searchList.filter((obj) => {
                    return obj.staffID === this.staffID
                })
            }
            this.tableData = searchList
            this.$message.success("共查找到 " + this.tableData.length + " 条记录！")
        },
        // eslint-disable-next-line no-unused-vars
        handleDelete(index, row){
            this.$message.success("删除成功")
            this.tableData.splice(index, 1)
            let tmp = this.$store.getters.getUsers
            tmp = tmp.filter((obj)=>{
                return obj.staffID !==row.staffID
            })
            this.$store.dispatch("asyncUpdateUser", tmp)
        },
        // eslint-disable-next-line no-unused-vars
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        closeAddNewStaff() {
            this.$refs['form'].resetFields();
            this.dialogFormVisible = false
        },
        closeEditStaff() {
            this.$refs['editForm'].resetFields();
            this.editFormVisible = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.add()
                } else {
                    return false;
                }
            });
        },
        add(){
            this.dialogFormVisible = false
            this.$message.success("用户添加成功！")
            this.form.staffID ="" + (Math.max.apply(Math, this.$store.getters.getUsers.map(function(o) {return parseInt(o.staffID)})) + 1)
            this.form.staffCode = "" + Math.round(Math.random() * 100000)
            let tmpform = JSON.parse(JSON.stringify(this.form)) // 深拷贝
            let tmp =this.$store.getters.getUsers
            tmp.push(tmpform)
            this.$store.dispatch("asyncUpdateUser", tmp)
            this.$refs['form'].resetFields();
        },
        // eslint-disable-next-line no-unused-vars
        handleEdit(index, row){
            this.editForm = JSON.parse(JSON.stringify(row))
            this.selectedIdEdit = row.staffID
            console.log(this.selectedIdEdit)
            this.editFormVisible = true
        },
        editStaff(){
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.edit()
                } else {
                    return false;
                }
            });
        },
        edit(){
            let tmp = this.$store.getters.getUsers
            tmp.forEach((staff) => {
                if(staff.staffID === this.selectedIdEdit) {
                    this.$message.success("find!")
                    for(let key in staff){
                        staff[key] = this.editForm[key]
                    }
                    console.log(staff)
                }
            })
            this.$store.dispatch("asyncUpdateUser", tmp)
            this.editFormVisible = false
            this.$message.success("编辑成功！")
        }
    },
    computed : {
        total: function() {
            return this.tableData.size()
        }
    }
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