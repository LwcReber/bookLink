<template>
  <div class="container">
    <div flex="main:justify">
      <el-input class="title" placeholder="请输入标题" v-model="title"></el-input>
      <div class="right" flex="main:right cross:center">
        <Button type="primary" size="mini" class="publish">发布</Button>
        <Button @click="$router.push('/')" type="primary" size="mini" class="to-home">回到首页</Button>
      </div>
    </div>
    <markdown-editor v-model="content" class="markdown" />
  </div>
</template>

<script>
import MarkdownEditor from '../../../../components/MarkdownEditor'
import { Input, Button } from 'element-ui'
export default {
  components: { MarkdownEditor, 'el-input': Input, Button },
  data () {
    return {
      title: '',
      content: ''
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
