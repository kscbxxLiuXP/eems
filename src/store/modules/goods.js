const goods = {
    state:
        {
            goods: [
                {
                    goodsID: '1',
                    goodsName: '矿泉水',
                    goodsNum: '50件',
                    goodsType: '生命救助',
                    goodsInventor: '蔡徐坤',
                    goodsInventorPhone: '35435135',
                    goodsCode: '20190425002957',
                    goodsTime: '2019-04-25',
                    goodsAddress: '东北大学(浑南校区)',
                    goodsAddressDetail: '辽宁省沈阳市浑南区创新路195号',
                    goodsLongitude: '123.430933',
                    goodsLatitude: '41.659108'
                },
                {
                    goodsID: '2',
                    goodsName: '炸药包',
                    goodsNum: '50件',
                    goodsType: '器材工具',
                    goodsInventor: '吴亦凡',
                    goodsInventorPhone: '35435135',
                    goodsCode: '20190425007612',
                    goodsTime: '2019-04-28',
                    goodsAddress: '东北大学(浑南校区)',
                    goodsAddressDetail: '辽宁省沈阳市浑南区创新路195号',
                    goodsLongitude: '123.430933',
                    goodsLatitude: '41.659108'
                },
                {
                    goodsID: '3',
                    goodsName: '医疗包',
                    goodsNum: '50包',
                    goodsType: '生命救助',
                    goodsInventor: '吴亦凡',
                    goodsInventorPhone: '35435135',
                    goodsCode: '20190425002957',
                    goodsTime: '2018-04-25',
                    goodsAddress: '东北大学(浑南校区)',
                    goodsAddressDetail: '辽宁省沈阳市浑南区创新路195号',
                    goodsLongitude: '123.430933',
                    goodsLatitude: '41.659108'
                },
                {
                    goodsID: '4',
                    goodsName: '医疗箱',
                    goodsNum: '20箱',
                    goodsType: '生命救助',
                    goodsInventor: '吴亦凡',
                    goodsInventorPhone: '35435135',
                    goodsCode: '20200425002957',
                    goodsTime: '2020-04-25',
                    goodsAddress: '东北大学(浑南校区)',
                    goodsAddressDetail: '辽宁省沈阳市浑南区创新路195号',
                    goodsLongitude: '123.430933',
                    goodsLatitude: '41.659108'
                },
                {
                    goodsID: '5',
                    goodsName: '矿泉水',
                    goodsNum: '50件',
                    goodsType: '生命救助',
                    goodsInventor: '蔡徐坤',
                    goodsInventorPhone: '35435135',
                    goodsCode: '20190425002957',
                    goodsTime: '2019-04-25',
                    goodsAddress: '东北大学',
                    goodsAddressDetail: '辽宁省沈阳市浑南区创新路195号',
                    goodsLongitude: '123.424477',
                    goodsLatitude: '41.770971'
                },
            ]
        },

    getters: {
        getGoods(state) {
            return state.goods;
        },
        getGood(state) {
            return function (id) {
                return state.goods.find(item => item.goodsID.toString() === id.toString())
            }
        }
    },

    mutations: {
        updateGoods(state, goods) {
            state.goods = goods;
        }
    },

    actions: {
        asyncUpdateGoods(context, goods) {
            context.commit("updateGoods", goods);
        }
    },
}

export default goods;