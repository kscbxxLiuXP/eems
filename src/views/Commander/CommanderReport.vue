<template>
    <div style="margin-left: 20px;">
        <div style="font-size: 24px">
            接报维护
        </div>

        <div style="margin-top: 20px">
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
        </div>
        <div style="margin-top: 20px;font-size: 20px">
            待审核接报列表
        </div>
        <el-table :data="tableData"
                  style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="reportID"
                label="ID"
                width="55">
            </el-table-column>
            <el-table-column
                prop="eventName"
                label="事件名称"
                width="100">
            </el-table-column>
            <el-table-column
                prop="firmID"
                label="风险企业名称"
                width="105">
            </el-table-column>
            <el-table-column
                prop="reportCode"
                label="代码"
                width="55">
            </el-table-column>
            <el-table-column
                prop="flowID"
                label="流程编号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="reportPerson"
                label="报警人"
                width="100">
            </el-table-column>
            <el-table-column
                prop="reportPersonPhone"
                label="报警人联系电话"
                width="100">
            </el-table-column>
            <el-table-column
                prop="reportTime"
                label="接报时间"
                width="100">
            </el-table-column>
            <el-table-column
                prop="flowPerson"
                label="流程创建者"
                width="100">
            </el-table-column>
            <el-table-column
                prop="flowTime"
                label="流程创建时间"
                width="105">
            </el-table-column>
            <el-table-column
                prop="lastUpdatePersonID"
                label="最后更新者编号"
                width="120">
            </el-table-column>
            <el-table-column
                label="流程状态"
                width="120">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==='指挥人员审核中'" size="medium" type="success">{{
                            scope.row.status
                        }}
                    </el-tag>
                    <el-tag v-if="scope.row.status==='专家审核中'" size="medium" type="warning">{{
                            scope.row.status
                        }}
                    </el-tag>
                    <el-tag v-if="scope.row.status==='驳回'" size="medium" type="danger">{{ scope.row.status }}</el-tag>
                    <el-tag v-if="scope.row.status==='审核通过'" size="medium" type="success">{{
                            scope.row.status
                        }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column

                label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-edit"

                        type="primary"
                        @click="()=>{
                          dialogVisible=true;
                          handleEdit(scope.$index, scope.row)
                        }">审核
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
export default {
    name: "CommanderReport",
    data() {
        return {
            tableData: this.$store.getters.getReports,
            dialogVisible: false,
            eventName: '',
            firmID: '',
            reportPerson: '',
            reportTime: '',
            flowPerson: '',
            flowTime: '',
            lastUpdatePersonID: '',
            status: '',
            loginStaff: localStorage.getItem('token'),
            options: [
                {
                    value: '指挥人员审核中',
                    label: '指挥人员审核中'
                },
                {
                    value: '专家审核中',
                    label: '专家审核中'
                },
                {
                    value: '驳回',
                    label: '驳回'
                },
                {
                    value: '审核通过',
                    label: '审核通过'
                }
            ],

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
            this.tableData = this.$store.getters.getReports
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
            this.tableData = searchList
            this.$message.success("共查找到 " + this.tableData.length + " 条记录！")
        },
    },
    mounted() {
        // console.log(this.$store.getters.getEventList)
        // console.log('sssssss',this.$store.getters.getEventList)


    }
}
</script>

<style scoped>

</style>