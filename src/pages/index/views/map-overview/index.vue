<template>
  <div style="position: relative">
    <div class="card-wrapper">
      <left-cards></left-cards>
      <div class="center-card-wrapper">
        <div class="center-card-item">
          <div class="center-card-top">
            <span class="center-card-top-title">
              人口总数
            </span>
            <span class="center-card-top-subtitle">
              （万人）
            </span>
          </div>
          <div class="center-card-number">
            1,181
          </div>
        </div>
        <div class="center-card-item">
          <div class="center-card-top">
            <span class="center-card-top-title">
              区域面积
            </span>
            <span class="center-card-top-subtitle">
              （km²）
            </span>
          </div>
          <div class="center-card-number">
            7,334
          </div>
        </div>
      </div>
      <div class="right-cards-wrapper">
        <div class="right-cards-monitor">
          <t-row>
            <t-col flex="auto">
              <img class="camera-item" :src="require('@/assets/assets-photo-1.png')"><img/>
            </t-col>
            <t-col flex="auto">
              <img class="camera-item" style="padding-left: 2px" :src="require('@/assets/assets-photo-2.png')"><img/>
            </t-col>
          </t-row>
          <t-row>
            <t-col flex="auto">
              <img class="camera-item" :src="require('@/assets/assets-photo-3.png')"><img/>
            </t-col>
            <t-col flex="auto">
              <img class="camera-item" style="padding-left: 2px" :src="require('@/assets/assets-photo-4.png')"><img/>
            </t-col>
          </t-row>
        </div>
        <div class="right-cards-meeting" @click="toTencentMeeting()">
          <t-card :cover="require('@/assets/assets-map-img-1.png')" >
            <template #footer>
              <t-row :align="'middle'" justify="center" >
                <t-col flex="auto">
                  <t-button block variant="text" shape="square" theme="primary">
                    <icon name="tips" size="16px"/>
                    发起会议
                  </t-button>
                </t-col>
                <t-col flex="none">
                  <t-divider layout="vertical" />
                </t-col>
                <t-col flex="auto">
                  <t-button block variant="text" shape="square" theme="primary" >
                    <icon name="add-circle" size="16px"/>
                    加入会议
                  </t-button>
                </t-col>
                <t-col flex="none">
                  <t-divider layout="vertical" />
                </t-col>
                <t-col flex="auto">
                  <t-button block variant="text" shape="square" theme="primary">
                    <icon name="calendar" size="16px"/>
                    预约会议
                  </t-button>
                </t-col>
              </t-row>
            </template>
          </t-card>
        </div>
        <div class="right-cards-help">
          <div v-for="item in helpData" :key="item.subName" class="right-cards-help-item" @click="toHelp(item.subName)">
            <div class="right-cards-help-item-icon" :style="{background: item.background}"> <icon class="icon" :name="item.icon" size="32px"/></div>
            <div class="right-cards-help-item-text">{{ item.name }}</div>
            <div class="right-cards-help-item-text">（{{ item.subName }}）</div>
          </div>
        </div>
      </div>
    </div>
    <div id="tMapContainer" class="tgis-map"/>
  </div>

</template>

<script>

import LeftCards from './left-cards';
import { Icon } from 'tdesign-icons-vue';

export default {
  name: 'map-overview',
  components: {
    LeftCards,
    Icon
  },
  data(){
    return {
      cover: '@/assets/assets-map-img1.png',
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
      ],
      helpData: [
        {
          name: '腾讯云呼叫中心',
          subName: 'TCCC',
          icon: 'call',
          background: '#00A870',
        },
        {
          name: '腾讯云短信',
          subName: 'SMS',
          icon: 'mail',
          background: '#0052D9',
        }
      ]
    }
  },
  mounted() {
    console.log('mounted');
    this.loadScript().then(()=>{
      this.initMap();
    });
    // this.initMap();
  },
  methods:{
    initMap() {
      // 定义地图中心点坐标
      const center = new window.TMap.LatLng(23.135096, 113.357393)
      // 定义map变量，调用 TMap.Map() 构造函数创建地图
      const map = new window.TMap.Map(document.getElementById('tMapContainer'), {
        center,// 设置地图中心点坐标
        zoom: 15,   // 设置地图缩放级别
        pitch: 0,  // 设置俯仰角
        rotation: 0    // 设置地图旋转角度
      });
    },
    loadScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        // VITE_MAP_API_KEY：腾讯地图Javascript API 应用key
        script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${import.meta.env.VITE_MAP_API_KEY}`;
        document.body.appendChild(script);
        script.onload = () => {
          resolve();
        }
      })
    },
    toTencentMeeting() {
      window.open('https://cloud.tencent.com/document/product/1095/42407', '_blank')
    },
    toHelp(type) {
      if( type === 'TCCC' ) window.open('https://cloud.tencent.com/document/product/679/30225', '_blank');
      else window.open('https://cloud.tencent.com/document/product/382/43193', '_blank')
    }
  }

};
</script>
<style scoped lang="less">
  .center-card {
    &-wrapper {
      margin: 24px auto;
      //position: absolute;
      //top: 24px;
      display: flex;
      width: 442px;
      height: 122px;
      padding: 24px 18px;
      border-radius: 3px;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05), 0 4px 5px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.12);
      z-index: 1001;
    }
    &-item {
      width: 203px;
      height: 74px;
      &:first-child {
        border-right: 1px solid rgba(231,231,231,1);
      }
    }
    &-top {
      margin-bottom: 4px;
      height: 22px;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      &-title {
        color: rgba(0,0,0,0.9);
      }
      &-subtitle {
        color: rgba(0,0,0,0.4);
      }
    }
    &-number {
      height: 44px;
      color: rgba(24,24,24,1);
      font-size: 36px;
      line-height: 44px;
      text-align: center;
    }
  }
  .card-wrapper {
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
  }
  .right-cards {
    &-wrapper{
      margin: 24px 24px 0 0;
      z-index: 1001;
    }
    &-monitor {
      width: 360px;
      height: 220px;
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 3px;
      background: #FFFFFF;
      box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05), 0 4px 5px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.12);
      .camera-item{
        width: 162px;
        height: 92px;
        border-radius: 3px;
        opacity: 1;
        background: rgba(243,243,243,1);
      }
    }
    &-meeting {
      cursor: pointer;
      width: 360px;
      margin-bottom: 16px;
    }
    &-help {
      display: flex;
      &-item {
        width: 172px;
        height: 164px;
        padding-top: 28px;
        border-radius: 3px;
        opacity: 1;
        background: #FFFFFF;
        text-align: center;
        box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05), 0 4px 5px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.12);
        cursor: pointer;
        &-icon {
          width: 48px;
          height: 48px;
          color: #FFFFFF;
          margin: 0 auto 16px ;
          padding: 8px;
          border-radius: 50%;
          background: #00A870;
        }
        &-text {
          margin: 0 auto;
          color: #000000;
          font-size: 14px;
          text-align: center;
          line-height: 22px;
        }
        &:first-child {
          margin-right: 16px;
        }
      }

    }
  }

</style>
