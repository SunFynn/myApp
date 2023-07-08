// 浙江省json
import zhejiangJson from './json/zhejiang.json';
// 浙江省下市级json
import hangzhouJson from './json/hangzhou.json';
import jinhuaJson from './json/jinhua.json';
import jiaxingJson from './json/jiaxing.json';
import huzhouJson from './json/huzhou.json';
import zhoushanJson from './json/zhoushan.json';
import shaoxingJson from './json/shaoxing.json';
import quzhouJson from './json/quzhou.json';
import ningboJson from './json/ningbo.json';
import wenzhouJson from './json/wenzhou.json';
import lishuiJson from './json/lishui.json';
import taizhouJson from './json/taizhou.json';

export interface CityData {
  name: string;
  value: number;
  orgCode?: string;
  point: [number, number];
  coords: {
    name: string;
    value?: number;
    orgCode?: string;
    coords: [[number, number], [number, number]];
  }[];
}

const zhejiang: CityData[] = [
  {
    name: '杭州市',
    orgCode: '330100',
    point: [119.399781, 30.1],
    value: 742.72,
    coords: [
      {
        orgCode: '330100',
        name: '杭州市',
        value: 742.72,
        coords: [
          [119.399781, 29.85],
          [119.399781, 29.85],
        ],
      },
    ],
  },
  {
    orgCode: '330500',
    name: '湖州市',
    value: 777.96,
    point: [119.85, 30.9],
    coords: [
      {
        orgCode: '330500',
        name: '湖州市',
        value: 777.96,
        coords: [
          [119.85, 30.65],
          [119.85, 30.65],
        ],
      },
    ],
  },
  {
    orgCode: '330400',
    name: '嘉兴市',
    value: 116.4,
    point: [120.8, 30.75],
    coords: [
      {
        orgCode: '330400',
        name: '嘉兴市',
        value: 116.4,
        coords: [
          [120.8, 30.5],
          [120.8, 30.5],
        ],
      },
    ],
  },
  {
    orgCode: '330200',
    name: '宁波市',
    value: 138.5,
    point: [121.5, 29.9],
    coords: [
      {
        orgCode: '330200',
        name: '宁波市',
        value: 138.5,
        coords: [
          [121.5, 29.65],
          [121.5, 29.65],
        ],
      },
    ],
  },
  {
    orgCode: '330900',
    name: '舟山市',
    value: 642,
    point: [122.2, 30.1],
    coords: [
      {
        orgCode: '330900',
        name: '舟山市',
        value: 642,
        coords: [
          [122.2, 29.85],
          [122.2, 29.85],
        ],
      },
    ],
  },
  {
    orgCode: '330600',
    name: '绍兴市',
    value: 129.14,
    point: [120.6, 29.9],
    coords: [
      {
        orgCode: '330600',
        name: '绍兴市',
        value: 129.14,
        coords: [
          [120.6, 29.65],
          [120.6, 29.65],
        ],
      },
    ],
  },
  {
    orgCode: '330700',
    name: '金华市',
    value: 902.83,
    point: [120, 29.3],
    coords: [
      {
        orgCode: '330700',
        name: '金华市',
        value: 902.83,
        coords: [
          [120, 29.05],
          [120, 29.05],
        ],
      },
    ],
  },
  {
    orgCode: '331000',
    name: '台州市',
    value: 719.57,
    point: [121.2, 28.95],
    coords: [
      {
        orgCode: '331000',
        name: '台州市',
        value: 719.57,
        coords: [
          [121.2, 28.7],
          [121.2, 28.7],
        ],
      },
    ],
  },
  {
    orgCode: '330800',
    name: '衢州市',
    value: 411.95,
    point: [118.7, 29.05],
    coords: [
      {
        orgCode: '330800',
        name: '衢州市',
        value: 411.95,
        coords: [
          [118.7, 28.8],
          [118.7, 28.8],
        ],
      },
    ],
  },
  {
    orgCode: '331100',
    name: '丽水市',
    value: 375.98,
    point: [119.5, 28.35],
    coords: [
      {
        orgCode: '331100',
        name: '丽水市',
        value: 375.98,
        coords: [
          [119.5, 28.1],
          [119.5, 28.1],
        ],
      },
    ],
  },
  {
    orgCode: '330300',
    name: '温州市',
    value: 561.15,
    point: [120.65, 28],
    coords: [
      {
        orgCode: '330300',
        name: '温州市',
        value: 561.15,
        coords: [
          [120.65, 27.75],
          [120.65, 27.75],
        ],
      },
    ],
  },
];

