<template>
  <div class="appheader">
      <el-row>
          <el-col :span="14">
              <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :offset="7" :span="3">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link userInfo">
                  <img :src="userInfo.photo" class="icon" alt="">
                  <span class="name">{{userInfo.name}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>git地址</el-dropdown-item>
                  <el-dropdown-item devided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  }
}
</script>

<style lang="less" scoped>
.userInfo {
    display: flex;
    // justify-content: flex-end;
    align-items: center;
    .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
</style>
