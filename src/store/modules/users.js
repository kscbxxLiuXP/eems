import ss from "@/store/store";

const user = {
    state: ss.user ? ss.user :
        {
            user: {
                name: "",
            }
        },

    getters: {
        getUser(state) {
            return state.user;
        }
    },

    mutations: {
        updateUser(state, user) {
            state.user = user;
        }
    },

    actions: {
        asyncUpdateUser(context, user) {
            context.commit("updateUser", user);
        }
    },
}

export default user;