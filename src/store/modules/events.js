const event = {
    state: {
        eventMaxID: 15,
        events: [
            {
                id: 1,
                label: "事件",
                level: 0,
                children: [
                    {
                        id: 2,
                        label: '自然灾害',
                        level: 1,
                        children: [
                            {
                                id: 3,
                                label: '水旱灾害',
                                level: 2,
                                children: [
                                    {
                                        id: 4,
                                        label: '一级',
                                        comment: '这是一级备注',
                                        level: 3,
                                    },
                                    {
                                        id: 5,
                                        level: 3,
                                        comment: '这是二级备注',
                                        label: '二级'
                                    }
                                ]
                            },
                            {
                                id: 6,
                                label: '火灾',
                                level: 2,
                                children: [
                                    {
                                        id: 7,
                                        label: '一级',
                                        comment: '这是一级备注',
                                        level: 3,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 8,
                        label: '事故灾害',
                        level: 1,
                        children: [
                            {
                                id: 9,
                                label: '公交车侧翻',
                                level: 2,
                                children: [{
                                    id: 10,
                                    level: 3,
                                    label: '一级',
                                    comment: '这是一级备注',
                                }
                                ]
                            },
                            {
                                id: 11,
                                label: '工人猝死',
                                level: 2,
                                children: [
                                    {
                                        id: 12,
                                        level: 3,
                                        label: '一级',
                                        comment: '这是一级备注',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 13,
                        label: '公共卫生事件',
                        level: 1,
                        children: [
                            {
                                id: 14,
                                level: 2,
                                label: '矿泉水污染',
                                children: [
                                    {
                                        id: 15,
                                        level: 3,
                                        comment: '这是一级备注',
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
        },
        getEventMaxID(state) {
            return state.eventMaxID
        }
    },
    mutations: {
        updateEvents(state, events) {
            state.events = events;
        },
        updateEventMaxID(state, maxid) {
            state.eventMaxID = maxid;
        }
    },
    actions: {
        asyncUpdateEvents(context, events) {
            context.commit("updateEvents", events);
        },
        asyncUpdateEventMaxID(context, maxid) {
            context.commit("updateEventMaxID", maxid);
        }
    },

}
export default event;