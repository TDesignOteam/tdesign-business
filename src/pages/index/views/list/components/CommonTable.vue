<template>
  <div class="list-common-table">
    <div class="list-title-wrapper">
      <span>全部图层</span>
    </div>
    <div class="operate-wrapper">
      <div class="search-input">
        <t-input placeholder="请输入关键词">
          <search-icon slot="suffix-icon" size="20px" />
        </t-input>
      </div>
      <div class="button-group">
        <t-button theme="primary">
          <add-icon slot="icon"/>
          新增图层
        </t-button>
        <t-button theme="base">
          导入图层
        </t-button>
        <t-button theme="base">
          去地图预览
        </t-button>
      </div>
    </div>
    <div class="table-container">
      <t-table
        :data="data"
        :columns="columns"
        :height="$getFirstLevelTableHeight() + 24"
        :rowKey="rowKey"
        :verticalAlign="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        :loading="dataLoading"
        :headerAffixedTop="true"
        :headerAffixProps="{ offsetTop, container: getContainer }"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === PERSON_STATUS.DISABLE" theme="danger" variant="light">禁用</t-tag>
          <t-tag v-if="row.status === PERSON_STATUS.ENABLE" theme="success" variant="light">启用</t-tag>
        </template>
        <template #op="{ row }">
          <a class="t-button-link" @click="rehandleClickOp(row)">预览</a>
          <a class="t-button-link" @click="rehandleClickOp(row)">编辑</a>
          <a class="t-button-link" @click="handleClickDelete(row)">删除</a>
        </template>
      </t-table>
      <t-dialog
        header="确认删除当前所选合同？"
        :body="confirmBody"
        :visible.sync="confirmVisible"
        @confirm="onConfirmDelete"
        :onCancel="onCancel"
      >
      </t-dialog>
    </div>
  </div>
</template>
<script>
import { prefix } from '@/config/global';
import { SearchIcon, AddIcon } from 'tdesign-icons-vue';

import {
  CONTRACT_STATUS,
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPES,
  CONTRACT_TYPE_OPTIONS,
  CONTRACT_PAYMENT_TYPES,
  PERSON_STATUS,
} from '@/constants';

export default {
  name: 'list-table',
  components: {
    SearchIcon,
    AddIcon
  },
  data() {
    return {
      CONTRACT_STATUS,
      CONTRACT_STATUS_OPTIONS,
      CONTRACT_TYPES,
      CONTRACT_TYPE_OPTIONS,
      CONTRACT_PAYMENT_TYPES,
      PERSON_STATUS,
      prefix,
      formData: {
        name: '',
        no: undefined,
        status: undefined,
      },
      data: [],
      dataLoading: false,
      value: 'first',
      columns: [
        {
          title: '序号',
          fixed: 'left',
          width: 78,
          align: 'left',
          ellipsis: true,
          colKey: 'number',
        },
        {
          title: '图层名称',
          fixed: 'left',
          width: 274,
          align: 'left',
          ellipsis: true,
          colKey: 'name',
        },
        {
          title: '图层ID',
          fixed: 'left',
          width: 180,
          align: 'left',
          ellipsis: true,
          colKey: 'id',
        },
        {
          title: '图层数',
          fixed: 'left',
          width: 100,
          align: 'left',
          ellipsis: true,
          colKey: 'count1',
        },{
          title: '图层数',
          fixed: 'left',
          width: 100,
          align: 'left',
          ellipsis: true,
          colKey: 'count2',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 236,
          colKey: 'op',
          title: '操作',
        },
      ],
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      bordered: true,
      hover: true,
      rowClassName: (rowKey) => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        defaultPageSize: 20,
        total: 100,
        defaultCurrent: 1,
        showJumper: true,
      },
      confirmVisible: false,
      deleteIdx: -1,
    };
  },
  computed: {
    confirmBody() {
      if (this.deleteIdx > -1) {
        const { name } = this.data?.[this.deleteIdx];
        return `删除后，${name}的所有地图信息将被清空，且无法恢复`;
      }
      return '';
    },
    offsetTop() {
      return this.$store.state.setting.isUseTabsRouter ? 48 : 0;
    },
  },
  mounted() {
    this.dataLoading = true;
    this.$request
      .get('/api/get-map-list')
      .then((res) => {
        if (res.code === 0) {
          const { list = [] } = res.data;
          this.data = list;
          this.pagination = {
            ...this.pagination,
            total: list.length,
          };
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dataLoading = false;
      });
  },
  methods: {
    getContainer() {
      return document.querySelector('.tdesign-starter-layout');
    },
    onReset(data) {
      console.log(data);
    },
    onSubmit(data) {
      console.log(data);
    },
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    rehandleClickOp( row ) {
      console.log(row);
    },
    handleClickDelete(row) {
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;
    },
    onConfirmDelete() {
      // 真实业务请发起请求
      this.data.splice(this.deleteIdx, 1);
      this.pagination.total = this.data.length;
      this.confirmVisible = false;
      this.$message.success('删除成功');
      this.resetIdx();
    },
    onCancel() {
      this.resetIdx();
    },
    resetIdx() {
      this.deleteIdx = -1;
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: 24px 24px 2px;
  border-radius: @border-radius;
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}
.t-button + .t-button {
    margin-left: @spacer;
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

.operate-wrapper {
  display: flex;
  .search-input {
    width: 240px;
    margin-bottom: 16px;
  }
  .button-group {
    margin-left: auto;
    display: flex;
  }
}
</style>
