<template>
  <div>
    <Nav/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  components: { Nav }
}
</script>
<style lang="scss" scoped>
  .main {
    padding-top: 50px;

  }
</style>
