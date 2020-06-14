<template>
  <div class="page container">
    <!-- 个人信息 -->
    <div class="info" flex="cross:center">
      <!-- 头像 -->
      <Upload
        class="avatar-uploader"
        action="/api/v1/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <span v-if="imageUrl">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </span>
        <view-avatar v-else quickWidth="70px" borderRadius="50%" :src="avatar" :text="userName"></view-avatar>
      </Upload>
      <!-- 名称 -->
      <span class="name">{{userName}}</span>
    </div>
    <div class="list">
      <h3 class="title">发布的文章</h3>
      <!-- 已发布过的文章 -->
      <ListView class="list-view" :showNoMore="page > 1" :noMore="noMore" @load="loadList" :list="list"/>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListView from '@/components/ListView'
import { getUserArticles } from '@/api/article'
import { updateUseInfo } from '@/api/user'
import { Upload } from 'element-ui'
export default {
  components: { ListView, Upload },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      isLogin: state => state.user.isLogin,
      avatar: state => state.user.avatar,
      userName: state => state.user.userName
    })
  },
  data () {
    return {
      imageUrl: this.avatar,
      list: [],
      noMore: false,
      showNoMore: true,
      page: 0,
      pageSize: 10,
      total: 0
    }
  },
  watch: {
    userId () {
      this.loadList()
    }
  },
  mounted () {
    if (this.userId) {
      this.loadList()
    }
  },
  methods: {
    loadList (closeLoading) {
      getUserArticles(this.userId, { pageIndex: this.page, pageSize: this.pageSize }).then(({ data }) => {
        this.list = [...this.list, ...data.list]
        this.total = data.total
        if (this.total <= this.list.length) {
          this.noMore = true
        }

        closeLoading && closeLoading()
        this.page++
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.imageUrl = file.response.data
      const data = { avatar: this.imageUrl }
      updateUseInfo(this.userId, data).then(() => {
        this.$message.success('修改成功')
        this.$store.commit('user/setUserInfo', data)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin: 10px auto;
    min-height: 100%;
    border-radius: 4px;
    background: #fff;
    padding: 30px;
  }
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .info {
    .name {
      margin-left: 20px;
    }
  }
  .list {
    margin-top: 30px;
    .title {
      font-size: 20px;
    }
  }
  .list-view {
    max-width: 100%;
  }
</style>
