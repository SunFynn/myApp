import type { FC } from 'react';
import { useMemo, useState, useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useInterval } from 'ahooks';
import produce from 'immer';
import { mockD } from './mockData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Bar3DGroupEchartsProps {}

const Bar3DGroupEcharts: FC<Bar3DGroupEchartsProps> = () => {
  const showCount = 5;
  const [curIndex, setCurIndex] = useState(showCount);
  const [chartData, setChartData] = useState<any[]>([]);
  const [intervalTime, setInterValTime] = useState<number | undefined>(2000);
  const echartRef = useRef(null);

  const total = useMemo(() => mockD?.length, []);

  useInterval(() => {
    // 柱状图轮播效果，数据前面出去一个，后面再进来一个
    if (curIndex >= total - 1) {
      setCurIndex(0);
    } else {
      setCurIndex((pre) => pre + 1);
    }
    setChartData((pre) =>
      produce(pre, (draft) => {
        draft.shift();
      }),
    );
    setChartData((pre) =>
      produce(pre, (draft) => {
        draft.push(mockD[curIndex]);
      }),
    );
  }, intervalTime);

  useEffect(() => {
    setChartData(mockD.slice(0, showCount));
  }, []);

  const xAxisArr = useMemo(() => {
    const arr: string[] = [];
    chartData.forEach((i) => {
      arr.push(i.name);
    });
    return arr;
  }, [chartData]);
  const data = useMemo(() => {
    const arr: number[] = [];
    chartData.forEach((i) => {
      arr.push(i.value);
    });
    return arr;
  }, [chartData]);
  const data2 = useMemo(() => {
    const arr: number[] = [];
    chartData.forEach((i) => {
      arr.push(i.count);
    });
    return arr;
  }, [chartData]);
  const sideData = useMemo(() => data.map((item) => item + 90), []);
  const sideData2 = useMemo(() => data2.map((item) => item + 90), []);
  const legendArr = useMemo(() => ['立项数量', '完成数量'], []);

  const color1 = useMemo(
    () => ({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(24,132,205, 0.8)',
        },
        {
          offset: 0.5,
          color: 'rgba(24,132,205, 0.8)',
        },
        {
          offset: 0.5,
          color: 'rgba(24,132,205,0.4)',
        },
        {
          offset: 1,
          color: 'rgba(15,64,115,0.4)',
        },
      ],
    }),
    [],
  );
  const color2 = useMemo(
    () => ({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(41, 233, 255, 0.8)',
        },
        {
          offset: 0.5,
          color: 'rgba(41, 233, 255, 0.8)',
        },
        {
          offset: 0.5,
          color: 'rgba(41, 233, 255,0.4)',
        },
        {
          offset: 1,
          color: 'rgba(16,90,115,0.4)',
        },
      ],
    }),
    [],
  );
  const barWidth = 30;
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        let str = params[0].name + ':';
        params.filter(function (item: any) {
          if (item.componentSubType == 'bar') {
            str += '<br/>' + item.seriesName + '：' + item.value;
          }
        });
        return str;
      },
    },
    grid: {
      top: '40',
      left: '8%',
      right: '0%',
      bottom: '20',
    },
    legend: {
      data: legendArr,
      textStyle: {
        color: '#000',
        fontSize: '14',
      },
      top: 0,
    },
    xAxis: {
      data: xAxisArr,
      //坐标轴
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: '#214776',
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
    yAxis: {
      type: 'value',
      //坐标轴
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: '#214776',
        },
        textStyle: {
          color: '#000',
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
          color: '#000',
        },
      },
      //分格线
      splitLine: {
        lineStyle: {
          color: '#13365f',
        },
      },
    },
    series: [
      {
        z: 1,
        name: legendArr[0],
        type: 'bar',
        barWidth: barWidth,
        barGap: '0%',
        data: data,
        itemStyle: {
          normal: {
            color: color1,
          },
        },
      },
      {
        z: 2,
        name: legendArr[0],
        type: 'pictorialBar',
        data: sideData,
        symbol: 'diamond',
        symbolOffset: ['-60%', '50%'],
        symbolSize: [barWidth, 10],
        itemStyle: {
          normal: {
            color: color1,
          },
        },
        tooltip: {
          show: false,
        },
      },
      {
        z: 3,
        name: legendArr[0],
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: data,
        symbol: 'diamond',
        symbolOffset: ['-60%', '-50%'],
        symbolSize: [barWidth, (10 * (barWidth - 4)) / barWidth],
        itemStyle: {
          normal: {
            borderWidth: 2,
            color: 'rgba(31,132,199,0.9)',
          },
        },
        label: {
          show: true,
          position: 'top',
          fontFamily: 'Impact',
          color: '#000',
          offset: [-16, 0],
        },
        tooltip: {
          show: true,
        },
      },
      {
        z: 1,
        name: legendArr[1],
        type: 'bar',
        barWidth: barWidth,
        barGap: '10%',
        data: data2,
        itemStyle: {
          normal: {
            color: color2,
          },
        },
      },
      {
        z: 2,
        name: legendArr[1],
        type: 'pictorialBar',
        data: sideData2,
        symbol: 'diamond',
        symbolOffset: ['60%', '50%'],
        symbolSize: [barWidth, 10],
        itemStyle: {
          normal: {
            color: color2,
          },
        },
        tooltip: {
          show: false,
        },
      },
      {
        z: 3,
        name: legendArr[1],
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: data2,
        symbol: 'diamond',
        symbolOffset: ['60%', '-50%'],
        symbolSize: [barWidth, (10 * (barWidth - 4)) / barWidth],
        itemStyle: {
          normal: {
            borderWidth: 2,
            color: 'rgba(41, 233, 255, 1)',
          },
        },
        label: {
          show: true,
          position: 'top',
          fontFamily: 'Impact',
          color: '#000',
          offset: [16, 0],
        },
        tooltip: {
          show: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (echartRef.current) {
      // @ts-ignore
      echartRef.current?.ele?.addEventListener('mouseenter', () => {
        console.log('mouseenter');
        setInterValTime(undefined);
      });
      // @ts-ignore
      echartRef.current?.ele?.addEventListener('mouseleave', () => {
        console.log('mouseleave');
        setInterValTime(2000);
      });
    }
  }, [echartRef]);

  return <ReactEcharts option={option} ref={echartRef} />;
};

export default Bar3DGroupEcharts;