const hangzhou: CityData[] = [
  {
    name: '上城区',
    value: 165,
    point: [120.23, 30.28],
    coords: [
      {
        name: '',
        coords: [
          [120.23, 30.28],
          [120.585, 30.474],
        ],
      },
      {
        name: '',
        coords: [
          [120.585, 30.474],
          [120.885, 30.474],
        ],
      },
      {
        name: '上城区',
        value: 165,
        coords: [
          [120.8, 30.54],
          [120.8, 30.54],
        ],
      },
    ],
  },
  {
    name: '拱墅区',
    value: 122,
    point: [120.16, 30.33],
    coords: [
      {
        name: '',
        coords: [
          [120.16, 30.33],
          [119.95, 30.58],
        ],
      },
      {
        name: '',
        coords: [
          [119.95, 30.58],
          [119.65, 30.58],
        ],
      },
      {
        name: '拱墅区',
        value: 122,
        coords: [
          [119.73, 30.65],
          [119.73, 30.65],
        ],
      },
    ],
  },
  {
    name: '西湖区',
    value: 213,
    point: [120.091, 30.24],
    coords: [
      {
        name: '西湖区',
        value: 213,
        coords: [
          [120.091, 30.15],
          [120.091, 30.15],
        ],
      },
    ],
  },
  {
    name: '滨江区',
    value: 285,
    point: [120.18, 30.18],
    coords: [
      {
        name: '',
        coords: [
          [120.18, 30.18],
          [120.58, 29.9],
        ],
      },
      {
        name: '',
        coords: [
          [120.58, 29.9],
          [120.9, 29.9],
        ],
      },
      {
        name: '滨江区',
        value: 285,
        coords: [
          [120.83, 29.97],
          [120.83, 29.97],
        ],
      },
    ],
  },
  {
    name: '萧山区',
    value: 299,
    point: [120.23, 30.08],
    coords: [
      {
        name: '萧山区',
        value: 299,
        coords: [
          [120.23, 30],
          [120.23, 30],
        ],
      },
    ],
  },
  {
    name: '余杭区',
    value: 188,
    point: [119.93, 30.4],
    coords: [
      {
        name: '余杭区',
        value: 188,
        coords: [
          [119.93, 30.32],
          [119.93, 30.32],
        ],
      },
    ],
  },
  {
    name: '富阳区',
    value: 305,
    point: [119.88, 30.05],
    coords: [
      {
        name: '富阳区',
        value: 305,
        coords: [
          [119.88, 29.97],
          [119.88, 29.97],
        ],
      },
    ],
  },
  {
    name: '桐庐县',
    value: 152,
    point: [119.48, 29.95],
    coords: [
      {
        name: '桐庐县',
        value: 152,
        coords: [
          [119.48, 29.86],
          [119.48, 29.86],
        ],
      },
    ],
  },
  {
    name: '淳安县',
    value: 251,
    point: [118.95, 29.7],
    coords: [
      {
        name: '淳安县',
        value: 251,
        coords: [
          [118.95, 29.61],
          [118.95, 29.61],
        ],
      },
    ],
  },
  {
    name: '建德市',
    value: 125,
    point: [119.43, 29.65],
    coords: [
      {
        name: '建德市',
        value: 125,
        coords: [
          [119.43, 29.56],
          [119.43, 29.56],
        ],
      },
    ],
  },
  {
    name: '临安区',
    value: 454,
    point: [119.25, 30.25],
    coords: [
      {
        name: '临安区',
        value: 454,
        coords: [
          [119.25, 30.16],
          [119.25, 30.16],
        ],
      },
    ],
  },
  {
    name: '钱塘区',
    value: 475,
    point: [120.5, 30.33],
    coords: [
      {
        name: '钱塘区',
        value: 475,
        coords: [
          [120.63, 30.31],
          [120.63, 30.31],
        ],
      },
    ],
  },
  {
    name: '临平区',
    value: 444,
    point: [120.25, 30.44],
    coords: [
      {
        name: '临平区',
        value: 444,
        coords: [
          [120.25, 30.54],
          [120.25, 30.54],
        ],
      },
    ],
  },
];

