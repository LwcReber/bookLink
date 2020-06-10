<template>
  <editor 
    ref="toastuiEditor"
    :initialValue="value"
    :options="editorOptions"
    height="500px"
    initialEditType="wysiwyg"
    previewStyle="vertical"
    @blur="blur"
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
  data () {
    const self = this
    return {
      editorOptions: {
        hideModeSwitch: true,
        ...defaultOpt,
        hooks: {
          addImageBlobHook: function(file, callback) {
            function callback_for_image_upload(img_url) {
              callback(img_url, 'image')
            }
            self.uploadCallback(file, callback_for_image_upload);
          }
        }
      }
    }
  },
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
    },
    uploadCallback: {
      type: Function
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, old) {
        this.$nextTick(() => {
          console.log(newVal, old)
          this.$refs.toastuiEditor.invoke('setHtml', newVal)
          if (newVal !== old) {
            this.dispatch('ElFormItem', 'el.form.change', [newVal]);
          }
        })
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
        this.$emit('value', this.$refs.toastuiEditor.invoke('getValue'))
      })
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    blur () {      
      this.dispatch('ElFormItem', 'el.form.change', ['']);
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
