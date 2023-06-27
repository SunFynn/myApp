import React, { useMemo, useState } from 'react';
import { Button } from 'antd';
import RelationChart from '../RelationChart';
import styles from './index.less';

const colorEnums = {
  normal: {
    color: '#188BD9',
    borderColor: '#188BD9',
  },
  error: {
    color: '#F6574F',
    borderColor: '#F6574F',
  },
  success: {
    color: '#82C257',
    borderColor: '#82C257',
  },
  warning: {
    color: '#DF9E32',
    borderColor: '#DF9E32',
  },
};

const lineColor = ['#1A57B2', '#FF9400', '#31C678', '#F6574F'];

const buttonList = [
  { label: '建设单位', color: '#909399' },
  { label: '施工企业', color: '#F6574F' },
  { label: '材料供应商', color: '#82C257' },
  { label: '机械供应商', color: '#188BD9' },
  { label: '其他供应商', color: '#DF9E32' },
];

interface PaymentSequenceChartProps {
  enterprise: string;
}
const PaymentSequenceChart: React.FC<PaymentSequenceChartProps> = ({ enterprise }) => {
  const [keys, setKeys] = useState<number[]>(buttonList.map((_, index) => index));

  const initDataSource = useMemo(() => {
    const children: any[] = [
      {
        name: '巨匠建设集团股份有限公司',
        x: 4,
        y: 12,
        type: 'success',
        category: 2,
        label: {
          position: 'right',
        },
      },
      {
        name: '浙江立信建设集团有限公司',
        x: 10,
        y: 8,
        type: 'warning',
        category: 4,
        label: {
          position: 'right',
        },
      },
      {
        name: '巨鑫建设集团有限公司',
        x: 11,
        y: 2,
        type: 'success',
        category: 2,
        label: {
          position: 'right',
        },
      },
      {
        name: '子城联合建设集团有限公司',
        x: 13,
        y: -5,
        type: 'error',
        category: 1,
        label: {
          position: 'right',
        },
      },
      {
        name: '嘉兴锐欣建设工程有限公司',
        x: 10,
        y: -12,
        type: 'error',
        label: {
          position: 'right',
        },
        category: 1,
      },
      {
        name: '亚都建设集团有限公司',
        x: 0,
        y: -13,
        type: 'error',
        label: {
          position: 'bottom',
        },
        category: 1,
      },

      {
        name: '浙江宝森建设有限公司',
        x: -3,
        y: 13,
        type: 'success',
        category: 2,
      },
      {
        name: '浙江鼎隆建设有限公司',
        x: -9,
        y: 6,
        type: 'success',
        category: 2,
      },
      {
        name: '浙江嘉兴中达建设有限公司',
        x: -11,
        y: 0,
        type: 'normal',
      },
      {
        name: '浙江亿达建设有限公司',
        x: -10,
        y: -6,
        type: 'normal',
      },
      {
        name: '浙江秦核环境建设有限公司',
        x: -7,
        y: -11,
        type: 'error',
        category: 1,
      },
    ].map((i) => {
      const relations = [];
      const num = Math.floor(Math.random() * 2.5 + 2.5);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      for (let i = 0; i < num; i++) {
        relations.push({
          project: '乌镇互联网国际会展中心二期工程',
          count: (Math.random() * 150000 + 50000).toFixed(2),
          pay: Math.random(),
          image: Math.random(),
          close: Math.random(),
          warnMsg: '工程进度款超付,存在利益输送风险',
          lineStyle: { color: lineColor[i % lineColor.length] },
        });
      }

      return {
        category: 3,
        ...i,
        name: `${i.name}_${Math.random()}`,
        symbolSize: 26,
        label: i.label || { position: 'left' },
        itemStyle: colorEnums[i.type],
        relations,
      };
    });

    return [
      {
        name: enterprise,
        x: 0,
        y: 0,
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

  const dataSource = useMemo(() => {
    return initDataSource.map((data) => ({
      ...data,
      children: data.children.filter((i) => keys.includes(i.category)),
    }));
  }, [keys, enterprise]);

  return (
    <div>
      <RelationChart
        dataSource={dataSource}
        style={{ height: 510, marginTop: '-55px' }}
        xAxis={{ min: -20, max: 20 }}
        yAxis={{ min: -16, max: 16 }}
        effectOptions={{ symbolSize: 6 }}
        commonLineStyle={{
          color: '#FFFFFF',
          width: 3,
        }}
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
        onClickItems={(data: { name: any }) => {
          const { name } = data;
          console.log(name);
        }}
        lineTooltip={{
          formatter: ({ data }: any) => {
            const {
              target: { project, count, pay, image, close, warnMsg },
            } = data;
            return (
              `所在项目：${project} <br>` +
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
      <div className={styles.legend}>
        <div className={styles.label}>图例:</div>
        {buttonList.map((i, index) => (
          <Button
            key={i.label}
            style={{
              border: 0,
              backgroundColor: keys.includes(index) ? i.color : 'gray',
              color: '#fff',
              borderRadius: 4,
            }}
            onClick={() => {
              if (keys.includes(index)) {
                setKeys(keys.filter((key) => key !== index));
              } else {
                setKeys([...keys, index]);
              }
            }}
          >
            {i.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PaymentSequenceChart;
