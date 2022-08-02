<template>
  <div>
    <t-card class="list-card-container">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <span class="label">消息内容</span>
          <div class="search-input">
            <t-input placeholder="请输入角色名称"></t-input>
          </div>
          <span class="label">消息模块</span>
          <div class="search-input">
            <t-input placeholder="请选择消息模块"></t-input>
          </div>
          <span class="label">时间</span>
          <div class="search-input">
            <t-date-range-picker allow-input clearable @pick="onPick" @change="onChange" />
          </div>
        </div>
        <div class="operate-wrapper">
          <div class="button-group">
            <t-button theme="primary">
              查询
            </t-button>
            <t-button theme="base">
              重置
            </t-button>
          </div>
        </div>
      </t-row>
      <t-row justify="space-between">
        <div class="select-count-wrapper">
          <span class="selected-text">已选择<span class="selected-count">{{ selectedRowKeys.length }}</span>项</span>
          <t-button variant="outline" size="small">删除</t-button>
        </div>
      </t-row>
      <div class="table-container">
        <t-table
          :maxHeight="$getFirstLevelTableHeight()"
          :columns="columns"
          :data="data"
          :rowKey="rowKey"
          :verticalAlign="verticalAlign"
          :hover="hover"
          :pagination="pagination"
          :selected-row-keys="selectedRowKeys"
          :loading="dataLoading"
          @page-change="rehandlePageChange"
          @change="rehandleChange"
          @select-change="rehandleSelectChange"
          :headerAffixedTop="true"
          :headerAffixProps="{ offsetTop: offsetTop, container: getContainer }"
        >
          <template #status="{ row }">
            <t-tag v-if="row.status === CONTRACT_STATUS.FAIL" theme="danger" variant="light">审核失败</t-tag>
            <t-tag v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING" theme="warning" variant="light">待审核</t-tag>
            <t-tag v-if="row.status === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light">待履行</t-tag>
            <t-tag v-if="row.status === CONTRACT_STATUS.EXECUTING" theme="success" variant="light">履行中</t-tag>
            <t-tag v-if="row.status === CONTRACT_STATUS.FINISH" theme="success" variant="light">已完成</t-tag>
          </template>
          <template #contractType="{ row }">
            <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
            <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
            <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
          </template>
          <template #paymentType="{ row }">
            <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT" class="payment-col">
              付款
              <trend class="dashboard-item-trend" type="up" />
            </p>
            <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECIPT" class="payment-col">
              收款
              <trend class="dashboard-item-trend" type="down" />
            </p>
          </template>

          <template #op="slotProps">
            <a class="t-button-link" @click="handleClickDetail()">详情</a>
            <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
          </template>
        </t-table>
      </div>
    </t-card>
    <t-dialog
      header="确认删除当前所选合同？"
      :body="confirmBody"
      :visible.sync="confirmVisible"
      @confirm="onConfirmDelete"
      :onCancel="onCancel"
    >
    </t-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { SearchIcon, AddIcon } from 'tdesign-icons-vue';
import Trend from '@/components/trend/index.vue';
import { prefix } from '@/config/global';

import { CONTRACT_STATUS, CONTRACT_STATUS_OPTIONS, CONTRACT_TYPES, CONTRACT_PAYMENT_TYPES } from '@/constants';

export default Vue.extend({
  name: 'ListBase',
  components: {
    SearchIcon,
    Trend,
  },
  data() {
    return {
      CONTRACT_STATUS,
      CONTRACT_STATUS_OPTIONS,
      CONTRACT_TYPES,
      CONTRACT_PAYMENT_TYPES,
      prefix,
      dataLoading: false,
      data: [],
      selectedRowKeys: [1, 2],
      value: 'first',
      columns: [
        { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
        {
          title: '合同名称',
          align: 'left',
          width: 250,
          ellipsis: true,
          colKey: 'name',
          fixed: 'left',
        },
        { title: '合同状态', colKey: 'status', width: 200, cell: { col: 'status' } },
        {
          title: '合同编号',
          width: 200,
          ellipsis: true,
          colKey: 'no',
        },
        {
          title: '合同类型',
          width: 200,
          ellipsis: true,
          colKey: 'contractType',
        },
        {
          title: '合同收付类型',
          width: 200,
          ellipsis: true,
          colKey: 'paymentType',
        },
        {
          title: '合同金额 (元)',
          width: 200,
          ellipsis: true,
          colKey: 'amount',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 200,
          colKey: 'op',
          title: '操作',
        },
      ],
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      hover: true,
      rowClassName: (rowKey: string) => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        defaultPageSize: 20,
        total: 0,
        defaultCurrent: 1,
      },
      searchValue: '',
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
      .catch((e: Error) => {
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
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    rehandleSelectChange(selectedRowKeys: number[]) {
      this.selectedRowKeys = selectedRowKeys;
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    handleClickDetail() {
      this.$router.push('/detail/base');
    },
    handleSetupContract() {
      this.$router.push('/form/base');
    },
    handleClickDelete(row: { rowIndex: any }) {
      this.deleteIdx = row.rowIndex;
      this.confirmVisible = true;
    },
    onConfirmDelete() {
      // 真实业务请发起请求
      this.data.splice(this.deleteIdx, 1);
      this.pagination.total = this.data.length;
      const selectedIdx = this.selectedRowKeys.indexOf(this.deleteIdx);
      if (selectedIdx > -1) {
        this.selectedRowKeys.splice(selectedIdx, 1);
      }
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
});
</script>

<style lang="less" scoped>
@import '@/style/variables';

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}

.left-operation-container {
  display: flex;
  padding: 0 0 6px 0;
  margin-bottom: 16px;

  .selected-count {
    display: inline-block;
    margin-left: 8px;
    color: var(--td-text-color-secondary);
  }
  .label {
    line-height: 32px;
    opacity: 1;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    font-weight: 400;
    margin: 0 16px;
  }
}

.operate-wrapper {
  display: flex;
  .search-input {
    width: 360px;
  }
  .button-group {
    display: flex;
  }
}

.t-button + .t-button {
    margin-left: @spacer;
 }
.select-count-wrapper{
  width: 100%;
  background: #F3F3F3;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(231,231,231,1);
  .selected-text {
    height: 22px;
    margin-right: 16px;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
  .selected-count {
    height: 22px;
    padding: 0 4px;
    color: #0052d9;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
  }
 }

</style>
