<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div  v-if="list.length">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <Item :data="item" v-for="item in list" :key="item.id"></Item>
      </ul>
      <div class="infinite-list-bottom">
        <Button class="btn-load" @click="loadMore" v-if="!loading && !noMore">加载更多</Button>
        <div v-if="!noMore" class="loading" element-loading-spinner="el-icon-loading" v-loading="loading"></div>
        <p class="no-more" v-if="showNoMore && noMore">没有更多了</p>
      </div>
    </div>
    <p v-else class="no-data">
      暂无数据
    </p>
  </div>
</template>

<script>
import { Button } from 'element-ui'
import Item from '../Item'
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
    showNoMore: { type: Boolean, default: true },
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
    max-width: 600px;
  }
  .no-more,
  .no-data {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .infinite-list-bottom {
    margin-top: 10px;
  }
  .loading {
    height: 30px;
  }

  .btn-load {
    width: 100%;
    max-width: 600px;
    border-radius: 20px;
  }
  @media screen and (min-width: 1600px) {
    .infinite-list-wrapper {
      max-width: 800px;
    }
  }
</style>