const ningbo: CityData[] = [
  {
    name: '慈溪市',
    point: [121.3, 30.3],
    value: 242.72,
    coords: [
      {
        name: '慈溪市',
        value: 242.72,
        coords: [
          [121.3, 30.22],
          [121.3, 30.22],
        ],
      },
    ],
  },
  {
    name: '余姚市',
    point: [121.156294, 30.045404],
    value: 142.12,
    coords: [
      {
        name: '余姚市',
        value: 142.12,
        coords: [
          [121.156294, 29.965404],
          [121.156294, 29.965404],
        ],
      },
    ],
  },
  {
    name: '海曙区',
    point: [121.34, 29.865],
    value: 312.8,
    coords: [
      {
        name: '海曙区',
        value: 312.8,
        coords: [
          [121.34, 29.785],
          [121.34, 29.785],
        ],
      },
    ],
  },
  {
    name: '江北区',
    point: [121.5, 29.95],
    value: 112.8,
    coords: [
      {
        name: '',
        coords: [
          [121.5, 29.95],
          [121.65, 30.2],
        ],
      },
      {
        name: '',
        coords: [
          [121.65, 30.2],
          [121.95, 30.2],
        ],
      },
      {
        name: '江北区',
        value: 112.8,
        coords: [
          [121.87, 30.27],
          [121.87, 30.27],
        ],
      },
    ],
  },
  {
    name: '镇海区',
    point: [121.633162, 29.98],
    value: 151.23,
    coords: [
      {
        name: '',
        coords: [
          [121.633162, 29.98],
          [121.933162, 30.1],
        ],
      },
      {
        name: '',
        coords: [
          [121.933162, 30.1],
          [122.233162, 30.1],
        ],
      },
      {
        name: '镇海区',
        value: 151.23,
        coords: [
          [122.153162, 30.17],
          [122.153162, 30.17],
        ],
      },
    ],
  },
  {
    name: '奉化区',
    point: [121.38089, 29.662348],
    value: 401.8,
    coords: [
      {
        name: '奉化区',
        value: 401.8,
        coords: [
          [121.38089, 29.582348],
          [121.38089, 29.582348],
        ],
      },
    ],
  },
  {
    name: '鄞州区',
    point: [121.648436, 29.801662],
    value: 277.91,
    coords: [
      {
        name: '鄞州区',
        value: 277.91,
        coords: [
          [121.648436, 29.721662],
          [121.648436, 29.721662],
        ],
      },
    ],
  },
  {
    name: '北仑区',
    point: [121.881303, 29.88944],
    value: 371.22,
    coords: [
      {
        name: '北仑区',
        value: 371.22,
        coords: [
          [121.881303, 29.80944],
          [121.881303, 29.80944],
        ],
      },
    ],
  },
  {
    name: '宁海县',
    point: [121.432606, 29.379836],
    value: 712.46,
    coords: [
      {
        name: '宁海县',
        value: 712.46,
        coords: [
          [121.432606, 29.299836],
          [121.432606, 29.299836],
        ],
      },
    ],
  },
  {
    name: '象山县',
    point: [121.83, 29.510206],
    value: 662.36,
    coords: [
      {
        name: '象山县',
        value: 662.36,
        coords: [
          [121.83, 29.430206],
          [121.83, 29.430206],
        ],
      },
    ],
  },
];

