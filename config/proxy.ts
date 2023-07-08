import json5 from 'json5';
import { readFileSync } from 'fs';
import path from 'path';

interface developerP {
  name: string;
  ip: string;
  port: number;
}

// 自动注入本地后端开发者局域网ip
function readProxy() {
  const FILE_NAME = './proxyLocal.json5';
  const file = path.join(__dirname, FILE_NAME);

  try {
    let proxyCfg = json5.parse(readFileSync(file).toString());
    const { proxy, current, developers } = proxyCfg;

    const developer: any = developers.find((it: developerP) => it.name == current);
    if (!developer) {
      console.error(`无局域网，API优先代理： ${FILE_NAME}`);
      return {};
    } else {
      console.log('加载局域网，API优先代理:', current);
    }
    const { ip, port, devPort } = developer;
    // 生成url
    for (let api in proxy) {
      proxy[api].target = `http://${ip}:${proxy[api].port === 'port' ? port : devPort}`;
      console.log(`\t【${api}】${proxy[api].target}`);
    }
    return proxy;
  } catch (e) {
    console.error('无局域网API代理');
  }
  return {};
}

export default {
  dev: {
    '/api/': {
      target: 'http://www.wtz-lmm.cn:3000',
      changeOrigin: true,
    },
    // easy mock模拟的接口数据
    '/mock': {
      target: 'https://mock.mengxuegu.com/mock/63899dbd93a67b5f1066906f/',
      changeOrigin: true,
      pathRewrite: { '^/mock': '' },
    },
    ...readProxy(),
  },
};
