import { TdBaseTableProps } from 'tdesign-vue';

interface TrendItem {
  descripe: string;
  upTrend?: string;
  downTrend?: string;
}

interface DashboardPanel {
  title: string;
  unit?: string;
  number: string | number;
  trends?:Array<TrendItem>;
}

interface TendItem {
  growUp?: number;
  productName: string;
  count: number;
  date: string;
}

interface RankItem {
  name: string;
  content: string;
}

export const PANE_LIST: Array<DashboardPanel> = [
  {
    title: '总人数',
    unit: '(人)',
    number: '3,126,560',
    trends:[
      {
        descripe: '同比',
        downTrend: '12.20%',
      },
      {
        descripe: ' 周比',
        upTrend: '8.69%',
      },
    ],
  },
  {
    title: '车辆',
    unit: '(辆)',
    number: '4,592',
    trends:[
      {
        descripe: '同比',
        downTrend: '8.23%',
      },
      {
        descripe: ' 周比',
        upTrend: '8.69%',
      },
    ],
  },
  {
    title: 'GDP',
    unit: '(万元)',
    number: '68,239',
    trends:[
      {
        descripe: '同比',
        downTrend: '2.82%',
      },
      {
        descripe: ' 环比',
        upTrend: '10.68%',
      },
    ],
  },
  {
    title: '销售额',
    unit: '(万元)',
    number: '3,345',
    trends:[
      {
        descripe: '同比',
        downTrend: '8.23%',
      },
      {
        descripe: ' 环比',
        upTrend: '8.69%',
      },
    ],
  },



];

export const SALE_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '国家电网有限公司',
    count: 7059,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: '深圳燃气集团股份有限公司',
    count: 6437,
    date: '2021-09-01',
  },
  {
    growUp: 4,
    productName: '国家烟草专卖局',
    count: 4221,
    date: '2021-09-01',
  },
  {
    growUp: 3,
    productName: '中国电信集团有限公司',
    count: 3317,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: '中国移动通信集团有限公司',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: '新余市办公用户采购项目',
    count: 2015,
    date: '2021-09-12',
  },
];

export const VISIT_RANK_LIST: Array<RankItem> = [
  {
    name: '示例中心',
    content: '323,239',
  },
  {
    name: '开放平台API管理',
    content: '23,234',
  },
  {
    name: '腾讯云平台帮助中心',
    content: '18,290',
  },
  {
    name: '视频监控',
    content: '8,391',
  },
  {
    name: '呼叫中心',
    content: '383',
  },
  {
    name: '腾讯会议',
    content: '383',
  },
];

export const BUY_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '腾讯科技（深圳）有限公司',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: '大润发有限公司',
    count: 2015,
    date: '2021-09-01',
  },
  {
    growUp: 6,
    productName: '四川海底捞股份有限公司',
    count: 1815,
    date: '2021-09-11',
  },
  {
    growUp: -3,
    productName: '索尼（中国）有限公司',
    count: 1015,
    date: '2021-09-21',
  },
  {
    growUp: -4,
    productName: '松下电器（中国）有限公司',
    count: 445,
    date: '2021-09-19',
  },
  {
    growUp: -3,
    productName: '新余市办公用户采购项目',
    count: 2015,
    date: '2021-09-12',
  },
];

export const SALE_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 80,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '客户名称',
    width: 200,
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: '较上周',
  },
  {
    align: 'center',
    colKey: 'count',
    title: '订单量',
    width: 100,
  },
  {
    align: 'center',
    colKey: 'date',
    width: 140,
    title: '合同签订日期',
  },
  {
    align: 'center',
    colKey: 'operation',
    title: '操作',
    width: 80,
    fixed: 'right',
  },
];

export const BUY_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 80,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '供应商名称',
    width: 200,
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: '较上周',
  },
  {
    align: 'center',
    colKey: 'count',
    title: '订单量',
    width: 100,
  },
  {
    align: 'center',
    colKey: 'date',
    width: 140,
    title: '合同签订日期',
  },
  {
    align: 'center',
    colKey: 'operation',
    title: '操作',
    width: 80,
    fixed: 'right',
  },
];
