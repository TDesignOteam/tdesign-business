<template>
  <t-row :gutter="[16, 16]">
    <t-col :xs="6" :xl="3" v-for="(item) in panelList" :key="item.title">
      <t-card
        :style="{ height: '168px' }"
        :class="{ 'dashboard-item': true }"
        :title="item.title"
        :subtitle="item.unit"
      >
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">{{ item.number }}</span>
        </div>
        <template #footer>
          <div class="dashboard-item-bottom">
            <div v-for="trend in item.trends" :key="trend.descripe" class="dashboard-item-block">
              {{ trend.descripe }}
              <trend
                class="dashboard-item-trend"
                :type="trend.upTrend ? 'up' : 'down'"
                :describe="trend.upTrend || trend.downTrend"
              />
            </div>
          </div>
        </template>
      </t-card>
    </t-col>
  </t-row>
</template>
<script>
import { LineChart, BarChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { mapState } from 'vuex';

import Trend from '@/components/trend/index.vue';

import { changeChartsTheme } from '@/utils/color';
import { PANE_LIST } from '@/service/service-base';

echarts.use([LineChart, BarChart, CanvasRenderer]);

export default {
  name: 'TopPanel',
  components: {
    Trend,
  },
  data() {
    return {
      resizeTime: 1,
      panelList: PANE_LIST,
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']), // 这里需要用到主题色和主题模式的全局配置
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.refundChart]);
    },
    mode() {
      [this.moneyCharts, this.refundChart].forEach((item) => {
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
    updateContainer() {
      if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
        this.resizeTime = (document.documentElement.clientWidth / 2080).toFixed(2);
      } else if (document.documentElement.clientWidth < 1080) {
        this.resizeTime = (document.documentElement.clientWidth / 1080).toFixed(2);
      } else {
        this.resizeTime = 1;
      }
    },

  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.dashboard-item {
  padding: 8px 0;

  /deep/ .t-card__footer {
    padding-top: 0;
    padding-right: 42px;
  }

  /deep/ .t-card__title {
    font-size: 14px;
    font-weight: 400;
  }

  /deep/ .t-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    position: relative;
  }

  &:hover {
    cursor: pointer;
  }

  &-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    > span {
      display: inline-block;
      color: var(--td-text-color-primary);
      font-size: 36px;
      font-weight: 700;
      line-height: 44px;
    }
  }

  &-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > .t-icon {
      cursor: pointer;
    }
  }

  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 22px;
    color: var(--td-text-color-placeholder);
  }

  &-trend {
    margin-left: 4px;
  }

  &-left {
    position: absolute;
    top: 0;
    right: 32px;

    > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: var(--td-brand-color-1);
      border-radius: 50%;

      .t-icon {
        font-size: 24px;
        color: var(--td-brand-color);
      }
    }
  }

  // 针对第一个卡片需要反色处理
  &--main-color {
    background: var(--td-brand-color);
    color: var(--td-text-color-primary);

    /deep/ .t-card__title,
    .dashboard-item-top span,
    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }

    .dashboard-item-block {
      color: var(--td-text-color-anti);
      opacity: 0.6;
    }

    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }
  }
}
</style>
