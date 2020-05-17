<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <Item v-for="(item, index) in list" :key="item">{{index}}</Item>
    </ul>
    <div class="infinite-list-bottom">
      <Button class="btn-load" @click="loadMore" v-if="!loading && !noMore">加载更多</Button>
      <div v-if="!noMore" class="loading" element-loading-spinner="el-icon-loading" v-loading="loading"></div>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'
import Item from './Item'
export default {
  components: { Item, Button },
  data () {
    return {
      loading: false
    }
  },
  props: {
    list: {
      type: Array
    },
    noMore: { type: Boolean, default: false }
  },
  methods: {
    // 点击加载更多
    loadMore () {
      this.loading = true
      this.$emit('load', this.closeLoading)
    },
    closeLoading () {
      this.loading = false
    },
    load () {
      this.$emit('bottom-load')
    }
  }
}
</script>

<style lang="scss" scoped>
  .infinite-list-wrapper {
    max-width: 800px;
  }
  .infinite-list-bottom {
    margin-top: 10px;
  }
  .loading {
    height: 30px;
  }

  .btn-load {
    width: 500px;
    border-radius: 20px;
  }
</style>
