<template>
  <div class="item">
    <slot></slot>
    <span @click="toDetail" class="title">发到沙发上</span>
    <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus sed ullam optio culpa voluptate inventore! Eius pariatur nam, minima architecto omnis nostrum voluptatum quo nisi ipsam animi consequatur molestias nulla!</div>
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
      this.$router.push('/detail/aaa')
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    border-bottom: 1px solid #eee;
    .title {
      font-size: 18px;
      margin: 10px 0;
      display: inline-block;
      box-sizing: border-box;
      font-weight: bold;
      &:hover {
        cursor: pointer;
        text-decoration: underline
      }
    }
    .content {
      padding-bottom: 10px;
    }
  }
</style>
