const route = {
    state: {
        routes: [
            {
                id: 1,
                firmID: 1,
                targetGoodsID: 1,
                people: 100,
                car: 100,
                length: 12,
                state: '正常',
                comment: "无"
            },
            {
                id: 2,
                firmID: 1,
                targetGoodsID: 5,
                people: 100,
                car: 100,
                length: 12,
                state: '正常',
                comment: "无"
            }, {
                id: 3,
                firmID: 2,
                targetGoodsID: 5,
                people: 100,
                car: 100,
                length: 12,
                state: '拥堵',
                comment: "无"
            }, {
                id: 4,
                firmID: 1,
                targetGoodsID: 5,
                people: 100,
                car: 100,
                length: 12,
                state: '施工',
                comment: "无"
            },
        ],
    },
    getters: {
        getRoutes(state) {
            return state.routes;
        },
    },
    mutations: {
        updateRoutes(state, routes) {
            state.routes = routes;
        },

    },
    actions: {
        asyncUpdateRoutes(context, routes) {
            context.commit("updateRoutes", routes);
        },
    },

}
export default route;