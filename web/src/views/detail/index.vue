<template>
  <div class="detail">
    <div class="page container">
      <h3 class="title">{{title}}</h3>
      <div class="info" flex="cross:center">
        <UserInfo :data="data"/>
      </div>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { articleDetail } from '@/api/article'
import UserInfo from '@/components/UserInfo'
export default {
  components: { UserInfo },
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
      data: {},
      content: ''
    }
  },
  created () {
    articleDetail(this.id).then(({ data }) => {
      this.content = data.content
      this.data = data
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
    .author {
      margin-right: 20px;
    }
   .time {
      margin-left: 20px;
   }
 }
 .content {
   font-size: 16px;
   margin-top: 10px;
 }
</style>
