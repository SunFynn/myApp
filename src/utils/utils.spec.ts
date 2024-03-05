import {
  isUrl,
  isEmpty,
  activeElementBlur,
  createCellId,
  getUserInfo,
  getUrlStringFromObj,
  getPageQueryString,
  getStrLen,
  randomString,
  loadStyles,
  getFileIconType,
  returnFileIcon,
  getFileSize,
  convertCurrency,
  convertStar,
  fileNameType,
  webEncrypt,
  decryptAES,
} from './utils';

// isUrl
test('判断string内容是不是URL格式', () => {
  const str1 = '';
  expect(isUrl(str1)).toBe(false);
  const str2 = 'http://';
  expect(isUrl(str2)).toBe(false);
  const str3 = 'http://w.123.123.123.cn';
  expect(isUrl(str3)).toBe(true);
});

// isEmpty
test('判断对象是否为空', () => {
  const obj = { a: 1, b: 'b' };
  expect(isEmpty(obj)).toBe(false);
  expect(isEmpty({})).toBe(true);
});

// activeElementBlur
describe('自定义setTimeout与requestAnimationFrame', () => {
  beforeAll(() => {
    // @ts-ignore
    global.setTimeout = function (callback: Function, time: number) {
      // 模拟定时器
      const startTime = Date.now();
      while (true) {
        const endTime = new Date().getTime();
        if (endTime - startTime > time) {
          jest.fn(() => {
            callback();
          })();
          break;
        }
      }
      // 返回随机数字
      return Math.floor(Math.random() * 100);
    };
    global.requestAnimationFrame = function (callback) {
      setTimeout(callback, 0);
      return NaN;
    };
  });

  test('当前获得焦点的元素失去焦点', () => {
    // 初始化一个input元素
    const input = document.createElement('input');
    input.autofocus = true;
    document.body.appendChild(input);

    input.focus();
    activeElementBlur(false);
    expect(document.activeElement?.toString()).toEqual('[object HTMLInputElement]');
    activeElementBlur(true);
    expect(document.activeElement?.toString()).toEqual('[object HTMLBodyElement]');

    input.focus();
    activeElementBlur(undefined);
    expect(document.activeElement?.toString()).toEqual('[object HTMLInputElement]');
  });
});

