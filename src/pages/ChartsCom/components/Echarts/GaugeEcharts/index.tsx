import ReactEcharts from 'echarts-for-react';

interface GaugeP {
  data: number;
}

export default (props: GaugeP) => {
  const { data = 70 } = props;

  const optipn = {
    series: [
      // 每一个表盘，刻度和指针,
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        splitNumber: 4,
        radius: '100%',
        pointer: {
          // 指针
          show: true,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#64D6F9', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#025BD3', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        axisLine: {
          // 表盘主线
          roundCap: true,
          show: false,
          lineStyle: {
            width: 10,
            color: [[1, '#6648FF']],
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          // 短的刻度线
          distance: 22,
          splitNumber: 15,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        splitLine: {
          // 长的刻度线
          distance: 22,
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        title: {
          show: false,
        },
        anchor: {
          // 指针根部的圆
          show: true,
          showAbove: true,
          size: 20,
          itemStyle: {
            borderWidth: 5,
            color: '#001945',
          },
        },
        detail: {
          formatter: function (value: number) {
            return value + '天';
          },
          valueAnimation: true,
          color: '#000000',
          fontSize: 22,
          offsetCenter: [0, '40%'],
        },
        data: [
          {
            value: data,
          },
        ],
      },
      // 第二个时钟
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        radius: '100%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(102,72,255,.01)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#0B67E7', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        progress: {
          show: true,
          width: 28, // 渐变的宽度
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: data,
          },
        ],
      },
      // 第三个时钟，最外层粗线
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        radius: '100%',
        splitNumber: 4,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#97BEF5', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#0B67E7', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        progress: {
          show: true,
          roundCap: true,
          width: 6, // 渐变的宽度
        },
        axisLabel: {
          // 刻度上的数字
          show: true,
          distance: -40,
          color: '#000000',
          fontSize: 16,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      // 第四个时钟，最内层一条细线
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        radius: '100%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#97BEF5', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#0B67E7', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        progress: {
          show: true,
          roundCap: true,
          width: 2, // 渐变的宽度
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 100,
          },
        ],
      },
    ],
  };

  return (
    <div style={{ marginLeft: '-30px' }}>
      <ReactEcharts style={{ width: 300, height: 200 }} option={optipn} theme="clear" />
    </div>
  );
};
