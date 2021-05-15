const flow = {
    state:
        {
            flows: [{
                id: '1',
                name: '流程一',
                type: '自然灾害水旱灾害一级',
                number: '001001'
            }, {
                id: '2',
                name: '模板二',
                type: '事故灾难工人猝死四级',
                number: '001002'
            }, {
                id: '3',
                name: '矿泉水',
                type: '公共卫生事件矿泉水污染一级',
                number: '201001'
            }, {
                id: '4',
                name: '流程三',
                type: '事故灾难公交车倒翻二级',
                number: '001003'
            }, {
                id: '5',
                name: '流程一',
                type: '自然灾害水旱灾害一级',
                number: '001002'
            },{
                id: '6',
                name: '流程六',
                type: '自然灾害水旱灾害一级',
                number: '001002'
            },{
                id: '7',
                name: '流程七',
                type: '自然灾害水旱灾害一级',
                number: '001002'
            },{
                id: '8',
                name: '流程八',
                type: '自然灾害水旱灾害一级',
                number: '001002'
            },
            ]
        },

    getters: {
        getFlows(state) {
            return state.flows;
        },
        getFlow(state) {
            return function (name) {
                return state.flows.find(item => item.name === name)
            }
        }
    },

    mutations: {
        updateFlows(state, flows) {
            state.flows = flows;
        }
    },

    actions: {
        asyncUpdateFlow(context, flows) {
            context.commit("updateFlows", flows);
        }
    },
}

export default flow;