import React, { useMemo } from 'react';
import RelationChart from '../RelationChart';

interface ProjectRelationChartProps {
  enterprise: string;
}
const ProjectRelationChart: React.FC<ProjectRelationChartProps> = ({ enterprise }) => {
  const dataSource = useMemo(() => {
    const children = [
      {
        name: '桐乡市洲泉镇中心小学迁建工程',
        x: 6,
        y: 20,
      },
      {
        name: '乌镇互联网国际会展中心二期',
        x: 5,
        y: 12,
      },
      {
        name: '桐乡市儿童福利院改扩建项目',
        x: 6,
        y: 7,
      },
      {
        name: '桐乡市综合信息指挥中心',
        x: 8,
        y: 3,
      },
      {
        name: '桐乡市高桥中心幼儿园扩建工程',
        x: 15,
        y: 0,
        label: {
          position: 'right',
        },
      },
      {
        name: '桐乡融杭经济区南阳先导区人工智能',
        x: 12,
        y: 18,
        label: {
          position: 'right',
        },
      },
    ].map((i) => ({
      ...i,
      name: `${i.name}_${Math.random()}`,
      symbolSize: 26,
      count: (Math.random() * 150000 + 50000).toFixed(2),
      pay: Math.random(),
      image: Math.random(),
      close: Math.random(),
      warnMsg: '工程进度款超付,存在利益输送风险',
    }));

    return [
      {
        name: enterprise,
        x: 18,
        y: 10,
        itemStyle: {
          color: 'grey',
          borderColor: 'grey',
        },
        label: {
          position: 'right',
        },
        symbolSize: 32,
        children,
      },
    ];
  }, [enterprise]);

  return (
    <RelationChart
      dataSource={dataSource}
      style={{ height: 470, marginTop: '-55px' }}
      xAxis={{ min: -5, max: 28 }}
      yAxis={{ min: -3, max: 23 }}
      effectOptions={{ symbolSize: 6 }}
      itemLabel={{
        formatter: ({ name }: any) => {
          const displayName = name.split('_')[0];
          return displayName;
        },
      }}
      itemTooltip={{
        formatter: ({ name }: any) => {
          const displayName = name.split('_')[0];
          return displayName;
        },
      }}
      commonLineStyle={{
        color: '#FFFFFF',
        width: 3,
      }}
      onClickItems={(data) => {
        const { name } = data;
        console.log(name, 'name');
      }}
      lineTooltip={{
        formatter: ({ data }: any) => {
          const {
            target: { count, pay, image, close, warnMsg },
          } = data;
          return (
            `合同金额：${count}元&emsp;支付进度：${(pay * 100).toFixed(0)}% <br>` +
            `形象进度：${(image * 100).toFixed(0)}%&emsp;结算进度：${(close * 100).toFixed(
              0,
            )}% <br>` +
            `冒烟预警 <br>` +
            `${warnMsg}`
          );
        },
      }}
    />
  );
};

export default ProjectRelationChart;
