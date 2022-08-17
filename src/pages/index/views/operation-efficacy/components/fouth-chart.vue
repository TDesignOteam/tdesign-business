<template>
  <t-row :gutter="[16, 16]">
    <t-col :xs="12" :xl="8">
      <t-card title="滞留时长趋势" class="dashboard-chart-card">
        <template #actions>
          <t-radio-group default-value="2" class="radio-group-container">
            <t-radio-button value="1">今日</t-radio-button>
            <t-radio-button value="2">本周</t-radio-button>
            <t-radio-button value="3">本月</t-radio-button>
            <t-radio-button value="4">全年</t-radio-button>
          </t-radio-group>
          <t-date-range-picker
            class="card-date-picker-container"
            theme="primary"
            mode="date"
            :default-value="LAST_7_DAYS"
            @change="onCurrencyChange"
          />
        </template>
        <div
          id="monitorContainer1"
          ref="monitorContainer1"
          :style="{ width: '100%', height: `${resizeTime * 326}px` }"
        ></div>
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="4">
      <t-card title="执行效率指标" class="dashboard-chart-card">
        <div
          id="countContainer1"
          ref="countContainer1"
          :style="{ width: `${resizeTime * 326}px`, height: `${resizeTime * 326}px`, margin: '0 auto' }"
        ></div>
      </t-card>
    </t-col>
  </t-row>
</template>
<script>
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { RadarChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import { LAST_7_DAYS } from '@/utils/date';

import { getRadarChartDataSet, getMulColumnChartDataSet } from '../index';
import { changeChartsTheme } from '@/utils/color';

echarts.use([TooltipComponent, LegendComponent, RadarChart, GridComponent, BarChart, CanvasRenderer]);

export default {
  name: 'MiddleChart',
  data() {
    return {
      LAST_7_DAYS,
      resizeTime: 1,
      currentMonth: this.getThisMonth(),
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

    window.addEventListener('resize', this.updateContainer, false);
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
      this.monitorChart.setOption(getMulColumnChartDataSet({ dateTime: checkedValues, ...chartColors }));
    },
    updateContainer() {
      if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
        this.resizeTime = (document.documentElement.clientWidth / 2080).toFixed(2);
      } else if (document.documentElement.clientWidth < 1080) {
        this.resizeTime = (document.documentElement.clientWidth / 1080).toFixed(2);
      } else {
        this.resizeTime = 1;
      }

      this.countChart.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 326}px`,
        height: `${this.resizeTime * 326}px`,
      });

      this.monitorChart.resize({
        // 根据父容器的大小设置大小
        width: this.monitorContainer.clientWidth,
        height: `${this.resizeTime * 326}px`,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      // 资金走势
      if (!this.monitorContainer) {
        this.monitorContainer = document.getElementById('monitorContainer1');
      }
      this.monitorChart = echarts.init(this.monitorContainer);
      this.monitorChart.setOption(getMulColumnChartDataSet({ ...chartColors }));

      // 销售合同占比
      if (!this.countContainer) {
        this.countContainer = document.getElementById('countContainer1');
      }
      this.countChart = echarts.init(this.countContainer);

      const option = getRadarChartDataSet(chartColors);
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

</style>
