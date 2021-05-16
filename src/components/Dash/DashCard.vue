<template>
<div class="dashcard-running-task">
    <div style="display: flex; justify-content: space-between">
        <div>{{ report.eventName }}</div>
        <el-tag type="primary" v-if="report.status.indexOf('通过') !== -1">{{ report.status }}</el-tag>
        <el-tag type="warning" v-if="report.status.indexOf('审核中') !== -1">{{ report.status }}</el-tag>
        <el-tag type="danger"  v-if="report.status.indexOf('驳回') !== -1">{{ report.status }}</el-tag>
    </div>
    <div class="dashcard-waiting-task-description" style="padding-bottom: 10px">
        日本福岛核电站发生了泄漏, 最好的方法是采用五十枚大伊万进行彻底的清理.
    </div>

    <div style="display: flex; justify-content: space-between;align-items: flex-end">
        <div >
            <i class="el-icon-location-information" style="padding-bottom: 10px">{{getFirmName(report)}}</i>
            <i class="el-icon-date">{{report.reportTime}}</i>
        </div>
        <el-button type="primary" icon="el-icon-search" size="small" @click="showDialog">查看详细</el-button>
    </div>

    <el-dialog
        title="接报详情"
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
                        <div v-for="(process, index) in report.reportProcess" :key="process.processTime">
                            <el-timeline-item :timestamp="process.processTime + ' ' + process.processPerson"
                                              placement="top"
                                              :type="index === report.reportProcess.length -1 ? 'primary' : 'info'">
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
            </div>
            <div class="info-board">
                <div style="font-size: 18px;margin-bottom: 30px">
                    <i class="el-icon-warning-outline"></i>
                    接报信息
                </div>
                <div class="info-item">
                    <div class="info-title">ID:</div>
                    <div class="info-detail">
                        {{ report.reportID }}
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-title">事件名称:</div>
                    <div class="info-detail">{{ report.reportID }}</div>
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
                    <div class="info-detail">{{ report.reportCode }}</div>
                </div>
                <div class="info-item">
                    <div class="info-title">报警人:</div>
                    <div class="info-detail">{{ report.reportPerson }}</div>
                </div>
                <div class="info-item">
                    <div class="info-title">报警人电话:</div>
                    <div class="info-detail">{{ report.reportPersonPhone }}</div>
                </div>
                <div class="info-item">
                    <div class="info-title">接报时间:</div>
                    <div class="info-detail">{{ report.reportTime }}</div>
                </div>
                <div class="info-item">
                    <div class="info-title">流程创建者:</div>
                    <div class="info-detail">{{ report.flowPerson }}</div>
                </div>
                <div class="info-item">
                    <div class="info-title">流程创建时间:</div>
                    <div class="info-detail">{{ report.flowTime }}</div>
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
    </el-dialog>
</div>
</template>

<script>
import SmallMap from "@/components/SmallMap";
export default {
    name: "DashCard",
    components: {SmallMap},
    props: ['report'],
    data () {
        return {
            dialogVisible: false,
        }
    },

    methods: {
        showDialog(){
            this.dialogVisible = true
        },
        // eslint-disable-next-line no-unused-vars
        getFirmName(report){
            for(let item in this.$store.getters.getFirms){
                if(report.firmID === ("" + item.id)){
                    return item.name
                }
            }
            return "东北大学南湖校区"
        },
        getFirm() {
            const firm = this.$store.getters.getFirm(parseInt(this.report.firmID))
            return firm
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
    }
}
</script>

<style scoped>
.dashcard-running-task {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
    position: relative;
}
.dashcard-waiting-task-description {
    color: #7d808d;
    margin-top: 10px;
}
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