const wenzhou: CityData[] = [
  {
    name: '永嘉县',
    point: [120.690968, 28.4],
    value: 685.44,
    coords: [
      {
        name: '永嘉县',
        value: 685.44,
        coords: [
          [120.690968, 28.32],
          [120.690968, 28.32],
        ],
      },
    ],
  },
  {
    name: '乐清市',
    point: [121.03, 28.3],
    value: 371.23,
    coords: [
      {
        name: '乐清市',
        value: 371.23,
        coords: [
          [121.03, 28.22],
          [121.03, 28.22],
        ],
      },
    ],
  },
  {
    name: '洞头区',
    point: [121.1, 27.86],
    value: 252.13,
    coords: [
      {
        name: '洞头区',
        value: 252.13,
        coords: [
          [121.1, 27.94],
          [121.1, 27.94],
        ],
      },
    ],
  },
  {
    name: '龙湾区',
    point: [120.82, 27.9],
    value: 182.13,
    coords: [
      {
        name: '龙湾区',
        value: 182.13,
        coords: [
          [120.82, 27.82],
          [120.82, 27.82],
        ],
      },
    ],
  },
  {
    name: '泰顺县',
    point: [119.9, 27.557309],
    value: 539.03,
    coords: [
      {
        name: '泰顺县',
        value: 539.03,
        coords: [
          [119.9, 27.477309],
          [119.9, 27.477309],
        ],
      },
    ],
  },
  {
    name: '苍南县',
    point: [120.47, 27.45],
    value: 488.74,
    coords: [
      {
        name: '苍南县',
        value: 488.74,
        coords: [
          [120.47, 27.37],
          [120.47, 27.37],
        ],
      },
    ],
  },
  {
    name: '文成县',
    point: [120.02, 27.86],
    value: 360.27,
    coords: [
      {
        name: '文成县',
        value: 360.27,
        coords: [
          [120.02, 27.78],
          [120.02, 27.78],
        ],
      },
    ],
  },
  {
    name: '平阳县',
    point: [120.3, 27.6693],
    value: 400.01,
    coords: [
      {
        name: '平阳县',
        value: 400.01,
        coords: [
          [120.3, 27.5893],
          [120.3, 27.5893],
        ],
      },
    ],
  },
  {
    name: '瑞安市',
    point: [120.38, 27.9],
    value: 867.21,
    coords: [
      {
        name: '瑞安市',
        value: 867.21,
        coords: [
          [120.38, 27.82],
          [120.38, 27.82],
        ],
      },
    ],
  },
  {
    name: '龙港市',
    point: [120.6, 27.55],
    value: 133.91,
    coords: [
      {
        name: '',
        coords: [
          [120.6, 27.55],
          [120.9, 27.25],
        ],
      },
      {
        name: '',
        coords: [
          [120.9, 27.25],
          [121.3, 27.25],
        ],
      },
      {
        name: '龙港市',
        value: 133.91,
        coords: [
          [121.2, 27.32],
          [121.2, 27.32],
        ],
      },
    ],
  },
  {
    name: '瓯海区',
    point: [120.58, 27.96],
    value: 217.58,
    coords: [
      {
        name: '',
        coords: [
          [120.58, 27.96],
          [120.4, 28.03],
        ],
      },
      {
        name: '',
        coords: [
          [120.4, 28.03],
          [120.0, 28.03],
        ],
      },
      {
        name: '瓯海区',
        value: 217.58,
        coords: [
          [120.1, 28.1],
          [120.1, 28.1],
        ],
      },
    ],
  },
  {
    name: '鹿城区',
    point: [120.5, 28.08],
    value: 317.88,
    coords: [
      {
        name: '',
        coords: [
          [120.5, 28.08],
          [120.35, 28.23],
        ],
      },
      {
        name: '',
        coords: [
          [120.35, 28.23],
          [119.95, 28.23],
        ],
      },
      {
        name: '鹿城区',
        value: 317.88,
        coords: [
          [120.05, 28.3],
          [120.05, 28.3],
        ],
      },
    ],
  },
];

