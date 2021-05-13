const test = {
    state:
        {val: 1},

    getters: {
        getTest(state) {
            return state.val;
        },

    },

    mutations: {
        updateTest(state, value) {
            state.val = value;
        }
    },

    actions: {
        asyncUpdateTest(context, value) {
            context.commit("updateTest", value);
        }
    },
}

export default test;

//调用方法
//this.$store.dispatch("asyncUpdateTest",1212);
// this.$store.getters.getTest