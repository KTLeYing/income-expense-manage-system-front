<template>
  <div class="main">
    <div class="login">
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
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                        show-password ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verifyCode">
                <el-input class="verifyCode" v-model="formData.verifyCode" placeholder="请输入验证码" clearable
                          prefix-icon='el-icon-c-scale-to-original'></el-input>
                <img class="imgCode" type="primary" size="medium" onclick="this.src='/incomeExpense/code/createCaptcha?d='+new Date()*1" src="/incomeExpense/code/createCaptcha" /></img>
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
                |
                <router-link :to="{ name: 'UserRegister'}">
                  <a class="registerUser" href="" target="_blank" align="right">注册新账号</a>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="adminLogin">
      <router-link :to="{path: '/adminLogin'}">
        <a class="adminHerf" href="register.vue" target="_blank" >管理员入口</a>
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
          <el-form-item label="用户名" prop="username1">
            <el-input v-model="formData.username1" placeholder="请输入用户名" show-word-limit clearable
                      prefix-icon='el-icon-user-solid'></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" clearable prefix-icon='el-icon-lock'></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="messageCode">
            <el-input class="messageCode" v-model="formData.messageCode" placeholder="请输入验证码" clearable
                      prefix-icon='el-icon-c-scale-to-original'></el-input>
            <el-button class="codeBt" src="" type="primary" size="medium"> 获取验证码 </el-button>
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
  name: "UserLogin",
  components: {},
  props: [],
  data() {
    return {
      centerDialogVisible: false,
      formData: {
        username: '',
        username1: '',
        password: '',
        verifyCode: '',
        phone: '',
        messageCode: '',
      },
      userToken: '',
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        username1: [{
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
        verifyCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          len: 4,
          message: "长度不为4",
          trigger: 'blur'
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
    //用户登录请求后台处理
    submitForm() {
      //获取并校验elFrom表单字段
      this.$refs['elForm'].validate(valid => {
        if (valid){
          let formData = new FormData();   //封装请求数据, application/form-data请求格式
          formData.append('username', this.formData.username);
          formData.append('password', this.formData.password);
          formData.append('verifyCode', this.formData.verifyCode);
          //表单校验通过，提交表单去登录
          this.$axios.post('/user/userLogin', formData
          ).then((res) => {
            console.log(res);
            if (res.data.code != 203){
              //返回码不为203则登录失败
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
              return false;
            }
            //登录成功后的其他处理
            //设置存储token处理
            this.userToken = res.headers['authorization'];  //从请求头获取token
            localStorage.setItem('Authorization', this.userToken)
            // 将登录名使用vuex传递到Home页面
            //存储当前用户，传递给其他页面使用
            // this.$store.commit('storeUsername',res.data.data);
            //提示登录成功
            this.$message({
              showClose: true,
              message: '登录成功！',
              type: 'success'
            });
            //登录成功处理后跳转到首页
            this.$router.push('/home'); //通过请求路径路由跳转
          }).catch(err => {
            //请求出现异常则登录失败
            console(err);
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            });
          })
        } else { //否则表单校验失败
          this.$message({
            showClose: true,
            message: '提交表单失败！',
            type: 'error'
          });
          return false;
        }
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
  .verifyCode{
    float: left;
    width: 65%;
  }
  .messageCode{
    float: left;
    width: 65%;
  }
  .imgCode{
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    width: 30%;
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
