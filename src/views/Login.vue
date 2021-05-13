<template>
    <div class="wrapper">
        <div style="border-radius: 20px;width: 750px">
            <img src="../assets/img/login.png" width="750px" height="600"/>
        </div>


        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-box"
                 @submit.native.prevent
        >
            <svg t="1620873527003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2964" width="80" height="80">
                <path
                    d="M512.254947 512m-511.529012 0a511.529013 511.529013 0 1 0 1023.058025 0 511.529013 511.529013 0 1 0-1023.058025 0Z"
                    fill="#F2C345" p-id="2965"></path>
                <path
                    d="M749.654023 847.242581c-23.925128-9.325548-52.052282-17.21868-83.257235-23.334347l-0.001024 0c-17.468508-3.423873-35.886157-6.299966-55.115747-8.529988-28.148655 7.566513-62.257347 12.00096-99.024046 12.00096-36.808677 0-70.952181-4.444686-99.119266-12.026557-20.719343 2.396916-40.490569 5.544339-59.149856 9.320428 1.656646 0.568256 3.352201 1.042315 5.034445 1.551186 0.561089 0.168941 1.120131 0.341978 1.675076 0.524229-0.554946-0.181228-1.115011-0.354264-1.675076-0.524229-1.682244-0.508871-3.377798-0.981906-5.034445-1.551186-29.442846 5.959013-56.070008 13.509143-78.892412 22.360631-0.443342-1.289072-55.379909 29.323052-86.951413 60.804454 88.21796 72.283232 201.009167 115.689827 323.956293 115.689827 123.09047 0 236.006591-43.500792 324.270626-115.935559C804.816869 876.297375 750.117843 845.900267 749.654023 847.242581z"
                    fill="#4D846D" p-id="2966"></path>
                <path
                    d="M736.69573 444.126642c-6.497576-2.454253-13.706753-1.276785-20.824804 2.676436 0.629689-42.130833-5.606796-80.258275-18.038811-110.514086H326.362423c-12.923481 31.454781-19.195802 71.390404-17.969187 115.517814-7.139552-3.983938-14.374326-5.17574-20.894428-2.713296-18.48113 6.981874-24.191339 40.186475-12.753515 74.166157 11.435775 33.971491 35.68138 55.853968 54.160462 48.888476 16.631993 53.958757 41.318892 100.462604 69.669253 135.243989 4.979154 6.1085 10.068888 11.863759 15.250772 17.224823v90.653783c-0.231398 0.026621-0.459725 0.056314-0.691123 0.082934 28.167085 7.581871 62.310589 12.026557 99.119267 12.026557 36.766698 0 70.87539-4.434447 99.024045-12.000959-0.304094-0.034812-0.604092-0.07372-0.90921-0.108532v-90.612828c5.216696-5.393828 10.341242-11.184923 15.35316-17.335402 28.290975-34.717904 52.928728-81.111172 69.543315-134.931704 0.493513-1.597261 43.984066 0 54.182988-54.099029C760.888093 484.312093 755.177884 451.106468 736.69573 444.126642z"
                    fill="#EED5A1" p-id="2967"></path>
                <path
                    d="M697.833139 338.040859c0 0-2.243333 47.269714 18.038811 115.275154 0 0 88.596797-257.459037-77.920745-257.459037 0 0-431.236949-149.938791-329.556945 262.67778 0 0 2.853568 11.493113 7.90849 20.869855C384.616379 378.356344 610.90937 411.090982 697.833139 338.040859z"
                    fill="#5C4948" p-id="2968"></path>
                <path d="M321.340266 933.706625l92.467084 0 0 15.813909-92.467084 0 0-15.813909Z" fill="#B9C9C2"
                      p-id="2969"></path>
                <path
                    d="M511.771674 827.367943c0 0 21.18214 35.669093 73.844657 46.10658 0 0 27.112483-36.035644 25.179388-58.10754L511.771674 827.367943z"
                    fill="#B9C9C2" p-id="2970"></path>
                <path
                    d="M511.723551 827.383301c0 0-21.18214 35.669093-73.844657 46.10658 0 0-27.112483-36.035644-25.180412-58.10754L511.723551 827.383301z"
                    fill="#B9C9C2" p-id="2971"></path>
                <path
                    d="M511.772697 853.750396m-9.314284 0a9.314285 9.314285 0 1 0 18.628569 0 9.314285 9.314285 0 1 0-18.628569 0Z"
                    fill="#56A57E" p-id="2972"></path>
                <path
                    d="M511.723551 889.491161m-9.314285 0a9.314285 9.314285 0 1 0 18.62857 0 9.314285 9.314285 0 1 0-18.62857 0Z"
                    fill="#56A57E" p-id="2973"></path>
                <path
                    d="M511.723551 925.863663m-9.314285 0a9.314285 9.314285 0 1 0 18.62857 0 9.314285 9.314285 0 1 0-18.62857 0Z"
                    fill="#56A57E" p-id="2974"></path>
            </svg>
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

                <el-button type="primary" style="margin-top: 5px;border-radius: 20px;width: 300px;height: 35px"
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
        const us = this.$store.getters.getUser('s')
        console.log(us===undefined)
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