const jiaxing: CityData[] = [
  {
    name: '桐乡市',
    point: [120.48, 30.629065],
    value: 371.23,
    coords: [
      {
        name: '桐乡市',
        value: 371.23,
        coords: [
          [120.48, 30.59],
          [120.48, 30.59],
        ],
      },
    ],
  },
  {
    name: '秀洲区',
    point: [120.640431, 30.82],
    value: 742.72,
    coords: [
      {
        name: '秀洲区',
        value: 742.72,
        coords: [
          [120.640431, 30.78],
          [120.640431, 30.78],
        ],
      },
    ],
  },
  {
    name: '嘉善县',
    point: [120.921871, 30.93],
    value: 622.82,
    coords: [
      {
        name: '嘉善县',
        value: 622.82,
        coords: [
          [120.921871, 30.89],
          [120.921871, 30.89],
        ],
      },
    ],
  },
  {
    name: '南湖区',
    point: [120.84, 30.73],
    value: 151.42,
    coords: [
      {
        name: '南湖区',
        value: 151.42,
        coords: [
          [120.84, 30.69],
          [120.84, 30.69],
        ],
      },
    ],
  },
  {
    name: '海宁市',
    point: [120.688821, 30.5],
    value: 437.65,
    coords: [
      {
        name: '海宁市',
        value: 437.65,
        coords: [
          [120.688821, 30.46],
          [120.688821, 30.46],
        ],
      },
    ],
  },
  {
    name: '海盐县',
    point: [120.942017, 30.522223],
    value: 557.29,
    coords: [
      {
        name: '海盐县',
        value: 557.29,
        coords: [
          [120.942017, 30.482223],
          [120.942017, 30.482223],
        ],
      },
    ],
  },
  {
    name: '平湖市',
    point: [121.12, 30.72],
    value: 209.88,
    coords: [
      {
        name: '平湖市',
        value: 209.88,
        coords: [
          [121.12, 30.68],
          [121.12, 30.68],
        ],
      },
    ],
  },
];

const huzhou: CityData[] = [
  {
    name: '安吉县',
    point: [119.587891, 30.631974],
    value: 742.72,
    coords: [
      {
        name: '安吉县',
        value: 742.72,
        coords: [
          [119.587891, 30.591974],
          [119.587891, 30.591974],
        ],
      },
    ],
  },
  {
    name: '长兴县',
    point: [119.830122, 31.00475],
    value: 592.28,
    coords: [
      {
        name: '长兴县',
        value: 592.28,
        coords: [
          [119.830122, 30.96475],
          [119.830122, 30.96475],
        ],
      },
    ],
  },
  {
    name: '吴兴区',
    point: [120.05, 30.867252],
    value: 267.88,
    coords: [
      {
        name: '吴兴区',
        value: 267.88,
        coords: [
          [120.05, 30.827252],
          [120.05, 30.827252],
        ],
      },
    ],
  },
  {
    name: '德清县',
    point: [119.967662, 30.58],
    value: 397.58,
    coords: [
      {
        name: '德清县',
        value: 397.58,
        coords: [
          [119.967662, 30.54],
          [119.967662, 30.54],
        ],
      },
    ],
  },
  {
    name: '南浔区',
    point: [120.3, 30.79],
    value: 609.14,
    coords: [
      {
        name: '南浔区',
        value: 609.14,
        coords: [
          [120.3, 30.75],
          [120.3, 30.75],
        ],
      },
    ],
  },
];

const shaoxing: CityData[] = [
  {
    name: '柯桥区',
    point: [120.43, 30.078038],
    value: 512.45,
    coords: [
      {
        name: '柯桥区',
        value: 742.72,
        coords: [
          [120.43, 30.028038],
          [120.43, 30.028038],
        ],
      },
    ],
  },
  {
    name: '越城区',
    point: [120.64, 30.08],
    value: 212.45,
    coords: [
      {
        name: '越城区',
        value: 212.45,
        coords: [
          [120.64, 30.03],
          [120.64, 30.03],
        ],
      },
    ],
  },
  {
    name: '上虞区',
    point: [120.874185, 30.016769],
    value: 669.42,
    coords: [
      {
        name: '上虞区',
        value: 669.42,
        coords: [
          [120.874185, 29.966769],
          [120.874185, 29.966769],
        ],
      },
    ],
  },
  {
    name: '诸暨市',
    point: [120.244326, 29.713662],
    value: 512.45,
    coords: [
      {
        name: '诸暨市',
        value: 512.45,
        coords: [
          [120.244326, 29.663662],
          [120.244326, 29.663662],
        ],
      },
    ],
  },
  {
    name: '嵊州市',
    point: [120.70888, 29.636606],
    value: 449.28,
    coords: [
      {
        name: '嵊州市',
        value: 449.28,
        coords: [
          [120.70888, 29.586606],
          [120.70888, 29.586606],
        ],
      },
    ],
  },
  {
    name: '新昌县',
    point: [120.98, 29.45],
    value: 198.45,
    coords: [
      {
        name: '新昌县',
        value: 198.45,
        coords: [
          [120.98, 29.4],
          [120.98, 29.4],
        ],
      },
    ],
  },
];

