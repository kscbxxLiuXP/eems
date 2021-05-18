<template>
    <div class="wrapper">
        <div style="border-radius: 20px;width: 750px">
            <img src="../assets/img/login.png" width="750px" style="margin-top: 50px"/>

        </div>


        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-box"

        >
            <img src="@/assets/profile.png" width="100px"/>
            <div style="width: 300px;color: #A39D9A;font-size: 26px;margin-top: 10px;margin-bottom: 10px">欢迎使用</div>
            <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user" style="width: 300px" placeholder="请输入用户名"
                          v-model.number="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input prefix-icon="el-icon-lock" style="width: 300px" placeholder="请输入密码" v-model="loginForm.pass"
                          autocomplete="off"
                          show-password></el-input>
            </el-form-item>
            <a href="" style="text-align: right;width: 300px;color: #A39D9A">忘记密码?</a>
            <el-form-item>

                <el-button type="primary" native-type="submit" style="margin-top: 5px;border-radius: 20px;width: 300px;height: 35px"
                           @click="submitForm('loginForm')">登录
                </el-button>
                <el-popover
                    placement="top"
                    width="260"
                    trigger="hover"
                    transition="el-zoom-in-bottom"
                >
                    <img src="@/assets/qr.png" width="260px"/>
                    <div style="width: 260px;text-align: center">扫一扫</div>
                    <div slot="reference"
                         style="margin-left:205px;width: 100px;display: flex;align-items: center;align-content: center;justify-content: center;">
                        <svg t="1620873875203" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="3953" width="26" height="26">
                            <path
                                d="M1011.2 616.832c0-139.776-134.784-249.6-299.52-249.6s-299.52 109.824-299.52 249.6 134.784 249.6 299.52 249.6c29.952 0 59.904-4.992 89.856-9.984l94.848 49.92-24.96-74.88C956.288 781.568 1011.2 706.688 1011.2 616.832z m-404.352-39.936c-29.952 0-49.92-19.968-49.92-49.92s19.968-49.92 49.92-49.92 49.92 19.968 49.92 49.92c0 24.96-24.96 49.92-49.92 49.92z m204.672 0c-29.952 0-49.92-19.968-49.92-49.92s19.968-49.92 49.92-49.92 49.92 19.968 49.92 49.92c0 24.96-24.96 49.92-49.92 49.92z"
                                fill="#4CBF00" p-id="3954"></path>
                            <path
                                d="M362.24 606.848c0-154.752 149.76-279.552 339.456-279.552h14.976C676.736 197.504 541.952 97.664 372.224 97.664 172.544 97.664 12.8 232.448 12.8 397.184c0 104.832 64.896 199.68 164.736 249.6l-29.952 89.856 114.816-54.912c34.944 9.984 69.888 14.976 109.824 14.976h9.984c-14.976-29.952-19.968-59.904-19.968-89.856z m134.784-404.352c34.944 0 64.896 29.952 64.896 64.896 0 34.944-29.952 64.896-64.896 64.896-34.944-4.992-64.896-34.944-64.896-69.888s29.952-59.904 64.896-59.904z m-244.608 124.8c-34.944 0-59.904-29.952-59.904-64.896 0-34.944 29.952-64.896 64.896-64.896 34.944 0 59.904 29.952 59.904 64.896 0 34.944-29.952 64.896-64.896 64.896z"
                                fill="#4CBF00" p-id="3955"></path>
                        </svg>
                        <div style="margin-left: 5px">微信登录</div>
                    </div>
                </el-popover>

            </el-form-item>
        </el-form>
        <div style="position: absolute;bottom: 10px;width: 100%">
            @东软云环保应急管理系统
        </div>

    </div>


</template>

<script>

export default {
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            imgSrc: require('../assets/back.jpeg'),
            loginForm: {
                pass: '',
                username: ''
            },
            rules: {
                pass: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                username: [
                    {validator: checkUsername, trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const us = this.$store.getters.getUser(this.loginForm.username)
                    if (us===undefined){
                        this.$message.error("账号不存在")
                    }else{
                        if (us.password!== this.loginForm.pass){
                            this.$message.error("密码错误")
                        }else{
                            localStorage.setItem("token", this.loginForm.username)
                            localStorage.setItem('login-type', us.type)
                            this.$router.push("/home")
                            this.$message.success("登录成功")
                        }
                    }


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted() {

    }
};
</script>

<style scoped>
.wrapper {
    background-color: white;
    position: fixed;
    width: 1200px;
    height: 600px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    border-radius: 20px;
    display: flex;

}

.login-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;

    padding-right: 30px;
    padding-left: 30px;
}

</style>
