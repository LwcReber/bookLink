<template>
  <nav class="nav">
    <div flex="cross:center main:justify" class="content">
      <div>
        <span class="home" @click="toPath('/')">首页</span>
        <el-input @blur="focus = 'blur'" @focus="focus = 'focus'" prefix-icon="el-icon-search" @keydown.enter.native="searchContent" :class="{'search-ipt': true, 'expand': focus === 'focus', 'clspand': focus === 'blur'}" size="small" placeholder="搜索" clearable v-model="search">
          <!-- <i slot="append" class="icon el-icon-search"></i> -->
        </el-input>
      </div>
      <div class="right">
        <span @click="toPath('login')" class="login">登录</span>
        <span @click="toPath('write')" class="write">写文章</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { Input } from 'element-ui'
export default {
  components: { 'el-input': Input },
  data () {
    return {
      search: '',
      focus: 'blur' // 搜索input focus状态， focus， blur
    }
  },
  methods: {
    toPath (path) {
      this.search = ''
      this.$router.push(path)
    },
    searchContent () {
      this.$router.push({ path: '/search', query: { q: this.search.trim() } })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 10px;
  z-index: 99999999;
  background: #fff;
  border-bottom: 1px solid #eee;
  .content {
    height: 50px;
    max-width: 1200px;
    margin: auto
  }
  .home {
    cursor: pointer;
  }
}
.right {
  .login {
    cursor: pointer;
  }
  .write {
    margin-left: 10px;
    cursor: pointer;
  }
}
.search-ipt {
  width: 200px;
  border-radius: 32px;
  margin-left: 50px;
  /deep/ {
    .el-input-group__append {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
.expand {
  animation: move 0.5s forwards;
}
.clspand {
  animation: resetMove 0.5s forwards;
}
@keyframes move {
  from { width: 200px }
  to { width: 300px }
}
@keyframes resetMove {
  from { width: 300px }
  to { width: 200px }
}
</style>
