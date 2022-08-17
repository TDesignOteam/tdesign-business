<template>
  <t-row :gutter="[16, 16]">
    <t-col :xs="12" :xl="6">
      <t-card title="人员出勤情况" class="dashboard-chart-card">
        <div id="monitorCard">
          <t-row :gutter="[16, 16]" class="dashboard-cards-wrapper">
            <t-col v-for="(item, index) in cardData" :key="item.name" :xs="12" :xl="4">
              <div class="dashboard-cards-item" :class="{ line:index !== 2 }">
                <div class="dashboard-cards-item-head">
                  <span class="dashboard-cards-item-title">{{ item.title }}</span>
                  <span class="dashboard-cards-item-subtitle">{{ item.subtitle }}</span>
                </div>
                <div class="dashboard-cards-item-content">{{ item.content }}</div>
              </div>
            </t-col>
          </t-row>
          <div
            id="monitorContainer"
            ref="monitorContainer"
            :style="{ width: '100%', height: `${resizeTime * 290}px` }"
          ></div>
        </div>
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="6">
      <t-card title="商品类别占比" class="dashboard-chart-card">
        <template #actions>
          <t-radio-group default-value="2" class="radio-group-container">
            <t-radio-button value="1">全部</t-radio-button>
            <t-radio-button value="2">线下</t-radio-button>
            <t-radio-button value="3">线上</t-radio-button>
          </t-radio-group>
        </template>
        <div
          id="countContainer"
          ref="countContainer"
          :style="{ width: `100%`, height: `100%` }"
        ></div>
      </t-card>
    </t-col>
  </t-row>
</template>
<script>
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { PieChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import { LAST_7_DAYS } from '@/utils/date';

import { getPieChartDataSet, getLineChartDataSet } from '../index';
import { changeChartsTheme } from '@/utils/color';

echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, CanvasRenderer]);

export default {
  name: 'MiddleChart',
  data() {
    return {
      LAST_7_DAYS,
      resizeTime: 1,
      monitorContainer: null,
      currentMonth: this.getThisMonth(),
      cardData: [
        {
          title: '今日出勤人数',
          subtitle: '（人）',
          content: '3,233',
        },
        {
          title: '出勤率',
          subtitle: '',
          content: '92%',
        },
        {
          title: '请假人数',
          subtitle: '（人）',
          content: '28',
        },

      ]
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']), // 这里需要用到主题色和主题模式的全局配置
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.countChart, this.monitorChart]);
    },
    mode() {
      [this.countChart, this.monitorChart].forEach((item) => {
        item.dispose();
      });
      this.renderCharts();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainer();
    });
    window.addEventListener('resize',this.debounce(this.updateContainer, 500), false);
    this.renderCharts();
  },

  methods: {
    /** 获取当前选中时间的短时间表达法 */
    getThisMonth(checkedValues = '') {
      let date;
      if (!checkedValues || checkedValues.length === 0) {
        date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      }
      date = new Date(checkedValues[0]);
      const date2 = new Date(checkedValues[1]);
      const startMonth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const endMonth = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : `0${date2.getMonth() + 1}`;

      return `${date.getFullYear()}-${startMonth}  至  ${date2.getFullYear()}-${endMonth}`;
    },
    /** 资金走趋选择 */
    onCurrencyChange(checkedValues) {
      const { chartColors } = this.$store.state.setting;

      this.currentMonth = this.getThisMonth(checkedValues);
      this.monitorChart.setOption(getLineChartDataSet({ dateTime: checkedValues, ...chartColors }));
    },
    debounce(fn,delay){
      let timer = null;
      return function() {
        if(timer){
          clearTimeout(timer)
        }
        timer = setTimeout(fn,delay); // 简化写法
      }
    },
    updateContainer() {
      if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
        this.resizeTime = (document.documentElement.clientWidth / 2080).toFixed(2);
      } else if (document.documentElement.clientWidth < 1080) {
        this.resizeTime = (document.documentElement.clientWidth / 1080).toFixed(2);
      } else {
        this.resizeTime = 1;
      }

      this.monitorChart.resize({
        // 根据父容器的大小设置大小
        width: this.monitorContainer.clientWidth,
        height: `${this.resizeTime * 290}px`,
      });

      this.countChart.resize({
        // 根据父容器的大小设置大小
        width: this.monitorContainer.clientWidth,
        height: this.monitorCard.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      // 出勤情况
      if (!this.monitorContainer) {
        this.monitorContainer = document.getElementById('monitorContainer');
        this.monitorCard = document.getElementById('monitorCard');
      }
      this.monitorChart = echarts.init(this.monitorContainer);
      this.monitorChart.setOption(getLineChartDataSet({ ...chartColors }));

      // 商品类别占比
      if (!this.countContainer) {
        this.countContainer = document.getElementById('countContainer');
      }
      this.countChart = echarts.init(this.countContainer);

      const option = getPieChartDataSet(chartColors);
      this.countChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.dashboard-chart-card {
  padding: 8px;

  /deep/ .t-card__header {
    padding-bottom: 24px;
  }

  /deep/ .t-card__title {
    font-size: 20px;
    font-weight: 500;
  }
}
.dashboard-cards-wrapper{
  margin-bottom: 24px;
  .dashboard-cards-item {
    &-title {
      color: rgba(0,0,0,0.9);
      font-size: 14px;
      font-weight: 400;
    }
    &-subtitle{
      color: rgba(0,0,0,0.4);
      font-size: 14px;
      font-weight: 400;
    }
    &-content {
      margin-top: 4px;
      color: rgba(0,0,0,0.9);
      font-size: 36px;
      font-weight: 700;
      line-height: 44px;
      height: 44px;
    }
  }
}

.line:after {
  position: absolute;
  top: 3px;
  right: 16px;
  width: 1px;
  height: 64px;
  background: #e7e7e7;
  content: '';
}

</style>
