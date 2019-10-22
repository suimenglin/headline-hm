<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <!-- 按钮 -->
    <div class="btns">
      <div>
        <el-radio-group v-model="option" size="mini" @change="changeOption">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="favorite">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 上传图片 -->
      <div class="right">
        <el-button type="primary" @click="uploadMat">上传图片</el-button>
      </div>
    </div>
    <!-- 内容 -->
    <!-- 行 -->
    <el-row :gutter="20">
      <!-- 列 -->
      <el-col :span="6" v-for="(item, index) in materialList" :key="index">
        <el-card class="mycard">
          <!-- 图片 -->
          <img :src="item.url" alt class="myImg" />
          <!-- 图标 -->
          <div class="myicon">
            <!-- 全部 -->
            <i
              @click="collect(true,item.id)"
              class="el-icon-star-off"
              v-if="item.is_collected == false"
            ></i>
            <!-- 收藏 -->
            <i
              @click="collect(false,item.id)"
              class="el-icon-star-on"
              v-if="item.is_collected == true"
            ></i>
            <!-- 删除 -->
            <i class="el-icon-delete" @click="delMat(item.id)"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <el-pagination
      background
      :page-size="materialListObj.per_page"
      layout="prev, pager, next, jumper"
      :total="materialListObj.total_count"
    ></el-pagination>

    <!-- 弹出的面板:Dialog 组件 -->
    <el-dialog title="上传图片" :visible.sync="dialogVisible">
      <!-- 图片上传区 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :show-file-list="false"
        :on-success="uploadsuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" alt />
          <i class="el-icon-plus"></i> -->
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadPic">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      // 选项值：全部all/收藏favourite
      option: 'all',
      // 素材列表
      materialList: [],
      // 素材对象
      materialListObj: {},
      dialogVisible: false,
      imageUrl: '',
      // 上传的请求头
      headers: {
        // 这里需要设置token，虽然前面在axios的请求拦截器中设置了token，但是这里使用的是upload组件的上传功能
        Authorization: `Bearer ${userInfo.token}`
      }
    }
  },
  methods: {
    //  获取素材
    getmaterialList (collect) {
      this.$http({
        url: '/user/images',
        method: 'get',
        params: {
          collect: collect
        }
      }).then(res => {
        // console.log('------------')
        // console.log(res)
        // console.log('------------')
        this.materialList = res.results
        this.materialListObj = res
      })
    },
    // 切换显示全部/收藏
    changeOption (val) {
      // console.log(val)
      if (val === 'all') {
        this.getmaterialList(false)
      } else {
        this.getmaterialList(true)
      }
    },
    // 切换收藏
    collect (bool, id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'put',
        data: {
          collect: bool
        }
      }).then(res => {
        // console.log('2222222222')
        // console.log(res)
        // console.log('2222222222')

        // 提示信息
        this.$message({
          message: res.collect ? '收藏成功' : '取消收藏',
          type: 'success'
        })
        // 刷新本页面
        if (this.option === 'all') {
          this.getmaterialList(false)
        } else {
          this.getmaterialList(true)
        }
      })
    },
    // 删除素材
    delMat (id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'delete'
      }).then(res => {
        // 提示信息
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 刷新本页面
        if (this.option === 'all') {
          this.getmaterialList(false)
        } else {
          this.getmaterialList(true)
        }
      })
    },
    // 点击触发上传面板
    uploadMat () {
      this.dialogVisible = true
    },
    // 上传图像
    uploadPic () {
      this.dialogVisible = false
      this.getmaterialList(false)
    },
    //
    uploadsuccess (response, file, fileList) {
      // console.log('-----')
      // console.log(response)
      this.imageUrl = response.data.url
    }
  },
  created () {
    this.getmaterialList()
  }
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mycard {
  text-align: center;
  .myImg {
    width: 80%;
    height: 200px;
    margin-bottom: 25px;
  }
  .myicon {
    display: flex;
    justify-content: space-around;
  }
  i.el-icon-star-on {
    color: red;
    // width: 18px;
    // height: 17px;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
// 上传模块样式
.avatar-uploader {
  text-align: center;
  height: 178px;
}
.el-upload.el-upload--picture-card {
    width: 178px;
    height: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  // width: 178px;
  // height: 178px;
  cursor: pointer;
  position: relative;
  // overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
