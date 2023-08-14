## **新建DU弹框配置  移动端**
***

###  **引用cdn资源**
```
<script src="http://www.wtz-lmm.cn/publicShareCDN/_DU/app/du.js"></script>

// 如果在ejs模板中使用，建议使用以下链接，帮助处理缓存问题
<script src="<%= 'http://www.wtz-lmm.cn/publicShareCDN/_DU/app/du.js?time=' + new Date() %>"></script>
```

###  **配置信息**参考
```
const options = {
  type: 0,  
  theme: 1,          
  langauge: 'zh-CN',      
  title: '新建DUDUDUDU',      
  env: 'beta',                     
  source: 'salarySheet',  
  userControl: false,   
  changeDUType: false,   
  session: false, 
  showHeader: false,
  params: {
    userList: [ 
      { id: 202429, name: "李春阳" },  
      { id: 202444, name: "魏廷州" }  
    ],         
    organize_du: 0,  
    iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg',       
    form_title: '请假请假',              
    DuText: '请假请假，我的请假信息', 
    regularTimeRadio: true,                           
    DuTime: '2020-10-10 10:10:10',             
    separateRadio: true,                      
    appendix:[
      {
        file_type: 'web',
        iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg',
        iconType: 4,
        title: '请假请假',
      },
    ]
  },
  userInfo: {
      accessToken: '77a7e71f6abbaca55f562fc35ef8af9b',
      companyId: '1450',
      companyName: "集团1",
      userId: '2487bdaf0370de990d34b38d3d9fde13',
      user_id: '202444',
      deviceId: '1129cebd1077a83ae1e91110fece07e0',
      deviceType: 'PC',
  },
  // 组织架构人员弹框参数配置，参考多组织联系人说明文档
  contactRelate: {
    theme: 1,
    isMuliteOrg: 1,
    title: '添加人员',
    type: 'user',
    viewId: 'contactBox',
    env: 'beta',
    minLength: 1,
    proxy: false,
    isCheckCompany: false,
    showChild: false,
    needChildDept: true,
    multiple: 2,
    showConfig: {
      showMyFriend: false,
      showMyGroup: false,
      showRelation: true,
      showSession: false,
    },
    userInfo: {
      accessToken: '77a7e71f6abbaca55f562fc35ef8af9b',
      companyId: '1450',
      companyName: "集团1",
      userId: '2487bdaf0370de990d34b38d3d9fde13',
      user_id: '202444',
      deviceId: '1129cebd1077a83ae1e91110fece07e0',
      deviceType: 'PC',
    }
  }
}
```

###  **使用**
```
弹框初始化配置
^ 参数一：弹框参数配置
^ 参数二：callback(status, params, data)
            status为接口状态[fulfilled成功 | rejected失败]
            params 接口参数
            data 接口返回结果 
^ 参数三：返回 操作时的回调函数

window.DU_msg_app.init(
  options, 
  (status, params, data)=>{
    /* 发送操作的callback函数，
      status为接口状态[fulfilled成功 | rejected失败]
      params 接口参数
      data 接口返回结果 
    */
    console.log(status, params, data);
    if(status === 'fulfilled'){
      window.DU_msg.Message.success('发送成功');
      window.DU_msg.closeHandle();  // 关闭弹框方法
    } else if(status === 'rejected'){
      window.DU_msg.Message.error(data.message || '接口错误错误嘞')
    }
  }, 
  ()=>{
    console.log('closeCallback')
  }
);


关闭当前新建DU弹窗
window.DU_msg_app.closeHandle();


弹出是否关闭当前新建DU弹窗的Dialog    点击放弃后，执行关闭当前新建DU弹窗，并执行传入的callback函数
window.DU_msg_app.closeHandleDialog(callback);


切换主题模式  [theme值参考options配置theme值]
window.DU_msg_app.changeTheme(theme);


切换语言环境  [lang值参考options配置langauge值]  **功能暂未开放**
window.DU_msg_app.changeLangauge(lang);
```



###  **options配置文档说明**

