<template>
  <editor
    ref="toastuiEditor"
    :initial-value="value"
    :options="editorOptions"
    height="500px"
    initial-edit-type="wysiwyg"
    preview-style="vertical"
    @change="onEditorChange"
  />
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import defaultOpt from './default-options'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      editorOptions: {
        hideModeSwitch: true,
        ...defaultOpt
      }
    }
  },
  watch: {
    value(newVal, old) {
      if (newVal !== old && newVal !== this.getHtml()) {
        this.$refs.toastuiEditor.invoke('setValue', newVal)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onEditorChange(value) {
      console.log(value)
    },
    init() {
      this.$refs.toastuiEditor.invoke('on', 'change', () => {
        this.$emit('input', this.getHtml())
        this.$emit('value', this.$refs.toastuiEditor.invoke('getValue'))
      })
    },
    scroll() {
      this.$refs.toastuiEditor.invoke('scrollTop', 10)
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke('moveCursorToStart')
    },
    getHtml() {
      const html = this.$refs.toastuiEditor.invoke('getHtml')
      return html
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
