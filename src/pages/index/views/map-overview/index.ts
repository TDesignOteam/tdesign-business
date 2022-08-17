import {getChartListColor} from "@/utils/color";
import { getRandomArray } from '@/utils/charts'


/** 首页 dashboard 折线图 */
export function chartData(type: string, index: number) {
  const dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周日', '周日'];
  const datasetAxis = {
    xAxis: {
      type: 'category',
      show: false,
      data: dateArray,
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  if (type === 'line') {
    const lineDataset = {
      ...datasetAxis,
      color: ['#0052D9'],
      series: [
        {
          data: [0, 50, 30, 100, 60, 105, 80, 110, 0],
          type,
          showSymbol: true,
          smooth: true,
          symbol: 'circle',
          symbolSize: 0,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
              },
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
    return lineDataset;
  }
  if (type === 'bar') {
    const barDataset = {
      ...datasetAxis,
      color: ['#0594FA'],
      series: [
        {
          data: [20, 50, 30, 100, 60, 105, 80, 110],
          type,
          barCategoryGap: '50%',
        },
      ],
    };
    return barDataset;
  }
  if (type === 'pie') {
    const barDataset = {
      ...datasetAxis,
      color: index === 2 ? ['#D9D9D9','#EBB105'] : ['#D9D9D9','#00A870'],
      series: [
        {
          type: 'pie',
          radius: ['80%', '100%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data:index === 2 ? [
            { value: 11},
            { value: 89},
          ] : [
            { value: 29},
            { value: 71},
          ],
          startAngle: 0
        }
      ]
    };
    return barDataset;
  }
}