是否必填项，*表示必填

| Name | Description | 数据类型 | 配置 | 是否必填 |
| ------- | --------- | --------- | ---- | ---- |
| type | DU的类型 | *number* | 0 应用内DU <br/>1 短信DU <br/>2 电话DU (暂未开放) | <code>*</code> |
| theme | 主题模式 | *number* | 0 浅色模式 1 黑暗模式 | <code>*</code> |
| langauge | 语言环境 | *string* | zh-CN 中文 <br/>en-US 英文 <br/>ja-JP 日文 | <code>*</code> |
| title | DU弹窗名称 | *string* |  | - |
| env | 环境变量 | *string* | prod 正式接口 <br/>beta 测试接口 | <code>*</code> |
| source | 来源 | *string* | 例 'salarySheet' | <code>-</code> |
| userControl | 人员选择限制，不允许选择传入人员之外的人 | *boolean* | | <code>-</code> |
| changeDUType | 是否可以切换DU的类型 | *boolean* | | <code>-</code> |
| session | 发送DU的时候，是否需要展示会话来源 | *boolean* | | <code>-</code> |
| showHeader | 是否展示默认的header头部内容 | boolean | 默认为true | <code>-</code> |
| params | 页面参数配置 | | <a style="color: #3591f4">*paramsOptions*</a> | <code>*</code> |
| userInfo | 用户信息 |  | <a style="color: #3591f4">*userInfoOptions*</a> | <code>*</code> |
| contactRelate | 请查看多组织联系人说明文档 | any |  | <code>*</code> |



#### **paramsOptions参数配置信息**

| Name | Description | 数据类型 | 配置 | 是否必填 |
| ------- | --------- | --------- | ---- | ---- |
| userList | DU人员列表 | *Array<{id: number, name: string}>* |                                                              | <code>*</code> |
| organize_du | 组织DU类型 | *numer* | 0 普通DU <br/>1 组织DU | <code>*</code> |
| iconUrl | 执行DU的事由对应app的icon | *string* |  | <code>*</code> |
| form_title | 执行DU的事由的名称 | *string* |  | <code>*</code> |
| DuText | 来源app的DU事件描述 | *string* |  | <code>*</code> |
| again | 重复提醒 | *numer* | 0 不再次提醒<br/>5 5分钟后提醒<br/>10 10分钟后提醒<br/>15 15分钟后提醒 | <code>-</code> |
| regularTimeRadio | 定时DU，radio | *boolean* |  | <code>-</code> |
| DuTime | 定时DU - 时间 | *YYYY-MM-DD hh:mm:ss* |  | <code>-</code> |
| separateRadio | 分别发送DU，radio | *boolean* |  | <code>-</code> |
| appendix | 附件信息[不同来源所需的附件信息不同，各项目自行配置]<br/>*具体附件信息配置详情参考**liuduMobile**项目**AflowAddDu.js**文件* | *Array\<any>*                       |                                                              | <code>-</code> |
```
appendix例：
[{
  file_type: 'web',
  iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg',
  iconType: 4,
  title: '请假请假',
}]
***
iconType类型： 1 审批、 2 公告、 3 日程、 4 智能工资条、 5 打卡、 6 人脸录入、 7 日志、 8 填写日志、 9 智能人事、 10 智能填表、 11 考勤、 12 [暂不清楚后期补充]、 13 跳转合同应用
```



####  **userInfoOptions参数配置信息**

| Name | Description | 数据类型 | 配置 | 是否必填 |
| ------- | --------- | --------- | ---- | ---- |
| accessToken | token信息 | *string* |  | <code>*</code> |
| companyId | 公司id | *string* |  | <code>*</code> |
| companyName | 公司名 | *string* |  | <code>*</code> |
| userId | 加密的用户id | *string* |  | <code>*</code> |
| user_id | 未加密的用户id | *string* |  | <code>*</code> |
| deviceId | deviceId | *string* |  | <code>*</code> |
| deviceType | 环境 | *string* | PC / ANDRIOD / IOS  | <code>*</code> |

