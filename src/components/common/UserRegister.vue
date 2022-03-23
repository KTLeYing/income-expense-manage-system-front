<template >
  <div class="main">
    <div class="register">
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span class="sysName">智能收支管理平台</span>
        </div>
        <div class="cardBody">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户名" show-word-limit clearable
                        prefix-icon='el-icon-user-solid'></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" show-word-limit clearable
                        prefix-icon='el-icon-user-solid'></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                        show-password ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select class="sex" v-model="formData.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" show-word-limit clearable
                        prefix-icon='el-icon-user-solid'></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入手机号" show-word-limit clearable
                        prefix-icon='el-icon-user-solid'></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verifyCode">
              <el-input class="verifyCode" v-model="formData.verifyCode" placeholder="请输入验证码" clearable
                        prefix-icon='el-icon-c-scale-to-original'></el-input>
              <el-button class="codeBt" type="primary" size="medium"> 获取验证码 </el-button>
            </el-form-item>
            <el-form-item size="large">
              <el-button class="submitForm" type="primary" @click="submitForm">注册</el-button>
              <el-button class="resetForm" @click="resetForm">重置</el-button>
            </el-form-item>
            <el-form-item size="large">
              <div class="unlogin">
                <router-link :to="{path: '/'}">
                  <a href="register.vue" target="_blank" align="right">已有账号, 去登录</a>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

  </div>

</template>

<script>
  export default {
    name: "UserRegister",
    components: {},
    props: [],
    data() {
      return {
        formData: {
          username: '',
          name: '',
          password: '',
          sex: 1,
          email: '',
          phone: '',
          verifyCode: '',
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            massage: '请选择性别',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },{
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '邮箱格式不正确'
          }],
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },{
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }],
          verifyCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }, {
            len: 4,
            message: "长度不为4",
            trigger: 'blur'
          }
          ],
        },
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      submitForm() {
        this.$refs['elForm'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
        })
      },
      resetForm() {
        this.$refs['elForm'].resetFields()
      },
    }
  }

</script>

<style scoped>
  body {
  }
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    /*垂直居中*/
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/images/bg3.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .register{
    /*垂直居中*/
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
  }
  .sysName {
    font-size: 120%;
    font-weight: bold;
  }
  .cardBody {
    /*垂直居中*/
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10%;
  }
  .verifyCode{
    float: left;
    width: 65%;
  }
  .codeBt{
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
  }
  .submitForm{
    width: 40%;
  }
  .resetForm{
    width: 40%;
  }
  a{
    text-decoration: none;
  }
  .sex{
    float: left;
    width: 100%;
  }
</style>
