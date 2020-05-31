<template>
  <div class="page">
    <ListView :noMore="noMore" @load="loadList" :list="list"/>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import { getArticles } from '@/api/article'

export default {
  components: { ListView },
  data () {
    return {
      list: [],
      noMore: false,
      page: 0,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    query () {
      return this.$route.query.query
    }
  },
  watch: {
    query (newVal, old) {
      if (newVal !== old) {
        this.list = []
        this.loadList()
      }
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList (closeLoading) {
      getArticles({ title: this.query, pageIndex: this.page, pageSize: this.pageSize }).then(({ data }) => {
        this.page++
        this.list = [...data.list, ...this.list]
        this.total = data.total
        if (this.total <= this.list.length) {
          this.noMore = true
        }
        closeLoading && closeLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
