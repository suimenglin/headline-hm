<template>
  <div>
    <!-- 卡片上 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 表单显示搜索 -->
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 文章状态 -->
        <el-form-item label="文章状态">
          {{form.status}}
          <el-radio-group v-model="form.status">
            <el-radio label>全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道列表 -->
        {{form.channelid}}
        <el-form-item label="频道列表">
          <el-select v-model="form.channelid" clearable placeholder="请选择活动区域">
            <el-option
              v-for="(item,index) in channelList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间选择 -->
        <el-form-item label="时间选择">
          {{form.datetime}}
          <el-date-picker
            v-model="form.datetime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 卡片下 -->
    <el-card class="box-card mycard">
      <!-- 搜索内容 -->
      <div slot="header" class="clearfix">
        <span>共找到{{totalList}}条符合条件的内容</span>
      </div>
      <!-- 搜索内容展示区 -->
      <el-table
        :data="dataList"
        :border="true"
        stripe
        style="width: 100%"
        v-loading="articleLoading"
      >
        <el-table-column label="图片" align="center" width="180">
          <template slot-scope="scope">
            <img class="myImg" :src="scope.row.cover.images[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status ===0">草稿</span>
            <span v-if="scope.row.status ===1">待审核</span>
            <span v-if="scope.row.status ===2">审核通过</span>
            <span v-if="scope.row.status ===3">审核失败</span>
            <span v-if="scope.row.status ===4">已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" align="center" width="180"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" round>
              <i class="el-icon-edit" @click="editAriticle(scope.row)">修改</i>
            </el-button>
            <el-button size="mini" round @click="delArticle(scope.row.id)">
              <i class="el-icon-delete">删除</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @current-change="pageChange"
        @prev-click="preClick"
        @next-click="nextClick"
        :disabled="articleLoading"
        background
        layout="prev, pager, next"
        :total="totalList"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      value1: '',
      dataList: [],

      // totalList: '', // 直接给"空值"会报错,此处给undefined或者任意数字可以解决报错
      // totalList: '0', // 这样也会报错
      totalList: undefined, // 此处给undefined或者任意数字可以解决报错，因为total要求传入number类型
      page: 1,
      // per_page: 20,
      articleLoading: false,
      channelList: [],
      form: {
        status: '',
        channelid: '',
        datetime: []
      }
    }
  },
  methods: {
    // 获取文章
    getArticleList () {
      this.articleLoading = true
      this.$http({
        url: '/articles',
        method: 'get',
        params: {
          page: this.page
          // per_page: this.per_page
        }
        // headers: {
        //   Authorization: `Bearer ${userInfo.token}`
        // }
      }).then(res => {
        // console.log('------------')
        // console.log(res)
        // console.log('------------')
        // console.log(res.results)
        this.dataList = res.results
        this.totalList = res.total_count
        this.articleLoading = false
      })
    },
    // 上一页
    preClick () {
      this.page -= 1
      // this.getArticleList()
      this.searchList()
    },
    // 下一页
    nextClick () {
      this.page += 1
      // this.getArticleList()
      this.searchList()
    },
    // 跳转页面
    pageChange (page) {
      this.page = page
      // this.getArticleList()
      this.searchList()
    },
    // 删除文章
    delArticle (id) {
      // console.log(id)
      this.$confirm('此操作将永久删除该文章', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$http({
            url: `/articles/${id}`,
            method: 'delete'
          }).then(res => {
            // console.log(res)
            this.searchList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取频道列表
    getChannels () {
      this.$http({
        url: '/channels',
        method: 'get'
      }).then(res => {
        // console.log('getChannels')
        // console.log(res)
        this.channelList = res.channels
      })
    },
    // 筛选数据
    searchList () {
      this.articleLoading = true
      let paramsObj = {}
      if (this.form.status) {
        paramsObj.status = this.form.status
      }
      if (this.form.channelid) {
        paramsObj.channel_id = this.form.channelid
      }
      if (this.form.datetime != null && this.form.datetime.length > 0) {
        paramsObj.begin_pubdate = this.form.datetime[0]
        paramsObj.end_pubdate = this.form.datetime[1]
      }
      // console.log(paramsObj)
      this.$http({
        url: '/articles',
        method: 'get',
        params: {
          page: this.page,
          // per_page: this.per_page,
          ...paramsObj
        }
      }).then(res => {
        this.dataList = res.results
        this.totalList = res.total_count
        this.articleLoading = false
      })
    },
    // 修改文章
    editAriticle (row) {
      this.$router.push(`/article/edit/${row.id}`)
    }
  },
  created () {
    this.getArticleList()
    this.getChannels()
  }
}
</script>

<style>
.myImg {
  width: 150px;
  height: 100px;
}
.mycard {
  margin-top: 20px;
}
</style>
