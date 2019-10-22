<template>
  <div class="appaside">
    <div class="logo">
      <img src="./logo_admin.png" alt="">
    </div>
    <el-menu :router="true" :unique-opened="true" default-active="1" background-color="#353b4e" text-color="#ccc"  active-text-color="#409eff">
       <el-menu-item index="/home">
           <span slot="title">首页</span>
       </el-menu-item>
       <el-submenu index="2">
           <template>
              <span slot="title">内容管理</span>
           </template>
           <el-menu-item index="/article/publish">发布文章</el-menu-item>
           <el-menu-item index="/article/list">内容列表</el-menu-item>
           <el-menu-item index="/comment/list">评论列表</el-menu-item>
           <el-menu-item index="/material/list">素材管理</el-menu-item>
       </el-submenu>
       <el-submenu index="3">
           <template>
              <span slot="title">粉丝管理</span>
           </template>
           <el-menu-item index="3-1">图文数据</el-menu-item>
           <el-menu-item index="3-2">粉丝概况</el-menu-item>
           <el-menu-item index="3-3">粉丝画像</el-menu-item>
           <el-menu-item index="3-4">粉丝列表</el-menu-item>
       </el-submenu>
       <el-menu-item index="/user/center">
           <span slot="title">账户信息</span>
       </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    img {
        width: 120px;
    }
}
.el-menu {
    border: 0;
}
</style>
