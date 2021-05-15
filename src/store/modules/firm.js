const firm = {
    state: {
        firms: [
            {
                id: 1,
                name: '东软睿道教育信息技术有限公司',//企业名称
                address: '浑南新区新秀街2号东软集团A9楼',//企业地址
                location: {//企业位置
                    lat: 41.71128,
                    lng: 123.446149,
                },
                person: '鹏先生',//企业法人
                phone: '114',//企业电话
                type: 'software'//企业类型
            },{
                id: 2,
                name: '东软睿道教育信息技术有限公司',
                address: '浑南新区新秀街2号东软集团A9楼',
                location: {
                    lat: 41.71128,
                    lng: 123.446149,
                },
                person: '鹏先生',
                phone: '114',
                type: 'software'
            },
        ],
    },
    getters: {
        getFirms(state) {
            return state.firms;
        },
        //通过id来搜索返回数组中的某个元素
        getFirm(state) {
            return function (firmID) {
                return state.firms.find(item => item.id.toString() === firmID.toString())
            }
        }
    },
    mutations: {
        updateFirms(state, firms) {
            state.firms = firms;
        },

    },
    actions: {
        asyncUpdateFirms(context, firms) {
            context.commit("updateFirms", firms);
        },
    },

}
export default firm;