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
                type: '自然灾害水旱灾害一级',
                number: '001001'
            }, {
                id: '3',
                name: '矿泉水',
                type: '公共卫生事件矿泉水污染一级',
                number: '201001'
            }, {
                id: '4',
                name: '流程三',
                type: '事故灾难公交车倒翻二级',
                number: '001001'
            }, {
                id: '5',
                name: '流程一',
                type: '自然灾害水旱灾害一级',
                number: '001001'
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