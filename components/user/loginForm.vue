<template>
  <el-form ref="form" :model="form" class="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" type="password" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(123);
      // 对表单进行验证,element-ui组件使用validate方法进行表单的验证，里面是一个回调函数，回调函数中的形参是一个boolean值，如果不传回调的话，返回的是一个promise
      this.$refs["form"].validate(valid => {
        // 这里的valid是一个布尔值
        if (valid) {
          // 如果是true，根据接口文档发送请求，发送的数据是用户名和密码
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   data: this.form
          // }).then(res => {
          //   console.log(res);
          //   // 如果登录成功，跳转到首页，并将数据存储到本地，防止每次刷新都要重新登录
          //   this.$router.replace("/");
          // });
          this.$store.dispatch("user/login", this.form).then(res => {
            // 成功提示
            this.$message({
              message: "登录成功，正在跳转",
              type: "success",
              duration: 1000
            });
            // 跳转到首页
            setTimeout(() => {
              this.$router.replace("/");
            }, 1000);
          });
        }
      });
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