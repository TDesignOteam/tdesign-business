<template>
  <div class="select-dialog-wrapper">
    <div class="select-dialog-title">
      选择器
    </div>
    <div class="select-dialog-descripe">
      可用在人员、商品、基础数据等选择器组件
    </div>
    <div class="select-dialog-second-title">
      基础用法
    </div>
    <div class="select-dialog-demo-wrapper">
      <t-button @click="isShowProduct = true">编辑分组选择器弹窗(单列表)</t-button>
      <div class="select-dialog-demo-button">
        <div class="select-dialog-demo-button-item" style="margin-right: 8px">
          <icon name="file-copy" size="16px" />
        </div>
        <div class="select-dialog-demo-button-item" :class="{active: isCodeOneShow}" @click="toCodeShow('one')">
          <icon name="code" size="16px"/>
        </div>
      </div>
    </div>
    <div ></div>
    <editor class="select-dialog-demo-code" language="html" ref="htmlEditor" :options="editorOpt" :style="{height: isCodeOneShow ? '884px' : '0px', opacity: isCodeOneShow ? 1 : 0}"></editor>
    <div class="select-dialog-second-title">
      带标签分类
    </div>
    <div class="select-dialog-demo-wrapper">
      <t-button @click="isShowPerson = true">人员选择器(双列表，自定义左侧内容)</t-button>
      <div class="select-dialog-demo-button">
        <div class="select-dialog-demo-button-item" style="margin-right: 8px">
          <icon name="file-copy" size="16px" />
        </div>
        <div class="select-dialog-demo-button-item" :class="{active: isCodeTwoShow}" @click="toCodeShow('two')">
          <icon name="code" size="16px"/>
        </div>
      </div>
    </div>
    <editor class="select-dialog-demo-code" language="html" ref="htmlEditor2" :options="editorOpt" :style="{height: isCodeTwoShow ? '884px' : '0px', opacity: isCodeTwoShow ? 1 : 0}"></editor>
    <div class="select-dialog-second-title">
      带标签分类
    </div>
    <div class="select-dialog-table">
      <t-table
        :rowKey="rowKey"
        :data="data"
        :columns="columns"
      ></t-table>
    </div>

<!--    <t-checkbox v-model="isClassify">是否分类</t-checkbox>-->
<!--    <t-checkbox v-model="isObject">数据是否对象类型</t-checkbox>-->
<!--    <t-divider />-->
<!--    <t-row :gutter="16">-->
<!--      <t-col>-->
<!--        <t-button @click="isShowProduct = true">编辑分组选择器弹窗(单列表)</t-button>-->
<!--      </t-col>-->
<!--    </t-row>-->
<!--    <t-divider />-->
<!--    <t-row :gutter="16">-->
<!--      <t-col>-->
<!--        <t-button @click="isShowPerson = true">人员选择器(双列表，自定义左侧内容)</t-button>-->
<!--      </t-col>-->
<!--    </t-row>-->
<!--    <t-divider />-->
<!--    <p>选中的值：</p>-->
<!--    <pre v-html="result"></pre>-->
    <g-select-dialog
      ref="selectDialog"
      v-model="productItems"
      :visible.sync="isShowProduct"
      :width="460"
      title="编辑分组"
      target-text="分组"
      :object-key="isObject ? 'id' : undefined"
      :classify="isClassify"
      :element-lists="productLists"
      :disabled-values="productDisabledDefaultValue"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template slot="search">
        <g-search
          :width="250"
          placeholder="请输入搜索内容"
          :option-key="searchOptionKey"
          :element-lists="searchElementLists"
          :disabled-values="[]"
          @change="handleSearchChange"
          @enter="handleSearchEnter"
          @click="handleSearchClick"
        />
        <!-- <t-input placeholder="自定义搜索框"></t-input> -->
      </template>
    </g-select-dialog>
    <g-select-dialog
      v-model="personItems"
      :visible.sync="isShowPerson"
      :width="720"
      :left-width-percent="26"
      :object-key="isObject ? 'id' : undefined"
      target-text="成员"
      :classify="isClassify"
      :element-lists="elementLists"
      :disabled-values="personDisabledDefaultValue"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template slot="search">
        <g-search
          :width="250"
          placeholder="请输入搜索内容"
          :option-key="searchOptionKey"
          :element-lists="searchElementLists"
          @change="handleSearchChange"
          @enter="handleSearchEnter"
          @click="handleSearchClick"
        />
      </template>
      <template slot="leftContent">
        <t-list stripe>
          <t-list-item @click.native="clickItem(0)">企业微信</t-list-item>
          <t-list-item @click.native="clickItem(1)">腾讯会议</t-list-item>
          <t-list-item @click.native="clickItem(2)">QQ管家</t-list-item>
        </t-list>
      </template>
    </g-select-dialog>
  </div>
