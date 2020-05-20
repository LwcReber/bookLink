<template>
  <editor 
    ref="toastuiEditor"
    :initialValue="value"
    :options="editorOptions"
    height="500px"
    initialEditType="wysiwyg"
    previewStyle="vertical"
    />
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import defaultOpt from './default-options'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { log } from 'util'

export default {
  components: {
    editor: Editor
  },
  data () {
    return {
      editorOptions: {
        hideModeSwitch: true,
        ...defaultOpt
      }
    }
  },
  props: {
    value: {
      type: String
    }
  },
  watch: {
    value (newVal, old) {
      if (newVal !== old && newVal !== this.getHtml()) {
        this.$refs.toastuiEditor.invoke('setValue', newVal)
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$refs.toastuiEditor.invoke('on', 'change', () => {
        this.$emit('input', this.getHtml())
      })
    },
    scroll() {
      this.$refs.toastuiEditor.invoke('scrollTop', 10);
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke('moveCursorToStart');
    },
    getHtml() {
      let html = this.$refs.toastuiEditor.invoke('getHtml');
      return html
    }
  }
}
</script>

<style lang="scss" scoped>

</style>