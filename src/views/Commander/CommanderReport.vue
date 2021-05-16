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
                        icon="el-icon-view"

                        type="primary"
                        @click="handleViewClicked(scope.row)" :disabled="scope.row.status!=='指挥人员审核中'">审核
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog
            title="接报审核"
            :visible.sync="dialogVisible"
            width="50%"
        >
            <div style="display: flex">
                <div >
                    <div>
                        ID:{{ currentReport.reportID }}
                    </div>
                    <div>
                        事件名称:{{ currentReport.reportID }}
                    </div>

                    <el-popover trigger="hover" placement="right">
                        <p>企业名称: {{ getFirm().name }}</p>
                        <p>企业地址: {{ getFirm().address }}</p>
                        <p>企业法人: {{ getFirm().person }}</p>
                        <p>企业联系电话: {{ getFirm().phone }}</p>
                        <SmallMap :lat="getFirm().location.lat"
                                  :lng="getFirm().location.lng"/>
                        <span slot="reference" class="name-wrapper">
                            <div>风险企业:{{ getFirm().name }}

                            </div>
                        </span>
                    </el-popover>

                    <div>
                        代码:{{ currentReport.reportCode }}
                    </div>
                    <div>
                        报警人:{{ currentReport.reportPerson }}
                    </div>
                    <div>
                        报警人电话:{{ currentReport.reportPersonPhone }}
                    </div>
                    <div>
                        接报时间:{{ currentReport.reportTime }}
                    </div>
                    <div>
                        流程创建者:{{ currentReport.flowPerson }}
                    </div>
                    <div>
                        流程创建时间:{{ currentReport.flowTime }}
                    </div>
                </div>
                <div>
                    流程
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="warning" @click="handleExpertIn">申请专家接入</el-button>
            <el-button type="primary" @click="handleViewPass">通过审核</el-button>
            <el-button type="danger" @click="handleViewFail">驳回</el-button>

  </span>
        </el-dialog>
    </div>
</template>

<script>
import SmallMap from "@/components/SmallMap";

export default {
    name: "CommanderReport",
    // eslint-disable-next-line vue/no-unused-components
    components: {SmallMap},
    data() {
        return {
            tableData: this.$store.getters.getReports,
            dialogVisible: true,
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
            currentReport: {firmID: 1},

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
        handleViewClicked(row) {
            this.dialogVisible = true;
            this.currentReport = JSON.parse(JSON.stringify(row));
            console.log(row)
        },
        handleViewPass() {
            //审核通过
        },
        handleViewFail() {
            //审核通过
        },
        handleExpertIn() {
            //审核通过
        },
        getFirm() {
            const firm = this.$store.getters.getFirm(parseInt(this.currentReport.firmID))
            return firm
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