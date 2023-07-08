import { forwardRef, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Card } from 'antd';
import { isNil } from 'lodash';
import style from './style.less';

interface ISelectMap {
  centerPoint?: { lng: number; lat: number }; // 地图中心点
  defaultZoom?: number; // 地图收缩等级
}

interface IMarkerData {
  /** 地理经纬度。 */
  area: { lng: number; lat: number };
  name: string;
  projectCount: number;
}

export default forwardRef((props: ISelectMap) => {
  const { centerPoint = { lng: 119.653423, lat: 29.084615 }, defaultZoom = 9 } = props;
  const [map, setMap] = useState<any>();

  const ararTotalInfo = useMemo(() => {
    return { sumGczj: 0, sumProjectCount: 0 };
  }, []);

  const dataSource = useMemo(() => {
    return [
      { area: { lng: 119.89206, lat: 29.45251 }, name: '浦江县', projectCount: 18 },
      { area: { lng: 119.46051, lat: 29.20838 }, name: '兰溪市', projectCount: 88 },
      { area: { lng: 120.07468, lat: 29.30558 }, name: '义乌市', projectCount: 52 },
      { area: { lng: 120.45022, lat: 29.05403 }, name: '磐安县', projectCount: 43 },
      { area: { lng: 119.81651, lat: 28.8926 }, name: '武义县', projectCount: 61 },
    ];
  }, []);

  const mapRef = useRef<any>(null);
  //@ts-ignore
  const BMapGL = window?.BMapGL;

  useEffect(() => {
    // 注册百度地图
    const { current } = mapRef;
    if (current && BMapGL) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const map = new BMapGL.Map(current, {
        enableDblclickZoom: false,
        displayOptions: {
          building: false,
        },
      });
      // 设置中心坐标点和默认缩放等级
      map.centerAndZoom(new BMapGL.Point(centerPoint.lng, centerPoint.lat), defaultZoom);
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      // 添加金华市地图覆盖物
      const bd = new BMapGL.Boundary();
      bd.get('金华市', function (rs: any) {
        const hole = new BMapGL.Polygon(rs.boundaries, {
          fillColor: 'blue',
          fillOpacity: 0.2,
          strokeColor: '#6FBFF4',
          strokeWeight: 1,
          strokeOpacity: 0.5,
        });
        map.addOverlay(hole);
      });
      setMap(map);
    }
  }, []);

  const setMaskerColor = useCallback((val) => {
    if (val >= 80) {
      return '#0050b3';
    } else if (val < 80 && val >= 50) {
      return '#1790ff';
    } else if (val < 50 && val >= 30) {
      return '#69c0ff';
    } else {
      return '#bae7ff';
    }
  }, []);

  useEffect(() => {
    // 根据项目添加地图覆盖物
    if (map && dataSource?.length) {
      (dataSource || []).forEach((item: IMarkerData) => {
        const opts = {
          position: new BMapGL.Point(item?.area?.lng, item?.area?.lat), // 指定文本标注所在的地理位置
          offset: new BMapGL.Size(0, 0), // 设置文本偏移量
        };
        // 创建文本标注对象
        const label = new BMapGL.Label(`${item.name} \n\r ${item.projectCount}`, opts);
        // 自定义文本标注样式
        label.setStyle({
          height: '50px',
          width: '50px',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          color: '#ffffff',
          borderRadius: '50px',
          background: setMaskerColor(item.projectCount),
          borderColor: setMaskerColor(item.projectCount),
          textAlign: 'center',
          paddingTop: '6px',
          fontSize: '14px',
        });
        map.addOverlay(label);
      });
    }
  }, [map, dataSource]);

  return (
    <Card title="典型工程区域分布一览" className={style['tmap-masker']}>
      <div className={`${style['masker-number']}`}>
        <div>
          <div>在建典型工程规模总额</div>
          <div>
            {isNil(ararTotalInfo?.sumGczj) ? '-' : ararTotalInfo.sumGczj}
            <span>万元</span>
          </div>
        </div>
        <div>
          <div>在建典型工程总量</div>
          <div>
            {isNil(ararTotalInfo?.sumProjectCount) ? '-' : ararTotalInfo.sumProjectCount}
            <span>项</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0px 100px' }}>
        <div ref={mapRef} style={{ width: '100%', height: '460px' }} />
      </div>
      <div className={style['masker-color']}>
        典型工程分布密度&nbsp;&nbsp;
        <span>
          <div className={`${style['color-width']} ${style.color80}`} />
          <br />
          <span className={`${style.legend} ${style.color80}`} />
          大于80
        </span>
        <span>
          <div className={`${style['color-width']} ${style.color50}`} />
          <br />
          <span className={`${style.legend} ${style.color50}`} />
          80-50
        </span>
        <span>
          <div className={`${style['color-width']} ${style.color30}`} />
          <br />
          <span className={`${style.legend} ${style.color30}`} />
          50-30
        </span>
        <span>
          <div className={`${style['color-width']} ${style.color10}`} />
          <br />
          <span className={`${style.legend} ${style.color10}`} />
          30以下
        </span>
      </div>
    </Card>
  );
});
