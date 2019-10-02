<template>
  <el-col>
    <el-row>
      <div class="info-header">
        <span class="title">个人信息</span>
      </div>
    </el-row>
    <el-row>
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="105" :src="user.avatar"></el-avatar>
          <div class="avatar-container">
            <p>
              用户名:
              <span>{{user.username}}</span>
            </p>
            <p>
              邮箱:
              <span>{{user.email}}</span>
            </p>
            <p>
              身份:
              <span>{{user.identity=='administrator'?'管理员':'员工'}}</span>
            </p>
          </div>
        </div>
      </div>
    </el-row>
  </el-col>
</template>
<script>
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
<style scoped>
.info-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.title {
  border-left: 5px solid #409eff;
  padding-left: 10px;
  font-size: 20px;
}
.demo-basic--circle {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.block {
  display: flex;
  align-items: center;
}
.avatar-container {
  margin: 15px 0 0 30px;
}
.avatar-container p {
  margin-bottom: 10px;
  font-size: 16px;
}
.avatar-container p span {
  padding-left: 10px;
}
</style>