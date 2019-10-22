<template>
  <el-card class="box-card mycard">
    <!-- 发表文章 -->
    <div slot="header" class="clearfix">
      <span>发表文章</span>
    </div>
    <!-- 内容区域 -->
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 一.标题 -->
      <el-form-item label="标题">
        <!-- {{ruleForm.title}} -->
        <el-input placeholder="文章名称" v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 二.内容 -->
      <el-form-item label="内容">
        <!-- {{ruleForm.content}} -->
        <quill-editor v-model="ruleForm.content"></quill-editor>
      </el-form-item>
      <!-- 三.封面 -->
      <el-form-item label="封面">
        {{ruleForm.cover.type}}
        <!-- 3.1 图片张数 -->
        <el-radio-group v-model="ruleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 3.2 添加一个图片选择器 -->
        <div class="imgSelectBox" v-if="ruleForm.cover.type > 0">
          <div
            class="imgItem"
            @click="selectImg(index)"
            v-for="(item,index) in ruleForm.cover.type"
            :key="index">
            <span>点击改变图片</span>
            <img class="myAdd" :src="ruleForm.cover.images[index] ? ruleForm.cover.images[index] :'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3281196885,1779237671&fm=26&gp=0.jpg'" />
          </div>
        </div>
      </el-form-item>
      <!-- 四.频道 -->
      <el-form-item label="频道">
        <!-- {{ruleForm.channel_id}} -->
        <channelList @optionValue="receiveVal" :mychannel="ruleForm.channel_id"></channelList>
      </el-form-item>
      <!-- 五.提交文章 -->
      <el-form-item>
        <el-button @click="publish('false')" type="primary">发表</el-button>
        <el-button @click="publish('true')">存入草稿</el-button>
      </el-form-item>
    </el-form>
    <!-- 3.3 选择图片的弹框 -->
    <el-dialog title="选择封面图片" :visible.sync="dialogVisible">
      <!-- 3.3选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 3.3.1素材库 -->
        <el-tab-pane label="素材库" name="first">
          <el-radio-group v-model="collectItem" @change="changeCollect">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in collectList" :key="index">
              <img :class="{active:activeIndex === index }" class="myImg" @click="chooseImg(index,item.url)" :src="item.url" alt="">
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 3.3.2上传图片 -->
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="{Authorization:`Bearer ${$store.state.userInfo.token}`}"
            :show-file-list="false"
            :on-success="uploadsuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <!-- 确认/取消 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import channelList from '@/views/components/channel'
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        content: '',
        channel_id: 3,
        cover: {
          type: 1,
          images: []
        }
      },
      editID: 0,
      // 控制弹框
      dialogVisible: false,
      // 图片容器下标
      selectImgIndex: 0,
      // tab栏选项
      activeName: 'first',
      // tab栏下的素材库中的选项：全部/收藏
      collectItem: '全部',
      // 素材资源的数据源
      collectList: [],
      // 选中图片的下标
      activeIndex: -1,
      // 选中图片的地址
      selectImgUrl: '',
      imageUrl: ''
    }
  },
  methods: {
    // 提交数据
    publish (draft) {
      if (this.$route.path.indexOf('edit') !== -1) {
        this.editArticle(draft)
      } else {
        this.pubArticle(draft)
      }
    },
    // 发表文章
    pubArticle (draft) {
      this.$http({
        url: `/articles?draft=${draft}`,
        method: 'post',
        data: {
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          // cover: {
          //   type: 1,
          //   images: ['http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y']
          // },
          cover: this.ruleForm.cover,
          channel_id: this.ruleForm.channel_id
        }
      }).then(res => {
        // console.log(res)
        if (res) {
          this.$message({
            message: draft === 'true' ? '成功存入草稿' : '发表成功',
            type: 'success'
          })
        }
        this.$router.push('/article/list')
      })
    },
    // 修改文章
    editArticle (draft) {
      this.$http({
        url: `/articles/${this.editID}?draft=${draft}`,
        method: 'put',
        data: this.ruleForm
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push('/article/list')
      })
    },
    // 从子组件中得到参数
    receiveVal (value) {
      this.ruleForm.channel_id = value
    },
    // 获取id值
    getEditId () {
      this.editID = this.$route.params.id
    },
    // 将通过id获取指定修改文章，并渲染到页面中
    getEditObj () {
      this.$http({
        url: `/articles/${this.editID}`,
        method: 'get'
      }).then(res => {
        // console.log('--------------')
        // console.log(res)
        // console.log('--------------')
        this.ruleForm = res
      })
    },
    // 显示弹框和设置图片容器下标
    selectImg (index) {
      // 打开弹框
      this.dialogVisible = true
      // 图片容器下标
      this.selectedImgIndex = index
    },
    // 获取素材中的图片
    getCollectList (collect) {
      this.$http({
        url: '/user/images',
        method: 'get',
        params: {
          collect: collect
        }
      }).then(res => {
        // console.log('-------')
        // console.log(res)
        this.collectList = res.results
      })
    },
    // 根据 全部/收藏  来加载数据
    changeCollect () {
      if (this.collectItem === '全部') {
        this.getCollectList(false)
      } else {
        this.getCollectList(true)
      }
    },
    // 选择图片的地址及选中图片的样式
    chooseImg (index, url) {
      // 用来设置样式
      this.activeIndex = index
      // 用来保存选中图片的地址
      this.selectImgUrl = url
    },
    // 确认选择
    confirmImg () {
      this.dialogVisible = false
      this.ruleForm.cover.images[this.selectedImgIndex] = this.selectImgUrl
    },
    // 上传成功后的回调函数
    uploadsuccess (response, file, fileList) {
      console.log(response)
      this.imageUrl = response.data.url
      this.selectImgUrl = response.data.url
    }
  },
  // 频道组件
  components: {
    channelList // 频道组件
  },
  // 数据和方法加载完毕后执行
  created () {
    if (this.$route.path.indexOf('edit') !== -1) {
      this.getEditId()
      this.getEditObj()
    }
    // 调用得到素材
    this.getCollectList()
  },
  // 侦听器：当路由变化来清除由  编辑页面  跳转 发表页面 后的数据
  watch: {
    $route: function () {
      console.log('路由变化了')
      if (this.$route.path.indexOf('publish') !== -1) {
        // 清除数据
        this.ruleForm = {
          title: '',
          content: '',
          channel_id: '',
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ql-container {
  height: 300px;
}
.imgSelectBox {
  display: flex;
  .imgItem {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    text-align: center;
    .myAdd {
      width: 150px;
      height: 150px;
    }
  }
}
.myImg {
  width: 210px;
  height: 210px;
  margin: 20px;
}
.active {
  border: 10px solid red;
  box-sizing: border-box;
}
</style>
