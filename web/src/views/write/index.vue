<template>
  <div class="container">
    <div flex="main:justify">
      <el-input class="title" placeholder="请输入标题" v-model="title"></el-input>
      <div class="right" flex="main:right cross:center">
        <Button @click="publish" type="success" class="publish">发布</Button>
        <Button @click="$router.push('/')" plain type="primary" class="to-home">回到首页</Button>
      </div>
    </div>
    <markdown-editor v-model="content" class="markdown" />
  </div>
</template>

<script>
import MarkdownEditor from '../../../../components/MarkdownEditor'
import { Input, Button } from 'element-ui'
import { publishArticle } from '@/api/article'
export default {
  components: { MarkdownEditor, 'el-input': Input, Button },
  data () {
    return {
      title: '',
      content: '',
      contentVal: '' // 没有html标签的value值
    }
  },
  methods: {
    publish () {
      const title = this.title.trim()
      const content = this.content.trim()
      if (!title.trim()) {
        this.$message({
          message: '请输入标题',
          type: 'error',
          duration: 1000
        })
        return
      }
      if (!content.trim()) {
        this.$message({
          message: '请输入内容',
          type: 'error',
          duration: 1000
        })
        return
      }
      publishArticle({ title, content }).then(() => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .title {
    flex: 1;
    height: 60px;
    margin-right: 20px;
    /deep/ {
      .el-input__inner {
        border: 0;
        height: 60px;
        font-size: 22px;
      }
    }
  }
  .markdown {
    flex: 1;
  }
  .right {
    margin-right: 20px;
    .publish {
      margin-left: 20px;
    }
    .to-home {
      margin-left: 20px;
    }
  }
</style>
