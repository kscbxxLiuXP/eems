import Vue from 'vue'
import Vuex from "vuex";
import user from "@/store/modules/users";
import test from "@/store/modules/test";
import event from "@/store/modules/events";
import flow from "@/store/modules/flow";
import createPersistentState from 'vuex-persistedstate'

Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [createPersistentState()],
    modules: {
        user,
        test,
        event,
        flow
    }
})
