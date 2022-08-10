import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
// 滚动组件
import CarouselPro from './components/ScrollCom/CarouselPro';
import ProgressCom from './components/ScrollCom/ProgressCom';
import PositionScroll from './components/ScrollCom/PositionScroll';
// Echarts图表组件
import PieEcharts from './components/Echarts/PieEcharts';
import GaugeEcharts from './components/Echarts/GaugeEcharts';
import EchartsClick from './components/Echarts/ClickEcharts/Echarts';
import EchartsForReactEvent from './components/Echarts/ClickEcharts/EchartsForReactEvent';
import Bar3DEcharts from './components/Echarts/Bar3DEcharts';
import Bar3DGroupEcharts from './components/Echarts/Bar3DGroupEcharts';
// Antd charts图表
import BidirectionalBar from './components/Antv/BidirectionalBar';
// EchartsGL地图组件
import EchartsGLMAP from './components/EchartsGLMap/Map';
import { getCityData } from './components/EchartsGLMap/Map/mock';
import EchartsGLPie3D from './components/EchartsGLMap/Pie3D';

interface ChartsComProps {}

const ChartsCom: FC<ChartsComProps> = () => {
  const [cityInfo, setCityInfo] = useState({ city: '浙江省', orgCode: '330000' });

  /** transform自定义滚动数据 */
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

  /** echarts圆环图表数据 */
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
    <PageContainer>
      <h2>滚动组件</h2>
      <div style={{ display: 'flex' }}>
        <Card title="Carousel走马灯滚动条" style={{ width: 300 }}>
          <CarouselPro />
        </Card>
        <Card title="transform自定义滚动" style={{ width: 300, marginLeft: '16px' }}>
          <ProgressCom data={ProgressComData} />
        </Card>
        <Card title="position自定义滚动" style={{ width: 300, marginLeft: '16px' }}>
          <PositionScroll />
        </Card>
      </div>
      <h2 style={{ marginTop: '24px' }}>Echarts图表组件</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
        <br />
        <Card title="3D柱状图" style={{ width: 400, marginTop: '20px' }}>
          <Bar3DEcharts />
        </Card>
        <Card title="3D柱状组合图" style={{ width: 460, marginTop: '20px', marginLeft: '16px' }}>
          <Bar3DGroupEcharts />
        </Card>
      </div>
      <h2 style={{ marginTop: '24px' }}>Antd charts图表组件</h2>
      <div style={{ display: 'flex' }}>
        <Card title="堆叠柱形图" style={{ width: 440 }}>
          <BidirectionalBar />
        </Card>
      </div>
      <h2 style={{ marginTop: '24px' }}>Echarts GL图表组件</h2>
      <div style={{ display: 'flex' }}>
        <Card
          title="echartsGL地图"
          style={{ width: 600, position: 'relative', height: '560px', marginRight: '40px' }}
        >
          <EchartsGLMAP
            city={cityInfo.city}
            setCityInfo={setCityInfo}
            cityData={getCityData(cityInfo.orgCode)}
          />
        </Card>
        <Card title="echartsGL3D圆环图" style={{ width: 500, height: '360px' }}>
          <EchartsGLPie3D />
        </Card>
      </div>
    </PageContainer>
  );
};

export default ChartsCom;
