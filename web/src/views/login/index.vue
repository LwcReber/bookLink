<template>
  <div class="container" flex="main:center cross:center">
    <div class="form">
      <div class="logo">
        <div :class="{'mask': true, 'show-mask': showPsdMask === 'show', 'close-mask': showPsdMask === 'close'}"></div>
        <span>BOOKLINK</span>
      </div>
      <!-- tab切换 -->
      <div class="nav" flex="main:center">
        <el-tabs v-model="type" @tab-click="changeTab">
          <el-tab-pane label="登录" name="login"></el-tab-pane>
          <el-tab-pane label="注册" name="sign"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 登录 -->
      <div flex="main:center" v-show="type==='login'" class="login-form form-filed">
        <Form :model="loginForm" :rules="loginRules" ref='loginForm'>
          <form-item prop="name">
            <el-input clearable placeholder="请输入用户名" v-model="loginForm.name"></el-input>
          </form-item>
          <form-item prop="password">
            <el-input clearable @blur="actionMask('close')" @focus="actionMask('show')" @ type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
          </form-item>
          <form-item prop="validateNum">
            <el-input clearable class="validate-num" placeholder="验证码" v-model="loginForm.validateNum"></el-input>
            <div @click="createNum" class="validate-source"></div>
          </form-item>
          <form-item>
            <Button class="submit-btn" @click="loginSubmit" type="primary">登录</Button>
          </form-item>
        </Form>
      </div>
      <!-- 注册 -->
      <div flex="main:center" v-show="type==='sign'" class="sign-form form-filed">
        <Form :model="signForm" :rules="signRules" ref='signForm'>
          <form-item prop="name">
            <el-input clearable placeholder="请输入用户名" v-model="signForm.name"></el-input>
          </form-item>
          <form-item prop="password">
            <el-input clearable placeholder="请输入密码" v-model="signForm.password"></el-input>
          </form-item>
          <form-item>
            <Button class="submit-btn" @click="signSubmit" type="primary">注册</Button>
          </form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane, Form, FormItem, Input, Button } from 'element-ui'
export default {
  components: { 'el-tabs': Tabs, 'el-tab-pane': TabPane, Form, FormItem, 'el-input': Input, Button },
  data () {
    return {
      type: 'login',
      showPsdMask: '', // 输入密码顶部遮挡动画
      loginForm: {
        name: '',
        password: '',
        validateNum: '' // 验证码
      },
      loginRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '最少3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '最少5个字符', trigger: 'blur' }
        ],
        validateNum: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 4, message: '必须4个字符', trigger: 'blur' }
        ]
      },
      signForm: {
        name: '',
        password: ''
      },
      signRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '最少3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '最少5个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeTab () {

    },
    loginSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$message({
            message: '登录成功',
            type: 'success',
            offset: 100,
            duration: 1500
          })
          this.$router.replace('/')
        }
      })
    },
    signSubmit () {
      this.$refs.signForm.validate((valid) => {
        if (valid) {
          this.$message({
            message: '注册成功，正在重新跳转',
            type: 'success',
            duration: 1500
          })
          setTimeout(() => {
            this.$router.replace('/')
          }, 1500)
        }
      })
    },
    actionMask (type) {
      this.showPsdMask = type
    },
    // 校验码生成
    createNum () {

    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #efefef;
}
.logo {
  position: absolute;
  top: -130px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background: #fff;
  border-radius: 50%;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  font-weight: 700;
  border: 3px solid #000;
  overflow: hidden;
  $height: 70px;
  .mask {
    top: -$height;
    position: absolute;
    height: $height;
    width: 100%;
    background: #000;
  }
  .show-mask {
    animation: move 0.5s forwards;
  }
  .close-mask {
    animation: resetMove 0.3s forwards;
  }
  @keyframes move {
    from {top: -$height;}
    to {top: 0px;}
  }

  @keyframes resetMove {
    from {top: 0px;}
    to {top: -$height;}
  }
}
.form {
  position: relative;
  border-radius: 4px;
  width: 400px;
  height: 400px;
  box-shadow: 0 0 8px #aaa;
  background: #fff;

}
.submit-btn {
  margin-top: 20px;
}
.form-filed {
  margin-top: 30px;
  .el-input,
  .el-button {
    width: 250px;
  }
  .validate-num {
    width: 100px;
    float: left;
  }
  .validate-source {
    // display: inline-block;
    float: left;
    width: 120px;
    height: 40px;
    margin-left: 20px;
    border: 1px solid #eee;
    cursor: pointer;
  }
}
.nav {
  padding-top: 12px;
  /deep/ {
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__item {
      font-size: 18px;
    }
  }
}
</style>
