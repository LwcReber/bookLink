<template>
  <nav class="nav">
    <div flex="cross:center main:justify" class="content">
      <div>
        <a href="/" class="home" >首页</a>
        <el-input @blur="focus = 'blur'" @focus="focus = 'focus'" prefix-icon="el-icon-search" @keydown.enter.native="searchContent" :class="{'search-ipt': true, 'expand': focus === 'focus', 'clspand': focus === 'blur'}" size="small" placeholder="搜索" clearable v-model="search">
          <!-- <i slot="append" class="icon el-icon-search"></i> -->
        </el-input>
      </div>
      <div flex="cross:center" class="right">
        <Dropdown placement="bottom" v-if="isLogin">
          <a href="/userDetail">
            <view-avatar :text="userName" class="user-avatar" quickWidth="40px" borderRadius="50%" :src="avatar"></view-avatar>
          </a>
          <DropdownMenu slot="dropdown">
            <DropdownItem @click.native="toUserHome">主页</DropdownItem>
            <DropdownItem @click.native="$store.dispatch('user/logout')">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <router-link to="/login" v-else class="login">登录</router-link>
        <router-link to="/write" v-if="isLogin" class="write">写文章</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { Input, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import { mapState } from 'vuex'
export default {
  components: { 'el-input': Input, Dropdown, DropdownItem, DropdownMenu },
  data () {
    return {
      search: '',
      focus: '' // 搜索input focus状态， focus， blur
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      avatar: state => state.user.avatar,
      userName: state => state.user.userName
    })
  },
  methods: {
    toHome (path) {
      this.search = ''
    },
    toUserHome () {
      this.$router.push('userDetail')
    },
    searchContent () {
      this.$router.push({ path: '/search', query: { query: this.search.trim() } })
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
  z-index: 1000;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 0 8px 0 #aaa;
  .content {
    height: 50px;
    max-width: $screenMaxWidth;
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
    margin-left: 20px;
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
.user-avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
@media screen and (min-width: 1600px) {
  .nav .content {
    max-width: 1400px;
  }
}
</style>
