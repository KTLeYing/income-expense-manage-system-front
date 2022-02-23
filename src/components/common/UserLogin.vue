<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="sys-name">智能收支管理平台</span>
    </div>
    <div class="card-body">
      <el-row :gutter="7">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="24">
            <el-form-item label="用户名" prop="mobile">
              <el-input v-model="formData.mobile" placeholder="请输入用户名" show-word-limit clearable
                        prefix-icon='el-icon-user-solid' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="field115">
              <el-input v-model="formData.field115" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
                        show-password :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="验证码" prop="field103">
              <el-input v-model="formData.field103" placeholder="请输入验证码" clearable
                        prefix-icon='el-icon-c-scale-to-original' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0" prop="field118">
              <el-button type="primary" size="medium"> 获取验证码 </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserLogin",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mobile: undefined,
        field115: "",
        field103: "",
        field118: "",
        field112: "",
      },
      rules: {
        mobile: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field115: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        field103: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        field112: [{
          required: true,
          message: '请输入编辑器',
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
  background-color: #2b374b;
}
.sys-name {
  font-size: 120%;
  /*font-weight: bold;*/
}

.box-card {
  width: 480px;
  margin: 0 auto;
  margin-top: 160px;
}

.card-body {
  padding: 0 30px;
  margin-left: -50px;
}
</style>
