<template>
  <div class="detail">
    <div class="page container">
      <h3 class="title">{{title}}</h3>
      <!-- <div class="info">
        <span>作者</span>
        <span>时间： 2020/03/02 12:00</span>
      </div> -->
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { getBannerDetail } from '@/api/banner'
export default {
  computed: {
    id () {
      return this.$route.params.id
    },
    title () {
      return this.$route.query.title
    }
  },
  data () {
    return {
      content: ''
    }
  },
  created () {
    console.log(this.id)
    getBannerDetail(this.id).then(({ data }) => {
      this.content = data.content
    })
  }
}
</script>

<style lang="scss" scoped>
  .detail {
    background: #f5f5f5;
    min-height: calc(100vh - 50px);
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    .container {
      background: #fff;
      padding: 10px;
      padding-bottom: 50px;
      padding-left: 20px;
    }
  }
 .title {
   font-size: 24px;
 }
 .info {
   font-size: 14px;
 }
 .content {
   font-size: 16px;
   margin-top: 10px;
 }
</style>
