import type { FunctionComponent } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';

const BarCharts = (props: any) => {
  const { data } = props;
  const echartsRef = useRef<any>(null);

  useEffect(() => {
    // 柱状图表添加点击事件
    if (echartsRef.current) {
      echartsRef.current?.ele?.addEventListener('click', (params: any, value: any) => {
        console.log(params, value, 'echarts图表绑定点击事件');
      });
    }
  }, [echartsRef]);

  const option = useMemo(() => {
    return {
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#FFF203', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#FFC064', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#FF3D52', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#FF672B', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,17,0.80)',
        borderWidth: 0,
        textStyle: {
          color: '#fff',
        },
        axisPointer: {
          type: 'shadow',
          crossStyle: {
            color: '#999',
          },
        },
      },
      dataset: data,
      grid: {
        left: '24px',
        right: '1%',
        top: '18%',
        bottom: '15%',
      },
      legend: {
        // data: data.barName,
        icon: 'circle',
        textStyle: {
          color: 'rgba(0,0,0,1)',
        },
        top: 4,
        right: 4,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#cccccc',
          interval: 0, // 横坐标每格都显示
          rotate: -10,
          padding: [160, 20, 20, -20],
          margin: 14,
        },
        axisLine: {
          lineStyle: {
            color: '#666666',
            opacity: 0.5,
          },
          show: true,
        },
        splitArea: {
          interval: 1,
        },
      },
      title: {
        text: '冒烟预警(次)',
        textStyle: {
          color: 'rgba(255,255,255,0.65)',
          fontSize: 16,
          fontWeight: 400,
        },
      },
      yAxis: {
        type: 'value',
        positions: 'left',
        splitNumber: 2,
        axisLabel: {
          color: '#cccccc',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(238,238,238,0.15)',
            type: 'solid',
          },
        },
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
        },
        {
          type: 'bar',
          barWidth: 20,
        },
      ],
    };
  }, [data]);

  return (
    <div className="costBarCharts">
      <ReactEcharts
        option={option}
        style={{ width: '100%', height: 224 }}
        theme="clear"
        ref={echartsRef}
      />
    </div>
  );
};

interface ClickEchartsProps {}

const ClickEcharts: FunctionComponent<ClickEchartsProps> = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = {
    dimensions: ['warnings', '黄色预警', '红色预警'],
    source: [
      { 黄色预警: 72, 红色预警: 52, warnings: '1月' },
      { 黄色预警: 41, 红色预警: 23, warnings: '2月' },
      { 黄色预警: 68, 红色预警: 48, warnings: '3月' },
    ],
  };

  return <BarCharts data={data || {}} />;
};

export default ClickEcharts;
