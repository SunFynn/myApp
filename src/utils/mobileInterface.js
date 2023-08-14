const MobileInterface = (function () {
  const subscriptions = new Map();
  let version = 2;
  /**
   * on
   * 与原生交互时将事件添加到队列
   * @param {?boject} eventType
   * 事件队列中对应的方法名
   * @param {?function} callback -
   * 回调方法,加入subscriptions事件队列方法
   *
   */
  const on = (eventType, callback, useCapture) => {
    if (callback) {
      subscriptions.set(eventType, [
        {
          eventType,
          listener: callback,
        },
      ]);
      if (useCapture) {
        let listener = subscriptions.get(eventType);
        if (listener.length > 1) {
          listener.push({
            eventType,
            listener: callback,
          });
          subscriptions.set(eventType, listener);
        }
      }
    }
  };
  /**
   * emit
   * 根据eventType执行时间队列
   * @param {?string} eventType - 时间队列中对应的方法
   * @param {?object} data - 执行方法是需要的参数
   */
  const emit = (eventType, data) => {
    // console.log("emit",eventType,data)
    let subscription = subscriptions.get(eventType);
    if (subscription) {
      subscription.forEach((sub) => {
        sub.listener(data);
      });
    }
  };
  const addListeners = (obj) => {
    let cloneObject = {};
    if (typeof obj != 'object' || obj === null) {
      return;
    }
    if (obj instanceof Array) {
      cloneObject = [];
      obj.map((item, index) => {
        if (typeof item === 'object' && item !== null) {
          cloneObject[index] = addListeners(item);
        } else {
          cloneObject[index] = item;
        }
      });
    } else {
      cloneObject = {};
      for (let key in obj) {
        if (typeof obj[key] == 'object' && obj[key] != null) {
          if (key === 'options') {
            obj[key] = obj[key].map((item) => {
              if (item.info.fn) {
                if (version === 3) {
                  on(`${item.info.type}-${item.info.fn.name}`, item.info.fn.listener);
                } else {
                  on(`${item.info.type}`, item.info.fn.listener);
                }
                item.info.fn = item.info.fn.name;
              }
              return item;
            });
          }
          cloneObject[key] = addListeners(obj[key]);
        } else {
          cloneObject[key] = obj[key];
        }
      }
    }
    return cloneObject;
  };

  window.addEventListener('storage', function (e) {
    emit(`storage-${e.key}`, JSON.parse(e.newValue));
  });
  window.addEventListener(
    'message',
    function (e) {
      switch (e.data.type) {
        case 'window-back': // 后退
          window.history.back();
          break;
        case 'window-forward': // 前进
          window.history.go(1);
          break;
        case 'window-reload': // 刷新
          window.location.reload();
          break;
        case 'window-active': //监听进入窗口
          // console.log(window.location, 'window.location');
          // console.log(location.href, 'location.href');
          break;
        default:
          break;
      }
    },
    false,
  );
  function MobileInterface(v) {
    version = v;
    /**
     * getData
     * 通过jsInterface于Android端交互。
     * 通过messageHandlers于IOS端交互。
     * 方法由H5调用，客户端响应
     *
     * @param {?boject} data
     * info                     交互凭据
     * info.type                类型
     * info.fn                  回调事件{name,listener}
     * data.param               客户端方法需要参数
     * @param {?function} args  客户端需要参数
     * 回调方法,加入subscriptions事件队列方法
     *
     */
    this.getData = function (info, args, param) {
      // console.log('getData',info.type,args)
      let data = {};
      if (info.fn) {
        if (version === 3) {
          on(`${info.type}-${info.fn.name}`, info.fn.listener);
        } else {
          on(`${info.type}`, info.fn.listener);
        }
        info.fn = info.fn.name;
      }
      if (version === 3) {
        data.info = info;
      } else {
        data.type = info.type;
      }
      if (args) {
        args = addListeners(args);
        if (version === 3) {
          data.data = args;
        } else {
          if (param) {
            data.data = param;
          } else {
            data.param = args;
          }
        }
      }
      data = JSON.stringify(data);
      if (/(Android)/i.test(navigator.userAgent)) {
        if (window.jsInterface) {
          window.jsInterface.html5apidata(data);
        }
        return;
      }
      if (/(iphone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if (window.webkit) {
          window.webkit.messageHandlers.html5apidata.postMessage(data);
        }
        return;
      }
      //debugger
      if (window.parent && window.parent.jsInterface) {
        let newData;
        if (info.type == 'attendence' || info.type === 'attendence-jump-holiday') {
          newData = JSON.stringify(info);
          window.parent.jsInterface.html5apidata(newData);
        } else {
          window.parent.jsInterface.html5apidata(data);
        }
        return;
      }
      if (window.parent.parent && window.parent.parent.jsInterface) {
        let newData;
        if (info.type == 'attendence') {
          newData = JSON.stringify(info);
          window.parent.parent.jsInterface.html5apidata(newData);
        } else {
          window.parent.parent.jsInterface.html5apidata(data);
        }
        return;
      }
    };
    /**
     * setData
     * 由客户端调用，getData的回调
     *
     * @param {?string} info - 调用getData方法时传入的info参数 {type:类型,...args}
     * @param {?string} data - 客户端反给h5的数据
     *
     */
    this.setData = function (info, data) {
      try {
        if (typeof info === 'string') {
          info = JSON.parse(info.replace(/[\r\n]/g, ''));
        }
      } catch (err) {
        info = {
          type: info,
        };
      }
      try {
        if (typeof data === 'string') {
          data = JSON.parse(data.replace(/[\r\n]/g, ''));
        }
      } catch (err) {
        data = {};
      }
      if (!info.type) {
        info.type = info;
      }
      if (version === 3) {
        emit(`${info.type}-${info.fn}`, data);
      } else {
        emit(`${info.type}`, data);
      }
    };
    /**
     * 添加监听storage事件
     */
    this.onStorage = function (key, callback, val) {
      if (val) {
        localStorage.setItem(key, JSON.stringify(val));
      } else {
        localStorage.removeItem(key);
      }
      on(`storage-${key}`, callback, true);
    };
    /**
     * 执行storage监听事件
     */
    this.emitStorage = function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    };
  }

  return MobileInterface;
})();

export default MobileInterface;
