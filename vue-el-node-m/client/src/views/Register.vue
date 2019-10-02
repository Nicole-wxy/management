<template>
  <div class="manage">
    <div class="form_container">
      <div class="title">资金后台管理系统</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
        </el-form-item>
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
        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="administrator"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
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
    var validateIdentity = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择身份"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        email: "",
        password: "",
        identity: ""
      },
      rules: {
        username: [
          { validator: validateUsername, required: true, trigger: "blur" },
          { min: 2, max: 10, message: "长度在2-10个字符之间", trigger: "blur" }
        ],
        email: [
          { validator: validateEmail, required: true, trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        password: [
          { validator: validatePassword, required: true, trigger: "blur" },
          { min: 6, max: 30, message: "长度在2-30个字符之间", trigger: "blur" }
        ],
        identity: [
          { validator: validateIdentity, required: true, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/register", this.ruleForm).then(res => {
            this.$alert("注册成功", "注册", {
              confirmButtonText: "确定",
              callback: action => {
                console.log(res.data)
                this.$router.push("/login");
              }
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  background-color: #fff;
  margin: 50px;
  padding: 50px;
  border-radius: 5px;
}
.el-form-item__content {
  margin-left: 100px;
}
.el-button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>