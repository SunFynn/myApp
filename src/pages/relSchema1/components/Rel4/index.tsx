import React, { useMemo } from 'react';
import RelationChart from '../RelationChart';
import moment from 'moment';

const randomDate = () => {
  // 随机生成0-11的数字
  const randomMonthNum = Math.floor(Math.random() * 11);
  // 随机生成1-30数字
  const randomDateNum = Math.ceil(Math.random() * 30);
  // 随机生成1-24 数字
  const randomHourNum = Math.ceil(Math.random() * 24);
  // 随机生成1-60 数字
  const randomMinuteNum = Math.ceil(Math.random() * 60);
  return moment()
    .month(randomMonthNum)
    .date(randomDateNum)
    .hour(randomHourNum)
    .minutes(randomMinuteNum)
    .seconds(randomMinuteNum)
    .format('YYYY年MM月DD日 HH:mm');
};

const SupplierRelationChart: React.FC = () => {
  const dataSource = useMemo(() => {
    const children = [
      {
        name: '桐乡市冠通垃圾清运有限公司',
        x: 12,
        y: -3,
        opposite: true,
        lineStyle: { color: '#FA8C16' },
      },
      {
        name: '浙江同安建设有限公司',
        x: 13,
        y: -11,
        opposite: true,
      },
      {
        name: '嘉兴锐欣建设工程有限公司',
        x: 10,
        y: -18,
        opposite: true,
      },
      {
        name: '嘉兴市聚源建设工程有限公司',
        x: 8,
        y: -25,
        opposite: true,
      },
      {
        name: '嘉兴勇明土石方有限公司',
        x: 6,
        y: -31,
        opposite: true,
      },

      {
        name: '桐乡市材信建筑劳务有限公司',
        x: -3,
        y: -30,
        label: { position: 'left' },
      },
      {
        name: '嘉兴市金源机械设备租赁有限公司',
        x: -4,
        y: -22,
        label: { position: 'left' },
      },
      {
        name: '嘉兴市澳太新型建筑材料有限公司',
        x: -7,
        y: -16,
        label: { position: 'left' },
        lineStyle: { color: '#FF0000' },
      },
      {
        name: '浙江索纳塔建筑材料有限公司',
        x: -10,
        y: -10,
        label: { position: 'left' },
      },
      {
        name: '嘉兴辉煌建筑材料有限公司',
        x: -12,
        y: -3,
        label: { position: 'left' },
      },
    ].map((i) => ({
      itemStyle: {
        color: '#82C257',
        borderColor: '#82C257',
      },
      label: { position: 'right' },
      symbolSize: 24,
      time: randomDate(),
      count: (Math.random() * 150000 + 50000).toFixed(2),
      warnMsg: '供应商亲密度过高,存在利益输送风险',
      ...i,
    }));

    const childrenTwo = [
      {
        name: '浙江荣正建设管理有限公司',
        x: 8,
        y: 15,
        label: { position: 'right' },
      },
      {
        name: '桐乡市城乡规划设计院有限公司',
        x: 1,
        y: 21,
        label: { position: 'right' },
      },

      {
        name: '嘉兴市嘉设岩土工程勘察研究所有限公司',
        x: -9,
        y: 19,
        opposite: true,
      },
      {
        name: '浙江科佳工程咨询有限公司',
        x: -11,
        y: 11,
        opposite: true,
      },
      {
        name: '浙江方圆检测集团股份有限公司',
        x: -7,
        y: 4,
        opposite: true,
      },
    ].map((i) => ({
      itemStyle: {
        color: '#FA8C16',
        borderColor: '#FA8C16',
      },
      label: { position: 'left' },
      symbolSize: 26,
      time: randomDate(),
      count: (Math.random() * 150000 + 50000).toFixed(2),
      warnMsg: '供应商亲密度过高,存在利益输送风险',
      ...i,
    }));

    return [
      {
        name: '子城联合建设集团有限公司',
        x: 0,
        y: -5,
        itemStyle: {
          color: '#FA8C16',
          borderColor: '#FA8C16',
        },
        symbolSize: 24,
        label: { position: 'right' },
        children: [
          ...children,
          {
            name: '乌镇旅游股份有限公司',
            x: -1,
            y: 6,
            itemSyle: {
              color: '#69C0FF',
              borderColor: '#69C0FF',
            },
            symbolSize: 24,
            label: { position: 'right' },
            children: childrenTwo,
            time: randomDate(),
            count: (Math.random() * 150000 + 50000).toFixed(2),
            warnMsg: '供应商亲密度过高,存在利益输送风险',
          },
        ],
      },
    ];
  }, []);

  return (
    <RelationChart
      xAxis={{ min: -20, max: 20 }}
      yAxis={{ min: -30, max: 20 }}
      style={{ height: 460, marginTop: '-20px' }}
      dataSource={dataSource}
      effectOptions={{ symbolSize: 6 }}
      commonLineStyle={{
        color: '#CECAC7',
        width: 3,
      }}
      lineTooltip={{
        formatter: ({ data }: any) => {
          const {
            target: { count, time, warnMsg },
          } = data;
          return (
            `合同金额:&emsp;&emsp;${count}元 <br>` +
            `签订时间:&emsp;&emsp;${time} <br>` +
            `冒烟预警 <br>` +
            `${warnMsg} <br>` +
            `<a onclick="(() => console.log('查看付款信息'))()">查看付款信息</a>`
          );
        },
      }}
    />
  );
};

export default SupplierRelationChart;
