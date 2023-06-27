import { useMemo } from 'react';
import type { BidirectionalBarConfig } from '@ant-design/charts';
import { BidirectionalBar } from '@ant-design/charts';

function ColumnWatch() {
  const data = useMemo(
    () => [
      {
        type: '总数',
        name: '1号',
        upstair: 30,
        downstair: 5,
        upComplete: 20,
        downComplete: 4,
        upWill: 10,
        downWill: 1,
      },
      {
        type: '总数',
        name: '2号',
        upstair: 22,
        downstair: 4,
        upComplete: 20,
        downComplete: 2,
        upWill: 2,
        downWill: 2,
      },
      {
        type: '总数',
        name: '3号',
        upstair: 40,
        downstair: 5,
        upComplete: 34,
        downComplete: 4,
        upWill: 16,
        downWill: 1,
      },
      {
        type: '总数',
        name: '4号',
        upstair: 30,
        downstair: 5,
        upComplete: 23,
        downComplete: 1,
        upWill: 7,
        downWill: 4,
      },
      {
        type: '总数',
        name: '5号',
        upstair: 40,
        downstair: 6,
        upComplete: 19,
        downComplete: 4,
        upWill: 21,
        downWill: 2,
      },
      {
        type: '完成',
        name: '1号',
        upComplete: 10,
        downComplete: 1,
      },
      {
        type: '完成',
        name: '2号',
        upComplete: 2,
        downComplete: 2,
      },
      {
        type: '完成',
        name: '3号',
        upComplete: 16,
        downComplete: 1,
      },
      {
        type: '完成',
        name: '4号',
        upComplete: 7,
        downComplete: 4,
      },
      {
        type: '完成',
        name: '5号',
        upComplete: 21,
        downComplete: 2,
      },
    ],
    [],
  );

  //@ts-ignore
  const config: BidirectionalBarConfig = useMemo(() => {
    let pos = 0;
    return {
      legend: false,
      color: function color(_ref: any) {
        if (pos === 24) pos = 0;
        ++pos;
        if (_ref['series-field-key'] === 'upComplete') {
          if (pos < data.length / 2 + 1) return '#53bcff';
          else return '#3D41F8';
        } else if (_ref['series-field-key'] === 'downComplete') {
          if (pos < (data.length / 2) * 3 + 1) return '#53bcff';
          else return '#3D41F8';
        } else return '#000000';
      },
      seriesField: 'type',
      maxColumnWidth: 24,
      isStack: true,
      layout: 'vertical',
      data: data,
      xField: 'name',
      yField: ['upComplete', 'downComplete'],
      xAxis: {
        label: {
          formatter: (rfs: string) => {
            return `${rfs}`;
          },
          style: {
            fill: '#000000',
            fontSize: 12,
          },
        },
        line: {
          style: {
            stroke: '#666666',
            lineWidth: 0.5,
            strokeOpacity: 0.5,
            shadowBlur: 0,
          },
        },
        tickLine: {
          style: {
            stroke: 'red',
            strokeOpacity: 0,
          },
        },
      },
      yAxis: {
        upComplete: {
          nice: true,
          label: {
            style: {
              fill: '#000000',
              fontSize: 12,
            },
          },
          grid: {
            line: {
              style: {
                fill: '#cccccc',
                stroke: '#666666',
                lineWidth: 0.5,
                strokeOpacity: 0.5,
                shadowBlur: 10,
              },
            },
          },
        },
        downComplete: {
          nice: true,
          label: {
            formatter: (rfs: number) => {
              return `${rfs > 0 ? '-' + rfs : 0}`;
            },
            style: {
              fill: '#000000',
              fontSize: 12,
            },
          },
          grid: {
            line: {
              style: {
                fill: '#cccccc',
                stroke: '#666666',
                lineWidth: 0.5,
                strokeOpacity: 0.5,
                shadowBlur: 10,
              },
            },
          },
        },
      },
      tooltip: {
        shared: true,
        showMarkers: false,
        title: (rfs: number) => {
          return `工程${rfs}楼`;
        },
        // formatter: (rfs) => {
        //   return {
        //     name: rfs.upstair? '地上建筑层数' : '地下建筑层数',
        //     value: rfs.upstair || rfs.downstair
        //   };
        // },
        customContent: (title: string, value: any) => {
          return `<div style='padding: 12px'>
            <div style="font-size: 14px;font-weight: 400;color: #ffffff;line-height: 20px;">${title}</div>
            <span style="background-color:rgba(0,0,17,0.80);color:#ffffff;margin-bottom:5px;line-height:20px">
              <span style="background-color:#2fdef9;" class="g2-tooltip-marker"></span>
              地上总层数: &nbsp;<span> ${
                data.find((v) => v.name === value?.[0]?.data?.name)?.upstair
              }</span><br/>
              <span style="background-color:transparent; border:1px solid #2fdef9;" class="g2-tooltip-marker"></span>
              地上完成层数: &nbsp;<span> ${
                data.find((v) => v.name === value?.[0]?.data?.name)?.upComplete
              }</span><br/>
              <span style="background-color:#2fdef9;" class="g2-tooltip-marker"></span>
              地下总层数: &nbsp;<span> ${
                data.find((v) => v.name === value?.[0]?.data?.name)?.downstair
              }</span><br/>
              <span style="background-color:transparent; border:1px solid #2fdef9;" class="g2-tooltip-marker"></span>
              地下完成层数: &nbsp;<span> ${
                data.find((v) => v.name === value?.[0]?.data?.name)?.downComplete
              }</span>
            </span>
          </div>`;
        },
        domStyles: {
          'g2-tooltip': {
            background: 'rgba(0,0,17,0.80)',
            paddingBottom: 10,
            boxShadow: 0,
          },
          'g2-tooltip-title': {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 700,
          },
          'g2-tooltip-list': {
            color: '#ffffff',
            fontSize: 12,
            marginBottom: 10,
          },
          'g2-tooltip-list-item': {
            height: '20px',
            verticalAlign: 'top',
          },
        },
      },
    };
  }, [data]);

  return (
    <div style={{ height: '220px', width: '400px' }}>
      <BidirectionalBar {...config} />
    </div>
  );
}

export default ColumnWatch;
