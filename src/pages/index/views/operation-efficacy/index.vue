<template>
  <div>
    <!-- 顶部 card  -->
    <top-panel class="row-container" />
    <!-- 事件发布表单   -->
    <event-release class="row-container"></event-release>
    <!-- 中部图表  -->
    <middle-chart class="row-container" />
    <fouth-chart class="row-container"/>
    <views-chart class="row-container"/>
    <!-- 列表排名 -->
    <rank-list class="row-container" />
    <!-- 出入库概览 -->
<!--    <over-view class="row-container" />-->
  </div>
</template>
<script>
import TopPanel from './components/top-panel.vue';
import EventRelease from "./components/event-release";
import MiddleChart from './components/middle-chart.vue';
import FouthChart from './components/fouth-chart.vue';
import ViewsChart from './components/views-chart.vue';
import RankList from './components/rank-list.vue';

export default {
  name: 'DashboardBase',
  components: {
    TopPanel,
    EventRelease,
    FouthChart,
    ViewsChart,
    MiddleChart,
    RankList,
  },
};
</script>
<style scoped>
.row-container {
  margin-bottom: 16px;
}

</style>
