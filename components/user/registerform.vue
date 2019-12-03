<template>
  <el-form
    :model="regForm"
    status-icon
    :rules="rules2"
    ref="regForm"
    label-width="100px"
    class="form"
  >
    <el-form-item prop="username" class="form-item">
      <!-- auto-complete:自动记录输入的值，一般是off,为了保密 -->
      <el-input v-model="regForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="form-item">
      <el-input v-model="regForm.nickname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="regForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" class="form-item">
      <el-input type="password" v-model="regForm.checkPassword" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
    </el-form-item>
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
  }
};
</script>

<style>
</style>