const jinhua: CityData[] = [
  {
    name: '婺城区',
    value: 132.4,
    point: [119.497204, 29.04],
    coords: [
      {
        name: '婺城区',
        value: 132.4,
        coords: [
          [119.497204, 28.97],
          [119.497204, 28.97],
        ],
      },
    ],
  },
  {
    name: '金东区',
    value: 112.36,
    point: [119.798572, 29.2],
    coords: [
      {
        name: '金东区',
        value: 112.36,
        coords: [
          [119.798572, 29.13],
          [119.798572, 29.13],
        ],
      },
    ],
  },
  {
    name: '兰溪市',
    value: 318.08,
    point: [119.469468, 29.31],
    coords: [
      {
        name: '兰溪市',
        value: 318.08,
        coords: [
          [119.469468, 29.24],
          [119.469468, 29.24],
        ],
      },
    ],
  },
  {
    name: '东阳市',
    value: 432.24,
    point: [120.353653, 29.29],
    coords: [
      {
        name: '东阳市',
        value: 432.24,
        coords: [
          [120.353653, 29.22],
          [120.353653, 29.22],
        ],
      },
    ],
  },
  {
    name: '义乌市',
    value: 113.74,
    point: [120.030028, 29.31],
    coords: [
      {
        name: '义乌市',
        value: 113.74,
        coords: [
          [120.030028, 29.24],
          [120.030028, 29.24],
        ],
      },
    ],
  },
  {
    name: '永康市',
    value: 150.68,
    point: [120.070133, 28.98],
    coords: [
      {
        name: '永康市',
        value: 150.68,
        coords: [
          [120.070133, 28.91],
          [120.070133, 28.91],
        ],
      },
    ],
  },
  {
    name: '浦江县',
    value: 451,
    point: [119.894906, 29.53],
    coords: [
      {
        name: '浦江县',
        value: 451,
        coords: [
          [119.894906, 29.457931],
          [119.894906, 29.457931],
        ],
      },
    ],
  },
  {
    name: '武义县',
    value: 699.1,
    point: [119.803268, 28.89],
    coords: [
      {
        name: '武义县',
        value: 699.1,
        coords: [
          [119.803268, 28.82],
          [119.803268, 28.82],
        ],
      },
    ],
  },
  {
    name: '磐安县',
    value: 183.4,
    point: [120.557173, 29.06],
    coords: [
      {
        name: '磐安县',
        value: 183.4,
        coords: [
          [120.557173, 28.99],
          [120.557173, 28.99],
        ],
      },
    ],
  },
];

const quzhou: CityData[] = [
  {
    name: '开化县',
    value: 362,
    point: [118.3, 29.25],
    coords: [
      {
        name: '开化县',
        value: 362,
        coords: [
          [118.3, 29.17],
          [118.3, 29.17],
        ],
      },
    ],
  },
  {
    name: '常山县',
    value: 390,
    point: [118.517083, 28.95479],
    coords: [
      {
        name: '常山县',
        value: 390,
        coords: [
          [118.517083, 28.88],
          [118.517083, 28.88],
        ],
      },
    ],
  },
  {
    name: '柯城区',
    value: 412,
    point: [118.79, 29.07],
    coords: [
      {
        name: '柯城区',
        value: 412,
        coords: [
          [118.79, 28.99],
          [118.79, 28.99],
        ],
      },
    ],
  },
  {
    name: '衢江区',
    value: 572,
    point: [118.995413, 29.092242],
    coords: [
      {
        name: '衢江区',
        value: 572,
        coords: [
          [118.995413, 29],
          [118.995413, 29],
        ],
      },
    ],
  },
  {
    name: '龙游县',
    value: 368,
    point: [119.193184, 29.080121],
    coords: [
      {
        name: '龙游县',
        value: 368,
        coords: [
          [119.193184, 29],
          [119.193184, 29],
        ],
      },
    ],
  },
  {
    name: '江山市',
    value: 347,
    point: [118.6, 28.68],
    coords: [
      {
        name: '江山市',
        value: 347,
        coords: [
          [118.6, 28.59],
          [118.6, 28.59],
        ],
      },
    ],
  },
];

