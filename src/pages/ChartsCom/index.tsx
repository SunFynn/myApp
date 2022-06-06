import type { FC } from 'react';
import { useMemo } from 'react';
import { Card } from 'antd';
// 滚动组件
import CarouselPro from './components/ScrollCom/CarouselPro';
import ProgressCom from './components/ScrollCom/ProgressCom';
// Echarts图表组件
import PieEcharts from './components/Echarts/PieEcharts';
import GaugeEcharts from './components/Echarts/GaugeEcharts';
import EchartsClick from './components/Echarts/ClickEcharts/Echarts';
import EchartsForReactEvent from './components/Echarts/ClickEcharts/EchartsForReactEvent';
// Antd charts图表
import BidirectionalBar from './components/Antv/BidirectionalBar';

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

  const PieEchartsData = {
    piedata: [
      { value: 48, name: '资金支付管理', percent: '34%' },
      { value: 46, name: '工程进度管理', percent: '33%' },
      { value: 42, name: '工程分包管理', percent: '21%' },
      { value: 39, name: '质量安全管理', percent: '7%' },
      { value: 35, name: '过程变更管理', percent: '5%' },
    ],
    all: 312,
    title: '冒烟预警次数',
    pieColor: ['#3A6DE9', '#7833FF', '#F7DF33', '#3AF4A2', '#3AE8FF', '#3AE8FF'],
  };

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
      <h2 style={{ marginTop: '24px' }}>Echarts图表组件</h2>
      <div style={{ display: 'flex' }}>
        <Card title="圆环图表" style={{ width: 440 }}>
          <PieEcharts data={PieEchartsData} />
        </Card>
        <Card title="仪表盘图表" style={{ width: 300, marginLeft: '16px' }}>
          <GaugeEcharts data={26.3} />
        </Card>
        <Card title="图表点击事件" style={{ width: 600, marginLeft: '16px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '260px', marginRight: '40px' }}>
              echarts图表绑定点击事件
              <EchartsClick />
            </div>
            <div style={{ width: '260px' }}>
              echarts-for-react图表绑定点击事件
              <EchartsForReactEvent />
            </div>
          </div>
        </Card>
      </div>
      <h2 style={{ marginTop: '24px' }}>Antd charts图表组件</h2>
      <div style={{ display: 'flex' }}>
        <Card title="堆叠柱形图" style={{ width: 440 }}>
          <BidirectionalBar />
        </Card>
      </div>
    </div>
  );
};

export default ChartsCom;
