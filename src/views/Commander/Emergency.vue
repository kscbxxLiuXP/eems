<template>
    <div style="margin-left: 20px;">
        <div style="font-size: 24px">
            紧急事件处理
        </div>
        <div style="margin-top: 20px;font-size: 20px">
            待审核接报列表
        </div>
        <el-table :data="tableData.filter(i=>i.status==='审核通过'||i.status==='紧急事件处理')"
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

                        type="warning"
                        @click="handleViewClicked(scope.row,false)" :disabled="scope.row.status!=='审核通过'">紧急事件处理
                    </el-button>
                    <el-button
                        icon="el-icon-view"
                        type="primary"
                        @click="handleViewClicked(scope.row,true)">查看
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog title="紧急事件处理"
                   :visible.sync="dialogVisible2"
                   v-loading="loading"
                   width="700px">
            <div style="margin-left: 100px">
                <div class="info-item">
                    <div style="width: 100px;text-align: right">风险企业：</div>
                    <div>
                        <div class="name">{{ getFirm().name }}</div>
                        <span class="addr"><i class="el-icon-location-outline"></i>{{ getFirm().address }}</span>
                    </div>
                </div>
                <div class="info-item">
                    <div style="width: 100px;text-align: right">目标物资：</div>
                    <div style="display: flex;flex-direction: column">
                        <div style="margin-top: 5px" v-bind:key="index" v-for="(item,index) in rdGoods">
                            <div class="name">{{ item.goodsName }}</div>
                            <span class="addr"><i class="el-icon-location-outline"></i>{{ item.goodsAddress }}</span>
                        </div>
                    </div>

                </div>
                <div class="info-item">
                    <div style="width: 100px;text-align: right">供应模式：</div>
                    <div style="display: flex">
                        <div
                            style="display: flex;flex-direction: column;align-items: center;justify-items: center;padding: 20px">
                            <img :src="require('./../../assets/icons/dandian.png')" width="50px"/>
                            <el-radio v-model="supplyMode" size="small" style="margin-top: 10px" label="1" border>单点供应
                            </el-radio>
                        </div>
                        <div
                            style="display: flex;flex-direction: column;align-items: center;justify-items: center;padding: 20px">
                            <img :src="require('./../../assets/icons/duodian.png')" width="50px"/>
                            <el-radio v-model="supplyMode" size="small" style="margin-top: 10px" label="2" border>多点供应
                            </el-radio>
                        </div>

                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2=false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="查看接报"
            :visible.sync="dialogVisible"
            width="1200px"
        >
            <div
                style="border: #99a9bf 1px solid; border-radius: 10px;margin-left: 30px;margin-right: 25px;padding: 20px;margin-bottom: 10px">
                <div style="font-size: 18px">
                    紧急事件处理
                </div>
                <div style="margin-top: 10px">
                    供应模式：{{ currentReport.emergency.mode === '1' ? '单点供应' : "多点供应" }}
                </div>
                <div>
                    <baidu-map class="map" :center="{lng: 123.430933, lat: 41.659108}" :zoom="12" scrollWheelZoom="true" >
<!--                        <bml-curve-line :points="points1"></bml-curve-line>-->
<!--                        <bml-curve-line :points="points2"></bml-curve-line>-->
                        <bm-driving v-if="currentReport.emergency.mode !== '1'" start="辽宁省沈阳市和平区文化路3巷11号" end="东软睿道教育信息技术有限公司" :panel="false" :autoViewport="true" ></bm-driving>
                        <bm-driving  start="东北大学(浑南校区)" end="东软睿道教育信息技术有限公司" :panel="false" :autoViewport="true" ></bm-driving>
                    </baidu-map>
                </div>

            </div>
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
            <el-button @click="dialogVisible=false">完 成</el-button>


  </span>
        </el-dialog>

    </div>
</template>

<script>
import SmallMap from "@/components/SmallMap";
import {BmlCurveLine} from 'vue-baidu-map'

export default {
    name: "Emergency",
    // eslint-disable-next-line vue/no-unused-components
    components: {SmallMap, BmlCurveLine},
    data() {
        return {
            tableData: this.$store.getters.getReports,
            dialogVisible: false,
            dialogVisible2: false,
            eventName: '',
            firmID: '',
            reportPerson: '',
            reportTime: '',
            flowPerson: '',
            flowTime: '',
            lastUpdatePersonID: '',
            status: '',
            loginStaff: localStorage.getItem('token'),
            currentReport: {
                reportID: 1, firmID: 1, emergency: {
                    mode: '1'
                }
            },
            supplyMode: '1',
            loading: false,
            rdGoods: [],
            points1: [
                {lng: 123.430933, lat: 41.659108},
                {lng: 123.446149, lat: 41.71128}


            ], points2: [
                {lng: 123.424477, lat: 41.770971},
                {lng: 123.446149, lat: 41.71128},

            ]
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
        handleSubmit() {
            this.$confirm('您确认要提交吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.loading = true
                setTimeout(() => {
                    this.loading = false;
                    this.$message({
                        type: 'success',
                        message: '路径生成成功!'
                    });
                    this.updateReport()
                    this.dialogVisible2 = false;
                    setTimeout(() => {
                        this.dialogVisible = true;
                    }, 1000)

                }, 1000);

            }).catch();

        },
        handleViewClicked(row, viewMode) {
            this.dialogVisible2 = !viewMode;
            this.dialogVisible = viewMode;
            this.currentReport = JSON.parse(JSON.stringify(row));
            this.rdGoods = this.randomGoods();
            console.log(row)
        },
        // eslint-disable-next-line no-unused-vars
        updateReport() {
            let usr = this.$store.getters.getUser(localStorage.getItem('token'))
            let tmp = this.$store.getters.getReports

            tmp.forEach((report) => {
                if (report.reportID === this.currentReport.reportID) {
                    //
                    report.status = '紧急事件处理';
                    report.lastUpdatePersonID = usr.staffID
                    let ev = {
                        processTime: this.getNowFormatDate(),
                        processPerson: '指挥人员-' + usr.staffName,
                        processEvent: '紧急事件处理', // 驳回，审核通过，专家接入，提交,
                        advice: ''
                    }
                    let ee = {goods: this.rdGoods, mode: this.supplyMode}
                    report.emergency = ee
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

        },
        randomGoods() {
            // eslint-disable-next-line no-unused-vars
            let num = Math.round(Math.random() * 3) + 1;
            let list = [];
            const goods = this.$store.getters.getGoods
            for (let i = 1; i <= num; i++) {
                let index = Math.round(Math.random() * 4);
                list.push(goods[index])
            }
            return list
        },
    },
    mounted() {
        // console.log(this.$store.getters.getEventList)
        // console.log('sssssss',this.$store.getters.getEventList)
        console.log(this.randomGoods())

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

.name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.addr {
    font-size: 12px;
    color: #b4b4b4;
}
</style>