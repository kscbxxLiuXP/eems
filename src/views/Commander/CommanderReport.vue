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
                label="风险企业ID"
                width="100">
            </el-table-column>
            <el-table-column
                prop="reportCode"
                label="代码"
                width="80">
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
                width="130">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==='指挥人员审核中'" size="medium" type="success">{{
                            scope.row.status
                        }}
                    </el-tag>
                    <el-tag v-if="scope.row.status==='专家审核中'" size="medium" type="warning">{{
                            scope.row.status
                        }}
                    </el-tag>
                    <el-tag v-if="scope.row.status==='紧急事件处理'" size="medium" type="warning">{{
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
                        @click="handleViewClicked(scope.row,false)" :disabled="scope.row.status!=='指挥人员审核中'">审核
                    </el-button>
                    <el-button
                        icon="el-icon-view"
                        type="primary"
                        @click="handleViewClicked(scope.row,true)">查看
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog
            title="接报审核"
            :visible.sync="dialogVisible"
            width="1200px"
        >
            <div style="display: flex">
                <div class="history-board">
                    <div style="font-size: 18px">
                        <i class="el-icon-time"></i>
                        历史审核记录
                    </div>
                    <div class="block" style="height: 100%;margin-top: 30px">
                        <el-timeline style="padding-left: 10px">
                            <div v-for="(process, index) in currentReport.reportProcess" :key="process.processTime">
                                <el-timeline-item :timestamp="process.processTime + ' ' + process.processPerson"
                                                  placement="top"
                                                  :type="index === currentReport.reportProcess.length -1 ? 'primary' : 'info'">
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
                                                <el-tag v-if="process.processEvent==='紧急事件处理'" size="medium" type="warning">{{
                                                        process.processEvent
                                                    }}
                                            </el-tag>

                                            <el-tag v-if="process.processEvent==='申请专家接入'" size="medium" type="primary">{{
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


                </div>
                <div class="info-board">
                    <div style="font-size: 18px;margin-bottom: 30px">
                        <i class="el-icon-warning-outline"></i>
                        接报信息
                    </div>
                    <div class="info-item">
                        <div class="info-title">ID:</div>
                        <div class="info-detail">
                            {{ currentReport.reportID }}
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-title">事件名称:</div>
                        <div class="info-detail">{{ currentReport.reportID }}</div>
                    </div>

                    <el-popover trigger="hover" placement="right">
                        <p>企业名称: {{ getFirm().name }}</p>
                        <p>企业地址: {{ getFirm().address }}</p>
                        <p>企业法人: {{ getFirm().person }}</p>
                        <p>企业联系电话: {{ getFirm().phone }}</p>
                        <SmallMap :lat="getFirm().location.lat"
                                  :lng="getFirm().location.lng"/>
                        <span slot="reference" class="name-wrapper">
                            <div class="info-item">
                                <div class="info-title">风险企业:</div>
                                <div class="info-detail">{{ getFirm().name }}</div>
                            </div>
                        </span>
                    </el-popover>

                    <div class="info-item">
                        <div class="info-title">代码:</div>
                        <div class="info-detail">{{ currentReport.reportCode }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title">报警人:</div>
                        <div class="info-detail">{{ currentReport.reportPerson }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title">报警人电话:</div>
                        <div class="info-detail">{{ currentReport.reportPersonPhone }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title">接报时间:</div>
                        <div class="info-detail">{{ currentReport.reportTime }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title">流程创建者:</div>
                        <div class="info-detail">{{ currentReport.flowPerson }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title">流程创建时间:</div>
                        <div class="info-detail">{{ currentReport.flowTime }}</div>
                    </div>
                </div>
                <div class="process-board">
                    <div style="font-size: 18px">
                        <i class="el-icon-date"></i>
                        流程
                    </div>
                    <div class="process-timeline">
                        <el-timeline style="font-size: 16px;padding-left: 10px">
                            <el-timeline-item
                                v-for="(activity, index) in randomFlow()"
                                :key="index"
                                :timestamp="activity.content">
                                {{ activity.step }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>

                </div>

            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="warning" @click="handleExpertIn" :disabled="viewMode">申请专家接入</el-button>
            <el-button type="success" @click="handleViewPass" :disabled="viewMode">通过审核</el-button>
            <el-button type="danger" @click="handleViewFail" :disabled="viewMode">驳回</el-button>

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
            currentReport: {firmID: 1},
            viewMode: true,

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
        handleViewClicked(row, viewMode) {
            this.dialogVisible = true;
            this.currentReport = JSON.parse(JSON.stringify(row));
            this.viewMode = viewMode
            console.log(row)
        },
        handleViewPass() {
            //审核通过
            this.$confirm('您确认要 通过审核 该接报吗(操作不可逆)?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '通过审核成功!'
                });
                this.updateReport(this.currentReport.reportID, '审核通过', '审核通过', '')
                this.dialogVisible = false
            }).catch();
        },
        handleViewFail() {
            //审核不通过
            this.$prompt('请输入驳回理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({value}) => {
                this.$message({
                    type: 'success',
                    message: '接报驳回成功'
                });
                this.updateReport(this.currentReport.reportID, '驳回', '驳回', value)

                this.dialogVisible = false
            }).catch();
        },
        handleExpertIn() {
            //专家接入
            this.$confirm('您确认要申请 专家接入吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '已申请专家接入!'
                });
                this.updateReport(this.currentReport.reportID, '专家审核中', '申请专家接入', '')

                this.dialogVisible = false
            }).catch();

        },
        // eslint-disable-next-line no-unused-vars
        updateReport(reportID, status, event, advice) {
            let usr = this.$store.getters.getUser(localStorage.getItem('token'))
            let tmp = this.$store.getters.getReports

            tmp.forEach((report) => {
                if (report.reportID === reportID) {
                    //
                    report.status = status;
                    report.lastUpdatePersonID = usr.staffID
                    let ev = {
                        processTime: this.getNowFormatDate(),
                        processPerson: '指挥人员-' + usr.staffName,
                        processEvent: event, // 驳回，审核通过，专家接入，提交,
                        advice: advice
                    }
                    report.reportProcess.push(ev);
                    console.log(report)
                }
            })
            this.$store.dispatch("asyncUpdateReports", tmp)
        },
        getFirm() {
            const firm = this.$store.getters.getFirm(parseInt(this.currentReport.firmID))
            return firm
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
        randomFlow() {
            let index = Math.round(Math.random() * 7);
            let dd = [
                [{id: 1, step: '步骤一', content: '去医院'}],
                [{id: 1, step: '步骤一', content: "去医院"}, {id: 2, step: '步骤二', content: "运输手榴弹"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "拨打119"}, {id: 2, step: '步骤二', content: "拨打110"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "呼叫110"}, {id: 2, step: '步骤二', content: "拨打120"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "检查物资"}, {id: 2, step: '步骤二', content: "运输手榴弹"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "运输手榴弹"}, {id: 2, step: '步骤二', content: "运输火药"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "丢弃核弹"}, {id: 2, step: '步骤二', content: "拨打911"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "拨打120"}, {id: 2, step: '步骤二', content: "拨打110"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
                [{id: 1, step: '步骤一', content: "检查子弹"}, {id: 2, step: '步骤二', content: "射击"}, {
                    id: 3,
                    step: '步骤三',
                    content: '运输核弹'
                }],
            ];
            return dd[index];

        }
    },
    mounted() {
        // console.log(this.$store.getters.getEventList)
        // console.log('sssssss',this.$store.getters.getEventList)


    }
}
</script>

<style scoped>
.info-board {
    border: #99a9bf 1px solid;
    padding: 20px;
    padding-bottom: 30px;
    border-radius: 10px;
    margin-left: 30px;
    width: 380px;


}

.info-item {
    display: flex;
    align-items: center;
    margin-top: 15px;
    font-size: 14px;


}

.info-title {
    width: 100px;
    text-align: right;
}

.info-detail {
    margin-left: 10px;

}

.process-board {
    margin-left: 30px;
    border: #99a9bf 1px solid;
    border-radius: 10px;
    padding: 20px;
    padding-right: 40px;
    width: 200px;
}

.process-timeline {
    margin-top: 30px;
    height: 100%;
    display: flex;


}

.history-board {
    margin-left: 30px;
    border: #99a9bf 1px solid;
    border-radius: 10px;
    padding: 20px 40px 20px 20px;
    width: 300px;

}
</style>