</template>

<script>
import { GSelectDialog, GSearch } from '@wecity/tdesign-gov-vue';
import Editor from "@/components/code/editor";
import { Icon } from 'tdesign-icons-vue';
import * as monaco from 'monaco-editor';


const productString = [
  {
    label: '商务组',
    value: 'sw',
  },
  {
    label: '产品组',
    value: 'cp',
  },
  {
    label: '项目组',
    value: 'xm',
  },
  {
    label: '运营组',
    value: 'yy',
  },
  {
    label: '市场组',
    value: 'sc',
  },
  {
    label: '视觉组',
    value: 'sj',
  },
  {
    label: '交互组',
    value: 'jh',
  },
  {
    label: '重构组',
    value: 'cg',
  },
  {
    label: '前端组',
    value: 'qd',
  },
  {
    label: '后端组',
    value: 'hd',
  },
  {
    label: '测试组',
    value: 'cs',
  },
  {
    label: '运维组',
    value: 'yw',
  },
];
const productObject = [
  {
    label: '商务组',
    value: {
      id: 'sw',
    },
  },
  {
    label: '产品组',
    value: {
      id: 'cp',
    },
  },
  {
    label: '项目组',
    value: {
      id: 'xm',
    },
  },
  {
    label: '运营组',
    value: {
      id: 'yy',
    },
  },
  {
    label: '市场组',
    value: {
      id: 'sc',
    },
  },
  {
    label: '视觉组',
    value: {
      id: 'sj',
    },
  },
  {
    label: '交互组',
    value: {
      id: 'jh',
    },
  },
  {
    label: '重构组',
    value: {
      id: 'cg',
    },
  },
  {
    label: '前端组',
    value: {
      id: 'qd',
    },
  },
  {
    label: '后端组',
    value: {
      id: 'hd',
    },
  },
  {
    label: '测试组',
    value: {
      id: 'cs',
    },
  },
  {
    label: '运维组',
    value: {
      id: 'yw',
    },
  },
];
const valueObject0 = [
  {
    label: '章三说asdsafdasfdsafads',
    description: '22@qq.com',
    value: {
      id: '1',
      info: 'a',
    },
  },
  {
    label: '章利斯章三asdsafdasfdsafads',
    description: '11@qq.com',
    value: {
      id: '2',
      info: 'b',
    },
  },
  {
    label: 'aaaaaaaaaaaaaaaaaaaaaaaaabbbbb',
    value: {
      id: '3',
    },
  },
];
const valueObject1 = [
  {
    label: '1Account',
    value: {
      id: '11',
    },
    description: '1122@qq.com',
  },
  {
    label: '丁一',
    value: {
      id: '12',
    },
  },
];
const valueObject2 = [
  {
    label: '2ccount',
    value: {
      id: '21',
    },
    description: '21@qq.com',
  },
  {
    label: 'Smile',
    value: {
      id: '22',
    },
    description: '12@qq.com',
  },
];
const valueString0 = [
  {
    label: 'AA',
    value: '1',
    description: '22@qq.com',
  },
  {
    label: 'BB',
    value: '2',
  },
  {
    label: '张三',
    value: '3',
  },
  {
    label: '李四',
    value: '4',
  },
  {
    label: 'DDccount',
    value: '5',
  },
  {
    label: '233',
    value: '6',
  },
  {
    label: '王五',
    value: '7',
  },
];
const valueString1 = [
  {
    label: '1Account',
    value: '11',
    description: '1122@qq.com',
  },
  {
    label: '丁一',
    value: '12',
  },
];
const valueString2 = [
  {
    label: '2ccount',
    value: '21',
    description: '21@qq.com',
  },
  {
    label: 'Smile',
    value: '22',
    description: '12@qq.com',
  },
];
const stringList = [valueString0, valueString1, valueString2];
const objectList = [valueObject0, valueObject1, valueObject2];
// const objectContent = [
//   {
//     label: '章利斯章三asdsafdasfdsafads',
//     description: '11@qq.com',
//     value: {
//       id: 'b',
//       info: '2',
//     },
//   },
//   {
//     label: '2ccount',
//     value: {
//       id: '21',
//     },
//     description: '21@qq.com',
//   },
// ];
// const stringContent = [
//   {
//     label: 'BB',
//     value: '2',
//   },
//   {
//     label: '2ccount',
//     value: '21',
//     description: '21@qq.com',
//   },
// ];
export default {
  components: {
    GSelectDialog,
    GSearch,
    Icon,
    Editor,
  },

  data() {
    return {
      editorOpt: {
        language: 'html',
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
        },
        automaticLayout: true,
        theme: 'myTheme',
        readOnly: true,
        value: '',
        lineNumbers: 'off',
      },
      rowKey: 'index',
      isCodeOneShow: false,
      isCodeTwoShow: false,
      isClassify: false, // 是否分类
      isObject: false, // 数据是否对象类型
      isShowPerson: false,
      isShowProduct: false,
      elementIndex: 0,
      optionKey: {
        label: 'name',
        value: 'key',
        description: 'content',
      },
      searchOptionKey: {
        label: 'label',
        value: 'value',
        description: 'description',
        info: 'info',
      },
      productDisabledDefaultValue: ['sw', 'sc'],
      productItems: [
        {
          label: '运营组',
          value: 'yy',
        },
        {
          label: '市场组',
          value: 'sc',
        },
      ],
      personItems: [],
      personDisabledDefaultValue: ['2'],
      result: {},
      searchElementLists: [],
      data: [
        {index:0, param: 'titles', explain: '自定义列表标题', type: 'array', optional: '-', default: '[\'列表 1\', \'列表 2\']'},
        {index:1, param: 'titles', explain: '自定义列表标题', type: 'array', optional: '-', default: '[\'列表 1\', \'列表 2\']'},
        {index:2, param: 'titles', explain: '自定义列表标题', type: 'array', optional: '-', default: '[\'列表 1\', \'列表 2\']'},
        {index:3, param: 'titles', explain: '自定义列表标题', type: 'array', optional: '-', default: '[\'列表 1\', \'列表 2\']'},
        {index:4, param: 'titles', explain: '自定义列表标题', type: 'array', optional: '-', default: '[\'列表 1\', \'列表 2\']'},
      ],
      columns: [
        {
          width: 200,
          colKey: 'param',
          title: '参数',
        },
        {
          width: 100,
          colKey: 'explain',
          title: '说明',
        },
        {
          width: 157,
          colKey: 'type',
          title: '类型',
        },
        {
          width: 267,
          colKey: 'optional',
          title: '可选值',
        },
        {
          width: 214,
          colKey: 'default',
          title: '默认值',
        }
      ],
      code: `
&lt;template>
  &lt;div class="tdesign-demo-block-row">
    &lt;t-button theme="primary">
      &lt;add-icon slot="icon"/>
      新建
    &lt;/t-button>
    &lt;t-button variant="outline">
      &lt;cloud-upload-icon slot="icon"/>
      上传文件
    &lt;/t-button>
    &lt;t-button shape="circle" theme="primary">
      &lt;discount-icon slot="icon"/>
    &lt;/t-button>
    &lt;t-button shape="circle" theme="primary">
      &lt;cloud-download-icon slot="icon"/>
    &lt;/t-button>
    &lt;t-button variant="outline" :icon="renderIcon">
      搜索
    &lt;/t-button>
  &lt;/div>
&lt;/template>

&lt;script lang="jsx">
 import {
   AddIcon, CloudUploadIcon, SearchIcon, DiscountIcon, CloudDownloadIcon,
 } from 'tdesign-icons-vue';

 export default {
   components: {
     AddIcon, CloudUploadIcon, DiscountIcon, CloudDownloadIcon,
   },
   methods: {
     renderIcon() {
       return &lt;SearchIcon />;
     },
   },
 };
&lt;/script>
      `
    };
  },
  computed: {
    productLists() {
      return this.isObject ? productObject : productString;
    },
    elementLists() {
      return this.isObject ? objectList[this.elementIndex] : stringList[this.elementIndex];
    },
    // personDefaultContent() {
    //   // 切换源数据(elementLists)的情况下，需要传入完整的选中数据，否则无法展示内容
    //   return this.isObject ? objectContent : stringContent;
    // },
  },
  watch: {
    productItems() {
      console.log('productItems', this.productItems);
    },
    isObject() {
      this.productItems = [];
      this.personItems = [];
    },
  },
  mounted() {
    this.setValue(this.code.replace(/&lt;/g, "<"));
  },
  methods: {
    clickItem(index) {
      this.elementIndex = index;
    },
    handleOk(value) {
      this.result = value;
      console.log('ok', value);
    },
    handleCancel(value) {
      console.log('cancel', value);
    },
    handleSearchChange(value, context) {
      console.log('example change', value, context);
      const searchElementLists = [];
      for (let index = 0; index < 10; index++) {
        searchElementLists.push({
          label: `${value}${index}`,
          value: `${value}${index}`,
          description: `abcd${index}@qq.com`,
          info: '广东省/广州市/天河区',
        });
      }
      this.searchElementLists = searchElementLists;
    },
    handleSearchEnter(value, context) {
      console.log('example enter', value, context);
    },
    handleSearchClear(context) {
      console.log('example clear', context);
    },
    handleSearchClick(element, index) {
      console.log('example click', element, index);
      // TODO： 此处业务自行处理数据
      // this.$refs.selectDialog.add(element);
      // this.$refs.selectDialog.remove(element);
      this.clickItem((this.elementIndex + 1) % 3); // 模拟：分组数据跳转到选中元素所在分组
    },
    toCodeShow(value) {
      if (value === 'one') {
        this.isCodeOneShow = !this.isCodeOneShow;
      }
      if (value === 'two') {
        this.isCodeTwoShow = !this.isCodeTwoShow;
      }
    },
    setValue(value) {
      this.$refs.htmlEditor.setValue(value);
      this.$refs.htmlEditor2.setValue(value);
    },
  },
};
</script>
<style lang="less" scoped>
.select-dialog {
  &-wrapper {
    height: 100%;
    padding: 24px;
    background-color:#fff
  }
  &-title {
    height: 44px;
    margin-bottom: 16px;
    color: rgba(0,0,0,0.9);
    font-size: 36px;
    font-weight: 700;
    text-align: left;
    line-height: 44px;
  }
  &-descripe {
    height: 22px;
    margin-bottom: 40px;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
  &-second-title {
    height: 28px;
    margin-top: 40px;
    margin-bottom: 16px;
    color: rgba(0,0,0,0.9);
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
  }
  &-demo {

    &-wrapper {
      display: flex;
      align-items: center;
      position: relative;
      width: 1102px;
      height: 284px;
      padding-left: 40px;
      border-radius: 3px;
      border: 1px solid #E7E7E7;
      background: #FFFFFF;
    }
    &-button {
      position: absolute;
      bottom: 8px;
      right: 8px;
      display: flex;
      &-item {
        width: 32px;
        height: 32px;
        padding: 4px 8px;
        border-radius: 3px;
        background: #FFFFFF;
        &:hover {
          background: #EEEEEE;
        }

      }
    }
  }

}
.active {
  background: #EEEEEE;
}
.g-editor {
  width: 1102px;
  padding: 24px 0 0 0;
  max-height: 884px;
}
</style>
