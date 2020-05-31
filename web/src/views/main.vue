<template>
  <div class="main-container">
    <Nav/>
    <div class="main">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  components: { Nav },
  created () {
    this.$store.dispatch('user/getUseInfo')
  }
}
</script>
<style lang="scss" scoped>
  .main {
    padding-top: 50px;
  }
  .main-container {
    // padding: 0 10px;
  }
</style>
