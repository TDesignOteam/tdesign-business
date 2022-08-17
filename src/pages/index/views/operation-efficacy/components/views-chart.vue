<template>
  <t-tabs v-model="value">
    <!-- 默认插槽 和 具名插槽（panel）都是用来渲染面板内容 -->
    <t-tab-panel value="first" label="访问量" :destroyOnHide="false">
      <t-row>
        <t-col :xs="12" :xl="8">
          <t-card
            :bordered="false"
            title="访问量"
            :class="{ 'dashboard-overview-card': true, 'overview-panel': true }"
          >
            <!--        <template #actions>-->
            <!--          <div class="actions-wrapper">-->
            <!--            <t-radio-group default-value="2" class="radio-group-container">-->
            <!--              <t-radio-button value="1">今日</t-radio-button>-->
            <!--              <t-radio-button value="2">本周</t-radio-button>-->
            <!--              <t-radio-button value="3">本月</t-radio-button>-->
            <!--              <t-radio-button value="4">全年</t-radio-button>-->
            <!--            </t-radio-group>-->
            <!--            <t-date-range-picker-->
            <!--              class="card-date-picker-container"-->
            <!--              theme="primary"-->
            <!--              mode="date"-->
            <!--              :default-value="LAST_7_DAYS"-->
            <!--              @change="onStokeDataChange"-->
            <!--            />-->
            <!--          </div>-->
            <!--        </template>-->
            <div
              id="stokeContainer1"
              style="width: 100%; height: 254px"
              ref="stokeContainer1"
              class="dashboard-chart-container"
            ></div>
          </t-card>
        </t-col>
        <t-col :xs="12" :xl="4">
          <t-card
            :bordered="false"
            title="各个站点访问排行"
            :class="{ 'dashboard-overview-card': true, 'rank-list': true }"
          >
            <div v-for="(item, index) in visiList" :key="index" class="rank-list-wrapper">
              <div class="rank-list-line">
                <span class="rank-list-line-number">{{ index + 1 }}</span>
                <span class="rank-list-line-name">{{ item.name }}</span>
                <span class="rank-list-line-content">{{ item.content }}</span>
              </div>
            </div>
          </t-card>
        </t-col>
      </t-row>

    </t-tab-panel>
    <t-tab-panel value="second" label="申报数" :destroyOnHide="false">
      <p slot="panel" style="padding: 25px">选项卡2的内容</p>
    </t-tab-panel>
  </t-tabs>
</template>
<script>
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import { constructInitDataset } from '../index';
import { changeChartsTheme } from '@/utils/color';
import { LAST_7_DAYS } from '@/utils/date';

import { VISIT_RANK_LIST } from '@/service/service-base';

echarts.use([TooltipComponent, LegendComponent, GridComponent, CanvasRenderer, BarChart]);

export default {
  name: 'Overview',
  data() {
    return {
      value: 'first',
      visiList: VISIT_RANK_LIST,
      LAST_7_DAYS,
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']), // 这里需要用到主题色和主题模式的全局配置
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.stokeChart]);
    },
    mode() {
      [this.stokeChart].forEach((item) => {
        item.dispose();
      });
      this.renderCharts();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainer();
    });

    window.addEventListener('resize', this.updateContainer, false);
    this.renderCharts();
  },

  methods: {
    /** 出入库概览日期更新 */
    onStokeDataChange(checkedValues) {
      const { chartColors } = this.$store.state.setting;

      this.stokeChart.setOption(constructInitDataset({ ...chartColors }));
    },
    updateContainer() {
      this.stokeChart.resize({
        // 根据父容器的大小设置大小
        width: this.stokeContainer.clientWidth,
        height: this.stokeContainer.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;
      // 出入库概览
      if (!this.stokeContainer) this.stokeContainer = document.getElementById('stokeContainer1');
      this.stokeChart = echarts.init(this.stokeContainer);
      this.stokeChart.setOption(constructInitDataset({ ...chartColors }));
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

/deep/ .t-card__body {
  padding: 8px 0 0;
}

.dashboard-overview-card {
  /deep/ .t-card__header {
    padding-bottom: 0px;
  }
  /deep/ .t-card__body {
    padding: 0 0 18px 24px;
  }

  /deep/ .t-card__title {
    font-size: 16px;
    font-weight: 500;
  }

  &.overview-panel {
    border-right: none;
  }

  &.export-panel {
    border-left: none;
  }
}

.inner-card {
  height: 132px;
  margin-top: 24px;
  /deep/ .t-card__header {
    padding:0;
    margin-bottom: 4px;
  }
  /deep/ .t-card__body {
    padding: 0;
  }
  &__wrapper:after{
    position: absolute;
    top: 24px;
    right: 24px;
    width: 1px;
    height: 264px;
    background: rgba(231,231,231,1);
    content: '';
  }
  &__content {
    &-title {
      font-size: 36px;
      line-height: 44px;
      margin-bottom: 16px;
    }

    &-footer {
      display: flex;
      align-items: center;
      line-height: 22px;
      color: var(--td-text-color-placeholder);

      .trend-tag {
        margin-left: 4px;
      }
    }
  }
  &:not(:last-child):after{
    position: absolute;
    bottom: 0;
    width: 156px;
    height: 1px;
    background: #E7E7E7;
    content: '';
  }

}
.dashboard-chart-container{
  margin-top: 16px;
}
.radio-group-container {
  position: absolute;
  top: 16px;
  right: 280px;
  //margin-right: 16px;
  /deep/ .t-radio-button{
    height: 24px;
  }
}
/deep/ .t-range-input {
  height: 24px;
}
.rank-list {
  padding-left: 24px;
  &-wrapper {
    //padding-bottom: 18px;
  }
  &-line {
    position: relative;
    //width: 100%;
    padding: 9px 0;
    display: flex;
    &-number {
      position: absolute;
      top: 8px;
      left: 0px;
      display: inline-flex;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      color: white;
      font-size: 14px;
      background-color: var(--td-brand-color-8);
      align-items: center;
      justify-content: center;
    }
    &-name {
      height: 22px;
      line-height: 22px;
      margin-left: 48px;
      color: rgba(0,0,0,0.9);
      font-size: 14px;
    }
    &-content {
      height: 22px;
      line-height: 22px;
      margin-left: auto;
      color: rgba(0,0,0,0.9);
      font-size: 14px;
    }
  }
  /deep/ .t-card__header {
    padding-top: 24px;
    padding-bottom: 16px;
  }
  /deep/ .t-card__body {
    padding: 0 24px 24px 24px;
  }

  /deep/ .t-card__title {
    font-size: 16px;
    font-weight: 500;
  }
  &:before {
    position: absolute;
    top: 64px;
    left: 24px;
    width: 1px;
    height: 240px;
    background: rgba(231,231,231,1);
    content: '';
  }
}

</style>
