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
import Dashboard from "@/views/Dashboard/Dashboard";
import City from "@/views/Staff/City";
import Map from "@/views/Map";
import Emergency from "@/views/Commander/Emergency";

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
            redirect:'/home/dashboard',
            component: Home,
            children:[
                {
                    path:'/home/dashboard',
                    name:'Dashboard',
                    component:Dashboard,
                },
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
                    path:'/city',
                    name:'City',
                    component:City,
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
                    path:'/emergency',
                    name:'Emergency',
                    component:Emergency,
                },
                {
                    path:'/expertReport',
                    name:'ExpertReport',
                    component:ExportReport,
                },
                {
                path:'/map',
                    name:'map',
                    component:Map
                }

            ]
        },
        {
            path: '/*',
            name: 'error',
            component: Error,
        }
    ]
})


//????????????
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