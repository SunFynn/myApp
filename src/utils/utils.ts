import html2canvas from 'html2canvas';
import CryptoJS from 'crypto-js';
import _ from 'lodash';

/* 正则 */
// url地址
const urlReq =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
// 身份证
const idCardReq = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机号
const telReq = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
// 中文
const chineseReq = /^[\u4e00-\u9fa5]+$/g;

/** 判断对象是否为空 */
export const isEmpty = (obj: Record<string, any>): boolean => {
  for (const name in obj) {
    return false;
  }
  return true;
};

/** 让当前获得焦点的元素失去焦点 */
export function activeElementBlur(flag: boolean = false) {
  return (
    flag &&
    requestAnimationFrame(() => {
      return document.activeElement && (document.activeElement as HTMLElement).blur();
    })
  );
}

/**
 * 生成相应格式的验证码
 * 原理：
 *  * (r & 0x3 | 0x8)  r是随机数字[0, 16)
 * 解 y的取值为何在这四个值之间 8，9，a，b
 * 16进制0X  0 1 2 3 4 5 6 7 8 9 a b c d e f
 * 10进制    0 1 2 3 4 5 6 7 8 9
 *
 *  16进制    二进制
 *    3      0 0 1 1
 *    8      1 0 0 0
 *
 * （& 与运算符 规则：全1为1，有0则0）
 *  r & 0x3  会产生四种情况
 *    0 0 0 0
 *    0 0 0 1
 *    0 0 1 0
 *    0 0 1 1
 *
 * （| 或运算符 规则：全0为0，有1则1）
 *  则 r & 0x3 & 0x8  会产生四种情况
 *    1 0 0 0    对应十进制   8
 *    1 0 0 1               9
 *    1 0 1 0               10   a
 *    1 0 1 1               11   b
 */
export function createCellId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** 将object内容转化为url参数 */
export function getUrlStringFromObj(obj: Record<string, any> | null): string {
  let string = '';
  _.forEach(obj, (value, key) => {
    let val = value;
    if (typeof value == 'object') {
      val = JSON.stringify(value);
    }
    string += string == '' ? `?${key}=${val}` : `&${key}=${val}`;
  });
  return string;
}

/** url search参数转化为object格式 */
export function getPageQueryString(): Record<string, string> | null {
  const pagePamrs: Record<string, string> = {};
  const url = window.location.href;

  if (url.indexOf('?') >= 0) {
    const newURl = url.split('?')[1];
    const newUR = newURl.split('&');
    newUR.map((item) => {
      const parms = item.split('=');
      const name: string = parms[0];
      pagePamrs[name] = parms[1];
    });
  } else {
    return null;
  }
  return pagePamrs;
}

/** 获取字符串的真实长度（字节长度）
 *  每个中文字节长度为2
 *  */
export const getStrLen = (str: string): number => {
  if (!str) {
    return 0;
  }
  const len = str.length;
  let truelen = 0;
  for (let x = 0; x < len; x++) {
    if (str.charCodeAt(x) > 128) {
      truelen += 2;
    } else {
      truelen += 1;
    }
  }
  return truelen;
};

/** 判断一个字符串中出现次数最多的字符，统计这个次数
  var str = 'asdfssaaasasasasaa';
  var json = {};
  @return [字符, 次数]
*/
export const findMaxCharacter = (val: string) => {
  const obj = {};
  [...val].forEach((item) => {
    if (!obj[item]) obj[item] = 1;
    else obj[item] += 1;
  });
  const keyArr: Array<number> = Object.values(obj);
  const maxCharacter: number = Math.max(...keyArr);
  const idx = keyArr.indexOf(maxCharacter);
  return [Object.keys(obj)[idx], maxCharacter];
};

/**
 * 生成随意字符串
 * @param length number - 要生成的字符串长度
 * @param [chars] string - 字符集
 */
export const randomString = (
  length: number,
  chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
): string => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

/** 获取附件类型 */
export function getFileIconType(name: string): number {
  let icon = 0;
  const nameLowerCase = name.toLowerCase();
  const lastFilePos = nameLowerCase.lastIndexOf('.');
  const extrName = nameLowerCase.substring(lastFilePos + 1, nameLowerCase.length);
  const fileTypeConfig: object = {
    1: ['tx'],
    2: ['wma', 'mp3', 'wav', 'amr', 'm4a', 'aac'],
    3: ['rar', 'zip'],
    4: ['xlsx', 'xls'],
    5: ['ppt', 'pptx'],
    6: ['pdf'],
    7: ['jpg', 'jpeg', 'gif', 'png', 'bmp'],
    8: ['mp4', 'avi'],
  };
  for (const key in fileTypeConfig) {
    if (fileTypeConfig[key].includes(extrName)) {
      icon = Number(key);
      break;
    }
  }
  return icon;
}

