/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { STATUS_MESSAGE } from './code_message';

// timeout 请求时间超出指定之间信息
const Timeout: number = 30 * 1000;
const TimeoutMessage: string = '接口请求时间超时';

// 记录请求接口所用的时间(毫秒)
const commonUseTime: any = {};
const ALERT_TIME_COST = 1200; // ms,高延时api，报警；

// 接口处理白名单，在名单内的url，当code 不为20x时，不抛出错误 // TODO
const URL_WHITE_LIST: (string | RegExp)[] = [new RegExp('/api/login')];

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError): any => {
  // 请求超时，控制console.error提示
  if (String(error).includes(TimeoutMessage)) {
    console.error(TimeoutMessage);
  }

  const { name, data, type } = error;
  const response = error.response || {};
  if (response && response.status) {
    // @ts-ignore
    const errorText = STATUS_MESSAGE[response.status] || response.statusText;
    const { status, url } = response;

    // 上报网络层错误
    console.warn('上报错误信息:', {
      api: url,
      status,
      name,
      data,
      message: errorText,
      type,
      route: window.location.href,
    });

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    // notification.error({
    //   description: '请求超时',
    //   message: '请求超时',
    // });
  }
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' },
});

/** 返回response设置 */
request.interceptors.response.use(async (response, options) => {
  // 检测每个接口的请求时间
  commonUseTime[options.url].end = Date.now();
  commonUseTime[options.url].usetime =
    commonUseTime[options.url].end - commonUseTime[options.url].start;
  if (commonUseTime[options.url].usetime > ALERT_TIME_COST) {
    console.warn('接口耗时超出警界', {
      cost: commonUseTime[options.url].usetime,
      api: options.url,
    });
  }

  const data = await response.clone().json();
  // 请求状态是网络层次错误，直接返回response，交给异常处理程序处理
  if (response.status !== 200) return response;

  // 白名单内的接口，导常码由业务层处理
  const res = URL_WHITE_LIST.find(
    (url) => (url instanceof RegExp && url.test(options.url)) || url === options.url,
  );
  if (res) return response;

  // 如果code返回是200的情况,可以正常抛出请求结果
  if (data && data.code == 200) {
    return response;
  } else {
    // if (data && data.code === 401) {
    //   window.g_app._store &&
    //     window.g_app._store.dispatch({
    //       type: 'login/logout', // 退出登录
    //     });
    // }
    if (data && data.code !== 200) {
      message.error(data.msg || STATUS_MESSAGE[data.code]);
    }
    return Promise.reject(response);
  }
});

/** 请求request设置 */
request.interceptors.request.use((urlStr, options) => {
  let url = urlStr;
  commonUseTime[url] = {};
  commonUseTime[url].start = Date.now();

  // IE内核 GET请求默认走浏览器本地缓存，如果要禁用缓存则拼接时间戳参数即可
  if (!options.method || options.method === 'get') {
    const { userAgent } = window.navigator;
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    const isEdge = !isIE && userAgent.indexOf('Edge') > -1;
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE || isEdge || isIE11) {
      if (url.startsWith('/api')) {
        const separator = url.indexOf('?') !== -1 ? '&' : '?';
        // @ts-ignore
        url = encodeURI(`${url + separator}_time=${new Date().getTime()}`);
      }
    }
  }

  // 如果不是Form表单提交，且没有设置Content-Type，将body转为json字符串
  if (
    !(options.data instanceof FormData) &&
    !(options.headers && options.headers['Content-Type'])
  ) {
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      ...options.headers,
    };
    options.data = JSON.stringify(options.data);
  }

  // 补全request请求heeader信息
  if (options.headers) {
    //@ts-ignore
    const obj = { ...options.headers };
    const key = window.localStorage.getItem('authHeaderKey') || 'x-access-token';
    const value = window.localStorage.getItem('authValue');
    obj[key] = value;
    options.headers = obj;
  }

  // 'timeout' 指定请求超时的毫秒数（0 表示无超时时间）, 如果请求超过了 'timeout' 时间，请求将被中断并抛出请求异常
  options.timeout = Timeout;
  options.timeoutMessage = TimeoutMessage;
  return { url, options };
});

export default request;
