<template>
  <div class="page">
    <ListView :noMore="noMore" @load="loadList" :list="list"/>
  </div>
</template>

<script>
import ListView from '@/components/ListView'

export default {
  components: { ListView },
  data () {
    return {
      list: [1, 3, 4],
      noMore: false
    }
  },
  methods: {
    loadList () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
