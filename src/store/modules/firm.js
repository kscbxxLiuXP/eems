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
                person: '曾先生',//企业法人
                phone: '114',//企业电话
                type: 'software'//企业类型
            }, {
                id: 2,
                name: '国网辽宁省电力有限公司',
                address: '沈阳市和平区宁波路18号',
                location: {
                    lat: 41.779708,
                    lng: 123.421528,
                },
                person: '曾先生',
                phone: '114',
                type: 'software'
            },{
                id: 3,
                name: '腾讯科技有限公司',
                address: '广东省深圳市南山区海天二路33号腾讯滨海大厦',
                location: {
                    lat: 22.528466,
                    lng: 113.942304,
                },
                person: '曾先生',
                phone: '114',
                type: 'software'
            },{
                id: 4,
                name: '华为技术有限公司',
                address: '深圳市龙岗区稼先路与冲之大道交叉路口往西南约100米(华为基地-G区)',
                location: {
                    lat: 22.656137,
                    lng: 114.066131,
                },
                person: '曾先生',
                phone: '114',
                type: 'hardware'
            },{
                id: 5,
                name: '字节跳动科技有限公司',
                address: '学清路10号院学清嘉创大厦一层',
                location: {
                    lat: 40.020129,
                    lng: 116.359251,
                },
                person: '曾先生',
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