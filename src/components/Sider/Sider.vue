<template>
    <div class="container">
        <SiderComponent title="首页" :route="cRouter" :items="item0"/>
        <SiderComponent title="超级管理员" :route="cRouter" v-show="loginType==='超级管理员'" :items="item1"/>
        <SiderComponent title="工作人员" :route="cRouter" v-show="loginType==='工作人员'" :items="item2"/>
        <SiderComponent title="指挥人员" :route="cRouter" v-show="loginType==='指挥人员'" :items="item3"/>
        <SiderComponent title="专家" :route="cRouter" v-show="loginType==='专家'" :items="item4"/>
        <div class="container-footer">用户工作区</div>
    </div>
</template>

<script>
import SiderComponent from "@/components/Sider/SiderComponent";

export default {
    name: "Sider",
    components: {SiderComponent},
    computed: {
        loginType: function () {
            return localStorage.getItem('login-type')
        },
        cRouter: function () {
            return this.$route.path
        }
    },
    data() {
        return {
            item0: [{
                name: "首页",
                icon: require("./../../assets/icons/yonghu.png"),
                to: '/home/dashboard',
            }, {
                name: "地图",
                icon: require("./../../assets/icons/yonghu.png"),
                to: '/map',
            }
            ],
            item1: [{
                name: "用户管理",
                icon: require("./../../assets/icons/yonghu.png"),
                to: '/userManage',
            }],
            item2: [
                {
                    name: "流程管理",
                    icon: require("./../../assets/icons/liucheng.png"),
                    to: '/flow',
                },
                {
                    name: "物资管理",
                    icon: require("./../../assets/icons/wuzi.png"),
                    to: '/goods',
                },
                {
                    name: "城市信息管理",
                    icon: require("./../../assets/icons/chengshi.png"),
                    to: '/city',
                },
                {
                    name: "事件管理",
                    icon: require("./../../assets/icons/shijian.png"),
                    to: '/event',
                },
                {
                    name: "接报管理",
                    icon: require("./../../assets/icons/jiebao.png"),
                    to: '/staffReport',
                },
                {
                    name: "风险企业管理",
                    icon: require("./../../assets/icons/fengxian.png"),
                    to: '/dangerFirm',
                },
            ],
            item3: [
                {
                    name: "接报管理",
                    icon: require("./../../assets/icons/jiebao.png"),
                    to: '/commanderReport',
                },
                {
                    name: "紧急事件处理",
                    icon: require("./../../assets/icons/jinjishijian.png"),
                    to: '/emergency',
                }
            ],
            item4: [
                {
                    name: "接报管理",
                    icon: require("./../../assets/icons/jiebao.png"),
                    to: '/expertReport',
                }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 5px;
    overflow-y: hidden;
    background-color: white;
    padding-left: 20px;
    height: 99%;
    border-radius: 20px;
}

.container-footer {
    position: absolute;
    bottom: 40px;
    text-align: center;
    width: 180px;
    color: #868687;
}
</style>