// createCellId
test('测试生成相应格式的验证码', () => {
  const code = createCellId();
  expect(code.length).toBe(36);
  const codeArr = code.split('-');
  expect(codeArr.length).toBe(5);
  expect(codeArr[2].substring(0, 1)).toBe('4');
  // 验证y格式
  const yRuleArr = ['8', '9', 'a', 'b'];
  expect(yRuleArr.includes(codeArr[3].substring(0, 1))).not.toBeFalsy();
});
/**
 * (r & 0x3 | 0x8)  r是随机数字[0, 16)
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

// getUrlStringFromObj
test('将object内容转化为url参数', () => {
  const obj = { a: 1, b: '22', c: true };
  expect(getUrlStringFromObj(obj)).toBe('?a=1&b=22&c=true');

  const obj1 = { a: false, b: { arr: [1, 2, 4], str: '123' } };
  expect(getUrlStringFromObj(obj1)).toBe('?a=false&b={"arr":[1,2,4],"str":"123"}');

  expect(getUrlStringFromObj(null)).toBe('');
  expect(getUrlStringFromObj({})).toBe('');
});

// getPageQueryString
describe('模拟location对象，实现测试内容', () => {
  beforeAll(() => {
    const locationMock = (() => {
      return {
        hash: '',
        host: 'oa-beta.6du.cn',
        hostname: 'oa-beta.6du.cn',
        href: 'http://oa-beta.6du.cn/?a=1&b=false&c=[1,2,3]&d={obj:oo}',
        origin: 'http://oa-beta.6du.cn',
        pathname: '/',
        port: '',
        protocol: 'https:',
        search: '',
      };
    })();

    // 自定义location对象，运行环境不用，无法获取到BOM对象内容
    Object.defineProperty(global, 'location', {
      value: locationMock,
    });
  });
  test('url search参数转化为object格式', () => {
    expect(getPageQueryString()).toEqual({ a: '1', b: 'false', c: '[1,2,3]', d: '{obj:oo}' });

    window.location.href = 'http://oa-beta.6du.cn/';
    expect(getPageQueryString()).toBeNull();

    window.location.href = 'http://oa-beta.6du.cn/?';
    expect(getPageQueryString()).toEqual({});
  });
});

// getStrLen
test('测试获取字符串字节长度', () => {
  const str1 = '1twjsxmcsxfws32i4y7qi9 @@9()-=';
  expect(getStrLen(str1)).toBe(30);
  const str2 = '';
  expect(getStrLen(str2)).toBe(0);
  const str3 = '123我包含中文';
  expect(getStrLen(str3)).toBe(13);
});

// randomString
test('测试随机生成指定长度的字符串', () => {
  const str = '0123456789';
  expect(randomString(10).length).toBe(10);
  expect(randomString(3, str).length).toBe(3);
  expect(typeof randomString(100, str)).toBe('string');
});

// getFileIconType
test('测试获取附件类型', () => {
  expect(getFileIconType('1.png')).toBe(7);
  expect(getFileIconType('5.PPT')).toBe(5);
  expect(getFileIconType('')).toBe(0);
  expect(getFileIconType('text.txt')).toBe(0);
});

// returnFileIcon
describe('测试获取附件图标', () => {
  beforeAll(() => {
    const locationMock = (() => {
      return {
        hash: '',
        host: 'oa-beta.6du.cn',
        hostname: 'oa-beta.6du.cn',
        href: 'http://oa-beta.6du.cn/',
        origin: 'http://oa-beta.6du.cn',
        pathname: '/',
        port: '',
        protocol: 'https:',
        search: '',
      };
    })();

    // 自定义location对象，运行环境不用，无法获取到BOM对象内容
    Object.defineProperty(global, 'location', {
      value: locationMock,
    });
  });

  test('测试获取附件图标', () => {
    const defaultUrl = 'http://oa-beta.6du.cn/static/img/';
    const defaultIcon = 'icon-un.png';
    expect(returnFileIcon('1.png')).toBe(`${defaultUrl}icon-pdf.png`);
    expect(returnFileIcon('')).toBe(`${defaultUrl}${defaultIcon}`);
    expect(returnFileIcon('test.txt')).toBe(`${defaultUrl}${defaultIcon}`);
  });
});

// getFileSize
test('测试获取文件大小', () => {
  expect(getFileSize(NaN)).toBe(''); // 非正常数字
  expect(getFileSize(-100)).toBe(''); // 非正常数字

  expect(getFileSize(0)).toBe('0B'); // 0

  expect(getFileSize(13)).toBe('13B');
  expect(getFileSize(1024)).toBe('1KB');
  expect(getFileSize(1024 * 1024 - 500)).toBe('1023.51KB');
  expect(getFileSize(1024 * 1024 * 1024 - 500)).toBe('1024MB');
  expect(getFileSize(1024 * 1024 * 1024 + 500000000)).toBe('1.47GB');
});

// fileNameType
test('截取文件后缀名', () => {
  expect(fileNameType('')).toBe('');
  expect(fileNameType('ww.wtz.txt')).toBe('txt');
  expect(fileNameType('a.b.c.')).toBe('');
});

// convertCurrency
test('将数字金额转换为人民币大写', () => {
  // 字符串格式
  expect(convertCurrency('')).toBe('');
  expect(convertCurrency('wedfs123')).toBe('');
  expect(convertCurrency('123wedfs')).toBe('壹佰贰拾叁元整');
  expect(convertCurrency('123123')).toBe('壹拾贰万叁仟壹佰贰拾叁元整');
  expect(convertCurrency('222.222')).toBe('贰佰贰拾贰元贰角贰分贰毫');

  // 数字格式
  expect(convertCurrency(-1)).toBe('');
  expect(convertCurrency(NaN)).toBe('');
  expect(convertCurrency(9999999999999999999999999999999999)).toBe('');
  expect(convertCurrency(0)).toBe('零元整');

  expect(convertCurrency(0.5)).toBe('伍角');
  expect(convertCurrency(10000000000000)).toBe('壹拾兆元整');
  expect(convertCurrency(10081)).toBe('壹万零捌拾壹元整');
  expect(convertCurrency(999999999)).toBe('玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元整');
  expect(convertCurrency(111111.011)).toBe('壹拾壹万壹仟壹佰壹拾壹元壹分壹毫');
});

// convertStar
test('将身份证号、手机号中间转换为*', () => {
  expect(convertStar('15900000852', 3, 3)).toBe('159*****852');

  expect(convertStar('15900000852', 10, 3)).toBe('15900000852');
  expect(convertStar('123123', -1, 0)).toBe('123123');
  expect(convertStar('123123', -1, NaN)).toBe('123123');
  expect(convertStar('123123', NaN, NaN)).toBe('123123');
});

// webEncrypt
test('测试CryptoJS加密方法', () => {
  const obj = { userId: '123', timestamp: '2020-10-10 10:10:10' };
  const str = 'qwertyuioplkjhgfdsazxcvvbnnm1234567890-=[],./';

  // AES加密
  const code = webEncrypt(JSON.stringify(obj));
  expect(typeof code).toBe('string');
  expect(/[0-9][a-f]/gi.test(code)).toBeTruthy();
  const wwCode = webEncrypt(str, 'wwww', 'wwww');

  // AES解密
  const cipherCode = decryptAES(code);
  expect(JSON.parse(cipherCode)).toEqual(obj);
  const cipherWwCode = decryptAES(wwCode, 'wwww', 'wwww');
  expect(cipherWwCode).toBe('qwertyuioplkjhgfdsazxcvvbnnm1234567890-=[],./');

  expect(decryptAES('')).toBe('');
});

// 测试utils中所用的sessionStorage方法
describe('测试sessionStorage信息', () => {
  beforeAll(() => {
    /* 模拟sessionStorage操作，jest无法测试浏览器原生sessionStorage/localStorage */
    const sessionStorageMock = (() => {
      let store = {};

      return {
        getItem(key: string) {
          return store[key] || null;
        },
        setItem(key: string, value: string) {
          store[key] = value.toString();
        },
        removeItem(key: string) {
          delete store[key];
        },
        clear() {
          store = {};
        },
      };
    })();

    // 将自定义的sessionStorage绑定到global顶层对象中，无法获取到BOM对象内容
    Object.defineProperty(global, 'sessionStorage', {
      value: sessionStorageMock,
    });
  });
  beforeEach(() => {
    global.sessionStorage.clear();
    jest.restoreAllMocks();
  });
  it('测试获取指定的sessionStorage信息', () => {
    expect(getUserInfo()).toEqual({});

    sessionStorage.setItem('USER-INFO', '{"name":"wtz"}');
    expect(getUserInfo()).toEqual({ name: 'wtz' });

    sessionStorage.clear();
  });
});

