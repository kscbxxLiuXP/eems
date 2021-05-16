<template>
    <div>
        <div style="font-size: x-large; margin-bottom: 40px">工作人员-接报管理</div>
        <el-row :gutter="20" style="margin-bottom: 40px">
            <el-col :span="8">
                <div>事件名称：
                    <el-input v-model="eventName" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>风险企业编号：
                    <el-input v-model="firmID" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>报警人：
                    <el-input v-model="reportPerson" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>

        </el-row>
        <el-row :gutter="20" style="margin-bottom: 40px">

            <el-col :span="8">
                <div>接报时间：
                    <el-date-picker
                        v-model="reportTime"
                        type="date"
                        placeholder="不限"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="8">
                <div>流程创建者：
                    <el-input v-model="flowPerson" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>流程创建时间：
                    <el-date-picker
                        v-model="flowTime"
                        type="date"
                        placeholder="不限"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div>最后更新者编号:
                    <el-input v-model="lastUpdatePersonID" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>流程状态：
                    <el-select v-model="status" filterable placeholder="不限">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search"> 查询</el-button>
            </el-col>
            <el-col :span="3">
                <el-button type="danger" icon="el-icon-refresh" @click="refreshInput"> 重置</el-button>
            </el-col>
        </el-row>

        <div style="height: 300px">
            <el-table
                :data="reportTableData"
                stripe
                style="width: 100%"
            >
                <el-table-column
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="ID"
                    width="70">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reportID }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="事件名称"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.eventName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="风险企业编号"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.firmID }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="代码"
                    width="60">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reportCode }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="流程编号"
                    width="90">
                    <template slot-scope="scope">
                        <span>{{ scope.row.flowID }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="报警人"
                    width="90">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reportPerson }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="报警人联系电话"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reportPersonPhone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="接报时间"
                    width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.reportTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="流程创建者"
                    width="90">
                    <template slot-scope="scope">
                        <span>{{ scope.row.flowPerson }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="流程创建时间"
                    width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.flowTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="最后更新者编号"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.lastUpdatePersonID }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="接报状态"
                    width="120"
                >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag v-if="scope.row.status ==='指挥人员审核中'" size="medium" type="primary">
                                {{ scope.row.status }}
                            </el-tag>
                            <el-tag v-if="scope.row.status==='专家审核中'" size="medium" type="warning">{{
                                    scope.row.status
                                }}
                            </el-tag>
                            <el-tag v-if="scope.row.status==='驳回'" size="medium" type="danger">{{
                                    scope.row.status
                                }}
                            </el-tag>
                            <el-tag v-if="scope.row.status==='审核通过'" size="medium" type="success">{{
                                    scope.row.status
                                }}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-popover
                            placement="left"
                            title="接报经历流程"
                            trigger="click"
                            style="margin-right:12px; margin-left:12px">
                            <div class="block" style="height: 100%;">
                                <el-timeline>
                                    <div v-for="(process, index) in scope.row.reportProcess" :key="process.processTime">
                                        <el-timeline-item :timestamp="process.processTime + ' ' + process.processPerson" placement="top" :type="index === scope.row.reportProcess.length -1 ? 'primary' : 'info'">
                                           <div style="display: flex;align-items: center">
                                               <div> 事件: </div>
                                               <span style="margin-left: 10px">
                                            <el-tag v-if="process.processEvent ==='创建接报'" size="medium" type="primary">
                                                {{ process.processEvent }}
                                            </el-tag>
                                            <el-tag v-if="process.processEvent==='编辑接报'" size="medium" type="warning">{{
                                                    process.processEvent
                                                }}
                                            </el-tag>
                                            <el-tag v-if="process.processEvent==='驳回'" size="medium" type="danger">{{
                                                    process.processEvent
                                                }}
                                            </el-tag>
                                            <el-tag v-if="process.processEvent==='审核通过'" size="medium" type="success">{{
                                                    process.processEvent
                                                }}
                                            </el-tag>
                                            </span>
                                           </div>
                                            <p v-if="process.processEvent === '驳回'">{{'意见:  ' + process.advice}}</p>
                                        </el-timeline-item>
                                    </div>
                                </el-timeline>
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
                            @click="handleEdit(scope.$index, scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="handleDelete(scope.$index, scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row :gutter="20" style="margin-top: 40px">
                <el-col :span="17">
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true"> 增加</el-button>
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
        </div>

        <el-dialog title="新增接报" :visible.sync="addFormVisible" width="500px">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="报告人" :label-width="formLabelWidth">
                    <el-input v-model="loginStaff" autocomplete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="接报时间" :label-width="formLabelWidth" disabled="true">
                    <el-date-picker
                        v-model="addForm.reportTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="时间代码" :label-width="formLabelWidth" disabled="true">
                    <el-input v-model="addForm.reportCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报警人" :label-width="formLabelWidth" prop="reportPerson">
                    <el-input v-model="addForm.reportPerson" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报警人联系电话" :label-width="formLabelWidth" prop="gender">
                    <el-input v-model="addForm.reportPersonPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="事件名称" prop="type">
                    <el-select v-model="addForm.eventName" placeholder="请选择">
                        <el-option
                            v-for="item in eventOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="风险企业" prop="type">
                    <el-select v-model="addForm.firmID" placeholder="请选择">
                        <el-option
                            v-for="item in firmOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="流程" prop="type">
                    <el-select v-model="addForm.flowID" placeholder="请选择">
                        <el-option
                            v-for="item in flowOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddNewStaff">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "StaffReport",
    data() {
        return {
            eventName: '',
            firmID: '',
            reportPerson: '',
            reportTime: '',
            flowPerson: '',
            flowTime: '',
            lastUpdatePersonID: '',
            status: '',
            reportTableData: this.$store.getters.getReports,
            currentPage: 1,
            pageSize: 5,
            addFormVisible: false,
            editFormVisible: false,
            loginStaff: this.$store.getters.getUser(localStorage.getItem('token')).staffName,
            eventOptions: this.$store.getters.getEventList,
            firmOptions: this.$store.getters.getFirms,
            flowOptions: this.$store.getters.getFlows,
            formLabelWidth: '150px',
            statusOptions: [
                '指挥人员审核中',
                '专家审核中',
                '审核通过',
                '驳回'
            ],
            addForm: {
                reportID: '',
                eventName: '',
                firmID: '',
                reportCode: '',
                flowID: '',
                reportPerson: '',
                reportPersonPhone: '',
                reportTime: '',
                flowPerson: '刘小胖',
                flowTime: '2021-05-16',
                lastUpdatePersonID: this.$store.getters.getUser(localStorage.getItem('token')).staffID,
                status: '', // 指挥人员审核中，专家审核中，驳回，审核通过
                reportProcess: [
                    {
                        processTime: '',
                        processPerson: '',
                        processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                        advice: ''
                    }
                ]
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

        }
    },
    methods: {
        refreshInput() {
            this.eventName = ""
            this.firmID = ""
            this.reportPerson = ""
            this.reportTime = ""
            this.flowPerson = ""
            this.flowTime = ""
            this.lastUpdatePersonID = ""
            this.status = ""
            this.reportTableData = this.$store.getters.getReports
        },
        search() {
            // eslint-disable-next-line no-unused-vars
            let searchList = this.$store.getters.getReports
            if (this.eventName !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.eventName.indexOf(this.eventName) !== -1
                })
            }
            if (this.firmID !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.firmID === this.firmID
                })
            }
            if (this.reportPerson !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.reportPerson.indexOf(this.reportPerson) !== -1
                })
            }
            if (this.reportTime !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.reportTime === this.reportTime
                })
            }
            if (this.flowPerson !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.flowPerson.indexOf(this.flowPerson) !== -1
                })
            }
            if (this.flowTime !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.flowTime === this.flowTime
                })
            }
            if (this.lastUpdatePersonID !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.lastUpdatePersonID === this.lastUpdatePersonID
                })
            }
            if (this.status !== "") {
                searchList = searchList.filter((obj) => {
                    return obj.status === this.status
                })
            }
            this.reportTableData = searchList
            this.$message.success("共查找到 " + this.reportTableData.length + " 条记录！")
        },
    },
    created() {
        console.log('sdfsdfsdffd',this.reportTableData)
    }
}
</script>

<style scoped>

</style>