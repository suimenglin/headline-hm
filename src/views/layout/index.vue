<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <!-- 侧边 -->
        <layoutaside/>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <layoutheader/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutheader from '@/views/layout/components/layoutHeader'
import layoutaside from '@/views/layout/components/layoutAside'
export default {
  components: {
    layoutheader,
    layoutaside
  }
}
</script>

<style lang="less" scoped>
.layout {
    height: 100%;
    &>.el-container{
        height: 100%;
    }
}
.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #323745;
    color: #333;
    width: 200px;
  }

  .el-main {
    background-color: #eee;
    color: #333;
  }

</style>
