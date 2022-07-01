import { forwardRef, useRef, useEffect, useState, useMemo } from 'react';
//@ts-ignore
import BMap from 'BMap';
import mapIcon from '@/assets/images/icon_project.png';

interface ISelectMap {
  projectList?: any[]; // 项目列表
  centerPoint?: { lng: number; lat: number }; // 地图中心点
  defaultZoom?: number; // 地图收缩等级
  isShowInfoPop?: boolean; // 是否展示弹框覆盖物
}

export default forwardRef((props: ISelectMap) => {
  const {
    isShowInfoPop = true,
    projectList,
    centerPoint = { lng: 119.653423, lat: 29.084615 },
    defaultZoom = 2,
  } = props;
  const [map, setMap] = useState<any>();
  const [zoom, setZoom] = useState(defaultZoom);

  const mapRef = useRef<any>(null);

  const newzoom = useMemo(() => {
    let c: number = zoom;
    if (c < 3) c = 8;
    return c;
  }, [zoom]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getAllMarks = (record: any, map: any) => {
    const progress = record?.projectOutputValueCompletionProgress;
    const point = new BMap.Point(record?.lng, record?.lat);
    const marker = new BMap.Marker(point, { icon: new BMap.Icon(mapIcon, new BMap.Size(26, 32)) }); // 创建标注
    map?.addOverlay(marker); // 将标注添加到地图中
    if (isShowInfoPop) {
      const content = `<div class="projectInfoModal">
                      <hr class="divider" />
                      <div class='projectName'>${record?.projectName || '无'}</div>
                      <div class='company'>${record?.contractorCorpName || '无'}</div>
                      <div class='vest' style='margin-top: 10px'>
                        <span class="vestLabel">工程总造价:</span>
                        <span class="vestValue">${record?.invest || 0}万元</span>
                      </div>
                      <div class="progressCtn">
                        <span class="progressOuter">
                          <span class="progressInner" style='width: ${progress}%; background:linear-gradient(90deg,rgba(22,86,126,0.70), #6ac4ff)'></span> 
                        </span>
                        <span class="progressNum">${progress}%</span>
                      </div>
                    </div`;
      const infoWindow = new BMap.InfoWindow(content, {
        autoPan: true,
        height: 160,
        title: '项目信息',
      });
      marker.addEventListener('click', function () {
        marker.openInfoWindow(infoWindow, point);
      });
    }
  };

  useEffect(() => {
    // 注册百度地图
    const { current } = mapRef;
    if (current) {
      const map1 = new BMap.Map(current);
      const point = new BMap.Point(centerPoint.lng, centerPoint.lat);
      map1.centerAndZoom(point, defaultZoom);
      map1.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      setMap(map1);
    }
  }, [defaultZoom, centerPoint]);

  useEffect(() => {
    if (map) {
      // 添加项目覆盖物
      (projectList || []).map((record) => {
        getAllMarks(record, map);
      });
    }
  }, [map, projectList]);

  useEffect(() => {
    if (map) {
      // 如果项目经纬度不在地图展示范围内，逐渐缩放地图
      setTimeout(() => {
        const VL = map.getBounds().getSouthWest(); // 返回矩形区域的西南角经纬度
        const EL = map.getBounds().getNorthEast(); // 返回矩形区域的东北角经纬度
        if ((projectList || []).find((v) => !!(v?.lat < VL?.lat || v?.lat > EL?.lat))) {
          const z = newzoom - 1;
          setZoom(z);
        } else if ((projectList || []).find((v) => !!(v?.lng < VL?.lng || v?.lng > EL?.lng))) {
          const z = newzoom - 1;
          setZoom(z);
        }
      }, 400);
    }
  }, [map, projectList, zoom]);

  useEffect(() => {
    if (map) {
      // 根据zoom修改地图缩放等级
      const point = new BMap.Point(centerPoint.lng, centerPoint.lat);
      map.centerAndZoom(point, zoom);
    }
  }, [map, zoom, centerPoint]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
});
