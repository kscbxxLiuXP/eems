<template>
    <div class="header-container">
        <div class="header-left">
            环保应急管理系统
        </div>
        <div class="header-right">
            <el-dropdown>
                <div class="dropdown">
                    <el-avatar :size="30" :src="circleUrl" style="margin-right: 10px"/>
                    {{$store.getters.getUser.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">

                    <el-dropdown-item icon="el-icon-user" command="b">个人信息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-setting" command="c">设置</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-close" @click.native="logout" command="a" divided>注销账号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data () {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            sizeList: ["large", "medium", "small"]
        }
    },
    methods: {
        logout() {
            this.$message.success("注销成功！")
            window.localStorage.removeItem('token')
            this.$router.push('/login')
        },
    }
}
</script>

<style scoped>
.header-container{
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;

}
.header-left{
    margin-left: 20px;
    text-align: center;
    font-size: 18px;
}
.dropdown{
    height: 60px;
    display: flex;
    align-items: center;
    justify-items: center;
    align-content: center;
    transition: all 300ms;
    padding-left: 5px;
    padding-right: 5px;
}
.dropdown:hover{
    background-color: #f3f1f1;
    cursor: pointer;
}
</style>