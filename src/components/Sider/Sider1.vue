<template>
    <el-menu
        style="height: 100%"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>超级管理员</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>工作人员</span>
            </template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>指挥人员</span>
            </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>专家</span>
            </template>
            <el-menu-item index="4-1">用户管理</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Sider1"
}
</script>

<style scoped>

</style>