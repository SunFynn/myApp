import { useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import BMap1 from './BMap1';
import BMap2 from './BMap2';
import { list } from '@/services/map/bmap';

const BMap = () => {
  // 很多条项目时，定位地图中心点坐标
  const centerPointer = useMemo(() => {
    const projectList = list || [];
    const latList: number[] = [];
    const lngList: number[] = [];
    projectList.forEach((i) => {
      latList.push(i.lat);
      lngList.push(i.lng);
    });
    return {
      lng: (Math.max(...lngList) + Math.min(...lngList)) / 2,
      lat: (Math.max(...latList) + Math.min(...latList)) / 2,
    };
  }, []);

  return (
    <PageContainer>
      <div style={{ height: '500px', background: '#ffffff', padding: '16px 20px' }}>
        <BMap2
          projectList={list}
          centerPoint={list.length === 1 ? { lng: list[0].lng, lat: list[0].lat } : centerPointer}
          defaultZoom={10}
        />
      </div>
      <BMap1 />
    </PageContainer>
  );
};

export default BMap;
