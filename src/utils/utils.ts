import html2canvas from 'html2canvas';

// 下载图片
export const downloadCanvesToImage = async (id: string): Promise<void> => {
  let canvas;
  if (id.startsWith('.')) {
    canvas = await html2canvas(document.querySelector(id) as HTMLElement);
  } else {
    canvas = await html2canvas(document.getElementById(id) as HTMLElement);
  }

  // 方法1：转化为base64模式下载
  // const shareUrl = canvas.toDataURL('image/png');    // 转化的为base64格式的图片。例 data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
  // const a = document.createElement('a');
  // const handle = new MouseEvent('click');
  // a.download = '二维码.png';
  // a.href = shareUrl;
  // a.dispatchEvent(handle);

  // 方法2：转化为blob
  canvas.toBlob(
    async (Blob: any) => {
      const a = document.createElement('a');
      a.download = '二维码.png';
      a.style.display = 'none';
      a.type = 'image/png';
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

// 将数字金额转换为人民币大写
export function convertCurrency(money: number) {
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

  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  const moneyStr: string = money.toString();
  if (moneyStr.indexOf('.') == -1) {
    integerNum = money.toString();
    decimalNum = '';
  } else {
    parts = moneyStr.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
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
console.log(convertCurrency(111111.111));

// 将身份证号中间转换为*
export function ConvertStar(str: string, frontLen = 6, endLen = 4) {
  const len = str.length - frontLen - endLen;
  let xing = '';
  for (let i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
}
console.log(ConvertStar('131082199801165514'));

// 获取文件大小
export function getFileSize(limit: number) {
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
  const dec = sizestr.substr(len + 1, 2);
  if (dec == '00') {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}
console.log(getFileSize(111111111));

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
