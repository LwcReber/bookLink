<template>
  <main class="page">
    <!-- banner -->
    <Carousel height="250px" trigger="click">
      <CarouselItem v-for="item in 4" :key="item">fsadfpdsaf</CarouselItem>
    </Carousel>
    <Backtop :visibility-height="100" :bottom="100">
      <i class="el-icon-arrow-up"></i>
    </Backtop>

    <!-- 文章列表展示 -->
    <ListView :noMore="noMore" @load="loadList" :list="list"/>
  </main>
</template>

<script>
import { Carousel, CarouselItem, Backtop } from 'element-ui'
import ListView from '@/components/ListView'
export default {
  components: { Carousel, CarouselItem, ListView, Backtop },
  data () {
    return {
      list: [1, 3, 4, 5, 55, 6, 7, 8, 18, 99],
      noMore: false
    }
  },
  methods: {
    loadList (closeLoading, setnoMore) {
      setTimeout(() => {
        this.list.push('aa' + Math.random() * 1000)
        closeLoading()
        setnoMore()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
