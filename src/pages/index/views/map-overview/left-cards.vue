<template>
  <div class="left-card-wrapper">
    <div v-for="(item,index) in leftCardData" :key="item.title" class="left-card-item">
      <div class="left-card-top">
        <span class="left-card-top-title">{{ item.title }}</span>
        <span class="left-card-top-subtitle">{{ item.subTitle }}</span>
        <span class="left-card-top-titleIcon"></span>
      </div>
      <div class="left-card-number">{{ item.number }}</div>
      <div v-if="index<=1" :id="`chart-${index+1}`" :ref="`chart-${index+1}`"  style="width: 100%; height: 32px"></div>
      <div  v-if="index>1" :id="`chart-${index+1}`" :ref="`chart-${index+1}`"  class="left-card-pie"></div>
      <div v-if="item.upTrend || item.downTrend" class="trend-wrapper">
        <span class="trend-text">周同比</span>
        <span class="trend-icon"> <icon name="caret-up-small" size="16px"/></span>
        <span class="trend-number">{{ item.upTrend || item.downTrend }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';
import { Icon } from 'tdesign-icons-vue'

import { changeChartsTheme } from '@/utils/color';
import { PANE_LIST } from '@/service/service-base';
import {chartData} from './index'

echarts.use([LineChart, BarChart, PieChart, CanvasRenderer, GridComponent]);

export default {
  name: "left-cards",
  components: {
    Icon
  },
  data(){
    return {
      leftCardData: [
        {
          title: '区域人口流量',
          subTitle: '（万人）',
          number: '123',
        },
        {
          title: '地铁发车班次',
          subTitle: '',
          number: '646',
        },
        {
          title: '车流密度',
          subTitle: '',
          number: '88.86%',
        },
        {
          title: '识别成功率',
          subTitle: '',
          number: '71.21%',
          descripe: '同比',
          downTrend: '8.23%',
        },
      ]
    }
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      if (!this.container1) this.container1 = document.getElementById('chart-1');
      this.charts1 = echarts.init(this.container1);
      this.charts1.setOption(chartData('line'));

      if (!this.container2) this.container2 = document.getElementById('chart-2');
      this.charts2 = echarts.init(this.container2);
      this.charts2.setOption(chartData('bar'));

      if (!this.container3) this.container3 = document.getElementById('chart-3');
      this.charts3 = echarts.init(this.container3);
      this.charts3.setOption(chartData('pie', 2));

      if (!this.container4) this.container4 = document.getElementById('chart-4');
      this.charts4 = echarts.init(this.container4);
      this.charts4.setOption(chartData('pie', 3));
    },
  }
}
</script>

<style scoped lang="less">
.left-card {

  &-wrapper {
    margin: 24px 24px;
    //position: absolute;
    //top: 24px;
    //left: 24px;
  }
  &-item {
    position: relative;
    width: 278px;
    height: 148px;
    padding: 24px;
    margin-bottom: 16px;
    border-radius: 3px;
    opacity: 1;
    background: rgba(255,255,255,1);
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05), 0 4px 5px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.12);
  }
  &-top {
    margin-bottom: 4px;
    height: 22px;
    font-size: 14px;
    line-height: 22px;
    &-title {
      color: rgba(0,0,0,0.9);
    }
    &-subtitle {
      color: rgba(0,0,0,0.4);
    }
  }
  &-number {
    opacity: 1;
    margin-bottom: 10px;
    color: #181818;
    font-size: 28px;
    font-weight: Bold;
    line-height: 36px;
  }
  &-pie {
    position: absolute;
    right: 24px;
    top: 52px;
    width: 80px; height: 80px
  }
}

.trend{
  &-wrapper {
    display: flex;
    margin-top: 6px;
    height: 22px;
    line-height: 22px;
    color: rgba(0,0,0,0.26);
  }
  &-text {
    margin-right: 4px;
  }
  &-icon {
    color: #00A870;
  }
  &-number {
    height: 22px;
    opacity: 1;
    color: #00A870;
    font-size: 14px;
    text-align: left;

  }
}
</style>
