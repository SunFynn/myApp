import {
  setSessionLang,
  getSessionLang,
  getUserInfo,
  webEncrypt,
  getUrlStringFromObj,
  getStrLen,
  randomString,
  downloadCanvesToImage,
} from './utils';
import CryptoJS from 'crypto-js';

// 模拟sessionStorage操作，jest无法测试浏览器原生sessionStorage/localStorage
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

// 将自定义的sessionStorage绑定到global顶层对象中
Object.defineProperty(global, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('测试sessionStorage信息', () => {
  beforeEach(() => {
    global.sessionStorage.clear();
    jest.restoreAllMocks();
  });
  it('测试国际化方法 sessionStorage存储langauge为日文', () => {
    setSessionLang('ja-JP');
    expect(getSessionLang()).toBe('ja-JP');
  });
  it('测试获取指定的sessionStorage信息', () => {
    expect(getUserInfo()).toEqual({});

    sessionStorage.setItem('USER-INFO', '{"name":"wtz"}');
    expect(getUserInfo()).toEqual({ name: 'wtz' });
  });
});

test('测试CryptoJS加密方法', () => {
  const obj = { userId: '123', timestamp: '2020-10-10 10:10:10' };

  // AES加密
  const code = webEncrypt(JSON.stringify(obj));

  // AES解密
  const decryptAES = (ciphertext: string, keyHex?: any, iv?: any) => {
    if (ciphertext) {
      const k = keyHex ? keyHex : CryptoJS.enc.Utf8.parse('Sixdu-WebCodeKey');
      const i: any = iv ? iv : CryptoJS.enc.Utf8.parse('Web-CodeKeySixdu');
      const encryptedHexStr = CryptoJS.enc.Hex.parse(ciphertext);
      const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      const decrypted = CryptoJS.AES.decrypt(srcs, k, {
        iv: i,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      });
      const decryptedInfo = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedInfo);
    } else {
      return '';
    }
  };

  expect(decryptAES(code)).toEqual(obj);
});

test('测试通过对象格式数据转化url参数格式内容', () => {
  const obj = { a: 1, b: '22', c: true };
  const str = getUrlStringFromObj(obj);
  expect(str).toBe('?a=1&b=22&c=true');
  expect(getUrlStringFromObj(null)).toBe('');
});

test('测试获取字符串字节长度', () => {
  const str1 = '1twjsxmcsxfws32i4y7qi9 @@9()-=';
  expect(getStrLen(str1)).toBe(30);
  const str2 = '';
  expect(getStrLen(str2)).toBe(0);
  const str3 = '123我包含中文';
  expect(getStrLen(str3)).toBe(13);
});

test('测试随机生成指定长度的字符串', () => {
  const str = '0123456789';
  expect(randomString(10).length).toBe(10);
  expect(randomString(3, str).length).toBe(3);
  expect(typeof randomString(100, str)).toBe('string');
});

describe('下载canves图片', () => {
  it('', () => {
    jest.fn(downloadCanvesToImage);
  });
});
