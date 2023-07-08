const config = {
  name: {
    orient: 'vertical',
    right: '26%',
    top: 16,
    icon: 'circle',
    itemGap: 20,
    textStyle: {
      fontSize: 14,
      color: '#000000',
    },
    formatter: '',
  },
  percent: {
    orient: 'vertical',
    right: '12%',
    top: 16,
    icon: 'none',
    itemGap: 20,
    textStyle: {
      fontSize: 14,
      color: '#000000',
    },
    formatter: '',
  },
  value: {
    orient: 'horizontal',
    right: '0px',
    top: 16,
    icon: 'none',
    itemGap: 20,
    textStyle: {
      fontSize: 14,
      color: '#000000',
    },
    formatter: '',
    width: 10,
    height: 10,
    // itemWidth: 8,
    // itemHeight: 8
  },
};

// 自定义图例
const customLegend = (data, top = 16) => {
  const legends = [];
  // 数值
  legends.push({
    ...config.name,
    top: top,
    formatter: (name) => {
      const obj = data.find((item) => item.name === name);
      return `${obj.name}`;
    },
  });
  legends.push({
    ...config.percent,
    formatter: (name) => {
      const obj = data.find((item) => item.name === name);
      return `${obj.percent}`;
    },
  });
  legends.push({
    ...config.value,
    top: top,
    formatter: (name) => {
      const obj = data.find((item) => item.name === name);
      return `${Number(obj.value || 0)}次`;
    },
  });
  return legends;
};

export default customLegend;
