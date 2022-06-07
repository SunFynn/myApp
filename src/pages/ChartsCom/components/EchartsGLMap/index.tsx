import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RollbackOutlined } from '@ant-design/icons';
import * as echarts from 'echarts/core'; // echarts
import 'echarts-gl'; // 3D地图插件
// import cs from 'classnames';
import { getCityName } from './mock';
import styles from './index.less';

interface MapProps {
  /**
   * 当前城市地图展示数据：经纬度信息、市县名称、数值
   */
  cityData: {
    name: string;
    point: [number, number];
    value: number;
    coords: any[];
  }[];
  city: string; // 省市名称
  setCityInfo: ({ city, orgCode }: { city: string; orgCode: string }) => void;
  legendVisible?: boolean;
}

/**
 * 当前城市信息，城市名称，拼音，json信息
 */
interface cityName {
  name: string;
  value: string;
  json: any;
}

const Map: React.FC<MapProps> = (props) => {
  const { cityData, city, setCityInfo, legendVisible = true } = props;
  const cityN: any = getCityName(city);
  const [cityName, setCityName] = useState<cityName>(cityN);
  const myRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const cityN: any = getCityName(city);
    setCityName(cityN);
  }, [city]);

  const cityPoint = useMemo(() => {
    const cityPoints: any[] = [];
    (cityData || []).forEach((v: any) => {
      const obj = { ...v };
      obj.value = v.point;
      cityPoints.push(obj);
    });
    return cityPoints;
  }, [cityData]);

  const maxCount = useMemo(() => {
    let count = 0;
    (cityData || []).forEach((i: any) => {
      if (i.value > count) count = i.value;
    });
    return count;
  }, [cityData]);

  const option = useMemo(() => {
    const linesData =
      cityData?.map(
        ({ name, point, coords }: any) => coords || [{ name, coords: [point, point] }],
      ) || [];

    return {
      title: {
        top: 20,
        text: '',
        subtext: '',
        x: 'center',
        textStyle: { color: '#ccc' },
      },
      animation: false,
      /**
       * 地图的legend
       */
      visualMap: [
        {
          min: 0,
          max: maxCount,
          show: legendVisible,
          right: 20,
          bottom: 34,
          seriesIndex: 0,
          inRange: {
            color: ['#0F4673', '#308DDA'],
          },
          itemHeight: 72,
          itemWidth: 8,
          handleStyle: {
            borderColor: 'red',
            borderWidth: 5,
            borderRadius: 0,
          },
          formatter: () => '',
        },
        {
          min: 0,
          max: maxCount,
          show: false,
          right: 100,
          seriesIndex: 1,
          type: 'piecewise',
          bottom: 0,
          textStyle: {
            color: '#fff',
          },
          splitList: [
            {
              color: '#fff',
            },
          ],
        },
      ],
      /**
       * 地图整体配置
       */
      geo: {
        map: cityName.name,
        geoIndex: -1,
        aspectScale: 0.75, //长宽比
        selectedMode: false,
        zoom: 1,
        itemStyle: {
          normal: {
            label: { show: false },
            areaColor: '#013C62',
            shadowColor: '#23345A',
            shadowOffsetX: 2,
            shadowOffsetY: 10,
            borderWidth: 0,
          },
        },
      },
      /**
       * 地图块的相关信息
       */
      series: [
        {
          type: 'map',
          map: cityName.name,
          zoom: 1,
          label: {
            normal: { show: false },
            emphasis: { show: false },
          },
          itemStyle: {
            normal: {
              borderColor: '#7AA3FF',
              borderWidth: 1,
              areaColor: '#12235c',
            },
          },
          emphasis: {
            itemStyle: {
              areaColor: '#6EAEE2',
              borderWidth: 0,
            },
          },
          select: {
            label: { show: false },
            itemStyle: {
              areaColor: '#34608E',
              borderWidth: 0,
            },
          },
          data: cityData,
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          rippleEffect: {
            period: 4,
            scale: 2,
            brushType: 'fill',
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: 'rgba(0, 210, 255, 0.3)',
              shadowBlur: 4,
              shadowColor: '#333',
            },
          },
          data: cityPoint,
        },
        {
          type: 'lines',
          zlevel: 3,
          opacity: 1,
          label: {
            show: true,
            padding: [0, 10],
            formatter: (v: any) => {
              const value = v.value ? Number(v.value).toLocaleString() : '';
              return `{value|${value}}\n{name|${v.name}}`;
            },
            rich: {
              value: { fontSize: 16, color: '#000', padding: 6 },
              name: { fontSize: 12, color: '#000' },
            },
          },
          lineStyle: {
            type: 'solid',
            color: '#000',
            width: 1,
            opacity: 1,
          },
          data:
            linesData.length > 0 ? linesData.reduce((a: any, b: any) => [...a, ...b]) : linesData,
        },
      ],
    };
  }, [cityData, cityName, cityPoint, maxCount]);

  useEffect(() => {
    if (myRef.current) {
      echarts.registerMap(cityName.name, cityName.json);

      //@ts-ignore
      const myChart = echarts.init(myRef?.current);
      myChart.showLoading();

      myChart.on('click', function (e: any) {
        if (
          [
            '杭州市',
            '湖州市',
            '嘉兴市',
            '宁波市',
            '舟山市',
            '绍兴市',
            '金华市',
            '台州市',
            '衢州市',
            '丽水市',
            '温州市',
          ].includes(e.name)
        ) {
          setCityInfo({ city: e.name, orgCode: e?.data?.orgCode });
        }
      });

      myChart.hideLoading();
      myChart.setOption(option);
    }
  }, [myRef, option, cityName, cityData]);

  return (
    <div className={styles.mapBox}>
      {city !== '浙江省' && (
        <span
          className={styles.backBox}
          onClick={() => {
            setCityInfo({ city: '浙江省', orgCode: '330000' });
          }}
        >
          <div style={{ marginLeft: '-28px', color: '#ffffff', textAlign: 'center' }}>
            <RollbackOutlined style={{ verticalAlign: 'baseline' }} />
            返回省级
          </div>
        </span>
      )}
      <div className={styles.map} ref={myRef} />
    </div>
  );
};

export default Map;
