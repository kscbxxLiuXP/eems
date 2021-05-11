<template>
    <div :style="{background:'url('+imgSrc+')',backgroundSize:'100% 100%'}" class="back">

        <div class="loginBox">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm"
            >
                <h3 class="login-title">
                    登录
                </h3>
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" placeholder="请输入用户名"
                              v-model.number="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.pass" autocomplete="off"
                              show-password></el-input>
                </el-form-item>
                <el-form-item>

                    <el-button type="primary" style="margin-top: 20px" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bott">
            <div>
                环保应急管理系统 2021
            </div>

        </div>

    </div>

</template>

<script>
export default {
    name: "Login",
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
                    window.localStorage.setItem("token", this.loginForm.username)
                    this.$router.push("/home")
                    this.$store.dispatch("asyncUpdateUser", {name: this.loginForm.username})
                    this.$message.success("登录成功")
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.back {
    width: 100%;
    height: 100%;
    position: fixed;

}

.loginBox {
    width: 350px;
    margin: 250px auto;
    padding: 20px;
    border-radius: 20px;
    background: #eae9ea;
}

.bott {
    position: absolute;
    bottom: 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.6);;
    width: 100%;
}

.login-title {
    text-align: center;
}
</style>