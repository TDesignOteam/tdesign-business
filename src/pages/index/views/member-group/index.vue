<template>
  <div>
    <div class="table-tree-container">
      <div class="list-tree-wrapper">
        <div class="list-tree-operator">
          <div class="list-title-wrapper">
            <span>成员分组</span>
            <add-icon class="list-title-icon list-title-icon-right" slot="suffix-icon" size="16px" ></add-icon>
          </div>
          <div class="team-group-wrapper">
            <div
              v-for="group in groups"
              :key="group.groupId"
              class="team-group-item"
              :class="{
                'team-group-item-active': selectGroup === group.groupId
              }"
              @click = 'handleSelectGroup(group)'
            >
              <span class="team-group-item-text ">
                {{ group.name }}({{ group.memberCount }})
              </span>
            </div>
          </div>
        </div>
        <div class="list-tree-content">
          <common-table :title="currentGroup.name"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SearchIcon, RefreshIcon, AddIcon, Icon } from 'tdesign-icons-vue';
import CommonTable from './CommonTable.vue';

export default {
  name: 'ListTree',
  components: {
    CommonTable,
    AddIcon,
  },
  data() {
    return {
      data: [],
      filterText: '',
      filterByText: null,
      value: 'first',
      selectGroup: '0',
      currentGroup: {},
      groups: [
        {
          groupId: '0',
          name: '全部',
          memberCount: 100
        },
        {
          groupId: '1',
          name: '政务协作平台',
          memberCount: 10
        },
        {
          groupId: '2',
          name: '应用中枢',
          memberCount: 20
        },
        {
          groupId: '3',
          name: '运营平台',
          memberCount: 30
        },
        {
          groupId: '4',
          name: '健康码',
          memberCount: 40
        },
      ]
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
    handleSelectGroup(group) {
      this.selectGroup = group.groupId;
      this.currentGroup = group;
    }
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
.team-group {
  &-wrapper {

  }

  &-item {
    width: 152px;
    padding: 6px 16px;
    margin-bottom: 4px;
    color: rgba(0,0,0,0.9);
    cursor: pointer;
    &-text {
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      line-height: 22px;
    }
    &-active {
      background: #ECF2FE;
      color: #0052D9;
    }

  }
}
</style>
