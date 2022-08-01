<template>
  <result title="403 Forbidden" tip="地图页面">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </result>
</template>

<script>
import result from '@/components/result/index.vue';

export default {
  name: 'Result403',
  components: { result },
};
</script>
