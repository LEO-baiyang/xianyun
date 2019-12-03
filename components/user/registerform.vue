<template>
  <el-form :model="regForm" status-icon :rules="rules" ref="regForm" class="form">
    <el-form-item prop="username" class="form-item">
      <!-- auto-complete:自动记录输入的值，一般是off,为了保密 -->
      <el-input v-model="regForm.username" auto-complete="off" placeholder="请输入用户名/手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="请输入验证码" v-model="regForm.capcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="form-item">
      <el-input v-model="regForm.nickname" auto-complete="off" placeholder="请输入昵称"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="regForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" class="form-item">
      <el-input type="password" auto-complete="off" placeholder="请再次确认密码"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm" class="submit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      regForm: {
        username: "",
        password: "",
        checkPassword: "",
        nickname: ""
      },
      rules: {}
    };
  },
  methods: {
    handleSendCaptcha() {},
    submitForm() {}
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>