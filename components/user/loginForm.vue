<template>
  <el-form ref="form" :model="form" class="form" :rules="rules">
    <el-form-item class="form-item">
      <el-input v-model="form.name" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input v-model="form.name" type="password" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="submit">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {}
    };
  },
  methods: {
    onSubmit() {
      console.log(123);
    }
  }
};
</script>

<style lang="less" scoped>
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