/** 获取对应附件类型的图标 */
export function returnFileIcon(name: string): string {
  const path = `http://${location.host}`;
  const type = getFileIconType(name) || 0;
  let src: string = 'icon-un.png';
  const configName = {
    0: 'icon-un.png',
    1: 'icon-texts.png',
    2: 'icon-music.png',
    3: 'icon-rar.png',
    4: 'icon-excel.png',
    5: 'icon-word.png',
    6: 'icon-PPT.png',
    7: 'icon-pdf.png',
    8: 'icon-png.png',
    9: 'icon-video.png',
  };
  if (configName[type]) {
    src = configName[type];
  }
  return `${path}/static/img/${src}`;
}

/** 转换文件大小 */
export function getFileSize(limit: number): string {
  if (Number.isNaN(limit) || limit < 0) return '';

  let size = '';
  if (limit < 1024) {
    //如果小于0.1KB转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 1024 * 1024) {
    //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  const sizestr = size + '';
  const len = sizestr.indexOf('.');
  const dec = sizestr.substring(len + 1, len + 3);
  if (dec == '00') {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substring(len + 3);
  }
  return sizestr;
}

/** 截取 文件后缀名 */
export function fileNameType(name: string): string {
  let fileType: string = _.split(name, '.')[_.split(name, '.').length - 1];
  fileType = fileType.toLowerCase();
  return fileType;
}

/** 将数字金额转换为人民币大写 */
export function convertCurrency(money: string | number) {
  //汉字的数字
  const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  const cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  const cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  const cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  const cnInteger = '整';
  //整型完以后的单位
  const cnIntLast = '元';
  //最大处理的数字
  const maxNum = 999999999999999.9999;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //输出的中文金额字符串
  let chineseStr = '';
  //分离金额后用的数组，预定义
  let parts;
  if (money === '') return '';
  const moneyNum = typeof money === 'string' ? parseFloat(money) : money;
  if (moneyNum >= maxNum || moneyNum < 0 || Number.isNaN(moneyNum)) {
    //超出最大处理数字
    return '';
  }
  if (moneyNum == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  const moneyStr = moneyNum.toString();
  if (moneyStr.indexOf('.') == -1) {
    integerNum = moneyStr;
    decimalNum = '';
  } else {
    parts = moneyStr.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substring(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

/**
 * 将身份证号、手机号中间转换为*
 * @param str  string - 需要转换的字符串
 * @param frontLen  number - 前部保留的字符数量
 * @param endLen  number - 尾部保留的字符数量
 */
export function convertStar(str: string, frontLen: number, endLen: number) {
  // 限制不规则参数，返回原字符串
  if (frontLen < 0 || endLen < 0 || Number.isNaN(frontLen) || Number.isNaN(endLen)) return str;
  // 前后限制保留的字符数量大于或等于字符串长度，返回原字符串
  if (frontLen + endLen >= str.length) return str;

  const len = str.length - frontLen - endLen;
  let xing = '';
  for (let i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/**
 * AES加密
 * @param msg  string - 需要加密的信息
 * @param [key]  string - 密钥
 * @param [iv]  string - 密钥的偏移量
 */
export const webEncrypt = function (msg: string, key?: string, iv?: string) {
  const m = CryptoJS.enc.Utf8.parse(msg);
  const k = CryptoJS.enc.Utf8.parse(`${key || 'Sixdu-WebCodeKey'}`);
  const i = CryptoJS.enc.Utf8.parse(`${iv || 'Web-CodeKeySixdu'}`);
  return CryptoJS.AES.encrypt(m, k, {
    iv: i,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).ciphertext.toString();
};

/**
 * AES解密
 * @param ciphertext  string - 需要解密的信息
 * @param [keyHex]  string - 密钥
 * @param [iv]  string - 密钥的偏移量
 * */
export const decryptAES = (ciphertext: string, keyHex?: string, iv?: string) => {
  if (ciphertext) {
    const k = CryptoJS.enc.Utf8.parse(`${keyHex || 'Sixdu-WebCodeKey'}`);
    const i = CryptoJS.enc.Utf8.parse(`${iv || 'Web-CodeKeySixdu'}`);
    const encryptedHexStr = CryptoJS.enc.Hex.parse(ciphertext);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypted = CryptoJS.AES.decrypt(srcs, k, {
      iv: i,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } else {
    return '';
  }
};

// 下载图片
export const downloadCanvesToImage = async (id: string): Promise<void> => {
  // html2canves将页面元素转化为canves画布
  let canvas;
  if (id.startsWith('.')) {
    canvas = await html2canvas(document.querySelector(id) as HTMLElement);
  } else {
    canvas = await html2canvas(document.getElementById(id) as HTMLElement);
  }
  console.log(canvas, '====');

  /**
   * 方法1：canves转化为base64模式
   * HTMLCanvesElement.toDataURL(type?, quality?) 将canves画布转化的为base64格式。
   * @param type  可选 图片格式，默认为 image/png
   * @param quality  可选 图片质量，取值范围0 - 1
   */
  // const shareUrl = canvas.toDataURL('image/png');    // 。例 data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
  // const a = document.createElement('a');
  // const handle = new MouseEvent('click');
  // a.download = '二维码.png';
  // a.href = shareUrl;            // href属性对应的是base64格式就可以正常下载了，  href如果是图片网址路径，即使设置了download，也可能不生效，只是打开图片网址 【兼容问题】
  // a.dispatchEvent(handle);

  /**
   * 方法2：canves转化为blob
   * HTMLCanvasElement.toBlob(callback, type?, quality?) 将canves画布转化的为blob格式
   * @param callback  回调函数，可获得一个单独的 Blob 对象参数。如果图像未被成功创建，可能会获得 null 值
   * @param type  可选 图片格式，默认为 image/png
   * @param quality  可选 图片质量，取值范围0 - 1
   *
   * URL.createObjectURL(object) 静态方法会创建一个 DOMString。
   * @param object 用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象；
   *
   * URL.revokeObjectURL(DOMString)  释放之前URL.createObjectURL创建的DOMString。
   */
  canvas.toBlob(
    async (Blob: any) => {
      const a = document.createElement('a');
      a.download = '二维码.png';
      a.style.display = 'none';
      a.type = 'image/png';
      console.log(Blob, URL.createObjectURL(Blob)); // Blob{size: 10731, type: 'image/png'}  'blob:http://192.168.1.199:8001/fd48dc96-8b32-4c45-b866-d7f9c031e25b'
      a.href = URL.createObjectURL(Blob);
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    },
    'image/png',
    1,
  );
};

/** 下载指定网址的图片或文件 */
export function downloadFileZip(
  output: any,
  downloadFileName = '未命名文件',
  handleCancel: Function = () => {},
) {
  let fileName = downloadFileName;

  if (!output) {
    handleCancel();
    return;
  }
  fetch(output, {
    // @ts-ignore
    responseType: 'blob',
  })
    .then((res) => res.blob())
    .then((res) => {
      const navigator: any = window.navigator;
      if (navigator?.msSaveBlob) {
        const suffix = output.split('.').pop();
        fileName = downloadFileName === '未命名文件' ? `${fileName}.${suffix}` : fileName;
        try {
          navigator?.msSaveBlob?.(res, fileName);
          handleCancel();
        } catch (e) {
          handleCancel();
        }
      } else {
        fileName = output || downloadFileName;
        const originName: string = fileName.slice(fileName.lastIndexOf('/') + 1, fileName.length);
        const aTag = document.createElement('a');
        const newType = originName.slice(originName.lastIndexOf(',') + 1, originName.length);
        const fileType = `application/${newType}`;
        const blob = new Blob([res], { type: fileType });
        aTag.download =
          downloadFileName + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
        aTag.href = URL.createObjectURL(blob);
        aTag.click();

        if (handleCancel) {
          handleCancel();
        }
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

/** 上传静态图片 */
export function uploadImg() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.setAttribute('multiple', 'multiple');
  input.click();
  input.onchange = async () => {
    Array.from((input as any).files).forEach(async (item) => {
      const formData = new FormData();
      formData.append('file', item as any);
      // 上传图片
      console.log(formData, 'formData');
    });
  };
}

/** 获取sessionStorage内容 */
export function getUserInfo() {
  const userInfo = sessionStorage.getItem('USER-INFO') || '{}';
  const myUser = JSON.parse(userInfo) || {};
  return myUser;
}

/**
 * 切换主题样式
 * @param themeType<number>   0 高亮  1 暗黑
 */
export const loadStyles = (themeType: number = 0) => {
  sessionStorage.setItem('themeType', themeType + '');
  const darkStyle: any = document.getElementById('darkTheme');
  if (themeType == 1) {
    if (!darkStyle) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.id = 'darkTheme';
      link.disabled = false;
      link.href = 'static/dark.css';
      document.getElementsByTagName('head')[0].appendChild(link);
    } else {
      darkStyle.disabled = false;
    }
  } else {
    if (darkStyle) {
      darkStyle.disabled = true;
    }
  }
};
