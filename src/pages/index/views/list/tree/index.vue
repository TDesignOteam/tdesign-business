<template>
  <div>
    <div class="table-tree-container">
      <div class="list-tree-wrapper">
        <div class="list-tree-operator">
          <div class="list-title-wrapper">
            <span>全部图层</span>
            <refresh-icon class="list-title-icon" slot="suffix-icon" size="16px" ></refresh-icon>
            <add-icon class="list-title-icon list-title-icon-right" slot="suffix-icon" size="16px" ></add-icon>
          </div>
          <t-input v-model="filterText" @input="onInput" placeholder="请输入关键词">
            <search-icon slot="suffix-icon" size="20px" />
          </t-input>
          <t-tree :data="items" hover expand-on-click-node :default-expanded="expanded" :filter="filterByText" >
            <template #icon="{node}">
              <icon v-if="node.getChildren() && !node.expanded" name="caret-right-small" />
              <icon v-else-if="node.getChildren() && node.expanded && node.loading" name="loading" />
              <icon v-else-if="node.getChildren() && node.expanded" name="caret-down-small" />
              <icon v-else name="location" />
            </template>
            <template #label="{node}">
              <icon v-if="node.getChildren() && !node.expanded" name="folder" class="tree-icon"/>
              <icon v-else-if="node.getChildren() && node.expanded" name="folder-open" class="tree-icon"/>
              {{ node.label }}
            </template>
          </t-tree>
        </div>
        <div class="list-tree-content">
          <common-table />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SearchIcon, RefreshIcon, AddIcon, Icon } from 'tdesign-icons-vue';
import CommonTable from '../components/CommonTable.vue';

export default {
  name: 'ListTree',
  components: {
    SearchIcon,
    CommonTable,
    RefreshIcon,
    AddIcon,
    Icon
  },
  data() {
    return {
      data: [],
      filterText: '',
      filterByText: null,
      options: [
        {
          label: '一级操作',
          value: '1',
        },
        {
          label: '二级操作',
          value: '2',
        },
      ],
      value: 'first',
      expanded: ['0', '0-0', '0-1', '0-2', '0-3', '0-4'],
      items: [
        {
          label: '默认标签',
          value: 0,
          children: [
            {
              label: '公共场所',
              value: '0-0',
            },
            {
              label: '二级树',
              value: '0-1',
              children: [
                {
                  label: '二级子结点1',
                  value: '0-1-0',
                },
                {
                  label: '二级子结点2',
                  value: '0-1-1',
                },
              ],
            },
            {
              label: '二级树',
              value: '0-2',
            },
          ],
        },
        {
          label: '一级树',
          value: 1,
          children: [
            {
              label: '总办',
              value: '1-0',
            },
            {
              label: '市场部',
              value: '1-1',
              children: [
                {
                  label: '采购1组',
                  value: '1-1-0',
                },
                {
                  label: '采购2组',
                  value: '1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级树',
          value: 2,
          children: [
            {
              label: '市场部',
              value: '2-0',
            },
            {
              label: '财务部',
              value: '2-1',
              children: [
                {
                  label: '财务1组',
                  value: '2-1-0',
                },
                {
                  label: '财务2组',
                  value: '2-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '没有子节点',
          value: 3,
        },
        {
          label: '没有子节点',
          value: 4,
        },
      ],
    };
  },

  methods: {
    onInput() {
      this.filterByText = (node) => {
        const rs = node.label.indexOf(this.filterText) >= 0;
        return rs;
      };
    },
    rehandleClickOp({ text, row }) {
      console.log(text, row);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: @border-radius;
  height: calc(100vh - 140px);

  .t-tree {
    margin-top: 24px;
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
}

.list-tree-operator {
  width: 200px;
  float: left;
  padding: 24px;
}

.list-tree-content {
  border-left: 1px solid var(--td-component-border);
  overflow: auto;
  height: calc(100vh - 140px);
}
.list-title {
  &-wrapper{
    display: flex;
    height: 28px;
    margin-bottom: 16px;
    color: #000000;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
  }
  &-icon{
    margin: auto 0 auto 4px;
    color: #0052D9;
    &-right{
      margin-left: 36px;
    }
  }
}
.tree-icon{
  color: rgba(0, 0, 0, 0.26);
}
</style>
