(function () {
  class DuApp {
    constructor() {
      this.options = {
        type: 0, // 0 应用内DU   1 短信DU    2 电话DU （暂未开放）
        theme: 0, // !1 浅色模式   1 黑暗模式
        langauge: 'zh-CN', // 语言环境   zh-CN 中文   en-US 英文   ja-JP 日文
        title: '', // DU弹框名称，不添加默认名称，使用langaugeObj中默认的参数
        env: 'beta', // prod 正式接口   beta 测试接口
        source: '', // 来源，使用当前DU的应用   例 salarySheet  [工资条]
        userControl: false, // 人员选择限制，不允许选择传入人员之外的人   例 salarySheet  [工资条]
        changeDUType: false, // 是否可以切换DU的类型
        session: false, // 发送DU的时候，是否需要展示会话来源
        showHeader: true, // 是否展示头部内容
        contactRelate: {}, // 组织架构弹框需要的配置
        loading: false, // loading状态，防止用户重复发送及发送过程中修改弹框内的数据
        // 接口所需的参数信息
        params: {
          userList: [], // 用户列表  对象中需要id、name
          organize_du: 0, // 0 普通DU   1 组织DU
          iconUrl: '', // 来源app的icon
          form_title: '', // 来源app的DU事件名称
          DuText: '', // 来源app的DU事件描述
          again: 0, // 重复提醒
          regularTimeRadio: false, // 定时DU，radio
          DuTime: undefined, // 定时DU - 时间
          separateRadio: false, // 分别发送DU，radio
          appendix: undefined, // 附件信息
        },
      };
      this.localParams = {
        userList: [], // 修改后的用户信息， 有部分业务要求，控制所选人是否是用户列表内的人员
        DuText: '',
        tixingTitle: '',
        tixingValue: 0,
        radio1: false,
        DuTime: undefined,
        radio2: false,
        // 短信DU的组织短信信息
        department: {
          title: '',
          personNum: 0,
          departmentNum: 0,
        },
      };
      this.callback = (status, params, data) => {}; // 发送操作的回调函数  status 发送接口调用状态[fulfilled成功 | rejected失败], params 调用api时的参数, data 接口返回数据
      this.closeCallback = () => {}; // 取消/× 操作的回调函数
      this.iconConfig = {
        closeIcon:
          '<svg width="20px" height="20px" t="1690531949128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27952"><path d="M755.498667 97.834667a42.666667 42.666667 0 0 0-56.32-3.541334l-4.010667 3.541334-384 384a42.666667 42.666667 0 0 0-3.541333 56.32l3.541333 4.010666 384 384a42.666667 42.666667 0 0 0 63.872-56.32l-3.541333-4.010666L401.706667 512l353.792-353.834667a42.666667 42.666667 0 0 0 3.541333-56.32l-3.541333-4.010666z" p-id="27953"></path></svg>',
        rightIcon:
          '<svg t="1690539157839" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28087" width="16" height="16"><path d="M311.168 97.856a42.688 42.688 0 0 1 55.04-4.48l5.312 4.48 384 384c14.976 14.976 16.448 38.4 4.48 55.04l-4.48 5.248-384 384a42.688 42.688 0 0 1-64.832-55.04l4.48-5.248L664.96 512 311.168 158.144a42.688 42.688 0 0 1-4.48-55.04l4.48-5.248z" p-id="28088"></path></svg>',
        successIcon:
          '<svg t="1690856798864" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14613" width="16" height="16"><path d="M55.168 467.797a42.667 42.667 0 0 1 56.32-3.541l4.01 3.541 301.697 301.739a42.667 42.667 0 0 1-56.32 63.872l-4.011-3.541L55.168 528.17a42.667 42.667 0 0 1 0-60.374z" p-id="14614"></path><path d="M899.243 225.877a42.667 42.667 0 0 1 64 56.235l-3.584 4.01L417.28 829.868a42.667 42.667 0 0 1-64-56.32l3.541-4.054 542.422-543.616z" p-id="14615"></path></svg>',
        errorIcon:
          '<svg t="1690857125349" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14753" width="16" height="16"><path d="M840.96 183.04c15.36 15.36 16.426667 39.552 3.285333 56.149333l-3.285333 3.669334L571.818667 512l269.141333 269.141333a42.282667 42.282667 0 0 1-56.149333 63.104l-3.669334-3.285333L512 571.818667 242.858667 840.96a42.282667 42.282667 0 0 1-63.104-56.149333l3.285333-3.669334L452.181333 512 183.04 242.858667a42.282667 42.282667 0 0 1 56.149333-63.104l3.669334 3.285333L512 452.181333l269.141333-269.141333a42.282667 42.282667 0 0 1 59.818667 0z" p-id="14754"></path></svg>',
      };

      this.langaugeObj = {
        'zh-CN': {
          DuApp_giveUp: '放弃',
          DuApp_cancel: '取消',
          DuApp_determine: '确定',
          DuApp_send: '发送',
          DUApp_today: '今天',
          DuApp_headerTitle: '新建DU',
          DuApp_closeDialogTitle: '是否要放弃编辑？若放弃已输入的内容不会保存',
          DuApp_placeholder: '请输入',
          DuApp_recipient: '接收人',
          DuApp_person: '人',
          DuApp_reminderMethod: '提醒类型',
          DuApp_duInApp: '应用内',
          DuApp_textMessage: '短信',
          DuApp_duType: 'DU类型',
          DuApp_ordinaryDu: '普通DU',
          DuApp_personShortMessageNum: '个人今天剩余可发送条数：',
          DuApp_organizeShortMessageNum: '组织剩余可发送条数：',
          DuApp_remind: '提醒',
          DuApp_againLabel: '不再次提醒',
          DuApp_again5Label: '5分钟后提醒',
          DuApp_again10Label: '10分钟后提醒',
          DuApp_again15Label: '15分钟后提醒',
          DuApp_dingshiDu: '定时DU',
          DuApp_sendTime: '发送时间',
          DuApp_separateDelivery: '分别发送',
          DuApp_promptInfo: '接收人之间完全看不到，适合群发通知后单独沟通的场景',
          DuApp_Toast_userIdsError: '当前选择有不符合状态的用户，请重新选择',
          DuApp_Toast_requestError: '接口错误',
          DuApp_Toast_sendSuccess: '发送成功',
          DuApp_Toast_timeError: '设置定时DU是一个过去的时刻，建议重新选择时间',
          DuApp_Toast_noUserIdsError: '请选择接收人',
          DuApp_Toast_noDUTextError: '任务内容不能为空',
        },
        'en-US': {
          DuApp_giveUp: 'Give up',
          DuApp_cancel: 'Cancel',
          DuApp_determine: 'Determine',
          DuApp_send: 'Send',
          DUApp_today: 'Today',
          DuApp_headerTitle: 'Create DU',
          DuApp_closeDialogTitle:
            'Do you want to give up editing? The entered content will not be saved if you give up',
          DuApp_placeholder: 'Please enter',
          DuApp_recipient: 'Recipient',
          DuApp_person: 'person',
          DuApp_reminderMethod: 'Reminder method',
          DuApp_duInApp: 'In-app',
          DuApp_textMessage: 'Text message',
          DuApp_duType: 'DU type',
          DuApp_ordinaryDu: 'Ordinary DU',
          DuApp_personShortMessageNum: 'Remaining sendable count for individual today: ',
          DuApp_organizeShortMessageNum: 'Remaining sendable count for organization: ',
          DuApp_remind: 'Remind',
          DuApp_againLabel: 'Do not remind again',
          DuApp_again5Label: 'Remind again after 5 minutes',
          DuApp_again10Label: 'Remind again after 10 minutes',
          DuApp_again15Label: 'Remind again after 15 minutes',
          DuApp_dingshiDu: 'Scheduled DU',
          DuApp_sendTime: 'Send time',
          DuApp_separateDelivery: 'Separate delivery',
          DuApp_promptInfo:
            'Recipients cannot see each other at all, suitable for scenarios where you want to have separate conversations after sending group notifications',
          DuApp_Toast_userIdsError:
            'There are users in the current selection that are in an incompatible state. Please select again',
          DuApp_Toast_requestError: 'API error',
          DuApp_Toast_sendSuccess: 'Send success',
          DuApp_Toast_timeError:
            'The set time for the scheduled DU is in the past. It is recommended to select again',
          DuApp_Toast_noUserIdsError: 'Please select recipients',
          DuApp_Toast_noDUTextError: 'The task content cannot be empty',
        },
        'ja-JP': {
          DuApp_giveUp: '放棄',
          DuApp_cancel: 'キャンセル',
          DuApp_determine: '確定',
          DuApp_send: '送信',
          DUApp_today: '今日',
          DuApp_headerTitle: '新着DU',
          DuApp_closeDialogTitle: '編集を放棄しますか？入力した内容は保存されません',
          DuApp_placeholder: '入力してください',
          DuApp_recipient: '受信者',
          DuApp_person: '人',
          DuApp_reminderMethod: 'リマインダーの種類',
          DuApp_duInApp: 'アプリ内',
          DuApp_textMessage: 'テキストメッセージ',
          DuApp_duType: 'DUの種類',
          DuApp_ordinaryDu: '通常のDU',
          DuApp_personShortMessageNum: '個人の今日の残り送信可能回数：',
          DuApp_organizeShortMessageNum: '組織の残り送信可能回数：',
          DuApp_remind: 'リマインド',
          DuApp_againLabel: '再度通知しない',
          DuApp_again5Label: '5分後に通知',
          DuApp_again10Label: '10分後に通知',
          DuApp_again15Label: '15分後に通知',
          DuApp_dingshiDu: 'タイマーDU',
          DuApp_sendTime: '送信時間',
          DuApp_separateDelivery: '個別送信',
          DuApp_promptInfo:
            '受信者同士が完全に見えないようになります。通知を一斉送信した後に個別に対話する場合に適しています。',
          DuApp_Toast_userIdsError:
            '選択したユーザーには対応していない状態のユーザーが含まれています。選択をやり直してください',
          DuApp_Toast_requestError: 'APIエラー',
          DuApp_Toast_sendSuccess: '送信成功',
          DuApp_Toast_timeError:
            'タイマーDUの設定時間が過去の時点です。再度選択することをお勧めします',
          DuApp_Toast_noUserIdsError: '受信者を選択してください',
          DuApp_Toast_noDUTextError: 'タスクの内容は空にできません',
        },
      };

      // this.SERVERPATH = ".";
      this.SERVERPATH = 'http://www.wtz-lmm.cn/publicShareCDN/_DU/app';
      this.time = Date.now();

      /** 引入项目中所用的cdn链接 */
      // 加载DatePickerView组件 css
      const mobiscrollCSS = document.createElement('link');
      mobiscrollCSS.rel = 'stylesheet';
      mobiscrollCSS.href = `${this.SERVERPATH}/cdn/mobiscroll.css`;
      document.head.appendChild(mobiscrollCSS);

      // 加载样式
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${this.SERVERPATH}/light.css?time=${this.time}`;
      document.head.appendChild(link);
    }

    // 初始化
    async init(object, callback, closeCallback) {
      this.options = Object.assign({}, this.options, object);
      this.callback = callback;
      this.closeCallback = closeCallback;
      this.localParams.userList = JSON.parse(JSON.stringify(object?.params?.userList || []));
      this.localParams.DuText = object?.params?.DuText;
      this.localParams.tixingValue = object?.params?.again || 0;
      this.localParams.radio1 = object?.params?.regularTimeRadio || false;
      this.localParams.DuTime =
        object?.params?.DuTime || (object?.params?.regularTimeRadio ? this.getTime() : '');
      this.localParams.radio2 = object?.params?.separateRadio || false;

      // 判断语言环境
      let lang = 'zh-CN';
      let lowerLang = object?.langauge?.toLowerCase();
      if (lowerLang?.includes('zh')) lang = 'zh-CN';
      else if (lowerLang?.includes('en')) lang = 'en-US';
      else if (lowerLang?.includes('ja')) lang = 'ja-JP';
      this.langauge = this.langaugeObj[lang || 'zh-CN'];
      this.localParams.tixingTitle = this.langauge.DU_againLabel;

      // theme为1，引入暗黑样式
      if (this.options.theme === 1) {
        this.changeTheme(1);
      }

      this._baseAppend();
    }

    // 切换主题模式 [浅色|暗黑]
    changeTheme(theme) {
      this.options.theme = theme;
      const darkLink = document.querySelector('link[title="DUApp_darkLink"]');
      if (theme === 1) {
        if (!darkLink) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.title = 'DUApp_darkLink';
          link.href = `${this.SERVERPATH}/dark.css?time=${this.time}`;
          document.head.appendChild(link);
        }
      } else {
        if (darkLink) document.head.removeChild(darkLink);
      }

      if (window.ContactRelate) window.ContactRelate.loadTheme(theme);
    }

    // 切换语言环境 [中文|英文|日文]
    changeLangauge(lang) {
      let lang1 = 'zh-CN';
      let lowerLang = lang?.toLowerCase();
      if (lowerLang?.includes('zh')) lang1 = 'zh-CN';
      else if (lowerLang?.includes('en')) lang1 = 'en-US';
      else if (lowerLang?.includes('ja')) lang1 = 'ja-JP';
      this.langauge = this.langaugeObj[lang1 || 'zh-CN'];
      this._baseAppend();
    }

    // 基础填充方法，判断是哪种类型
    _baseAppend() {
      const Add_DU_Msg_AppBox = document.querySelector('.Add_DU_Msg_App');
      if (Add_DU_Msg_AppBox) {
        document.body.removeChild(Add_DU_Msg_AppBox);
      }
      // 先存储到内存中
      this.fragmentDom = document.createDocumentFragment();

      const DUAppBox = this.createElement('div', {
        classname: 'Add_DU_Msg_App',
      });

      if (this.options.showHeader) {
        DUAppBox.appendChild(this.Header_Element());
      }
      DUAppBox.appendChild(this.Content_Element());
      this.DUAppBox = DUAppBox;
      this.fragmentDom.appendChild(DUAppBox);
      document.body.appendChild(this.fragmentDom);
    }

    // 关闭弹框
    closeHandle() {
      const baseBox = document.querySelector('.Add_DU_Msg_App');
      if (baseBox) {
        baseBox.parentElement.removeChild(baseBox);
      }
    }

    // Dialog提示层关闭弹窗
    closeHandleDialog(callback) {
      this.Dialog({
        title: this.langauge.DuApp_closeDialogTitle,
        onOk: () => {
          this.closeHandle();
          if (callback) callback();
        },
        cancelText: this.langauge.DuApp_cancel,
        okText: this.langauge.DuApp_giveUp,
      });
    }

    // header
    Header_Element() {
      const DU_App_Header = this.createElement('div', {
        classname: 'DU_App_Header',
        innerHTML: `<div class='DU_App_Header_title'>${
          this.options.title || this.langauge.DuApp_headerTitle
        }</div>`,
      });
      const DU_App_Header_close = this.createElement('span', {
        innerHTML: `${this.iconConfig.closeIcon}`,
        classname: 'DU_App_Header_close',
        onclick: () => {
          this.Dialog({
            title: this.langauge.DuApp_closeDialogTitle,
            onOk: () => {
              this.closeHandle();
              if (this.closeCallback) this.closeCallback();
            },
            cancelText: this.langauge.DuApp_cancel,
            okText: this.langauge.DuApp_giveUp,
          });
        },
      });
      DU_App_Header.appendChild(DU_App_Header_close);
      return DU_App_Header;
    }

    // content
    Content_Element() {
      const DU_App_Content = this.createElement('div', {
        classname: 'DU_App_Content',
        style: `height: ${this.options.showHeader ? 'calc(100vh - 45px)' : 'calc(100vh)'}`,
      });
      DU_App_Content.appendChild(this.AppendixSource_Element());
      DU_App_Content.appendChild(this.Config_Box1_Element());
      DU_App_Content.appendChild(this.Config_Box2_Element());
      DU_App_Content.appendChild(this.Config_SendBtn());
      return DU_App_Content;
    }

    // Textarea DU附件组件
    AppendixSource_Element() {
      const AppendixSource_Box = this.createElement('div', {
        classname: 'Textarea_Element',
      });

      const TextareaBox = this.createElement('div', {
        classname: 'TextareaBox',
      });
      const textarea = this.createElement('textarea', {
        row: '3',
        placeholder: this.langauge.DuApp_placeholder,
        onchange: (e) => {
          this.localParams.DuText = e.target.value;
        },
      });
      textarea.value = this.localParams.DuText || '';
      TextareaBox.appendChild(textarea);

      const SourceAppBox = this.createElement('div', {
        classname: 'SourceAppBox',
        innerHTML: `
          <img src=${this.options.params.iconUrl} />
          <div>${this.options.params.form_title}</div>
        `,
      });

      AppendixSource_Box.appendChild(TextareaBox);
      AppendixSource_Box.appendChild(SourceAppBox);
      return AppendixSource_Box;
    }

    // 配置DU组件 Box1模块
    Config_Box1_Element() {
      const Config_Box1_Element = this.createElement('div', {
        classname: 'Config_Box1_Element',
      });
      this.DU_App_Config_Box1 = Config_Box1_Element;
      this.Config_Box1_Item1();
      this.Config_Box1_Item2();
      this.Config_Box1_Item3();
      if (this.options.type) this.getDepartmentInfo();
      return Config_Box1_Element;
    }

    // 接收人
    Config_Box1_Item1() {
      const Config_Box1_Item1 = this.createElement('div', {
        classname: 'Config_Box_Item Config_Box1_Item1',
        innerHTML: `<span>${this.langauge.DuApp_recipient}</span>`,
      });
      const Config_Box1_Item1_div = this.createElement('div', {
        innerHTML: `
          <span class='DuApp_person'>${this.localParams.userList.length}${this.langauge.DuApp_person}</span>
          <span>${this.iconConfig.rightIcon}</span>
        `,
        onclick: () => {
          const params = {
            ...this.options.contactRelate,
            theme: this.options.theme,
            defaultData: this.localParams.userList || [],
            onSubmit: (data) => {
              this.submitHandle(data);
            },
          };

          if (!window.ContactRelate) {
            this.loadContactRelate(params);
            return;
          }
          window.ContactRelate.init(params);
        },
      });
      Config_Box1_Item1.appendChild(Config_Box1_Item1_div);
      this.DU_App_Config_Box1.appendChild(Config_Box1_Item1);
    }

    // 加载组织架构cdn
    loadContactRelate(params = null) {
      const ContactRelate = this.createElement('script', {
        src: 'https://static-beta.6du.cn/public/contact_relate_v1.0/contact.relate.mobile.js',
      });
      document.head.appendChild(ContactRelate);
      ContactRelate.onload = function () {
        if (params) {
          window.ContactRelate.init(params);
        }
      };
    }

    // 组织架构弹框 添加人员
    submitHandle(data) {
      if (this.options.userControl) {
        let user = true;
        if (data.length > (this.options.params.userList || []).length) {
          user = false;
        } else {
          let userId = this.options.params.userList?.map((item) => {
            return Number(item.id);
          });
          let newUser = data.map((item) => {
            return Number(item.id);
          });
          newUser.forEach((item) => {
            if (userId?.indexOf(item) == -1) {
              user = false;
            }
          });
        }
        if (!user) {
          this.Toast(this.langauge.DuApp_Toast_userIdsError);
          return false;
        }
      }
      this.localParams.userList = [...data];
      const DuApp_person = document.querySelector('.DuApp_person');
      DuApp_person.innerHTML = `${this.localParams.userList.length}${this.langauge.DuApp_person}`;
    }

    // 提醒方式
    Config_Box1_Item2() {
      const Du_App_Config_Box1_Item2 = document.querySelector('.Config_Box1_Item2');
      const Du_App_Config_Box1_Item3 = document.querySelector('.Config_Box1_Item3');
      if (Du_App_Config_Box1_Item2) {
        this.DU_App_Config_Box1.removeChild(Du_App_Config_Box1_Item2);
      }

      const Config_Box1_Item2 = this.createElement('div', {
        classname: 'Config_Box_Item Config_Box1_Item2',
        innerHTML: `<span>${this.langauge.DuApp_reminderMethod}</span>`,
      });
      const Config_Box1_Item2_div = this.createElement('div');
      const btn1 = this.createElement('span', {
        classname: `Du_type_btn ${this.options.type === 0 ? 'Du_type_btn_active' : ''}`,
        innerHTML: `${this.langauge.DuApp_duInApp}`,
        onclick: () => {
          if (this.options.changeDUType && this.options.type == 1) {
            this.options.type = 0;
            this.Config_Box1_Item2();
            const Config_Box1_TextMessage = document.querySelector('.Config_Box1_TextMessage');
            if (Config_Box1_TextMessage)
              this.DU_App_Config_Box1.removeChild(Config_Box1_TextMessage);
          }
        },
      });
      const btn2 = this.createElement('span', {
        classname: `Du_type_btn ${this.options.type === 1 ? 'Du_type_btn_active' : ''}`,
        innerHTML: `${this.langauge.DuApp_textMessage}`,
        onclick: () => {
          if (this.options.changeDUType && this.options.type == 0) {
            this.options.type = 1;
            this.Config_Box1_Item2();
            this.getDepartmentInfo();
          }
        },
      });
      Config_Box1_Item2_div.appendChild(btn1);
      Config_Box1_Item2_div.appendChild(btn2);
      Config_Box1_Item2.appendChild(Config_Box1_Item2_div);

      if (Du_App_Config_Box1_Item3) {
        this.DU_App_Config_Box1.insertBefore(Config_Box1_Item2, Du_App_Config_Box1_Item3);
      } else {
        this.DU_App_Config_Box1.appendChild(Config_Box1_Item2);
      }
    }

    // DU类型
    Config_Box1_Item3() {
      const Config_Box1_Item3 = this.createElement('div', {
        classname: 'Config_Box_Item Config_Box1_Item3',
        innerHTML: `
          <span>${this.langauge.DuApp_duType}</span>
          <div>
            <span class="companyName">${
              this.options.params.organize_du
                ? this.options.userInfo.companyName
                : this.langauge.DuApp_ordinaryDu
            }</span>
            <span>${this.iconConfig.rightIcon}</span>
          </div>
        `,
      });
      this.DU_App_Config_Box1.appendChild(Config_Box1_Item3);
    }

    // 短信DU 组织模块信息（包含名称、剩余短信条数等）
    Config_Box1_TextMessage() {
      const Config_Box1_TextMessage = this.createElement('div', {
        classname: 'Config_Box1_TextMessage',
        innerHTML: `
          <div class='title'>${this.localParams.department?.title}</div>
          <div>${this.langauge.DuApp_personShortMessageNum}<span class='personNum'>${this.localParams.department?.personNum}</span></div>
          <div>${this.langauge.DuApp_organizeShortMessageNum}<span class='departmentNum'>${this.localParams.department?.departmentNum}</span></div>
        `,
      });
      if (this.options.type === 1) this.DU_App_Config_Box1.appendChild(Config_Box1_TextMessage);
    }

    /** 短信DU - 获取接口数据 */
    getDepartmentInfo() {
      this.request(206, { user_id: this.options?.userInfo?.user_id })
        .then((res) => {
          if (res && res.code === 0) {
            const obj =
              res.data?.company_du_balance.find(
                (item) => item.company_id === this.options.userInfo.companyId,
              ) || {};
            this.localParams.department = {
              title: obj.company_name,
              personNum: obj.user_du_balance,
              departmentNum: obj.du_balance,
            };
          } else {
            this.Toast(res.message || this.langauge.DuApp_Toast_requestError);
          }
        })
        .finally(() => {
          this.Config_Box1_TextMessage();
        });
    }

    // 配置DU组件 Box2模块
    Config_Box2_Element() {
      const Config_Box2_Element = this.createElement('div', {
        classname: 'Config_Box2_Element',
      });
      this.DU_App_Config_Box2 = Config_Box2_Element;
      this.Config_Box2_Item1();
      this.Config_Box2_Item2();
      this.Config_Box2_DuTime(true);
      this.Config_Box2_Item3();
      this.Config_Box2_Item4();
      return Config_Box2_Element;
    }

    // 提醒  【是否重复提醒 5、10、15分钟】
    Config_Box2_Item1() {
      const Config_Box2_Item1 = this.createElement('div', {
        classname: 'Config_Box_Item Config_Box2_Item1',
        innerHTML: `<span>${this.langauge.DuApp_remind}</span>`,
      });
      const optionsLabel = [
        this.langauge.DuApp_againLabel,
        this.langauge.DuApp_again5Label,
        this.langauge.DuApp_again10Label,
        this.langauge.DuApp_again15Label,
      ];
      const optionsValue = [0, 5, 10, 15];
      let index = this.localParams.tixingValue
        ? optionsValue.indexOf(this.localParams.tixingValue)
        : 0;
      const Config_Box2_Item1_div = this.createElement('div', {
        innerHTML: `
          <span class='DuApp_again'>${
            optionsLabel[optionsValue.indexOf(Number(`${this.localParams.tixingValue}`))]
          }</span>
          <span>${this.iconConfig.rightIcon}</span>
        `,
        onclick: () => {
          const _that = this;
          // this.Popup();
          new DUApp_PickerView({
            index,
            data: optionsLabel,
            title: ' ',
            leftText: _that.langauge.DuApp_cancel,
            rightText: _that.langauge.DuApp_determine,
            rightFn: function (selectArr) {
              const selectStr = selectArr[0];
              _that.localParams.tixingTitle = selectStr;
              const idx = optionsLabel.indexOf(selectStr);
              index = idx;
              _that.localParams.tixingValue = optionsValue[idx];
              // 更新页面数据，获取指定元素，直接修改改元素显示内容，就不需要全组件刷新
              const DuApp_again = document.querySelector('.DuApp_again');
              DuApp_again.innerHTML = _that.localParams.tixingTitle;
            },
          });
        },
      });
      Config_Box2_Item1.appendChild(Config_Box2_Item1_div);
      this.DU_App_Config_Box2.appendChild(Config_Box2_Item1);
    }

    // 定时DU
    Config_Box2_Item2() {
      const Config_Box2_Item2 = this.createElement('div', {
        classname: 'Config_Box_Item Config_Box2_Item2',
        innerHTML: `<span>${this.langauge.DuApp_dingshiDu}</span>`,
      });
      const Config_Box2_Item2_Box = this.createElement('div', {
        classname: 'DU_Switch',
      });
      const input_checkbox = this.createElement('input', {
        type: 'checkbox',
        onclick: () => {
          this.localParams.radio1 = !this.localParams.radio1;
          this.localParams.DuTime = this.localParams.DuTime || this.getTime();
          const DuTimeInput = document.querySelector('#DuTimeId');
          if (!this.localParams.radio1 && DuTimeInput) {
            this.localParams.DuTime = DuTimeInput.value;
          }
          this.Config_Box2_DuTime();
        },
      });
      input_checkbox.checked = this.localParams.radio1;
      Config_Box2_Item2_Box.appendChild(input_checkbox);
      Config_Box2_Item2.appendChild(Config_Box2_Item2_Box);
      this.DU_App_Config_Box2.appendChild(Config_Box2_Item2);
    }

    // 发送时间
    Config_Box2_DuTime(init) {
      const DUTime = document.querySelector('.Config_Box2_DuTime');
      const Config_Box2_Item3 = document.querySelector('.Config_Box2_Item3');
      if (this.localParams.radio1) {
        const Config_Box2_DuTime = this.createElement('div', {
          classname: 'Config_Box_Item Config_Box2_DuTime',
          innerHTML: `<span>${this.langauge.DuApp_sendTime}</span>`,
        });
        const Config_Box2_DuTime_div = this.createElement('div', {
          innerHTML: `
            <input class='DuTime' id='DuTimeId' value='${this.localParams.DuTime}' />
            <span>${this.iconConfig.rightIcon}</span>
          `,
        });
        const _that = this;
        setTimeout(() => {
          const opt = {
            preset: 'datetime',
            theme: 'android-holo light',
            display: 'bottom',
            mode: 'scroller',
            dateFormat: 'yy-mm-dd',
            setText: _that.langauge.DuApp_cancel,
            cancelText: _that.langauge.DuApp_determine,
            dateOrder: 'yymmd D',
            showNow: true,
            group: true,
            nowText: _that.langauge.DUApp_today,
            stepMinute: 1,
            endYear: 2060,
          };
          $('#DuTimeId').mobiscroll(opt);
        }, 100);
        Config_Box2_DuTime.appendChild(Config_Box2_DuTime_div);
        if (init) this.DU_App_Config_Box2.appendChild(Config_Box2_DuTime);
        else this.DU_App_Config_Box2.insertBefore(Config_Box2_DuTime, Config_Box2_Item3);
      } else {
        if (DUTime) {
          this.DU_App_Config_Box2.removeChild(DUTime);
        }
      }
    }

    // 分别发送
    Config_Box2_Item3() {
      const Config_Box2_Item3 = this.createElement('div', {
        classname: 'Config_Box_Item Config_Box2_Item3',
        innerHTML: `<span>${this.langauge.DuApp_separateDelivery}</span>`,
      });
      const Config_Box2_Item3_Box = this.createElement('div', {
        classname: 'DU_Switch',
      });
      const input_checkbox = this.createElement('input', {
        type: 'checkbox',
        onclick: () => {
          this.localParams.radio2 = !this.localParams.radio2;
        },
      });
      input_checkbox.checked = this.localParams.radio2;
      Config_Box2_Item3_Box.appendChild(input_checkbox);
      Config_Box2_Item3.appendChild(Config_Box2_Item3_Box);
      this.DU_App_Config_Box2.appendChild(Config_Box2_Item3);
    }

    // 描述信息
    Config_Box2_Item4() {
      const Config_Box2_Item4 = this.createElement('div', {
        classname: 'Config_Box2_Item4',
        innerHTML: `<div>${this.langauge.DuApp_promptInfo}</div>`,
      });
      this.DU_App_Config_Box2.appendChild(Config_Box2_Item4);
    }

    // 发送按钮
    Config_SendBtn() {
      const Config_SendBtn = this.createElement('div', {
        classname: 'Config_SendBtn',
        innerHTML: this.langauge.DuApp_send,
        onclick: () => {
          if (!this.options.loading) {
            // 添加loading状态
            this.options.loading = true;
            this.Loading.createLoading();

            // 判断有没有选择人员
            if (!this.localParams.userList.length) {
              this.Toast(this.langauge.DuApp_Toast_noUserIdsError);
              this.options.loading = false;
              this.Loading.closeLoading();
              return false;
            }

            // 判断DU内容是否为空
            if (!this.localParams.DuText) {
              this.Toast(this.langauge.DuApp_Toast_noDUTextError);
              this.options.loading = false;
              this.Loading.closeLoading();
              return false;
            }

            // 获取时间控件的值
            const DateTime = document.querySelector('#DuTimeId');
            if (DateTime) {
              this.localParams.DuTime = DateTime.value;
              if (new Date(this.localParams.DuTime).getTime() < new Date().getTime()) {
                this.Toast(this.langauge.DuApp_Toast_timeError);
                this.options.loading = false;
                this.Loading.closeLoading();
                return false;
              }
            }

            const { userInfo, type, params } = this.options;
            const { userList, DuText, tixingValue, radio2 } = this.localParams;

            // 人员id
            let recv_users = [];
            userList.forEach((item) => {
              recv_users.push(item.id);
            });

            // 附件信息
            let appendix = params.appendix;
            if (appendix) appendix[0].description = DuText;

            let obj = {
              user_id: userInfo.user_id,
              du_type: type,
              company_id: userInfo.companyId,
              recv_users,
              content: DuText,
              again: tixingValue,
              timing: this.localParams.radio1 ? this.localParams.DuTime || '' : '',
              read_only: Number(radio2),
              appendix: JSON.stringify(appendix),
              session: this.options.session ? `0-${userInfo.user_id}` : '', // 来自会话 0-user_id  单聊  1-group_id 群聊
              create_type: 0,
              message_id: (Math.random() * 1000000000000).toFixed(),
              is_signle_chat: 0,
              is_group_chat: 0, // 是否推送群聊du消息(目前应用DU没有群聊推送)
              create_source: 1, // 定义 前端固定 1
              relate_company_id: Number(userInfo.companyId), // 关联公司id, 临时添加, 标识该du和那个公司关联
              organize_du: params.organize_du,
            };

            // console.log(obj,'--->');

            this.request(197, obj).then((res) => {
              this.options.loading = false;
              this.Loading.closeLoading();
              if (res && res.code === 0) {
                if (this.callback) {
                  this.callback('fulfilled', obj, res);
                } else {
                  this.Toast(this.langauge.DuApp_Toast_sendSuccess);
                  this.closeHandle();
                }
              } else {
                if (this.callback) {
                  this.callback('rejected', obj, res);
                } else {
                  this.Toast(res.message || this.DuApp_Toast_requestError);
                }
              }
            });
          }
        },
      });
      return Config_SendBtn;
    }
  }

  /**
   * 工具函数 生成DOM类
   * @param {string} type
   * @param {Object} propertys
   * @returns {Element} element
   */
  DuApp.prototype.createElement = function (type, propertys) {
    const ele = document.createElement(type);
    for (let key in propertys) {
      switch (key.toLowerCase()) {
        case 'innertext':
          ele.innerText = propertys[key];
          break;
        case 'innerhtml':
          ele.innerHTML = propertys[key];
          break;
        case 'id':
          ele.id = propertys[key];
          break;
        case 'classname':
          ele.className = propertys[key];
        case 'onclick':
          ele.onclick = propertys[key];
          break;
        case 'oninput':
          ele.oninput = propertys[key];
          break;
        case 'onchange':
          ele.onchange = propertys[key];
          break;
        case 'styles':
          for (let name in propertys[key]) {
            ele.style[name] = propertys[key][name];
          }
          break;
        default:
          ele.setAttribute(key, propertys[key]);
      }
    }
    return ele;
  };

  /**
   * 封装request - python请求
   */
  DuApp.prototype.request = async function (cmd_id, params) {
    const { accessToken, deviceId, deviceType } = this.options.userInfo;
    const options = {
      method: 'post',
      body: JSON.stringify({
        version: '2',
        cmd_id,
        token: accessToken,
        data: JSON.stringify({
          local_msgid: 'C' + (Math.random() * 1000000000000).toFixed(),
          timestamp: new Date().getTime(),
          device_id: deviceId,
          device_type: deviceType,
          data: params,
        }),
      }),
    };
    const url = `${
      this.options.env === 'prod' ? 'https://webim.6du.cn' : 'https://webim-beta.6du.cn'
    }/api/v1/messages`;
    return fetch(url, options)
      .then(
        (res) => {
          return res.json();
        },
        (err) => {
          console.log('err', err);
        },
      )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  /**
   * 获取当前时间格式
   */
  DuApp.prototype.getTime = function () {
    const time = new Date();
    const year = time.getFullYear();
    const month = this.setTimeFormat(time.getMonth() + 1);
    const day = this.setTimeFormat(time.getDate());
    const hour = this.setTimeFormat(time.getHours());
    const minutes = this.setTimeFormat(time.getMinutes());
    const second = this.setTimeFormat(time.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`;
  };

  /**
   * 补充时间格式 例2023-01-01 01:01:01
   * @param {string} value
   */
  DuApp.prototype.setTimeFormat = function (value) {
    return value < 10 ? `0${value}` : value;
  };

  /**
   * 自定义Loading效果
   */
  DuApp.prototype.Loading = {
    createLoading: () => {
      const LoadingElement = DuApp.prototype.createElement('div', {
        classname: 'Du_App_Loading',
        innerHTML: `
          <span class='loading-dot'>
            <i class='loading-dot-item'></i>
            <i class='loading-dot-item'></i>
            <i class='loading-dot-item'></i>
            <i class='loading-dot-item'></i>
          </span>
        `,
      });
      document.body.appendChild(LoadingElement);
    },
    closeLoading: function () {
      const loading = document.querySelector('.Du_App_Loading');
      if (loading) {
        document.body.removeChild(loading);
      }
    },
  };

  /**
   * Dialog 自定义弹框
   * @param {object} object 自定义Dialog配置项
   */
  DuApp.prototype.Dialog = function (object) {
    const { title, onOk, cancelText, okText } = object;
    const Dialog_Element_Shadow = this.createElement('div', {
      classname: 'Du_App_Dialog_shadow',
    });
    const Dialog_Element = this.createElement('div', {
      classname: 'Dialog_Element',
      innerHTML: `
        <p class="Dialog_Element_title">${title}</p>
      `,
    });
    const Dialog_Element_Footer = this.createElement('div', {
      classname: 'Dialog_Element_Footer',
    });
    const Dialog_Element_Footer_cancel = this.createElement('span', {
      innerHTML: cancelText,
      classname: 'Dialog_Element_Footer_cancel',
      onclick: () => {
        document.body.removeChild(Dialog_Element_Shadow);
      },
    });
    const Dialog_Element_Footer_ok = this.createElement('span', {
      innerHTML: okText,
      classname: 'Dialog_Element_Footer_ok',
      onclick: () => {
        document.body.removeChild(Dialog_Element_Shadow);
        if (onOk) onOk();
      },
    });
    Dialog_Element_Footer.appendChild(Dialog_Element_Footer_cancel);
    Dialog_Element_Footer.appendChild(Dialog_Element_Footer_ok);
    Dialog_Element.appendChild(Dialog_Element_Footer);
    Dialog_Element_Shadow.appendChild(Dialog_Element);
    document.body.appendChild(Dialog_Element_Shadow);
  };

  /**
   * Toast 自定义轻提示
   * @param {string} describe
   */
  DuApp.prototype.Toast = function (describe) {
    const Toast_Element_shadow = this.createElement('div', {
      classname: 'Du_App_Toast_shadow',
    });
    const Toast_Element = this.createElement('div', {
      classname: 'Du_App_Toast',
      innerHTML: `
        <span class='describe'>${describe}</span>
      `,
    });
    Toast_Element_shadow.appendChild(Toast_Element);
    document.body.appendChild(Toast_Element_shadow);
    const timeout = setTimeout(() => {
      document.body.removeChild(Toast_Element_shadow);
      clearTimeout(timeout);
    }, 3000);
  };

  /**
   * Popup 自定义弹出层
   * @param {any} children
   */
  DuApp.prototype.Popup = function (children) {
    const Popup_Element_shadow = this.createElement('div', {
      classname: 'Du_App_Popup_shadow',
      onclick: () => {
        document.body.removeChild(Popup_Element_shadow);
      },
    });
    this.Popup_Element_shadow = Popup_Element_shadow;
    const Popup_Element = this.createElement('div', {
      classname: 'Du_App_Popup',
      onclick: (e) => {
        e.stopPropagation();
      },
    });
    if (children) Popup_Element.appendChild(children);
    Popup_Element_shadow.appendChild(Popup_Element);
    document.body.appendChild(Popup_Element_shadow);
  };

  /**
   * 链式加载的方式，是保证页面给执行的时候，相关依赖已经加载执行完毕
   */
  // 加载jquery
  const JQuery = DuApp.prototype.createElement('script', {
    type: 'text/javascript',
    src: `http://www.wtz-lmm.cn/publicShareCDN/_DU/app/cdn/jquery-1.10.1.min.js`,
  });
  document.head.appendChild(JQuery);
  JQuery.onload = () => {
    // 加载DatePickerView组件 cdn
    const mobiscrollJS = DuApp.prototype.createElement('script', {
      type: 'text/javascript',
      src: `http://www.wtz-lmm.cn/publicShareCDN/_DU/app/cdn/mobiscroll.js`,
    });
    document.head.appendChild(mobiscrollJS);
    mobiscrollJS.onload = () => {
      const DUApp = new DuApp();
      // 兼容处理 全局挂载
      if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = DUApp;
      } else {
        window.DU_msg_app = DUApp;
      }
    };
  };

  /**
   * pickerView 自定义组件
   */
  var util = {
    extend: function (target) {
      for (var i = 1, len = arguments.length; i < len; i++) {
        for (var prop in arguments[i]) {
          if (arguments[i].hasOwnProperty(prop)) {
            target[prop] = arguments[i][prop];
          }
        }
      }
      return target;
    },
    indexOf: function (array, item) {
      var result = -1;
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === item) {
          result = i;
          break;
        }
      }
      return result;
    },
    css: function (elem, obj) {
      for (var i in obj) {
        elem.style[i] = obj[i];
      }
    },
    addClass: function (element, className) {
      var classNames = element.className.split(/\s+/);
      if (util.indexOf(classNames, className) == -1) {
        classNames.push(className);
      }
      element.className = classNames.join(' ');
    },
    removeClass: function (element, className) {
      var classNames = element.className.split(/\s+/);
      var index = util.indexOf(classNames, className);
      if (index !== -1) {
        classNames.splice(index, 1);
      }
      element.className = classNames.join(' ');
    },
    hasClass: function (element, className) {
      if (!element || !element.className) return false;
      var classNames = element.className.split(/\s+/);
      return util.indexOf(classNames, className) != -1;
    },
    parents: function (elem, pClass) {
      // 递归函数通过父亲的classname获取元素
      if (!elem) return null;
      var parent = elem.parentNode;
      if (parent === document) return null;
      if (!this.hasClass(parent, pClass)) parent = this.parents(parent, pClass);
      return parent;
    },
    isObj: function (o) {
      return Object.prototype.toString.call(o) == '[object Object]';
    },
    isArray: function (o) {
      return Object.prototype.toString.call(o) == '[object Array]';
    },
  };

  function PickerView(opt) {
    var _this = this;

    this.Opt = {
      title: '标题',
      leftText: '取消',
      rightText: '确定',
      saveFn: function (selectArr) {},
    };

    // 同步参数
    for (var i in opt) {
      if (opt[i]) this.Opt[i] = opt[i];
    }

    this._y_start = '';
    this._y_move = '';
    this._y_end = '';
    this.top_start = 0; // 移动起始点
    this.isMove = false; // 是否是移动聊天框

    this.elem_wrap = null; // 最外层的容器
    this.elem_leftBtn = null; // 左按钮元素
    this.elem_rightBtn = null; // 右按钮元素
    this.elem_contents = null; // items容器
    this.elem_mask = null; // 黑色背景

    this.selectcache = this.Opt.index;
    this.selectArr = []; // 选项对应的元素序列号 如：[0,0,0]

    this.init();
  }

  PickerView.defaultOpt = {
    headerHeight: 45, // 头部默认高度
    itemHeight: 48, // 每个item的默认高度
  };

  PickerView.prototype = {
    constructor: PickerView,
    getItemTpl: function (keys) {
      var item_html = '';
      for (var i = 0; i < keys.length; i++) {
        item_html += '<div class="pickerView-item">' + keys[i] + '</div>';
      }
      return item_html;
    },
    getItemsTpl: function (keys) {
      var fieldIndex = this.selectcache ? this.selectcache : 0;
      this.selectArr.push(fieldIndex);
      var html = '',
        len = -fieldIndex * PickerView.defaultOpt.itemHeight,
        item_html = this.getItemTpl(keys);

      html +=
        '<div index="' +
        (this.selectArr.length - 1) +
        '" class="pickerView-box-content">' +
        '<div style="background-size:100% ' +
        this.padding +
        'px;" class="pickerView-box-content-mask"></div>' +
        '<div style="top:' +
        this.padding +
        'px;" class="pickerView-box-content-indicator"></div>' +
        '<div style="padding:' +
        this.padding +
        'px 0;transform:translate3d(0,' +
        len +
        'px,0)" fieldIndex="0" class="pickerView-items">' +
        item_html +
        '</div>' +
        '</div>';

      return html;
    },
    renderItems: function (obj) {
      var _this = this,
        html = '',
        arr = obj,
        isObj = util.isObj(obj);

      if (isObj) arr = Object.keys(obj);
      html += this.getItemsTpl(arr);
      var fieldIndex = this.selectArr[this.selectArr.length - 1];
      if (isObj) html += this.renderItems(obj[arr[fieldIndex]]);

      return html;
    },
    getTpl: function () {
      var html =
        '<div class="pickerView-mask"></div><div class="pickerView-box">' +
        '<div class="pickerView-box-header">' +
        '<div class="pickerView-box-header-left pickerView-box-header-btn">' +
        this.Opt.leftText +
        '</div>' +
        '<div class="pickerView-box-header-title">' +
        this.Opt.title +
        '</div>' +
        '<div class="pickerView-box-header-right pickerView-box-header-btn">' +
        this.Opt.rightText +
        '</div>' +
        '</div>' +
        '<div class="pickerView-box-content-wrap">';

      html += this.renderItems(this.Opt.data);
      html += '</div></div>';

      return html;
    },
    init: function () {
      var _this = this,
        body = document.getElementsByTagName('body')[0],
        div = document.createElement('div');

      div.className = 'Du_App_pickerView-wrap';
      this.elem_wrap = div;
      this.padding =
        (document.documentElement.clientHeight * 0.4 -
          PickerView.defaultOpt.headerHeight -
          PickerView.defaultOpt.itemHeight) /
        2;
      div.innerHTML = this.getTpl();
      body.appendChild(div);

      this.elem_mask = this.elem_wrap.getElementsByClassName('pickerView-mask')[0];
      this.elem_contents = this.elem_wrap.getElementsByClassName('pickerView-box-content-wrap')[0];
      this.elem_leftBtn = this.elem_wrap.getElementsByClassName('pickerView-box-header-left')[0];
      this.elem_rightBtn = this.elem_wrap.getElementsByClassName('pickerView-box-header-right')[0];

      this.elem_contents.addEventListener(
        'touchstart',
        function (e) {
          _this.moveObj = util.parents(e.target, 'pickerView-box-content').children[2];
          _this.touchstart(e);
          e.stopPropagation();
        },
        false,
      );
      this.elem_contents.addEventListener(
        'touchmove',
        function (e) {
          _this.touchmove(e);
          e.stopPropagation();
          e.preventDefault();
        },
        false,
      );
      this.elem_contents.addEventListener(
        'touchend',
        function (e) {
          _this.touchend(e);
          e.stopPropagation();
        },
        false,
      );
      this.elem_mask.addEventListener(
        'touchend',
        function (e) {
          _this.closeComponent();
          e.stopPropagation();
          e.preventDefault();
        },
        false,
      );
      this.elem_leftBtn.addEventListener(
        'touchend',
        function (e) {
          _this.closeComponent();
          e.stopPropagation();
          e.preventDefault();
        },
        false,
      );
      this.elem_rightBtn.addEventListener(
        'touchend',
        function (e) {
          var selectArr = [];
          for (var i = 0; i < _this.elem_contents.children.length; i++) {
            var items = _this.elem_contents.children[i].children[2],
              field = items.children.length > 0 ? items.children[_this.selectArr[i]].innerText : '';

            selectArr.push(field);
          }
          _this.Opt.rightFn(selectArr);
          _this.closeComponent();
          e.stopPropagation();
          e.preventDefault();
        },
        false,
      );
    },
    touchstart: function (e) {
      this._y_start = e.touches[0].pageY;
      this.isMove = false;
      this.top_start = parseInt(this.moveObj.style.transform.split(',')[1]);
    },
    touchmove: function (e) {
      var _this = this;
      this.isMove = true;
      this._y_move = e.touches[0].pageY;
      var len = parseFloat(this._y_move) - parseFloat(this._y_start) + parseFloat(this.top_start);
      util.css(_this.moveObj, {
        transform: 'translate3d(0,' + len + 'px,0)',
      });
      this.top_end = len;
    },
    touchend: function (e) {
      if (!this.isMove) return;
      this.isMove = false;

      var _this = this,
        itemHeight = PickerView.defaultOpt.itemHeight,
        sign = this.top_end >= 0 ? 1 : -1,
        index = this.moveObj.parentNode.getAttribute('index'),
        fieldIndex = Math.round(Math.abs(this.top_end) / itemHeight),
        len = sign * (fieldIndex * itemHeight);

      if (len > 0) {
        len = 0;
        fieldIndex = 0;
      } else if (len < -(this.moveObj.children.length - 1) * itemHeight) {
        len = -(this.moveObj.children.length - 1) * itemHeight;
        fieldIndex = this.moveObj.children.length - 1;
      }

      this.selectArr[index] = fieldIndex;
      this.moveObj.setAttribute('fieldIndex', fieldIndex);

      this.moveObj.style.transition = '0.3s cubic-bezier(0,0,0.2,1.15)';
      util.css(_this.moveObj, {
        transform: 'translate3d(0,' + len + 'px,0)',
      });
      _this.changeNext(index);
      _this.moveObj.addEventListener(
        'transitionend',
        function (event) {
          _this.moveObj.style.transition = '';
        },
        false,
      );
      _this.moveObj.addEventListener(
        'webkitTransitionEnd',
        function (event) {
          _this.moveObj.style.transition = '';
        },
        false,
      );
    },
    changeNext: function (index) {
      var data = this.Opt.data,
        arr = [];

      for (var i = 0; i < this.selectArr.length; i++) {
        var elem_items = this.elem_contents.children[i].children[2];

        if (i > index) {
          util.css(elem_items, {
            transform: 'translate3d(0,0,0)',
          });
          this.selectArr[i] = 0;
          arr = util.isObj(data) ? Object.keys(data) : data;
          elem_items.innerHTML = this.getItemTpl(arr);
          var field = arr[0];
          data = data[field];
        } else {
          var field = elem_items.children[this.selectArr[i]].innerText;
          data = data[field];
        }
      }
    },
    closeComponent: function () {
      var body = document.getElementsByTagName('body')[0];
      body.removeChild(this.elem_wrap);
    },
  };

  window.DUApp_PickerView = PickerView;
})();
