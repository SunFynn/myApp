import React, { useMemo, useState } from 'react';
import { Button, Select } from 'antd';
import RelationChart from '../RelationChart';
import styles from './index.less';

const colorEnums = {
  succee: {
    color: '#31C678',
    borderColor: '#31C678',
  },
  normal: {
    color: '#3A67E9',
    borderColor: '#3A67E9',
  },
  error: {
    color: '#F6574F',
    borderColor: '#F6574F',
  },
  warn: {
    color: '#FF9400',
    borderColor: '#FF9400',
  },
};

const buttonList = [
  { label: '建设单位', color: '#909399' },
  { label: '施工企业', color: '#F6574F' },
  { label: '材料供应商', color: '#31C678' },
  { label: '机械供应商', color: '#188BD9' },
  { label: '其他供应商', color: '#FF9400' },
];

const PartnershipChart: React.FC = () => {
  const [keys, setKeys] = useState<number[]>(buttonList.map((_, index) => index));

  const initDataSource = useMemo(() => {
    const children = [
      {
        name: '浙江省建设机械集团有限公司',
        x: -1,
        y: 14,
        type: 'normal',
        category: 3,
        label: {
          position: 'right',
        },
      },
      {
        name: '上海建工一建集团股份有限公司',
        x: 4,
        y: 10,
        type: 'error',
        label: {
          position: 'right',
        },
      },
      {
        name: '浙江建设三建集团股份有限公司',
        x: 6,
        y: 5,
        type: 'error',
        label: {
          position: 'right',
        },
      },

      {
        name: '巨匠建设集团股份有限公司',
        x: 8,
        y: -5,
        type: 'error',
      },
      {
        name: '浙江建设一建集团股份有限公司',
        x: 4,
        y: -14,
        type: 'error',
      },
      {
        name: '浙江亚厦装饰股份有限公司',
        x: -2,
        y: -11,
        type: 'error',
      },
      {
        name: '桐乡市捷丰土石方工程有限公司',
        x: -10,
        y: -12,
        type: 'error',
        lineStyle: { color: '#FF0000' },
      },
      {
        name: '中天建设集团有限公司',
        x: -9,
        y: -2,
        type: 'error',
        label: {
          position: 'left',
        },
      },
      {
        name: '浙江方圆检测集团股份有限公司',
        x: -13,
        y: -8,
        type: 'warn',
        category: 4,
      },
      {
        name: '浙江建设大成集团有限公司',
        x: -9,
        y: 2,
        type: 'error',
        label: {
          position: 'left',
        },
      },
      {
        name: '浙江建设商贸物流有限公司',
        x: -6,
        y: 7,
        type: 'succee',
        category: 2,
        label: {
          position: 'left',
        },
      },
    ].map((i, index) => ({
      id: index + 1,
      category: 1,
      symbolSize: 30,
      label: {
        position: 'bottom',
      },
      itemStyle: colorEnums[i.type],
      relation: (Math.random() * 50 + 50).toFixed(0),
      count: (Math.random() * 150000 + 50000).toFixed(2),
      warnMsg: '供应商亲密度过高,存在利益输送风险',
      ...i,
    }));

    return [
      {
        id: 0,
        name: decodeURI(''),
        x: 0,
        y: 0,
        itemStyle: {
          color: '#00C4C0',
          borderColor: '#00C4C0',
        },
        label: { position: 'right' },
        symbolSize: 32,
        children,
      },
    ];
  }, []);

  const dataSource = useMemo(() => {
    return initDataSource.map((data) => ({
      ...data,
      children: data.children.filter((i) => keys.includes(i.category)),
    }));
  }, [keys]);

  return (
    <div>
      <RelationChart
        headClassName={styles.head}
        style={{ height: 500, marginTop: '-30px' }}
        dataSource={dataSource}
        xAxis={{ min: -15, max: 14 }}
        yAxis={{ min: -15, max: 13 }}
        effectOptions={{ symbolSize: 6 }}
        commonLineStyle={{
          color: '#CECAC7',
          width: 3,
        }}
        // onClickItems={() => {
        //   history('/enterprise');
        // }}
        lineTooltip={{
          formatter: ({ data }: any) => {
            const {
              target: { count, relation, warnMsg },
            } = data;
            return (
              `业务往采次数:&emsp;&emsp;${relation}次 <br>` +
              `涉及往来金额:&emsp;&emsp;${count}元 <br>` +
              `冒烟预警 <br>` +
              `${warnMsg} <br>` +
              `<a onclick="(() => console.log('查看往来记录'))()">查看往来记录</a>`
            );
          },
        }}
        expandLabel={[
          {
            color: '#fff',
            fontSize: 18,
            formatter: ({ data }: any) => {
              const { relation } = data;
              return relation || '';
            },
          },
        ]}
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

export default PartnershipChart;
