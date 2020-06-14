<template>
  <div class="info" flex="cross:center">
    <span  v-if="data.create_by" flex="cross:center">
      <view-avatar quickWidth="40px" borderRadius="50%" :text="data.create_by.name" :src="data.create_by.avatar"></view-avatar>
      <span class="name">{{ data.create_by.name}}</span>
    </span>
    <span class="time" v-if="data.created_at">
      {{ data.created_at | formatDate }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object }
  }
}
</script>

<style lang="scss" scoped>
  .info {
    font-size: 12px;
  }
  .name {
    margin-left: 10px;
  }
  .time {
    margin-left: 30px;
  }
</style>
