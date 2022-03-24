<template>
  <div class="main">
    <div class="login">
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span class="sysName">智能收支管理后台</span>
        </div>
        <div class="cardBody">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="用户名" prop="adminName">
              <el-input v-model="formData.adminName" placeholder="请输入用户名" show-word-limit clearable
                        prefix-icon='el-icon-user-solid'></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                        show-password ></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button class="submitForm" type="primary" @click="submitForm">登录</el-button>
              <el-button class="resetForm" @click="resetForm">重置</el-button>
            </el-form-item>
            <el-form-item size="large">
              <div class="unlogin">
<!--                <router-link  :to="{ path: '/forgetPassword'}">-->
<!--                  忘记密码?-->
<!--                </router-link>-->
<!--                <a class="forgetPassword" @click="centerDialogVisible = true">忘记密码?</a>-->
                <el-button class="forgetPassword" type="text" @click="centerDialogVisible = true">忘记密码?</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="adminLogin">
      <router-link :to="{path: '/'}">
        <a class="adminHerf" href="register.vue" target="_blank" >普通用户入口</a>
      </router-link>
    </div>

    <!--找回密码提示框-->
    <el-dialog class="dialog"
      title="找回密码"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="content">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-form-item label="用户名" prop="adminName1">
            <el-input v-model="formData.adminName1" placeholder="请输入用户名" show-word-limit clearable
                      prefix-icon='el-icon-user-solid'></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" clearable prefix-icon='el-icon-lock'></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="messageCode">
            <el-input class="messageCode" v-model="formData.messageCode" placeholder="请输入验证码" clearable
                      prefix-icon='el-icon-c-scale-to-original'></el-input>
            <el-button class="codeBt" type="primary" size="medium"> 获取验证码 </el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
export default {
  name: "AdminLogin",
  components: {},
  props: [],
  data() {
    return {
      centerDialogVisible: false,
      formData: {
        adminName: '',
        adminName1: '',
        password: '',
        phone: '',
        messageCode: '',
      },
      rules: {
        adminName: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        adminName1: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },{
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式不正确'
        }],
        messageCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          len: 4,
          message: "长度不为4",
          trigger: 'blur'
        }],
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
  .login{
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
  .messageCode{
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
  .adminLogin{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
  }
  a{
    text-decoration: none;
  }
  .adminHerf{
    color: #99CCCC;
    font-weight: bold;
    text-decoration: none;
  }
  .adminHerf:hover{
    color: #00CC00; /*鼠标悬浮设置*/
  }
  .forgetPassword{
  }
  .forgetPassword, .registerUser{
    color: #303F9F;
  }
  .forgetPassword:hover, .registerUser:hover{
    color: #4DD0E1; /*鼠标悬浮设置*/
  }
  .content{
    margin-right: 10%;
  }
</style>
