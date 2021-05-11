import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Login from "@/views/Login";
import Error from "@/views/Error";
import UserManager from "@/views/Root/UserManager";
import Flow from "@/views/Staff/Flow";
import Goods from "@/views/Staff/Goods";
import Event from "@/views/Staff/Event";
import DangerFirm from "@/views/Staff/DangerFirm";
import StaffReport from "@/views/Staff/StaffReport";
import CommanderReport from "@/views/Commander/CommanderReport";
import ExportReport from "@/views/Expert/ExportReport";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            name: 'main',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },

        {
            path: '/home',
            name: 'home',
            component: Home,
            children:[
                {
                    path:'/userManage',
                    name:'UserManage',
                    component:UserManager,
                },
                {
                    path:'/flow',
                    name:'FlowStaff',
                    component:Flow,
                },
                {
                    path:'/goods',
                    name:'Goods',
                    component:Goods,
                },
                {
                    path:'/event',
                    name:'Event',
                    component:Event,
                },
                {
                    path:'/dangerFirm',
                    name:'DangerFirm',
                    component:DangerFirm,
                },
                {
                    path:'/staffReport',
                    name:'StaffReport',
                    component:StaffReport,
                },
                {
                    path:'/commanderReport',
                    name:'CommanderReport',
                    component:CommanderReport,
                },
                {
                    path:'/expertReport',
                    name:'ExpertReport',
                    component:ExportReport,
                },

            ]
        },
        {
            path: '/*',
            name: 'error',
            component: Error,
        }
    ]
})


//路由拦截
router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem("token")
    if (to.path === '/login') {
        console.log(to.path)
        console.log(token)
        if (!token)
            return next();
        else{
            return next('/home')
        }
    }
    if (!token) return next('/login')
    next()
})
export default router;