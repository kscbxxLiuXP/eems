const user = {
    state:
        {
            users: [
                {
                    username: "admin",
                    password: "admin",
                    type: "root",
                },
                {
                    username: "zhry",
                    password: "zhry",
                    type: "commander",
                },
                {
                    username: "gzry",
                    password: "gzry",
                    type: "staff",
                },
                {
                    username: "zj",
                    password: "zj",
                    type: "expert",
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