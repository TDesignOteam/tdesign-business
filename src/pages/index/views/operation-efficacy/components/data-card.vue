<template>

</template>

<script>
export default {
  name: "data-card",
  props: {
    data:{
      type: Object,
      default(){
        return {
          title: '总人数',
          unit: '人',
          yearOnYear: {
            change:'',
            trend: 0, // 0:下跌; 1:上涨
          },
          monthOnMonth: {
            change:'',
            trend: 0, // 0:下跌; 1:上涨
          },
          number: '12,344,245',
        }
      }
    }
  }

}
</script>

<style scoped>

</style>
