<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="index" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusText }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-popconfirm
            placement="top-start"
            @onConfirm="handleDelete(row,$index)"
            title="确定删除吗？"
          >
            <el-button slot="reference" v-if="row.status!='deleted'" size="mini" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :validate-on-rule-change="false" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="banner图片" prop="img_url" style="margin-bottom: 30px;">
          <Upload v-model="temp.img_url" />
        </el-form-item>
        <el-form-item label="是否关联文章" prop="isrelate">
          <el-switch
            class="relate-switch"
            v-model="temp.isrelate"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="关联文章"
            inactive-text="自定义内容"
          />
        </el-form-item>
        <el-form-item :rules="temp.isrelate ? { type: 'number', required: true, message: '请输入文章id', trigger: 'blur' } : {}" v-if="temp.isrelate" label="关联文章" prop="relate_id">
          <el-input type="number" v-model="temp.relate_id" placeholder="文章id" />
        </el-form-item>
        <el-form-item :rules="!temp.isrelate ? { required: true, message: '请输入详情', trigger: 'change' } : {}" label="详情" prop="content">
          <markdown-editor :upload-callback="uploadImg" v-model="temp.content" class="markdown" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createBanner, updateBanner, deleteBanner } from '@/api/banner'
import { upload } from '@/api/user'
import { Switch } from 'element-ui'
import waves from '@/directive/waves' // waves directive
import Upload from '@/components/Upload/SingleImage3'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import MarkdownEditor from '@/components/MarkdownEditor'
const statusOptions = [{ label: '上架', value: 'published' }, { label: '下架', value: 'draft' }]
export default {
  name: 'ComplexTable',
  components: { Pagination, Upload, MarkdownEditor, 'el-switch': Switch },
  directives: { waves },
  filters: {
    statusFilter(status = 'deleted') {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status] || statusMap.deleted
    },
    statusText(status) {
      const item = statusOptions.find((item) => item.value === status) || {}
      return item.label || '无'
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined
      },
      statusOptions,
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      temp: {
        id: undefined,
        content: '',
        created_at: new Date(),
        status: 'published',
        timestamp: new Date(),
        title: '',
        img_url: '',
        relate_id: '',
        isrelate: false // 是否关联文章
      },
      pvData: [],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        img_url: [{ required: true, message: '请上传banner图', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const data = response.data
        this.list = data.list
        this.total = data.total

        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.temp = Object.assign({}, this.$options.data().temp)
        this.$refs['dataForm'].resetFields()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createBanner(this.temp).then(({ data }) => {
            this.temp.created_at = new Date()
            this.temp.id = data.id
            this.list.push(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateBanner(this.temp.id, this.temp).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            const tempData = Object.assign({}, this.temp)
            this.list.splice(index, 1, tempData)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteBanner(row.id).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    uploadImg(file, cb) {
      upload(file).then((res) => {
        cb(res.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .relate-switch {
    display: block;
    line-height: 24px;
  }
</style>
