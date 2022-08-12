<template>
  <div class="editor">
    <div ref="gEditor" class="editor__container"></div>
    <div v-if="formate" class="editor__bottom">
      <t-button class="btn" ariant="outline" theme="primary" ghost @click="handlerFormate">
        <span slot="icon" class="icon-format"></span>
        格式化
      </t-button>
    </div>
  </div>
</template>

<script>
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor';

// 解决'Uncaught Error: Unexpected usage'报错
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  },
}

export default {
  name: 'editor',
  props: {
    // 编码语言
    language: {
      type: String,
      default: 'json',
    },
    // 配置
    options: {
      type: Object,
      default: () => ({}),
    },
    formate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const container = this.$refs.gEditor;
      monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: '#F3F3F3' }],
        colors: {
          // 相关颜色属性配置
          'editor.background': '#F3F3F3',     // 背景色
        }
      });
      monaco.editor.setTheme('myTheme')
      const options = {
        language: this.language,
        theme: 'myTheme',
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
        },
        automaticLayout: true,
        readOnly: false,
        value: '',
      };
      // 设置自定义主题
      Object.assign(options, this.options);
      this.editor = monaco.editor.create(container, options);
      this.$emit('onInit', this.editor);
    },
    handlerFormate() {
      try {
        const str = JSON.stringify(JSON.parse(this.getValue()), null, 2);
        this.setValue(str);
        this.$emit('onErrMsg', '');
      } catch (_) {
        this.$emit('onErrMsg', '请确认json格式是否正确');
      }
    },
    // 获取编辑器的数据
    getValue() {
      return this.editor.getValue();
    },
    // 设置编辑器的数据
    setValue(values) {
      this.editor.setValue(values);
      setTimeout(() => {
        this.editor.trigger('anyString', 'editor.action.formatDocument');
        this.editor.setValue(this.getValue());
      }, 200);
    },
  },
};
</script>
<style lang="less" scoped>
//@import (reference) '~@/pages/index/styles/mixin.less';
.editor {
  position: relative;
  //min-height: 300px;
  &__container {
    height: 884px;
    width: 1102px;
  }
}
</style>