// loadStyles
describe('切换主题样式, 并获取当前主题模式', () => {
  const checkIsDarkStyle = (): boolean => {
    const darkStyle: any = document.getElementById('darkTheme');
    let isDark: boolean = false;
    if (darkStyle) {
      if (!darkStyle.disabled || darkStyle.disabled == false) {
        isDark = true;
      }
    }
    return isDark;
  };
  beforeEach(() => {
    // 每次测试执行前，先将head头部中的暗黑link清空
    const darkStyle = document.getElementById('darkTheme');
    if (darkStyle) document.head.removeChild(darkStyle);
  });

  test('高亮样式 无link', () => {
    loadStyles();
  });
  test('高亮样式 有link', () => {
    const darkLink = document.createElement('link');
    darkLink.rel = 'stylesheet';
    darkLink.type = 'text/css';
    darkLink.id = 'darkTheme';
    darkLink.disabled = false;
    document.head.appendChild(darkLink);

    loadStyles(0);
    expect(darkLink.disabled).toBeTruthy();
  });
  test('暗黑样式 无link', () => {
    loadStyles(1);
    const darkLink = document.getElementById('darkTheme');
    expect(Boolean(darkLink)).toBeTruthy();
    expect((<HTMLLinkElement>darkLink).disabled).toBeFalsy();
  });
  test('暗黑样式 有link', () => {
    const darkLink = document.createElement('link');
    darkLink.rel = 'stylesheet';
    darkLink.type = 'text/css';
    darkLink.id = 'darkTheme';
    darkLink.disabled = true;
    document.head.appendChild(darkLink);

    loadStyles(1);
    expect(darkLink.disabled).toBeFalsy();
  });

  // 获取当前主题模式
  test('没有暗黑link', () => {
    expect(checkIsDarkStyle()).toBe(false);
  });
  test('拥有暗黑link', () => {
    const darkLink = document.createElement('link');
    darkLink.rel = 'stylesheet';
    darkLink.type = 'text/css';
    darkLink.id = 'darkTheme';
    darkLink.disabled = true;
    document.head.appendChild(darkLink);

    expect(checkIsDarkStyle()).toBe(false);
    darkLink.disabled = false;
    expect(checkIsDarkStyle()).toBe(true);
  });

  afterAll(() => {
    // 测试结束后清空暗黑link
    const darkStyle = document.getElementById('darkTheme');
    if (darkStyle) document.head.removeChild(darkStyle);
  });
});

// window.open
describe('window.open', () => {
  beforeEach(() => {
    const darkLink = document.createElement('link');
    darkLink.rel = 'stylesheet';
    darkLink.type = 'text/css';
    darkLink.id = 'darkTheme';
    darkLink.disabled = true;
    document.head.appendChild(darkLink);
  });
  test('预览附件图片', () => {
    window.open = jest.fn((str) => {
      expect(str).toBe('http://webim-dev.6du.cn/1.png');
      return window;
    });
    window.open('http://webim-dev.6du.cn/1.png');
  });
});

// downloadCanvesToImage 使用html2canves转化dom为canves报错 ？？？
describe('下载canves图片', () => {
  it('', () => {
    const canvesDom = document.createElement('div');
    canvesDom.id = 'canvesDom';
    canvesDom.innerHTML = '123123';
    document.body.appendChild(canvesDom);

    // jest.fn(()=>{downloadCanvesToImage('canvesDom')})();
  });
});
