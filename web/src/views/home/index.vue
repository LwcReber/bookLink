<template>
  <main class="page home">
    <!-- banner -->
    <Carousel height="100%" class="banner" trigger="click">
      <CarouselItem :title="item.title" class="banner-item" @click.native="bannerDetail(item)" v-for="item in banners" :key="item.id">
        <h4 class="title">{{item.title}}</h4>
        <img class="banner-img" :src="item.img_url" alt="">
      </CarouselItem>
    </Carousel>
    <Backtop :visibility-height="100" :bottom="100">
      <i class="el-icon-arrow-up"></i>
    </Backtop>

    <!-- 文章列表展示 -->
    <ListView class="list" :showNoMore="page > 1" :noMore="noMore" @load="loadList" :list="list"/>
  </main>
</template>

<script>
import { Carousel, CarouselItem, Backtop } from 'element-ui'
import ListView from '@/components/ListView'
import { getBanners } from '@/api/banner'
import { getArticles } from '@/api/article'
export default {
  components: { Carousel, CarouselItem, ListView, Backtop },
  data () {
    return {
      list: [],
      banners: [],
      noMore: false,
      showNoMore: true,
      page: 0,
      pageSize: 10,
      total: 0
    }
  },
  created () {
    getBanners().then(data => {
      this.banners = data.data
    })
    this.loadList()
  },
  methods: {
    bannerDetail (banner) {
      // 如果有文章id则跳文章详情
      if (banner.relate_id) {
        this.$router.push({ path: 'detail/' + banner.relate_id })
      } else {
        this.$router.push({ path: 'banner/' + banner.id, query: { title: banner.title } })
      }
    },
    loadList (closeLoading) {
      getArticles({ pageIndex: this.page, pageSize: this.pageSize }).then(({ data }) => {
        this.list = [...this.list, ...data.list]
        this.total = data.total
        if (this.total <= this.list.length) {
          this.noMore = true
        }
        closeLoading && closeLoading()
        this.page++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    background: #fff;
  }
  .list {
    padding: 0 10px;
  }
  .banner-item {
    cursor: pointer;
    .title {
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
  .banner-img {
    width: 100%;
    height: 100%;
  }
  .banner {
    height: 300px;
  }
  @media screen and (min-width: 1600px) {
    .banner {
      height: 350px;
    }
  }

</style>
<style lang="scss">
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
