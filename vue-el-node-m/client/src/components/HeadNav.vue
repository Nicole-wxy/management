<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/img/logo.png" class="logo" />
        <span class="title">资金后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.username}}</p>
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "info":
          this.showInfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfo() {
      this.$router.push('/infoshow')
    },
    logout() {
      //清除token
      localStorage.removeItem("eleToken");
      //同步vuex
      this.$store.dispatch("clearCurrent");
      //跳转到登录页面
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  background: #324057;
  padding: 5px 0;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 60px;
  width: 90px;
  vertical-align: middle;
  margin-left: -20px;
}
.title {
  font-size: 22px;
  font-family: "Microsoft YaHei";
  vertical-align: middle;
  letter-spacing: 3px;
  margin-left: -10px;
}
.user {
  float: right;
  line-height: 60px;
  text-align: right;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>