import type { FC } from 'react';
import { useMemo } from 'react';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Bar3DEchartsProps {}

const Bar3DEcharts: FC<Bar3DEchartsProps> = () => {
  const data = useMemo(() => [156, 60, 45, 22, 8].reverse(), []);
  const sideData = useMemo(() => data.map((item) => item + 2.5), [data]);
  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          let str = params[0].name + ':';
          params.filter(function (item: any) {
            if (item.componentSubType == 'bar') {
              str += `${data[item.dataIndex]}`;
            }
          });
          return str;
        },
      },
      grid: {
        top: '20',
        left: '20%',
        right: '0%',
        bottom: '20',
      },
      legend: {
        show: false,
      },
      yAxis: {
        data: ['在编总数', '编制启动', '讨论稿', '征求意见', '送审稿'].reverse(),
        //坐标轴
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255,255,255,0.15)',
          },
          textStyle: {
            color: '#000',
            fontSize: '10',
          },
        },
        type: 'category',
        axisLabel: {
          textStyle: {
            color: '#000',
            fontWeight: 500,
            fontSize: '14',
          },
        },
        axisTick: {
          textStyle: {
            color: '#000',
            fontSize: '16',
          },
          show: false,
        },
        splitLine: { show: false },
      },
      xAxis: {
        type: 'value',
        //坐标轴
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(0,0,0,0.25)',
          },
          textStyle: {
            color: 'rgba(0,0,0,0.25)',
            fontSize: '10',
          },
        },
        axisTick: {
          show: false,
        },
        //坐标值标注
        axisLabel: {
          show: true,
          textStyle: {
            color: '#BAE1FF',
          },
        },
        //分格线
        splitLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0.15)',
          },
        },
      },
      series: [
        {
          name: 'a',
          tooltip: {
            show: false,
          },
          type: 'bar',
          barWidth: 12,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: 'rgba(40,225,248,0.2)', // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: 'rgba(40,225,248,0.8)', // 60% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(40,225,248,1)', // 100% 处的颜色
                  },
                ],
                false,
              ),
            },
          },
          data: data,
          barGap: 0,
        },
        {
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: 'rgba(40,225,248,0.2)', // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: 'rgba(40,225,248,0.8)', // 60% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(40,225,248,0.9)', // 100% 处的颜色
                  },
                ],
                false,
              ),
            },
          },
          barGap: 0,
          data: sideData,
        },
        // 顶部菱形效果
        {
          name: 'b',
          tooltip: {
            show: false,
          },
          type: 'pictorialBar',
          itemStyle: {
            borderWidth: 1,
            borderColor: 'red',
            color: 'rgba(40,225,248,1)',
          },
          symbol: 'path://M 90,0 l 135,150 l -40,150 l -90,-90 z',
          symbolSize: ['9', '19'],
          symbolOffset: ['7.5', '-1'],
          symbolRotate: 0,
          symbolPosition: 'end',
          data: data,
          z: 3,
          label: {
            show: true,
            position: 'right',
            fontFamily: 'Impact',
            color: '#000',
          },
        },
      ],
    }),
    [data, sideData],
  );
  return <ReactEcharts option={option} />;
};

export default Bar3DEcharts;
