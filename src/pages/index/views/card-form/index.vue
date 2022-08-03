<template>
<div class="card-form-wrapper">
  <div>
    <img class="head-photo" :src="require('@/assets/assets-card-form-head.png')">
  </div>
  <div class="card-wrapper">
    <div v-for="item in cardData" :key="item.name" class="card-item">
      <div class="card-item-content">
        <div class="card-item-content-icon">
          <icon :name="item.icon" size="28px"></icon>
        </div>
        <div class="card-item-content-name">{{ item.name }}</div>
        <div class="card-item-content-describe">{{ item.describe }}</div>
      </div>
      <div class="card-item-option">
        <div class="card-item-option-button">
          <a href="">查看</a>
        </div>
        <div class="card-item-option-button">
          <a href="">下载代码包</a>
        </div>
        <div class="card-item-option-button">
          <a href="">最佳实践</a>
        </div>
      </div>
    </div>
  </div>
  <t-pagination
    class="card-pagination"
    v-model="current"
    :total="101"
    :page-size.sync="pageSize"
    show-jumper
  />
</div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue';

export default {
  name: "index",
  components: {
    Icon
  },
  data(){
    return {
      cardData:[
        {
          icon: 'discount',
          name: 'Goff for Java',
          describe: '基于SpringCloud，提供全套的企业级Java开发框架',
        },
        {
          icon: 'view-module',
          name: 'Goff for Go',
          describe: '基于SpringCloud，提供全套的企业级Go开发框架',
        },
        {
          icon: 'folder',
          name: 'TDesign Starter',
          describe: '提供高质量Vue组件，开箱即用的企业级解决方案',
        },
        {
          icon: 'logo-chrome',
          name: '小程序代码框架',
          describe: '高行业普适性，方便快捷的小程序代码框架',
        },
        {
          icon: 'desktop',
          name: '前端网关',
          describe: '提供小程序的前端缓存、限流SDK以及前端日志',
        },
      ],
      pageSize: 20,
      current: 1,
    }
  }
}
</script>

<style lang="less" scoped>
.card-form-wrapper {
  position: relative;
  height: 100%;
  min-width: 1160px;
  .head-photo {
    width: 100%;
    min-width: 1160px;
    height: auto;
    margin-bottom: 16px;
  }
  .card {
    &-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      margin: 0 16px 16px 0;
      height: 240px;
      width: 278px;
      background: #ffffff;
      border: 1px solid rgba(220,220,220,1);

      &-content {
        padding: 24px;
        &-icon {
          padding: 14px;
          color: #0052D9;
          background: #D4E3FC;
          border-radius: 50%;
          height: 56px;
          width: 56px;
          margin-bottom: 16px;
        }
        &-name {
          height: 24px;
          margin-bottom: 8px;
          color: rgba(0,0,0,0.9);
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        }
        &-describe {
          width: 230px;
          height: 40px;
          color: rgba(0,0,0,0.4);
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
        }


      }
      &-option {
        display: flex;
        height: 48px;
        border-top: 1px solid rgba(220,220,220,1);
        &-button {
          position: relative;
          //padding: 12px 0;0
          margin: auto;
          width: 92px;
          height: 22px;
          color: #0052D9;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          line-height: 22px;
          text-align: center;
          &:not(:last-of-type)::after {
            position: absolute;
            top: 3px;
            right: 0px;
            width: 1px;
            height: 16px;
            opacity: 1;
            background: rgba(231,231,231,1);
            content: '';
          }
        }
      }
    }
  }
}
.card-pagination {
  position: absolute;
  bottom: 0;
}


</style>