const zhoushan: CityData[] = [
  {
    name: '定海区',
    value: 215,
    point: [122.121077, 30.1],
    coords: [
      {
        name: '定海区',
        value: 215,
        coords: [
          [122.121077, 30.04],
          [122.121077, 30.04],
        ],
      },
    ],
  },
  {
    name: '普陀区',
    value: 207,
    point: [122.372315, 29.92],
    coords: [
      {
        name: '',
        coords: [
          [122.372315, 29.92],
          [122.452315, 29.85],
        ],
      },
      {
        name: '',
        coords: [
          [122.452315, 29.85],
          [122.632315, 29.85],
        ],
      },
      {
        name: '普陀区',
        value: 207,
        coords: [
          [122.592315, 29.9],
          [122.592315, 29.9],
        ],
      },
    ],
  },
  {
    name: '岱山县',
    value: 186,
    point: [122.176259, 30.295853],
    coords: [
      {
        name: '',
        coords: [
          [122.176259, 30.295853],
          [122.096259, 30.355853],
        ],
      },
      {
        name: '',
        coords: [
          [122.096259, 30.355853],
          [121.926259, 30.355853],
        ],
      },
      {
        name: '岱山县',
        value: 186,
        coords: [
          [121.986259, 30.405853],
          [121.986259, 30.405853],
        ],
      },
    ],
  },
  {
    name: '嵊泗县',
    value: 174,
    point: [122.460466, 30.720098],
    coords: [
      {
        name: '',
        coords: [
          [122.460466, 30.720098],
          [122.386259, 30.780098],
        ],
      },
      {
        name: '',
        coords: [
          [122.386259, 30.780098],
          [122.206259, 30.780098],
        ],
      },
      {
        name: '嵊泗县',
        value: 174,
        coords: [
          [122.286259, 30.830098],
          [122.286259, 30.830098],
        ],
      },
    ],
  },
];

const taizhou: CityData[] = [
  {
    name: '天台县',
    value: 364,
    point: [121.028974, 29.19],
    coords: [
      {
        name: '天台县',
        value: 364,
        coords: [
          [121.028974, 29.12],
          [121.028974, 29.12],
        ],
      },
    ],
  },
  {
    name: '三门县',
    value: 319,
    point: [121.552558, 29.07],
    coords: [
      {
        name: '三门县',
        value: 319,
        coords: [
          [121.552558, 29.0],
          [121.552558, 29.0],
        ],
      },
    ],
  },
  {
    name: '临海市',
    value: 522,
    point: [121.15274, 28.92],
    coords: [
      {
        name: '临海市',
        value: 522,
        coords: [
          [121.15274, 28.85],
          [121.15274, 28.85],
        ],
      },
    ],
  },
  {
    name: '仙居县',
    value: 485,
    point: [120.687157, 28.85],
    coords: [
      {
        name: '仙居县',
        value: 485,
        coords: [
          [120.687157, 28.78],
          [120.687157, 28.78],
        ],
      },
    ],
  },
  {
    name: '黄岩区',
    value: 323,
    point: [121.108567, 28.65],
    coords: [
      {
        name: '黄岩区',
        value: 323,
        coords: [
          [121.108567, 28.58],
          [121.108567, 28.58],
        ],
      },
    ],
  },
  {
    name: '椒江区',
    value: 358,
    point: [121.445956, 28.7],
    coords: [
      {
        name: '椒江区',
        value: 358,
        coords: [
          [121.445956, 28.63],
          [121.445956, 28.63],
        ],
      },
    ],
  },
  {
    name: '路桥区',
    value: 336,
    point: [121.482605, 28.54],
    coords: [
      {
        name: '',
        coords: [
          [121.482605, 28.54],
          [121.622605, 28.48],
        ],
      },
      {
        name: '',
        coords: [
          [121.622605, 28.48],
          [121.782605, 28.48],
        ],
      },
      {
        name: '路桥区',
        value: 336,
        coords: [
          [121.752605, 28.54],
          [121.752605, 28.54],
        ],
      },
    ],
  },
  {
    name: '温岭市',
    value: 413,
    point: [121.390287, 28.45],
    coords: [
      {
        name: '温岭市',
        value: 413,
        coords: [
          [121.390287, 28.38],
          [121.390287, 28.38],
        ],
      },
    ],
  },
  {
    name: '玉环市',
    value: 281,
    point: [121.23966, 28.2],
    coords: [
      {
        name: '玉环市',
        value: 281,
        coords: [
          [121.23966, 28.13],
          [121.23966, 28.13],
        ],
      },
    ],
  },
];

