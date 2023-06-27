/* eslint-disable @typescript-eslint/no-shadow */
import { useRef, useEffect, useState, useCallback } from 'react';
import { EnvironmentTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import redIcon from '@/assets/images/amap_red.png';
import yellowIcon from '@/assets/images/amap_yellow.png';
import greenIcon from '@/assets/images/amap_green.png';
import { list } from '@/services/map/amap';
import cs from 'classnames';
// typescript
import type { FC } from 'react';
import type { projectlistProps } from '@/services/map/amap';
// less
import styles from './index.less';

interface MapProps {
  projectlist?: projectlistProps[]; // 项目列表
  centerPoint?: { lng: number; lat: number }; // 地图中心点
  defaultZoom?: number; // 地图收缩等级
}

const Map: FC<MapProps> = (props) => {
  const { projectlist = [], centerPoint = { lng: 120.48, lat: 30.61 }, defaultZoom = 10 } = props;
  const [map, setMap] = useState<any>();
  const [zoom, setZoom] = useState<number>(defaultZoom);

  const mapRef = useRef<any>(null);
  const AMap = window?.AMap || {};

  /** 初始化高德地图 */
  useEffect(() => {
    //@ts-ignore
    const district = new AMap.DistrictSearch({
      subdistrict: 0,
      extensions: 'all',
      level: 'city',
    });
    district.search('桐乡市', function (status: any, result: any) {
      const bounds = result.districtList[0].boundaries;
      const mask = [];
      for (let i = 0; i < bounds.length; i += 1) {
        mask.push([bounds[i]]);
      }
      const map: any = new AMap.Map(mapRef.current, {
        mask: mask,
        center: [centerPoint.lng, centerPoint.lat],
        viewMode: '3D',
        showLabel: true,
        labelzIndex: 130,
        pitch: 18,
        zoom: zoom,
        mapStyle: 'amap://styles/grey',
      });
      setMap(map);

      // 添加高度面
      //@ts-ignore
      const object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
      map.add(object3Dlayer);
      //@ts-ignore
      const wall = new AMap.Object3D.Wall({
        path: bounds,
        height: 5000,
        color: '#0088ff',
      });
      wall.transparent = false;
      wall.backOrFront = 'both';
      object3Dlayer.add(wall);
      //添加描边
      for (let i = 0; i < bounds.length; i += 1) {
        new AMap.Polyline({
          path: bounds[i],
          strokeColor: '#99ffff',
          strokeWeight: 4,
          map: map,
        });
      }
    });
  }, []);

  /** 地图缩放切换不同zoom等级 */
  useEffect(() => {
    if (map) {
      map.on('zoomchange', () => {
        setZoom(map.getZoom());
      });
    }
  }, [map, zoom]);

  // 在指定位置打开信息窗体
  function openInfo(record: any, mapI: any, marker: any) {
    const info = [];
    info.push(`<div style=\"padding:0px 0px 0px 4px; color: #000000; \"> `);
    info.push(`<div><b>${record.projectName}</b></div>`);
    info.push(`</div>`);
    const infoWindow = new AMap.InfoWindow({
      content: info.join('<br/>'), //使用默认信息窗体框样式，显示信息内容
    });
    infoWindow.open(mapI, marker.getPosition());
  }

  // 合并项目列表
  const allProjectList = useCallback(() => {
    let AList: allProjectListProps[] = [];
    if (projectlist.length) AList.push({ ...projectlist[0], num: 1 });
    (projectlist || []).forEach((item) => {
      if (!AList.find((v) => v.county === item.county))
        AList.push({
          ...item,
          num: 1,
          lng: item.lng,
          lat: item.lat,
        });
      else if (AList.find((v) => v.county === item.county))
        //@ts-ignore
        AList.find((v) => v.county === item.county).num =
          //@ts-ignore
          AList.find((v) => v.county === item.county).num + 1;
    });
    // 没有经纬度的项目数据过滤掉
    AList = AList.filter((item) => !!(item.lng && item.lat));
    return AList;
  }, [projectlist]);

  /** 高德地图 - 添加覆盖物 */
  useEffect(() => {
    if (map) {
      map.clearMap();
      if (zoom < 13) {
        const AList: allProjectListProps[] = allProjectList();
        AList.forEach((item) => {
          // 点标记显示内容，HTML要素字符串
          const markerContent = `
            <div class="custom-content-marker">
              <div class="custom-content-marker-icon"></div>
              <div class="custom-content-marker-title">${item.county}</div>
              <div class="custom-content-marker-num">${item.countyDistribution}</div>
            </div>`;
          const marker = new AMap.Marker({
            position: [item.lng, item.lat + 0.01],
            // 将 html 传给 content
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            content: markerContent,
          });
          map.add(marker);
          marker.on('click', function () {
            map.setZoomAndCenter(14, [item.lng, item.lat]);
          });
        });
      } else {
        // 遍历项目添加点覆盖物
        (projectlist || []).forEach((item: any) => {
          // 点覆盖物
          let iconColor;
          if (item.fxdj === '红色预警') iconColor = redIcon;
          else if (item.fxdj === '黄色预警') iconColor = yellowIcon;
          else iconColor = greenIcon;
          const marker = new AMap.Marker({
            // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [item.lng, item.lat],
            content: `<div>
                       <span style="display: inline-block; width: 10px; height: 10px;"></span>
                       <img src=${iconColor} />
                       <div style="margin-left: -150px; text-align: center; width: 300px; display: none">${item.projectName}</div>
                     </div>`,
          });
          map.add(marker);
          marker.on('click', function () {
            openInfo(item, map, marker);
          });
        });
      }
    }
  }, [map, zoom]);

  return (
    <div className={cs(styles.map)}>
      <div className={cs(styles.recover)}>
        <EnvironmentTwoTone
          style={{ fontSize: '20px', marginTop: '4px' }}
          onClick={() => {
            map.setZoomAndCenter(defaultZoom, [centerPoint.lng, centerPoint.lat]);
          }}
        />
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '780px' }} />
    </div>
  );
};

interface allProjectListProps extends projectlistProps {
  num?: number;
}

const AMapBox = () => {
  return (
    <PageContainer>
      <Map projectlist={list || []} defaultZoom={11} />
    </PageContainer>
  );
};

export default AMapBox;
