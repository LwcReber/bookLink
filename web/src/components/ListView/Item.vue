<template>
  <div class="item">
    <slot></slot>
    <span @click="toDetail" class="title">{{data.title}}</span>
    <div class="content" v-html="replace(data.content)"></div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    toDetail () {
      this.$router.push({ path: `/detail/${this.data.id}`, query: { title: this.data.title } })
    },
    replace (content = '') {
      return content.replace(/<.*?>/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    border-bottom: 1px solid #eee;
    .title {
      font-size: 18px;
      margin: 10px 0 0;
      display: inline-block;
      box-sizing: border-box;
      font-weight: bold;
      &:hover {
        cursor: pointer;
        text-decoration: underline
      }
    }
    .content {
      margin-bottom: 10px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>
