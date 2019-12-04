<template>
  <el-form :model="regForm" status-icon :rules="rules" ref="regForm" class="form">
    <el-form-item prop="username" class="form-item">
      <!-- auto-complete:自动记录输入的值，一般是off,为了保密 -->
      <el-input v-model="regForm.username" auto-complete="off" placeholder="请输入手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-input placeholder="请输入验证码" v-model="regForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha" :isDisable="isDisable">{{buttonText}}</el-button>
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
      <el-input
        type="password"
        auto-complete="off"
        placeholder="请再次确认密码"
        v-model="regForm.checkPassword"
      ></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm" class="submit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
        callback(new Error("手机号码格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        username: "",
        password: "",
        checkPassword: "",
        nickname: "",
        captcha: ""
      },
      rules: {
        username: [
          {
            validator: validateUsername,
            required: true,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      },
      buttonText: "发送验证码",
      isDisable: true,
      count: 60
    };
  },
  methods: {
    handleSendCaptcha() {
      // 发送验证码之前要先验证手机号
      if (this.regForm.username === "") {
        this.$confirm("手机号码不能为空", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      } else if (!/^[1]([3-9])[0-9]{9}$/.test(this.regForm.username)) {
        this.$confirm("手机号码格式不正确", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      } else if (this.isDisable != false) {
        // console.log(123);
        // 发送ajax请求,在store里的user.js中书写,通过store管理状态
        this.$axios({
          url: "/captchas",
          method: "POST",
          data: {
            tel: this.regForm.username
          }
        }).then(res => {
          // console.log(res);
          if (res.status == 200) {
            const { code } = res.data;
            // 请求发送成功之后，将验证码发送
            this.$confirm(`验证码为:${code}`, {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning"
            });
            this.isDisable = false;
            let interval = setInterval(() => {
              this.buttonText = this.count + "秒后重新发送";
              this.count--;
              if (this.count < 0) {
                this.isDisable = true;
                this.buttonText = "重新发送";
                clearInterval(interval);
                this.count = 6;
              }
            }, 1000);
          }
        });
      }
    },
    submitForm() {
      // 提交事件
      this.$refs["regForm"].validate(valid => {
        if (valid) {
          // 提交数据，根据接口文档将数据发送到服务器
          // 再次确认密码不用提交给服务器，
          // 下面这句代码就是出去再次确认的密码以外的所有的数据存储到props数组中，然后提交给服务器
          const { checkPassword, ...props } = this.regForm;
          console.log(props);
          // 发送请求
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            // console.log("注册成功");
            this.$message({
              message: "注册成功",
              type: "success",
              duration: 1000
            });
            this.$emit("jump");
          });
        }
      });
    }
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