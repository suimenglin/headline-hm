<template>
  <el-card>
    <el-table v-loading="loading" :data="commentList" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="评论状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.comment_status === true" type="success">启用</el-tag>
          <el-tag v-if="scope.row.comment_status === false" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" width="180"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            @click="changeStatus(scope.row)"
            type="text"
          >{{scope.row.comment_status?'关闭评论':'开启评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background @current-change="pageChange" @pre-click="preClick" @next-click="nextClick" layout="prev, pager, next" :total="commentListObj.total_count"></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      page: 1,
      commentList: [],
      commentListObj: {}
    }
  },
  methods: {
    // 获取评论列表数据
    getcommentList () {
      this.loading = true
      this.$http({
        url: '/articles',
        method: 'get',
        params: {
          response_type: 'comment',
          page: this.page,
          per_page: 10
        }
      }).then(res => {
        // console.log('--------------')
        // console.log(res)
        // console.log('--------------')
        this.loading = false
        this.commentList = res.results
        this.commentListObj = res
      })
    },
    // 改变评论状态
    changeStatus (row) {
      this.$http({
        url: `comments/status?article_id=${row.id}`,
        method: 'put',
        data: {
          allow_comment: !row.comment_status
        }
      }).then(res => {
        // console.log('---------')
        // console.log(res)
        // console.log('---------')
        this.$message({
          message: res.allow_comment ? '已开启评论' : '已关闭评论',
          type: 'success'
        })
        this.getcommentList()
      })
    },
    // 点击上一页
    preClick () {
      this.page--
      this.getcommentList()
    },
    // 点击下一页
    nextClick () {
      this.page++
      this.getcommentList()
    },
    // 点击页码数字
    pageChange (page) {
      this.page = page
      this.getcommentList()
    }
  },
  created () {
    this.getcommentList()
  }
}
</script>

<style>
</style>
