<template>
    <el-container :style="defaultHeight">
        <el-header style="text-align: right; font-size: 12px" class="header">
            <Header/>
        </el-header>
        <el-container>
            <el-aside width="300px" class="el-sider">

                <Sider/>

            </el-aside>
            <el-container>
                <el-main class="el-main-container">
                    <router-view/>
                </el-main>
                <el-footer height="30">
                    <div style="width: 100%;text-align: center;margin-bottom: 10px">
                        环保应急管理系统 2021
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
import Header from "@/components/Header";
import Sider from "@/components/Sider/Sider";

export default {
    name: "Home",
    components: {Sider, Header},
    data() {
        return {
            defaultHeight: {
                height: ""
            }
        };
    },

    methods: {

        getHeight() {
            this.defaultHeight.height = window.innerHeight + "px";
        }

    },
    mounted() {

    },
    created() {
        //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
        window.addEventListener("resize", this.getHeight);
        this.getHeight();
    }
}
</script>

<style lang="scss" scoped>

.header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-sider {
    padding: 20px;
    padding-left: 30px;
    border-radius: 20px;
}

.el-main-container {
    background-color: white;
    margin: 25px;
    border-radius: 20px;
}
</style>