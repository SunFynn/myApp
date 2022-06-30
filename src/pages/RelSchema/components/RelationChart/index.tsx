/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import cs from 'classnames';
import styles from './index.less';

// 递归处理关联函数
const handleListForGraph = (list: any[], graphData: any[]) => {
  list.forEach((item) => {
    const { name, x, y, children, symbolSize = 32, ...other } = item;
    graphData.push({
      name,
      value: [x, y],
      symbolSize,
      ...other,
    });

    if (children && children.length > 0) {
      handleListForGraph(children, graphData);
    }
  });
};
const handleListForList = (list: any[], lineData: any[]) => {
  list.forEach((item) => {
    const { name, x, y, children, symbolSize = 32, ...other } = item;

    if (children && children.length > 0) {
      children.forEach((child: any) => {
        const {
          name: childName,
          x: childX,
          y: childY,
          relations = [],
          // eslint-disable-next-line @typescript-eslint/no-shadow
          children,
          opposite,
          // eslint-disable-next-line @typescript-eslint/no-shadow
          ...other
        } = child;
        const coord = opposite ? [childX, childY] : [x, y];
        const coords: any[] = opposite
          ? [
              [childX, childY],
              [x, y],
            ]
          : [
              [x, y],
              [childX, childY],
            ];

        if (relations && relations.length > 0) {
          const curvenessUnit = 0.08;

          relations.forEach((relation: any, index: number) => {
            const lineStyle: any = {
              ...(relation.lineStyle || {}),
            };
            lineStyle.curveness = curvenessUnit * (index + 1);

            lineData.push({
              name: `${name} > ${childName} & ${index}`,
              coord,
              source: item,
              target: { ...other, ...relation },
              coords,
              lineStyle,
            });
          });
        } else {
          lineData.push({
            name: `${name} > ${childName} & 0`,
            coord,
            coords,
            source: item,
            target: child,
            ...other,
          });
        }
      });

      handleListForList(children, lineData);
    }
  });
};

export interface RelationItem {
  name: string; // 名称，必须唯一
  x: number; // x轴坐标
  y: number; // y轴坐标
  symbolSize?: number; // 图像大小
  children?: ({
    opposite?: boolean; // 控制线条朝向
    lineStyle?: any;
    relations?: Record<string, any>[]; // 关系数组
  } & RelationItem)[];
  [key: string]: any; // 其他任意参数
}
export interface RelationChartProps {
  style?: React.CSSProperties;
  xAxis?: any;
  yAxis?: any;
  dataSource: RelationItem[];
  expandLabel?: any[];
  itemLabel?: any;
  itemTooltip?: any;
  lineLabel?: any;
  lineTooltip?: any;
  commonLineStyle?: any;
  effectOptions?: any; // 特效设置
  onClickItems?: (data: any) => void;
  onClickLines?: (data: any) => void;
  headClassName?: string;
  headStyle?: React.CSSProperties;
  headContent?: React.ReactElement;
}
const RelationChart: React.FC<RelationChartProps> = (props) => {
  const {
    xAxis = {},
    yAxis = {},
    dataSource,
    itemLabel = {},
    itemTooltip = {},
    lineLabel = {},
    lineTooltip = {},
    expandLabel,
    style = {},
    commonLineStyle = {},
    effectOptions = {},
    onClickItems = () => {},
    onClickLines,
    headContent,
    headClassName,
    headStyle = {},
  } = props;

  const options = useMemo(() => {
    const commonGraphData: any[] = [];
    const commonLineData: any[] = [];
    // 获取基础数据
    handleListForGraph(dataSource, commonGraphData);
    handleListForList(dataSource, commonLineData);
    // 底板关系图
    const commonGraph = {
      type: 'graph',
      layout: 'none',
      coordinateSystem: 'cartesian2d',
      symbolSize: 70,
      z: 1,
      label: {
        normal: {
          show: true,
          position: 'left',
          color: '#000',
          fontSize: 12,
          ...itemLabel,
        },
      },
      tooltip: {
        triggerOn: 'mousemove|click',
        formatter: '{b}',
        ...itemTooltip,
      },
      edgeLabel: { show: false },
      itemStyle: {
        normal: {
          color: '#29ACFC',
          borderColor: '#29ACFC',
          shadowColor: '#29ACFC',
          borderWidth: 1,
        },
      },
      data: commonGraphData,
    };
    // 底板连线关系图
    const commonLine = {
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      z: 0,
      effect: {
        show: true,
        trailLength: 0,
        symbol: 'triangle',
        color: '#12b5d0',
        symbolSize: 4,
        ...effectOptions,
      },
      lineStyle: {
        normal: {
          color: '#1A57B2',
          curveness: 0.2,
          ...commonLineStyle,
        },
      },
      label: {
        normal: {
          show: false,
          ...lineLabel,
        },
      },
      tooltip: {
        show: true,
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderWidth: 0,
        textStyle: {
          color: '#fff',
        },
        ...lineTooltip,
      },
      data: commonLineData,
    };
    // 需要加载的图数组
    const series: any[] = [commonGraph, commonLine];

    // 添加额外关系图label
    if (expandLabel && expandLabel.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      expandLabel.forEach((options) => {
        series.push({
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          z: series.length,
          label: {
            normal: {
              show: true,
              ...options,
            },
          },
          tooltip: { show: false },
          edgeLabel: { show: false },
          symbolSize: 0,
          itemStyle: {
            normal: {
              opacity: 1,
            },
          },
          data: commonGraphData.map((i) => ({
            // 除去额外的影响属性，强制只允许配置label
            ...i,
            symbolSize: 0,
            tooltip: { show: false },
            itemStyle: {},
            label: {},
          })),
        });
      });
    }

    return {
      tooltip: {
        triggerOn: 'click',
        enterable: true,
      },
      xAxis: {
        min: 0,
        max: 25,
        show: false,
        type: 'value',
        ...xAxis,
      },
      yAxis: {
        min: 0,
        max: 20,
        show: false,
        type: 'value',
        ...yAxis,
      },
      series,
    };
  }, [dataSource]);

  // 点击方法
  const onEvents = useMemo(() => {
    return {
      click: (item: any) => {
        const { seriesType, data } = item;
        if (seriesType === 'graph') {
          onClickItems?.(data);
        }
        if (seriesType === 'lines') {
          onClickLines?.(data);
        }
      },
    };
  }, []);

  return (
    <div className={styles['relation-chart']}>
      {!!headContent && (
        <div
          className={cs(styles[`relation-chart-head`], styles[`${headClassName}`])}
          style={headStyle}
        >
          {headContent}
        </div>
      )}
      <ReactEcharts
        style={{ width: '100%', height: '100%', ...style }}
        option={options}
        onEvents={onEvents}
      />
    </div>
  );
};

export default RelationChart;
