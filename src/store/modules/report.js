const reports = {
    state:
        {
            reports: [
                {
                    reportID: '1',
                    eventName: '福岛核电站泄漏',
                    firmID: '1',
                    reportCode: '1',
                    flowID: '1',
                    reportPerson: '李大妈',
                    reportPersonPhone: '123874325',
                    reportTime: '2019-05-08',
                    flowPerson: '王春雷',
                    flowTime: '2019-04-03',
                    lastUpdatePersonID: '001',
                    status: '审核通过', // 指挥人员审核中，专家审核中，驳回，审核通过
                    reportProcess: [
                        {
                            processTime: '2021-05-16 12:01:00',
                            processPerson: '工作人员-王二虎',
                            processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:02:00',
                            processPerson: '指挥人员-王鑫',
                            processEvent: '驳回', // 驳回，审核通过，专家接入，提交,
                            advice: '氢弹数量过少'
                        },
                        {
                            processTime: '2021-05-16 12:03:00',
                            processPerson: '工作人员-王二虎',
                            processEvent: '编辑接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:20:00',
                            processPerson: '指挥人员-王鑫',
                            processEvent: '审核通过', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        }
                    ],
                    emergency: {},
                },

                {
                    reportID: '2',
                    eventName: '电网短路',
                    firmID: '1',
                    reportCode: '2',
                    flowID: '4',
                    reportPerson: '刘dark yeah',
                    reportPersonPhone: '5435187',
                    reportTime: '2019-05-08',
                    flowPerson: '王春雷',
                    flowTime: '2019-04-03',
                    lastUpdatePersonID: '002',
                    status: '审核通过', // 指挥人员审核中，专家审核中，驳回，审核通过
                    reportProcess: [
                        {
                            processTime: '2021-05-16 12:01:00',
                            processPerson: '工作人员-王鑫鹏',
                            processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:20:00',
                            processPerson: '指挥人员-王艳',
                            processEvent: '审核通过', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        }
                    ],
                    emergency: {},
                },
                {
                    reportID: '3',
                    eventName: '电网短路',
                    firmID: '1',
                    reportCode: '2',
                    flowID: '4',
                    reportPerson: '刘dark yeah',
                    reportPersonPhone: '5435187',
                    reportTime: '2019-05-08',
                    flowPerson: '王春雷',
                    flowTime: '2019-04-03',
                    lastUpdatePersonID: '002',
                    status: '指挥人员审核中', // 指挥人员审核中，专家审核中，驳回，审核通过
                    reportProcess: [
                        {
                            processTime: '2021-05-16 12:01:00',
                            processPerson: '工作人员-王鑫鹏',
                            processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:20:00',
                            processPerson: '指挥人员-王艳',
                            processEvent: '审核通过', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        }
                    ],
                    emergency: {},
                },
                {
                    reportID: '4',
                    eventName: '洪水',
                    firmID: '2',
                    reportCode: '3',
                    flowID: '4',
                    reportPerson: '曾D狗',
                    reportPersonPhone: '468321654',
                    reportTime: '2020-11-08',
                    flowPerson: '王春雷',
                    flowTime: '2019-04-03',
                    lastUpdatePersonID: '003',
                    status: '驳回', // 指挥人员审核中，专家审核中，驳回，审核通过
                    reportProcess: [
                        {
                            processTime: '2021-05-16 12:01:00',
                            processPerson: '工作人员-王鑫鹏',
                            processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:20:00',
                            processPerson: '指挥人员-王艳',
                            processEvent: '驳回', // 驳回，审核通过，专家接入，提交,
                            advice: '流程与险情不匹配！'
                        }
                    ],
                    emergency: {},
                },
                {
                    reportID: '5',
                    eventName: '超级台风',
                    firmID: '3',
                    reportCode: '3',
                    flowID: '4',
                    reportPerson: '小明',
                    reportPersonPhone: '1556666',
                    reportTime: '2021-11-08',
                    flowPerson: '韩梅梅',
                    flowTime: '2021-04-03',
                    lastUpdatePersonID: '003',
                    status: '专家审核中', // 指挥人员审核中，专家审核中，驳回，审核通过
                    reportProcess: [
                        {
                            processTime: '2021-05-16 12:01:00',
                            processPerson: '工作人员-王鑫鹏',
                            processEvent: '创建接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:03:00',
                            processPerson: '工作人员-王二虎',
                            processEvent: '编辑接报', // 驳回，审核通过，专家接入，提交,
                            advice: ''
                        },
                        {
                            processTime: '2021-05-16 12:02:00',
                            processPerson: '指挥人员-王鑫',
                            processEvent: '申请专家接入', // 驳回，审核通过，专家接入，提交,
                            advice: '请专家指示'
                        }
                    ],
                    emergency: {},
                },
            ]
        },

    getters: {
        getReports(state) {
            return state.reports;
        },
        getReport(state) {
            return function (reportID) {
                return state.reports.find(item => item.reportID === reportID.toString())
            }
        }
    },

    mutations: {
        updateReports(state, reports) {
            state.reports = reports;
        }
    },

    actions: {
        asyncUpdateReports(context, reports) {
            context.commit("updateReports", reports);
        }
    },
}

export default reports;