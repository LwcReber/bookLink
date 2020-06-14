<template>
  <div class="item">
    <slot></slot>
    <span @click="toDetail" class="title">{{data.title}}</span>
    <div class="content" v-html="replace(data.content)"></div>
    <UserInfo class="user-info" :data="data"/>
  </div>
</template>

<script>
import UserInfo from './UserInfo'
export default {
  name: 'Item',
  components: { UserInfo },
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
    padding-bottom: 5px;
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
      font-size: 14px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .user-info {
    margin-top: 10px;
  }

</style>
