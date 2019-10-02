<template>
  <div class="manage">
    <div class="form_container">
      <div class="title">资金后台管理系统</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <p class="register">
            还没有账号？现在
            <router-link to="/register">注册</router-link>
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { validator: validateEmail, required: true, trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        password: [
          { validator: validatePassword, required: true, trigger: "blur" },
          { min: 6, max: 30, message: "长度在2-30个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.ruleForm).then(res => {
            //把token存储到localStorage
            const { token } = res.data.result;
            localStorage.setItem("eleToken", token);
            //解析token
            const decode = jwt_decode(token);
            //把解析的token存储到vuex中
            this.$store.dispatch("setAuthorization", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);
            //跳转到index页面
            this.$router.push("/index");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //判断是否为空
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
.manage {
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.el-form {
  position: relative;
  background-color: #fff;
  margin: 50px;
  padding: 50px 50px 0 50px;
  border-radius: 5px;
}
.el-form-item__content {
  margin-left: 100px;
}
.el-button {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
}
.register {
  text-align: right;
  font-size: 12px;
}
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>