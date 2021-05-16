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
        <el-row :gutter="20" style="margin-bottom: 40px">
            <el-col :span="8">
                <div>最后更新者编号:
                    <el-input v-model="lastUpdatePersonID" style="width: 300px" placeholder="不限"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>流程状态：
                    <el-select v-model="status" filterable placeholder="不限">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item"
                            :label="item"
                            :value="item">
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

        <div style="height: 300px; margin-bottom: 40px">
            <el-table
                :data="reportTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                    width="130">
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
                                        <el-timeline-item :timestamp="process.processTime + ' ' + process.processPerson"
                                                          placement="top"
                                                          :type="index === scope.row.reportProcess.length -1 ? 'primary' : 'info'">
                                            <div style="display: flex;align-items: center">
                                                <div> 事件:</div>
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
                                            <p v-if="process.processEvent === '驳回'">{{ '意见:  ' + process.advice }}</p>
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
                            :disabled="scope.row.status !== '驳回'"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="handleDelete(scope.$index, scope.row)"
                            :disabled="scope.row.status !== '审核通过'"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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

        <el-dialog title="新增接报" :visible.sync="addFormVisible" width="500px">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="接报人" :label-width="formLabelWidth">
                    <el-input v-model="loginStaff" autocomplete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="接报时间" :label-width="formLabelWidth" disabled="true" prop="reportTime">
                    <el-date-picker
                        v-model="addForm.reportTime"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日, HH 时 mm 分 ss 秒"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="报警人" :label-width="formLabelWidth" prop="reportPerson">
                    <el-input v-model="addForm.reportPerson" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报警人联系电话" :label-width="formLabelWidth" prop="reportPersonPhone">
                    <el-input v-model="addForm.reportPersonPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="事件名称" prop="eventName" :label-width="formLabelWidth">
                    <el-select v-model="addForm.eventName" placeholder="请选择">
                        <el-option
                            v-for="item in eventOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="风险企业" prop="firmID" :label-width="formLabelWidth">
                    <el-select v-model="addForm.firmID" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in firmOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            <div style="height: 100%">
                                <div class="name">{{ item.name }}</div>
                                <span class="addr"><i class="el-icon-location-outline"></i>{{ item.address }}</span>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="流程" prop="flowID" :label-width="formLabelWidth">
                    <el-select v-model="addForm.flowID" placeholder="请选择">
                        <el-option
                            v-for="item in flowOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id">
                            <div style="height: 100%">
                                <div class="name">{{ item.name }}</div>
                                <span class="addr"><i class="el-icon-location-outline"></i>{{ randomFlow() }}</span>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddNewReport">取 消</el-button>
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑接报" :visible.sync="editFormVisible" width="500px">
            <el-form :model="editForm" :rules="rules" ref="editForm">
                <el-form-item label="接报人" :label-width="formLabelWidth">
                    <el-input v-model="loginStaff" autocomplete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="接报时间" :label-width="formLabelWidth" disabled="true" prop="reportTime">
                    <el-date-picker
                        v-model="editForm.reportTime"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日, HH 时 mm 分 ss 秒"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="报警人" :label-width="formLabelWidth" prop="reportPerson">
                    <el-input v-model="editForm.reportPerson" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报警人联系电话" :label-width="formLabelWidth" prop="reportPersonPhone">
                    <el-input v-model="editForm.reportPersonPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="事件名称" prop="eventName" :label-width="formLabelWidth">
                    <el-select v-model="editForm.eventName" placeholder="请选择">
                        <el-option
                            v-for="item in eventOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="风险企业" prop="firmID" :label-width="formLabelWidth">
                    <el-select v-model="editForm.firmID" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in firmOptions"
                            :key="'' + item.id"
                            :label="item.name"
                            :value="'' + item.id">
                            <div style="height: 100%">
                                <div class="name">{{ item.name }}</div>
                                <span class="addr"><i class="el-icon-location-outline"></i>{{ item.address }}</span>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="流程" prop="flowID" :label-width="formLabelWidth">
                    <el-select v-model="editForm.flowID" placeholder="请选择">
                        <el-option
                            v-for="item in flowOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            <div style="height: 100%">
                                <div class="name">{{ item.name }}</div>
                                <span class="addr"><i class="el-icon-location-outline"></i>{{ randomFlow() }}</span>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEditReport">取 消</el-button>
                <el-button type="primary" @click="editReport">确 定</el-button>
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
            selectedIdEdit: '',
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
                status: '指挥人员审核中', // 指挥人员审核中，专家审核中，驳回，审核通过
                reportProcess: [
                    {
                        processTime: '',
                        processPerson: '',
                        processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                        advice: ''
                    }
                ]
            },
            editForm: {
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
                status: '指挥人员审核中', // 指挥人员审核中，专家审核中，驳回，审核通过
                reportProcess: []
            },
            rules: {
                eventName: [
                    {required: true, message: '请选择事件名称', trigger: 'change'},
                ],
                firmID: [
                    {required: true, message: '请选择风险公司', trigger: 'change'}
                ],
                flowID: [
                    {required: true, message: '请选择应对流程', trigger: 'change'}
                ],
                reportPerson: [
                    {required: true, message: '请填写报警人姓名', trigger: 'blur'}
                ],
                reportTime: [
                    {required: true, message: '请选择接报时间', trigger: 'change'}
                ],
                reportPersonPhone: [
                    {required: true, message: '请填写报警人电话号码', trigger: 'blur'}
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
            this.status = "指挥人员审核中"
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
        closeAddNewReport() {
            this.$refs['addForm'].resetFields();
            this.addFormVisible = false
        },
        closeEditReport() {
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
        add() {
            this.addFormVisible = false
            this.$message.success("用户添加成功！")
            this.addForm.reportID = "" + (Math.max.apply(Math, this.$store.getters.getReports.map(function (o) {
                return parseInt(o.reportID)
            })) + 1)
            this.addForm.reportCode = "" + Math.round(Math.random() * 100000)
            this.addForm.reportProcess.processTime = this.getNowFormatDate()
            this.addForm.reportProcess.processPerson = this.loginStaff
            let tmpform = JSON.parse(JSON.stringify(this.addForm)) // 深拷贝
            let tmp = this.$store.getters.getReports
            tmp.push(tmpform)
            this.$store.dispatch("asyncUpdateReports", tmp)
            this.$refs['addForm'].resetFields();
        },
        randomFlow() {
            let index = Math.round(Math.random() * 7);
            let dd = [
                "去医院->运输手榴弹",
                "拨打119->拨打110",
                "呼叫110->拨打120",
                "检查物资->运输手榴弹",
                "运输手榴弹->运输火药",
                "丢弃核弹->拨打911",
                "拨打120->拨打110",
            ];
            return dd[index];
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handleEdit(index, row){
            this.editForm = JSON.parse(JSON.stringify(row))
            this.selectedIdEdit = row.reportID
            this.editFormVisible = true
        },
        handleDelete(index, row) {

            this.$confirm('确认要删除该条数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success("删除成功")
                this.reportTableData.splice(index, 1)
                let tmp = this.$store.getters.getReports
                tmp = tmp.filter((obj) => {
                    return obj.reportID !== row.reportID
                })
                this.$store.dispatch("asyncUpdateReports", tmp)
            }).catch(() => {

            });

        },
        editReport(){
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.edit()
                } else {
                    return false;
                }
            });
        },
        edit(){
            let tmp = this.$store.getters.getReports
            this.editForm.status = '指挥人员审核中'
            this.editForm.reportProcess.push(
                {
                    processTime: this.getNowFormatDate(),
                    processPerson: this.loginStaff,
                    processEvent: '编辑接报', // 驳回，审核通过，专家接入，提交,
                    advice: ''
                }
            )
            tmp.forEach((report) => {
                if(report.reportID === this.selectedIdEdit) {
                    for(let key in report){
                        report[key] = this.editForm[key]
                    }
                    console.log(report)
                }
            })
            this.$store.dispatch("asyncUpdateReports", tmp)
            this.editFormVisible = false
            this.$message.success("编辑成功！")
        }
    },
}
</script>

<style scoped>
.el-select-dropdown__item {
    height: 100%;
}

.name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.addr {
    font-size: 12px;
    color: #b4b4b4;
}

</style>