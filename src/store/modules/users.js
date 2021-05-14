const user = {
    state:
        {
            users: [
                {
                    username: "admin",
                    password: "admin",
                    type: "超级管理员",
                    staffName: "刘军",
                    staffID: "1",
                    staffCode: "78986",
                    gender: "男",
                    birth: "2003-02-02",
                    status: "正常"
                },
                {
                    username: "zhry",
                    password: "zhry",
                    type: "指挥人员",
                    staffName: "王磊",
                    staffID: "2",
                    staffCode: "34535",
                    gender: "男",
                    birth: "2003-02-02",
                    status: "正常"
                },
                {
                    username: "gzry",
                    password: "gzry",
                    type: "工作人员",
                    staffName: "王鑫",
                    staffID: "3",
                    staffCode: "78654",
                    gender: "男",
                    birth: "2003-02-02",
                    status: "正常"
                },
                {
                    username: "zj",
                    password: "zj",
                    type: "专家",
                    staffName: "王天博",
                    staffID: "4",
                    staffCode: "675654",
                    gender: "男",
                    birth: "2003-02-02",
                    status: "正常"
                }
            ]
        },

    getters: {
        getUsers(state) {
            return state.users;
        },
        getUser(state) {
            return function (username) {
                return state.users.find(item => item.username === username)
            }
        }
    },

    mutations: {
        updateUsers(state, users) {
            state.users = users;
        }
    },

    actions: {
        asyncUpdateUser(context, users) {
            context.commit("updateUsers", users);
        }
    },
}

export default user;