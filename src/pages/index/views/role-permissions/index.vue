<template>
  <div class="list-common-table">
    <div class="operate-wrapper">
      <t-form layout="inline" labelAlign="left">
        <t-form-item label="角色名称" name="name">
          <t-input placeholder="请输入角色名称" />
        </t-form-item>
        <t-form-item label="角色名称" name="name" initialData="TDesign">
          <t-input placeholder="请输入角色编码" />
        </t-form-item>
      </t-form>
      <div class="button-group">
        <t-button theme="primary">
          <add-icon slot="icon"/>
          创建角色
        </t-button>
      </div>
    </div>
    <div class="table-container">
      <t-table
        :data="data"
        :columns="columns"
        :maxHeight="$getFirstLevelTableHeight() + 74"
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
          <a class="t-button-link" @click="rehandleClickOp(row)">关联功能授权</a>
          <a v-if="row.status === PERSON_STATUS.DISABLE" class="t-button-link" @click="rehandleClickOp(row)">启用</a>
          <a v-if="row.status === PERSON_STATUS.ENABLE" class="t-button-link" @click="rehandleClickOp(row)">禁用</a>
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
          title: '角色名称',
          fixed: 'left',
          width: 160,
          align: 'left',
          ellipsis: true,
          colKey: 'name',
        },
        {
          title: '角色编码',
          fixed: 'left',
          width: 180,
          align: 'left',
          ellipsis: true,
          colKey: 'code',
        },
        {
          title: '角色描述',
          fixed: 'left',
          width: 328,
          align: 'left',
          ellipsis: true,
          colKey: 'description',
        },
        { title: '状态', colKey: 'status', width: 130, cell: { col: 'status' } },
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
      },
      confirmVisible: false,
      deleteIdx: -1,
    };
  },
  computed: {
    confirmBody() {
      if (this.deleteIdx > -1) {
        const { name } = this.data?.[this.deleteIdx];
        return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
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
      .get('/api/get-list')
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
  margin-bottom: 16px;
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