const lishui: CityData[] = [
  {
    name: '遂昌县',
    value: 401,
    point: [119.134209, 28.6],
    coords: [
      {
        name: '遂昌县',
        value: 401,
        coords: [
          [119.134209, 28.53],
          [119.134209, 28.53],
        ],
      },
    ],
  },
  {
    name: '松阳县',
    value: 372,
    point: [119.429907, 28.45],
    coords: [
      {
        name: '松阳县',
        value: 372,
        coords: [
          [119.429907, 28.38],
          [119.429907, 28.38],
        ],
      },
    ],
  },
  {
    name: '莲都区',
    value: 335,
    point: [119.816644, 28.48],
    coords: [
      {
        name: '莲都区',
        value: 335,
        coords: [
          [119.816644, 28.41],
          [119.816644, 28.41],
        ],
      },
    ],
  },
  {
    name: '缙云县',
    value: 368,
    point: [120.197482, 28.66],
    coords: [
      {
        name: '缙云县',
        value: 368,
        coords: [
          [120.197482, 28.59],
          [120.197482, 28.59],
        ],
      },
    ],
  },
  {
    name: '龙泉市',
    value: 403,
    point: [119.148449, 28.07],
    coords: [
      {
        name: '龙泉市',
        value: 403,
        coords: [
          [119.148449, 28.0],
          [119.148449, 28.0],
        ],
      },
    ],
  },
  {
    name: '云和县',
    value: 315,
    point: [119.549025, 28.17],
    coords: [
      {
        name: '云和县',
        value: 315,
        coords: [
          [119.549025, 28.1],
          [119.549025, 28.1],
        ],
      },
    ],
  },
  {
    name: '青田县',
    value: 298,
    point: [120.195998, 28.24],
    coords: [
      {
        name: '青田县',
        value: 298,
        coords: [
          [120.195998, 28.17],
          [120.195998, 28.17],
        ],
      },
    ],
  },
  {
    name: '庆元县',
    value: 239,
    point: [119.159488, 27.62],
    coords: [
      {
        name: '庆元县',
        value: 239,
        coords: [
          [119.159488, 27.55],
          [119.159488, 27.55],
        ],
      },
    ],
  },
  {
    name: '景宁畲族自治县',
    value: 333,
    point: [119.638978, 27.92],
    coords: [
      {
        name: '景宁畲族自治县',
        value: 333,
        coords: [
          [119.638978, 27.85],
          [119.638978, 27.85],
        ],
      },
    ],
  },
];

const mockData = {
  '330000': zhejiang, //
  '330100': hangzhou, //
  '330200': ningbo, //
  '330300': wenzhou, //
  '330400': jiaxing, //
  '330500': huzhou, //
  '330600': shaoxing,
  '330700': jinhua, //
  '330800': quzhou, //
  '330900': zhoushan, //
  '331000': taizhou, //
  '331100': lishui, //
};

// 获取地图上的数据
export const getCityData = (orgCode: string) => {
  return mockData[orgCode];
};

// 地图的json
export const getCityName = (city: string) => {
  const allCity = [
    { name: 'zhejiang', value: '浙江省', json: zhejiangJson },
    { name: 'hangzhou', value: '杭州市', json: hangzhouJson },
    { name: 'jinhua', value: '金华市', json: jinhuaJson },
    { name: 'jiaxing', value: '嘉兴市', json: jiaxingJson },
    { name: 'huzhou', value: '湖州市', json: huzhouJson },
    { name: 'zhoushan', value: '舟山市', json: zhoushanJson },
    { name: 'shaoxing', value: '绍兴市', json: shaoxingJson },
    { name: 'quzhou', value: '衢州市', json: quzhouJson },
    { name: 'ningbo', value: '宁波市', json: ningboJson },
    { name: 'wenzhou', value: '温州市', json: wenzhouJson },
    { name: 'lishui', value: '丽水市', json: lishuiJson },
    { name: 'taizhou', value: '台州市', json: taizhouJson },
  ];
  let obj = {};
  allCity.forEach((v) => {
    if (city === v.value) obj = { ...v };
  });
  return obj;
};
