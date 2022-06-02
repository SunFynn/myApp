import { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import customLegend from './setLegend';

// {
//   piedata: [
//     { value: 48, name: '资金支付管理', percent: '34%' },
//     { value: 46, name: '工程进度管理', percent: '33%' },
//     { value: 42, name: '工程分包管理', percent: '21%' },
//     { value: 39, name: '质量安全管理', percent: '7%' },
//     { value: 35, name: '过程变更管理', percent: '5%' },
//     { value: 35, name: 'IE交易管理', percent: '5%' },
//   ],
//   all: 31227,
//   title: '冒烟预警次数',
//   pieColor: ['#3A6DE9', '#7833FF', '#F7DF33', '#3AF4A2', '#3AE8FF', '#3AE8FF']
// }

type piedataObj = {
  name: string;
  value: number;
  percent: string;
};

type PieEchartsData = {
  piedata?: piedataObj[];
  all?: number; // 总数
  title?: string; // 图表名称
  pieColor?: string[]; // 图表颜色
};

interface PieEchartsWatchProps {
  data?: PieEchartsData;
  height?: number;
}

/**
 * 圆环图
 */
export default (props: PieEchartsWatchProps) => {
  const {
    data = {
      piedata: [],
      all: 0,
      title: '',
      pieColor: ['#6648ff', '#1165ff', '#0da0ff', '#ffcc00'],
    },
    height = 180,
  } = props;

  const optipn = useMemo(() => {
    return {
      title: {
        text: Number(data.all || 0),
        subtext: data.title,
        left: '19%',
        top: '40%',
        textAlign: 'center',
        textStyle: {
          color: '#000000',
          fontSize: 24,
          fontWeight: 500,
          textAlign: 'center',
        },
        subtextStyle: {
          color: '#BED9E5',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,17,0.80)',
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
      },
      legend: customLegend(
        (data.piedata || []).map((v: any) => {
          return v;
        }),
      ),
      color: data.pieColor,
      series: [
        {
          type: 'pie',
          radius: ['62%', '80%'],
          center: ['20%', '53%'],
          label: {
            show: false,
            position: 'center',
          },
          data: data.piedata || [],
        },
      ],
    };
  }, [data]);

  return <ReactEcharts option={optipn} style={{ width: '100%', height: height }} theme="clear" />;
};
