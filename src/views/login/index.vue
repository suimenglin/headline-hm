<template>
  <div class="login">
      <div class="login-warp">
        <div class="loginLogo">
          <img src="@/assets/logo_index.png" alt="">
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :gutter="20">
              <el-col :span="15">
                <el-input v-model="form.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button plain @click="getCode" :disabled="!!timer" class="codeBtn">
                  {{timer?`${timeSecond}s后获取`:'发送验证码'}}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="read">
            <el-checkbox v-model="form.read">
              我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click="login" :loading="loginLoading">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginLoading: false,
      timeSecond: 10,
      timer: null,
      form: {
        mobile: '13911111111',
        code: '246810',
        read: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度必须为11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度必须为6位', trigger: 'blur' }
        ],
        read: [
          { required: true, message: '请先阅读用户协议', trigger: 'change' },
          { pattern: /true/, message: '请先阅读用户协议', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitData()
        }
      })
    },
    submitData () {
      this.loginLoading = true
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        method: 'post',
        data: this.form
      }).then(res => {
        this.loginLoading = false
        this.$router.push('/home')
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('手机号码或者验证码错误')
        this.loginLoading = false
      })
    },
    getCode () {
      this.$refs['form'].validateField('mobile', errMsg => {
        if (errMsg.trim().length > 0) {
          return
        }
        this.timer = setInterval(() => {
          this.timeSecond--
          if (this.timeSecond <= 0) {
            clearInterval(this.timer)
            this.timeSecond = 10
            this.timer = null
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    .login-warp {
      // min-width: 300px;
      width: 300px;
      padding: 30px;
      background-color: #fff;
      .loginLogo {
        text-align: center;
        img {
          width: 150px;
          margin-bottom: 30px;
        }
      }
      .codeBtn {
        width: 100%;
      }
      .loginBtn {
        width: 100%;
      }
    }
  }
</style>
