import type { FC } from 'react';
import { useMemo } from 'react';
import { Card } from 'antd';
// 滚动组件
import CarouselPro from './components/ScrollCom/CarouselPro';
import ProgressCom from './components/ScrollCom/ProgressCom';

interface ChartsComProps {}

const ChartsCom: FC<ChartsComProps> = () => {
  const ProgressComData = useMemo(() => {
    return [
      { title: '数据1', value: 100 },
      { title: '数据2', value: 110 },
      { title: '数据3', value: 120 },
      { title: '数据4', value: 130 },
      { title: '数据5', value: 140 },
      { title: '数据6', value: 150 },
      { title: '数据7', value: 160, color: 'red' },
    ];
  }, []);

  return (
    <div>
      <h2>滚动组件</h2>
      <div style={{ display: 'flex' }}>
        <Card title="Carousel走马灯滚动条" style={{ width: 300 }}>
          <CarouselPro />
        </Card>
        <Card title="自定义滚动" style={{ width: 300, marginLeft: '16px' }}>
          <ProgressCom data={ProgressComData} />
        </Card>
      </div>
    </div>
  );
};

export default ChartsCom;
