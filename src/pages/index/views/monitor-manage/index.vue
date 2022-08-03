<template>
  <div class="monitor-manage-wrapper" >
    <div class="option-wrapper">
      <t-button class="option-button" theme="default" variant="base" @click="handleVisible">
        <setting-icon></setting-icon>
        设置
      </t-button>
    </div>
    <div class="option-prop-wrapper" :class="{hidden:!isVisible}">
      <div class="option-prop-item">
        <span class="option-prop-item-text">轮播</span>
        <t-switch class="option-prop-item-switch"/>

      </div>
      <div class="option-prop-item">
        <span class="option-prop-item-text">轮播</span>
        <t-input-adornment  append="s">
          <t-input v-model="inputValue" size="small" class="option-prop-item-input"/>
        </t-input-adornment>
      </div>
      <div class="option-prop-item">
        <span class="option-prop-item-text">轮播</span>
        <t-select class="option-prop-item-select" size="small" v-model="selectValue" :options="options" />
      </div>
    </div>
    <t-swiper :current="current" :navigation="{ showSlideBtn: 'never' }">
      <t-swiper-item v-for="photoNumber in swiper" :key="photoNumber">
        <div class="monitor-manage-item" >
          <t-row v-for="index in swiper" :key="index">
            <t-col  :span="3" v-for="index in swiper" :key="index">
              <img v-if="photoNumber===1" class="camera-item" :src="require('@/assets/assets-photo-1.png')"><img/>
              <img v-if="photoNumber===2" class="camera-item" :src="require('@/assets/assets-photo-2.png')"><img/>
              <img v-if="photoNumber===3" class="camera-item" :src="require('@/assets/assets-photo-3.png')"><img/>
              <img v-if="photoNumber===4" class="camera-item" :src="require('@/assets/assets-photo-4.png')"><img/>
            </t-col>
          </t-row>
        </div>
      </t-swiper-item>
    </t-swiper>
  </div>
</template>

<script>
import { SettingIcon } from 'tdesign-icons-vue';

export default {
  name: "index.vue",
  components: {
    SettingIcon,
  },
  data() {
    return {
      current: 1,
      selectValue: 1,
      inputValue: 10,
      isVisible: false,
      swiper: [1,2,3,4],
      photos: [1,2,3],
      options: [
        {
          label:'单画面',
          value: 1,
        },
        {
          label:'三画面',
          value: 3,
        },
        {
          label:'九画面',
          value: 9,
        }
      ]
    }
  },
  methods:{
    handleVisible(){
      this.isVisible = !this.isVisible;
    }
  }
}
</script>

<style lang="less" scoped>
  .option {
    &-wrapper{
      display: flex;
      padding-bottom: 10px;
      text-align: left;
    }
    &-button {
      margin-left:auto ;
      color: rgba(0,0,0,0.9);
      font-size: 14px;
    }
  }
  .monitor-manage {
    &-wrapper {
      position: relative;
      height: calc(100vh - 140px);
      padding: 24px;
      background: #ffffff;
    }
    &-item {
      height: calc(100vh - 230px);
      background: #ffffff;
      overflow: auto;
    }

  }
  .camera-item{
    margin: 0 8px 16px;
    width: calc(100% - 16px);
    height: auto;
    border-radius: 3px;
    background: #F3F3F3;
  }
  .option-prop {
    &-wrapper {
      position: absolute;
      top: 64px;
      right: 24px;
      width: 160px;
      height: 112px;
      padding: 6px;
      border-radius: 6px;
      background: #ffffff;
      box-shadow: 0 1px 10px 0px rgba(0,0,0,0.05), 0px 4px 5px 0px rgba(0,0,0,0.08), 0px 2px 4px -1px rgba(0,0,0,0.12);
      z-index: 3;
    }
    &-item {
      width: 148px;
      height: 28px;
      padding: 0 8px;
      &-text {
        height: 28px;
        margin-right: 15px;
        line-height: 28px;
        color: rgba(0,0,0,0.9);
        font-size: 14px;
        font-weight: 400;
      }
      &-switch{
        margin-bottom: 5px;
      }
      &-select {
        margin-bottom: 5px;
        width: 86px;
        display: inline-block;
      }
      &-input {
        //margin-bottom: 6px;
        width: 54px;
        display: inline-block;
      }
      &:not(:first-child) {
        margin-top: 8px;
      }

    }
  }
  .t-input-adornment--append {
    display: inline;
  }
  .hidden {
    display: none;
  }
  /deep/ .t-swiper__navigation-bars .t-swiper__navigation-item span {
    background: #dcdcdc;
  }
  /deep/ .t-swiper__navigation-bars .t-swiper__navigation-item.t-is-active span {
    background: rgba(0,0,0,0.4);
  }

</style>
