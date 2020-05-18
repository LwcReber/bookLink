<template>
  <div class="detail">
    <div class="page container">
      <h3 class="title">标题啊啊啊</h3>
      <div class="info">
        <span>作者</span>
        <span>时间： 2020/03/02 12:00</span>
      </div>
      <div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio minus dolores saepe atque libero molestias nulla dicta quos ea pariatur velit enim tempore modi, fuga cupiditate neque dolorum inventore itaque.</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    console.log(this.id)
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
