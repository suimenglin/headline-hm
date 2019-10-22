<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号信息</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="user" label-width="80px">
            <el-form-item label="头条账号">
                <el-input disabled v-model="user.id"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input disabled v-model="user.mobile"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-button @click="updateUser">修改</el-button>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :http-request="uploadImg"
        :show-file-list="false">
        <img :src="user.photo" class="avatar">
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {

      }
    }
  },
  methods: {
    getuserInfo () {
      this.$http({
        url: '/user/profile',
        method: 'get'
      }).then(res => {
        // console.log('-----')
        // console.log(res)
        this.user = res
      })
    },
    updateUser () {
      this.$http({
        url: '/user/profile',
        method: 'patch',
        data: {
          name: this.user.name,
          intro: this.user.intro,
          email: this.user.email
        }
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$store.commit('changeUserMsg', res)
      })
    },
    uploadImg (params) {
    //   console.log(params)
      let fd = new FormData()
      fd.append('photo', params.file)
      this.$http({
        url: '/user/photo',
        method: 'patch',
        data: fd
      }).then(res => {
        console.log(res)
        this.user.photo = res.photo
        this.$store.commit('changeUserImg', res.photo)
      })
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
