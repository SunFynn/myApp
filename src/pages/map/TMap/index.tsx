import { useEffect, useCallback, useState, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import iconImg from '@/assets/images/tmap_icon.png';
import iconImg1 from '@/assets/images/tmap_over_icon.png';
import styles from './style.less';

// 金华市3d模型数据
const JHJson = require('@/assets/json/jh.json');

interface TMapProps {
  defaultZoom: number; // 地图的默认缩放级别
  centerPoint: { centerCity: string; lng: number; lat: number }; // 地图中心位置信息
  projectList: any[];
}

const TMap = (props: TMapProps) => {
  const {
    defaultZoom = 9,
    centerPoint = { centerCity: '金华市', lng: 119.653423, lat: 29.084615 },
    projectList = [],
  } = props;
  const [map, setMap] = useState<any>();
  const [zoom, setZoom] = useState(defaultZoom);
  const [clearD3, setClearD3] = useState<boolean>(false);

  // 注册地图和3d模型
  //@ts-ignore
  const T = window.T;
  //@ts-ignore
  const d3 = window.d3 || {};

  // 以区域划分，合并区域的所有项目
  const outProjectList = useMemo(() => {
    const arr: any[] = [];
    if (projectList.length) arr.push(projectList[0]);
    (projectList || []).forEach((item) => {
      if (!arr.find((v) => v.county === item.county)) arr.push(item);
    });
    return arr;
  }, [projectList]);

  // 创建map对象
  useEffect(() => {
    if (T) {
      const mapOut = new T.Map('Tmap-box', { minZoom: 5, maxZoom: 18 });
      setMap(mapOut);
    }
  }, []);

  // 根据中心城市，设置地图中心坐标和缩放级别
  const setCenterCity = useCallback(
    (city, map1) => {
      if (city) {
        new T.LocalSearch(map1, {
          pageCapacity: 10,
          onSearchComplete: (result: any) => {
            const { lonlat } = result.area || {};
            if (lonlat) {
              const ll = lonlat.split(',');
              map1.centerAndZoom(new T.LngLat(ll[0], ll[1]), defaultZoom);
            }
          },
        }).search(city);
      } else {
        new T.LocalCity().location(function (e: any) {
          map1.centerAndZoom(e.lnglat, defaultZoom);
        });
      }
    },
    [defaultZoom],
  );

  // 地图基本信息
  useEffect(() => {
    if (map) {
      map.centerAndZoom(new T.LngLat(centerPoint.lng, centerPoint.lat), defaultZoom);
      map.setStyle('indigo');
      setCenterCity(centerPoint.centerCity, map);

      // 注册点击事件
      map.addEventListener('click', () => {});

      // 注册缩放事件
      map.addEventListener('zoomend', ({ target }: { target: any }) => {
        setZoom(target.getZoom());
      });
      map.clearOverLays();
    }
  }, [map, centerPoint]);

  // 监听zoom，d3层时候显示
  useEffect(() => {
    if (zoom >= 12) setClearD3(true);
    else setClearD3(false);
  }, [zoom]);

  // 以区为层级，展示聚集点
  const DefinedOverlay = T?.Overlay?.extend({
    initialize: function (
      lnglat: any,
      content: string,
      count: number,
      radius: number,
      options: any,
    ) {
      this.lnglat = lnglat;
      this._radius = radius || 60;
      this._text = content;
      this.count = count;
      this.setOptions(options);
    },

    onAdd: function (map1: any) {
      this.map = map1;
      const div = (this.div = document.createElement('div'));
      div.style.zIndex = '1000';
      div.style.position = 'absolute';
      div.style.width = `${this._radius}px`;
      div.style.height = `${this._radius}px`;
      div.style.borderRadius = '50%';
      div.style.backgroundColor = '#316DB1';
      div.style.setProperty('-moz-border-radius', '50%');
      div.style.setProperty('-webkit-border-radius', '50%');
      div.style.cursor = 'Pointer';
      div.innerHTML = `<div><span style="display: block;height:60px;margin-top: -5px;">${
        this._text
      }</span><span style="display:block;margin-top: -45px">${this.count || 1}</span></div>`;
      div.style.lineHeight = `${this._radius}px`;
      div.style.opacity = '0.7';
      div.style.fontSize = '12px';
      div.style.fontWeight = 'bold';
      div.style.color = '#fff';
      div.style.textAlign = 'center';
      div.onmouseover = () => {
        this.div.style.backgroundColor = '#1165FF';
        this.div.style.opacity = '1';
        this.div.style.zIndex = '10000';
      };
      div.onmouseleave = () => {
        this.div.style.backgroundColor = '#316DB1';
        this.div.style.opacity = '1';
        this.div.style.zIndex = '1000';
      };
      div.onclick = () => {
        const zoom1: number = this.map.getZoom();
        if (zoom1 >= 9) this.map.centerAndZoom(this.lnglat, 12);
        else if (zoom1 === 8) this.map.centerAndZoom(this.lnglat, 11);
        else if (zoom1 < 8) this.map.centerAndZoom(this.lnglat, 8);
      };

      map1.getPanes().overlayPane.appendChild(this.div);
      this.update();
    },

    onRemove: function () {
      const parent = this.div.parentNode;
      if (parent) {
        parent.removeChild(this.div);
        this.map = null;
        this.div = null;
      }
    },

    setLnglat: function (lnglat: any) {
      this.lnglat = lnglat;
      this.update();
    },
    getLnglat: function () {
      return this.lnglat;
    },
    setPos: function (pos: any) {
      this.lnglat = this.map.layerPointToLngLat(pos);
      this.update();
    },
    /**
     * 更新位置
     */
    update: function () {
      const pos = this.map.lngLatToLayerPoint(this.lnglat);
      this.div.style.top = pos.y - 30 + 'px';
      this.div.style.left = pos.x - 30 + 'px';
    },
  });

  // 设置地图覆盖物及弹框
  const setMarker = useCallback(
    (recordInfo) => {
      const record = { ...recordInfo };
      // 自定义图标
      const icon = new T.Icon({
        iconUrl: iconImg,
        iconSize: new T.Point(26, 39),
        iconAnchor: new T.Point(10, 25),
      });
      // 创建标注对象
      const marker = new T.Marker(new T.LngLat(record.lng, record.lat), { icon: icon });

      window[`handleProject${record.projectId}`] = function handleProject() {};

      marker.addEventListener('click', function () {
        console.log(record, 'record');
        // window[`handleProject${record.projectId}`]();
      });

      // 向地图上添加标注
      map.addOverLay(marker);

      // 项目弹框
      const content = () => {
        return `<div class='dialog_content progress' style="margin-top:0px" onclick='handleProject${
          record.projectId
        }()'>
      <div class='project'>${record.projectName || '-'}</div>
      <div class='company'>${record.contractCorpName || '-'}</div>
    </div>`;
      };
      const infoWindow = new T.InfoWindow(content, { autoPan: true });
      // 鼠标移入覆盖物
      marker.addEventListener('mouseover', function () {
        marker.openInfoWindow(infoWindow);
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.Fr.src = iconImg1;
      });
      // 鼠标移出覆盖物
      marker.addEventListener('mouseout', function () {
        marker.closeInfoWindow(infoWindow);
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.Fr.src = iconImg;
      });
      return marker;
    },
    [T, map],
  );

  const overJson = useMemo(() => {
    switch (centerPoint.centerCity) {
      case '金华市':
        return JHJson;
      default:
        return JHJson;
    }
  }, [centerPoint]);

  // 3d遮罩层
  function init(sel: any) {
    const countries = overJson.features;
    const upd = sel.selectAll('path.geojson').data(countries);
    upd
      .enter()
      .append('path')
      .attr('class', 'geojson')
      .attr('stroke', '#7CC6FF')
      .attr('stroke-width', '2')
      .attr('fill', '#2A5185')
      .attr('opacity', function () {
        return 0.8;
      });
  }

  // 遮罩层阴影效果;
  function init1(sel: any) {
    const countries = overJson.features;
    const upd = sel.selectAll('path.geojson').data(countries);
    upd
      .enter()
      .append('path')
      .attr('class', 'geojson d3ClassShadow')
      .attr('stroke', '#000000')
      .attr('stroke-width', '0')
      .attr('fill', '#00142E')
      .attr('opacity', function () {
        return 0.2;
      });
  }

  function redraw(sel: any, transform: any) {
    sel.selectAll('path.geojson').each(function () {
      //@ts-ignore
      d3.select(this).attr('d', transform.pathFromGeojson);
    });
  }

  // 清空d3图层, 保留项目坐标点
  useEffect(() => {
    if (map && clearD3) {
      map?.clearOverLays();
      (projectList || []).forEach((item) => {
        setMarker(item);
      });
    }
  }, [map, clearD3, projectList, setMarker]);

  useEffect(() => {
    if (map && !clearD3) {
      // 清楚地图标识点
      map.clearOverLays();

      // 添加3d覆盖物
      const countriesOverlay = new T.D3Overlay(init, redraw);
      map.addOverLay(countriesOverlay);

      // 3d覆盖物阴影效果
      const countriesOverlay1 = new T.D3Overlay(init1, redraw);
      map?.addOverLay(countriesOverlay1);

      (outProjectList || []).forEach((item) => {
        if (item.lng && item.lat) {
          const point = new T.LngLat(item.lng, item.lat);
          const pdefinedOverlay = new DefinedOverlay(
            point,
            item.county || item.city || item.province,
            item.countyDistribution,
            undefined,
            {},
          );
          map.addOverLay(pdefinedOverlay);
        }
      });
    }
  }, [map, clearD3, outProjectList]);

  return (
    <PageContainer>
      <div id="Tmap-box" className={styles['Tmap-box']}>
        <div className={styles.mask} />
      </div>
    </PageContainer>
  );
};

export default TMap;
