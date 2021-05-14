const event = {
    state: {
        events: [
            {
                id: 0,
                label: "事件",
                children: [
                    {
                        id: 1,
                        label: '自然灾害',
                        level: 1,
                        children: [
                            {
                                id: 4,
                                label: '水旱灾害',
                                level: 2,
                                children: [
                                    {
                                        id: 9,
                                        label: '一级',
                                        level: 3,
                                    },
                                    {
                                        id: 10,
                                        level: 3,
                                        label: '二级'
                                    }
                                ]
                            },
                            {
                                id: 5,
                                label: '火灾',
                                level: 2,
                                children: [
                                    {
                                        id: 11,
                                        label: '一级',
                                        level: 3,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '事故灾害',
                        level: 1,
                        children: [
                            {
                                id: 6,
                                label: '公交车侧翻',
                                level: 2,
                                children: [{
                                    id: 12,
                                    level: 3,
                                    label: '一级'
                                }
                                ]
                            },
                            {
                                id: 7,
                                label: '工人猝死',
                                level: 2,
                                children: [
                                    {
                                        id: 13,
                                        level: 3,
                                        label: '一级'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '公共卫生事件',
                        level: 1,
                        children: [
                            {
                                id: 8,
                                level: 2,
                                label: '矿泉水污染',
                                children: [
                                    {
                                        id: 14,
                                        level: 3,
                                        label: "一级",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

        ],
    },
    getters: {
        getEvents(state) {
            return state.events;
        }
    },
    mutations: {
        updateEvents(state, events) {
            state.events = events;
        }
    },
    actions: {
        asyncUpdateEvents(context, events) {
            context.commit("updateEvents", events);
        }
    },

}
export default event;