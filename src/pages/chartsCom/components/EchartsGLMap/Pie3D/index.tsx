import type { FunctionComponent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import 'echarts-gl'; // 3D地图插件
interface Base3DProps {
  optionData: any[];
}

type dataList = {
  name: string;
  value: number;
};

const Base3D: FunctionComponent<Base3DProps> = (props) => {
  const { optionData } = props;
  const ref = useRef<any>();

  //获取3d丙图的最高扇区的高度
  const getHeight3D = (series: any, height: number) => {
    series.sort((a: any, b: any) => {
      return b.pieData.value - a.pieData.value;
    });
    if (series?.[0]?.pieData?.value < 100) return height * 0.6;
    return (height * 25) / series?.[0]?.pieData?.value;
  };

  const fomatFloat = (num: any, n: any) => {
    let f = parseFloat(num);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    let s = f.toString();
    let rs = s.indexOf('.');
    //判定如果是整数，增加小数点再补0
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + n) {
      s += '0';
    }
    return s;
  };

  // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
  // @ts-ignore
  const getParametricEquation = (startRatio, endRatio, isSelect, isHovered, kk, h) => {
    let isSelected = isSelect;
    let k = kk;
    // 计算
    const midRatio = (startRatio + endRatio) / 2;
    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
    }
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;
    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32,
      },
      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      x: function (u: any, v: any) {
        if (u < startRadian) {
          return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      y: function (u: any, v: any) {
        if (u < startRadian) {
          return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      z: function (u: any, v: any) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u) * h * 0.1;
        }
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      },
    };
  };

  const getPie3D = (pieData: any, internalDiameterRatio: number) => {
    //internalDiameterRatio:透明的空心占比
    const series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData = [];
    let legendBfb: any[] = [];
    const k = 1 - internalDiameterRatio;
    pieData.sort((a: any, b: any) => {
      return b.value - a.value;
    });
    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value;
      const seriesItem = {
        name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
        type: 'surface',
        parametric: true,
        wireframe: {
          show: false,
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k: k,
        },
        center: ['10%', '50%'],
      };

      if (typeof pieData[i].itemStyle != 'undefined') {
        const itemStyle: any = {};
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typeof pieData[i].itemStyle.color != 'undefined'
          ? (itemStyle.color = pieData[i].itemStyle.color)
          : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typeof pieData[i].itemStyle.opacity != 'undefined'
          ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
          : null;
        //@ts-ignore
        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    legendData = [];
    legendBfb = [];
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;
      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      //@ts-ignore
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        series[i].pieData.value,
      );
      startValue = endValue;
      const bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
      legendData.push({
        name: series[i].name,
        value: bfb,
      });
      legendBfb.push({
        name: series[i].name,
        value: bfb,
      });
    }
    const boxHeight = getHeight3D(series, 26); //通过传参设定3d饼/环的高度，26代表26px
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
      legend: [
        {
          orient: 'vertical',
          data: legendData,
          // orient: 'horizontal',
          right: 48,
          top: 24,
          itemGap: 34,
          textStyle: {
            color: 'rgba(0,0,0,0.65)',
            fontSize: 16,
            width: 200,
          },
          show: true,
          icon: 'circle',
          formatter: function (param: any) {
            const optionItem = optionData.filter((item) => item.name == param)[0];
            const item = legendBfb.filter((item) => item.name == param)[0];
            const bfs = fomatFloat(item.value * 100, 2) + '%';
            return `${item.name}`;
          },
        },
        {
          orient: 'vertical',
          data: legendData,
          // orient: 'horizontal',
          right: 6,
          top: 24,
          itemGap: 34,
          textStyle: {
            color: '#000000',
            fontSize: 16,
            width: 200,
          },
          show: true,
          icon: 'none',
          formatter: function (param: any) {
            const optionItem = optionData.filter((item) => item.name == param)[0];
            const item = legendBfb.filter((item) => item.name == param)[0];
            const bfs = fomatFloat(item.value * 100, 2) + '%';
            return `${optionItem.value}`;
          },
        },
      ],
      labelLine: {
        show: false,
        lineStyle: {
          color: 'transparent',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '0%',
        top: '16%',
        containLabel: true,
      },
      // labelLine: {
      //   show: true,
      //   lineStyle: {
      //     color: 'red'
      //   }
      // },
      // label: {
      //   show: true,
      //   position: 'outside',
      //   rich: {
      //     b: {
      //       color: '#7BC0CB',
      //       fontSize: 12,
      //       lineHeight: 20
      //     },
      //     c: {
      //       fontSize: 16,
      //     },
      //   },
      //   formatter: (params:any)=>{
      //     console.log(params)
      //     return `<span style="color:red">${params?.data?.name}</span>`
      //   } ,
      // },
      label: false,
      tooltip: {
        formatter: (params: any) => {
          if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
            const bfb = (
              (option.series[params.seriesIndex].pieData.endRatio -
                option.series[params.seriesIndex].pieData.startRatio) *
              100
            ).toFixed(2);
            return (
              `${params.seriesName} ${optionData[params.seriesIndex].value}<br/>` +
              `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
              `${bfb}%`
            );
          }
        },
      },
      xAxis3D: {
        min: -1,
        max: 1,
      },
      yAxis3D: {
        min: -1,
        max: 1,
      },
      zAxis3D: {
        min: -1,
        max: 1,
      },
      grid3D: {
        left: -80,
        top: -20,
        show: false,
        boxHeight: boxHeight, //圆环的高度
        viewControl: {
          //3d效果可以放大、旋转等，请自己去查看官方配置
          alpha: 38, //角度
          distance: 200, //调整视角到主体的距离，类似调整zoom
          // rotateSensitivity: 1, //设置为0无法旋转
          zoomSensitivity: 0, //设置为0无法缩放
          // panSensitivity: 0, //设置为0无法平移
          autoRotate: true, //自动旋转
        },
      },
      series: series,
    };
    return option;
  };

  const option: any = getPie3D(optionData, 0.8);

  useEffect(() => {
    if (ref.current) {
      //构建3d饼状图
      const myChart = echarts.init(ref?.current);
      myChart.setOption(option);
      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      option.series.push({
        name: 'pie2d',
        type: 'pie',
        // labelLine:{
        //   length:10,
        //   length2:10
        // },
        radius: ['62%', '80%'],
        center: ['20%', '53%'],
        left: 0,
        width: 200,
        // startAngle: -20 , //起始角度，支持范围[0, 360]。
        // clockwise: false,//饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        // radius: ['40%', '20%'],
        // center: ['90%', '90%'],
        data: optionData,
        itemStyle: {
          opacity: 0,
        },
      });
      myChart.setOption(option);
    }
  }, [optionData, option]);

  return <div ref={ref} style={{ height: '270px' }} />;
};

const Base3dBox = () => {
  const [dataArr, setDataArr] = useState<dataList[]>([]);

  const refresh = async () => {
    const arr: any[] = [
      { name: '高危风险项目数', value: 3 },
      { name: '一般风险项目数', value: 5 },
      { name: '低危风险项目数', value: 29 },
    ];
    setDataArr(arr);
  };

  useEffect(() => {
    refresh();
  }, []);

  const colors = [
    'rgba(236, 84, 15, 1)',
    'rgba(241, 217, 2, 1)',
    'rgba(81, 80, 255, 1)',
    'rgba(101, 212, 255, 1)',
    'rgba(242, 217, 2, 1)',
  ];

  const optionData = useMemo(() => {
    const option = dataArr.map((item, idx) => {
      // @ts-ignore
      item.itemStyle = {};
      // @ts-ignore
      item.itemStyle.color = colors[idx];
      return item;
    });
    return option;
  }, [dataArr]);

  return (
    <div>
      <Base3D optionData={optionData} />
    </div>
  );
};

export default Base3dBox;
