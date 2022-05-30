import type { FC } from 'react';
import { Card } from 'antd';
import CarouselPro from './components/CarouselPro';

interface ChartsComProps {}

const ChartsCom: FC<ChartsComProps> = () => {
  return (
    <div>
      <Card title="Carousel走马灯滚动条" style={{ width: 300 }}>
        <CarouselPro />
      </Card>
    </div>
  );
};

export default ChartsCom;
