<template>
  <div class="">
    <el-upload
      class="avatar-uploader"
      :data="dataObj"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      action="/api/v1/upload"
    >
      <div>
        <img v-if="tempUrl" :src="tempUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
        <span v-if="tempUrl" class="upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click.stop="dialogVisible = true"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click.stop="handleRemove"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>

    </el-upload>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <img width="100%" :src="tempUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/api/qiniu'
import mixin from '@/mixin/emitter'
export default {
  name: 'SingleImageUpload3',
  mixins: [mixin],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.$nextTick(() => {
          this.tempUrl = newVal
        })
      }
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
      this.dispatch('ElFormItem', 'el.form.change', [val])
    },
    handleRemove() {
      this.tempUrl = ''
      this.emitInput('')
    },
    handleImageSuccess(file, fileList) {
      this.tempUrl = file.data
      this.emitInput(file.data)
    },
    beforeUpload() {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const key = response.data.qiniu_key
          const token = response.data.qiniu_token
          _self._data.dataObj.token = token
          _self._data.dataObj.key = key
          // this.tempUrl = response.data.qiniu_url
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader {
   /deep/ {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
    }
    .upload-list__item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        opacity: 1;
        span {
          display: inline-block;
        }
      }
      span {
        display: none;
        cursor: pointer;
      }
      .el-upload-list__item-delete {
        position: static;
        font-size: inherit;
        color: inherit;
      }
      span + span {
        margin-left: 15px;
      }
    }
   }
 }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 400px;
    height: 178px;
    display: block;
  }
// @import "~@/styles/mixin.scss";
// .upload-container {
//   width: 100%;
//   position: relative;
//   @include clearfix;
//   .image-uploader {
//     width: 35%;
//     float: left;
//   }
//   .image-preview {
//     width: 200px;
//     height: 200px;
//     position: relative;
//     border: 1px dashed #d9d9d9;
//     float: left;
//     margin-left: 50px;
//     .image-preview-wrapper {
//       position: relative;
//       width: 100%;
//       height: 100%;
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .image-preview-action {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       left: 0;
//       top: 0;
//       cursor: default;
//       text-align: center;
//       color: #fff;
//       opacity: 0;
//       font-size: 20px;
//       background-color: rgba(0, 0, 0, .5);
//       transition: opacity .3s;
//       cursor: pointer;
//       text-align: center;
//       line-height: 200px;
//       .el-icon-delete {
//         font-size: 36px;
//       }
//     }
//     &:hover {
//       .image-preview-action {
//         opacity: 1;
//       }
//     }
//   }
//   .image-app-preview {
//     width: 360px;
//     height: 200px;
//     position: relative;
//     border: 1px dashed #d9d9d9;
//     float: left;
//     margin-left: 50px;
//     .app-fake-conver {
//       height: 44px;
//       position: absolute;
//       width: 100%; //
//       background: rgba(0, 0, 0, .1);
//       text-align: center;
//       line-height: 64px;
//       color: #fff;
//     }
//   }
// }
</style>
