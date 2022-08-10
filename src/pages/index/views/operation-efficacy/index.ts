import dayjs from 'dayjs';
import { getChartListColor } from '@/utils/color';
import { getRandomArray } from '@/utils/charts';


/** 柱状图数据源 */
export function constructInitDataset({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime: Array<string> } & Record<string, string>) {
  const divideNum = 12;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {

    timeArray.push(`${i+1}月`);
    outArray.push(getRandomArray().toString());
  }
  const dataset = {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          color: borderColor,
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    grid: {
      top: '16px',
      left: '25px',
      right: 0,
      bottom: '24px',
    },
    legend: {
      show:false,
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      itemGap: 48,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: ['本月', '上月'],
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'bar',
      },
    ],
  };

  return dataset;
}

export function getLineChartDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & Record<string, string>) {
  const divideNum = 8;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      timeArray.push(dayjs(enhandTime).format('MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  const dataSet = {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: '0',
      right: '20px',
      top: '5px',
      bottom: '36px',
      containLabel: true,
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['本月', '上月'],
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
      {
        name: '上月',
        data: inArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
    ],
  };
  return dataSet;
}
export function getOneLineChartDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & Record<string, string>) {
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      timeArray.push(dayjs(enhandTime).format('MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  const dataSet = {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: '0',
      right: '20px',
      top: '5px',
      bottom: '36px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
        areaStyle: {
          normal: {
            opacity: 0.1,
          },
        },
      },
    ],
  };
  return dataSet;
}

/**
 * 柱状图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
export function getMulColumnChartDataSet(isMonth = false) {
  if (isMonth) {
    return {
      color: ['#0052D9','#00A870','#EBB105'],
      legend: {
        left: 'center',
        bottom: '0',
        orient: 'horizontal', // legend 横向布局。
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: '2%',
        left: '0',
        right: '0',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['10：00', '11：00', '12：00', '13：00', '14：00', '15：00', '16：00'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '>150s',
          type: 'bar',
          barWidth: '20%',
          data: [
            getRandomArray(Math.random() * 100),
            getRandomArray(Math.random() * 200),
            getRandomArray(Math.random() * 300),
            getRandomArray(Math.random() * 400),
            getRandomArray(Math.random() * 500),
            getRandomArray(Math.random() * 600),
            getRandomArray(Math.random() * 700),
          ],
        },
        {
          name: '90-150s',
          type: 'bar',
          barWidth: '20%',
          data: [
            getRandomArray(Math.random() * 100),
            getRandomArray(Math.random() * 200),
            getRandomArray(Math.random() * 300),
            getRandomArray(Math.random() * 400),
            getRandomArray(Math.random() * 500),
            getRandomArray(Math.random() * 600),
            getRandomArray(Math.random() * 700),
          ],
        },
        {
          name: '<150s',
          type: 'bar',
          barWidth: '20%',
          data: [
            getRandomArray(Math.random() * 100),
            getRandomArray(Math.random() * 200),
            getRandomArray(Math.random() * 300),
            getRandomArray(Math.random() * 400),
            getRandomArray(Math.random() * 500),
            getRandomArray(Math.random() * 600),
            getRandomArray(Math.random() * 700),
          ],
        },
      ],

    };
  }

  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      left: 'center',
      bottom: '0%',
      orient: 'horizontal', // legend 横向布局。
      data: ['直接访问'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '13%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '20%',
        data: [
          getRandomArray(Math.random() * 100),
          getRandomArray(Math.random() * 200),
          getRandomArray(Math.random() * 300),
          getRandomArray(Math.random() * 400),
          getRandomArray(Math.random() * 500),
          getRandomArray(Math.random() * 600),
          getRandomArray(Math.random() * 700),
        ],
      },
    ],
  };
}

/**
 * 雷达图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
export function getRadarChartDataSet(isMonth = false) {
  if (isMonth) {
    return {
      color: ['#0052D9','#00A870','#EBB105'],
      legend: {
        left: 'center',
        bottom: '0',
        orient: 'horizontal', // legend 横向布局。
      },
      tooltip: {
        show:true,
      },
      radar: {
        indicator: [
          { name: '事件发生', max: 100 },
          { name: '时长', max: 100 },
          { name: '满意度', max: 100 },
          { name: '回放', max: 100 },
          { name: '处置', max: 100 },
        ]
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [90, 53, 24, 16, 74],
              name: '个人'
            },
            {
              value: [43, 85, 52, 76, 82],
              name: '团队'
            },
            {
              value: [10, 30, 54, 60, 86],
              name: '部门'
            }
          ],
        },
      ],
    };
  }

  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      left: 'center',
      bottom: '0%',
      orient: 'horizontal', // legend 横向布局。
      data: ['直接访问'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '13%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '20%',
        data: [
          getRandomArray(Math.random() * 100),
          getRandomArray(Math.random() * 200),
          getRandomArray(Math.random() * 300),
          getRandomArray(Math.random() * 400),
          getRandomArray(Math.random() * 500),
          getRandomArray(Math.random() * 600),
          getRandomArray(Math.random() * 700),
        ],
      },
    ],
  };
}


export function getPieChartDataSet({
  radius = 42,
  textColor,
  placeholderColor,
  containerColor,
}: { radius: number } & Record<string, string>) {
  return {
    color: getChartListColor(),
    tooltip: {
      show: false,
      trigger: 'axis',
      position: null,
    },
    grid: {
      top: '0',
      right: '0',
    },
    legend: {
      selectedMode: false,
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        selectedMode: true,
        hoverAnimation: true,
        silent: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1,
        },
        label: {
          show: true,
          position: 'center',
          formatter: ['{name|商品总数}', '{value|22,000}'].join('\n'),
          rich: {
            value: {
              color: 'rgba(0,0,0,0.9)',
              fontSize: 28,
              fontWeight: 'normal',
              lineHeight: 46,
            },
            name: {
              color: '#909399',
              fontSize: 12,
              lineHeight: 14,
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 5200,
            name: '家用电器',
          },
          {
            value: 2800,
            name: '食用酒水',
          },
          {
            value: 2400,
            name: '个护健康',
          },
          {
            value: 5600,
            name: '服饰箱包',
          },
          {
            value: 3000,
            name: '母婴产品',
          },
          {
            value: 3000,
            name: '其他',
          },
        ],
      },
    ],
  };
}
