(function(){
  class Du{
    constructor(){
      this.options = {
        type: 0,  // 0 应用内DU   1 短信DU    2 电话DU （暂未开放） 
        theme: 0,  // !1 浅色模式   1 黑暗模式
        langauge: 'zh-CN',   // 语言环境   zh-CN 中文   en-US 英文   ja-JP 日文
        title: '',   // DU弹框名称，不添加默认名称，使用langaugeObj中默认的参数
        env: 'beta',   // prod 正式接口   beta 测试接口
        source: '',    // 来源，使用当前DU的应用   例 salarySheet  [工资条]
        userControl: false,  // 人员选择限制，不允许选择传入人员之外的人   例 salarySheet  [工资条]
        changeDUType: false,   // 是否可以切换DU的类型
        session: false,   // 发送DU的时候，是否需要展示会话来源
        contactRelate: {},   // 组织架构弹框需要的配置
        loading: false,  // loading状态，防止用户重复发送及发送过程中修改弹框内的数据
        // 接口所需的参数信息
        params: {
          userList: [],   // 用户列表  对象中需要id、name
          organize_du: 0,   // 0 普通DU   1 组织DU
          iconUrl: '',      // 来源app的icon
          form_title: '',   // 来源app的DU事件名称
          DuText: '',   // 来源app的DU事件描述
          again: 0,      // 重复提醒 number类型 0 不再次提醒   5 5分钟后提醒   10 10分钟后提醒   15 15分钟后提醒
          regularTimeRadio: false,  // 定时DU，radio
          DuTime: undefined,   // 定时DU - 时间 
          separateRadio: false,  // 分别发送DU，radio
          appendix: undefined,   // 附件信息
        }
      };
      this.localParams= {
        userList: [],   // 修改后的用户信息， 有部分业务要求，控制所选人是否是用户列表内的人员
        DuText: '',
        tixingTitle: '',
        tixingValue: 0,
        radio1: false,
        DuTime: undefined,
        radio2: false,
        radio3: false,
        // 短信DU的组织短信信息
        department: {
          title: '',
          personNum: 0,
          departmentNum: 0
        }
      };
      this.callback = (status, params, data) => {};   // 发送操作的回调函数  status 发送接口调用状态[fulfilled成功 | rejected失败], params 调用api时的参数, data 接口返回数据
      this.closeCallback = () => {};   // 取消/× 操作的回调函数
      this.iconConfig = {
        closeIcon: '<svg width="14px" height="14px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
            + '<path d="M19.7096858,4.29031422 C20.0691224,4.64975087 20.0947965,5.21656102 19.7867079,5.60562246 L19.7096858,5.69207527 L13.402,12 L19.7096858,18.3079247 C20.0967714,18.6950104 20.0967714,19.3226002 19.7096858,19.7096858 C19.3502491,20.0691224 18.783439,20.0947965 18.3943775,19.7867079 L18.3079247,19.7096858 L12,13.402 L5.69207527,19.7096858 C5.30498964,20.0967714 4.67739984,20.0967714 4.29031422,19.7096858 C3.93087757,19.3502491 3.90520352,18.783439 4.21329208,18.3943775 L4.29031422,18.3079247 L10.598,12 L4.29031422,5.69207527 C3.90322859,5.30498964 3.90322859,4.67739984 4.29031422,4.29031422 C4.64975087,3.93087757 5.21656102,3.90520352 5.60562246,4.21329208 L5.69207527,4.29031422 L12,10.598 L18.3079247,4.29031422 C18.6950104,3.90322859 19.3226002,3.90322859 19.7096858,4.29031422 Z" ></path>'
            + '</svg>',
        duanxinyaoqingIcon: '<svg width="16px" height="16px" t="1688025188960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28914" id="mx_n_1688025188961" width="200" height="200"><path d="M512 0c278.755556 0 512 199.111111 512 455.111111s-233.244444 455.111111-512 455.111111c-22.755556 0-45.511111 0-73.955556-5.688889h-5.688888l-193.422223 113.777778c-11.377778 5.688889-22.755556 5.688889-34.133333 0-11.377778-5.688889-22.755556-17.066667-28.444444-28.444444V796.444444l-5.688889-5.688888C68.266667 705.422222 5.688889 591.644444 0 472.177778V455.111111c0-256 233.244444-455.111111 512-455.111111z m0 85.333333C278.755556 85.333333 85.333333 250.311111 85.333333 455.111111c0 113.777778 56.888889 216.177778 159.288889 284.444445 11.377778 5.688889 17.066667 22.755556 17.066667 34.133333v130.844444L398.222222 819.2c5.688889-5.688889 17.066667-5.688889 22.755556-5.688889h5.688889c28.444444 5.688889 51.2 5.688889 79.644444 5.688889 233.244444 0 426.666667-164.977778 426.666667-364.088889S745.244444 85.333333 512 85.333333z m233.244444 307.2c22.755556 0 39.822222 11.377778 51.2 28.444445s11.377778 39.822222 0 56.888889c-11.377778 22.755556-28.444444 34.133333-51.2 34.133333-34.133333 0-56.888889-28.444444-56.888888-56.888889s22.755556-62.577778 56.888888-62.577778z m-466.488888 0c34.133333 0 56.888889 28.444444 56.888888 56.888889s-28.444444 56.888889-56.888888 56.888889-56.888889-28.444444-56.888889-56.888889 22.755556-56.888889 56.888889-56.888889z m233.244444 0c34.133333 0 56.888889 28.444444 56.888889 56.888889S546.133333 512 512 512s-56.888889-28.444444-56.888889-56.888889 22.755556-62.577778 56.888889-62.577778z" p-id="28915"></path></svg>',
        youxiangIcon: '<svg width="16px" height="16px" t="1688025652638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29156" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M906.666667 170.666667a32 32 0 0 1 31.744 27.648L938.666667 202.666667v618.24a32 32 0 0 1-27.648 31.701333l-4.352 0.256H117.333333a32 32 0 0 1-31.701333-27.648L85.333333 820.906667V202.666667a32 32 0 0 1 27.648-31.701334L117.333333 170.666667h789.333334zM149.333333 269.312L149.333333 788.864h725.333334l-0.042667-499.285333-343.893333 248.362666a32 32 0 0 1-34.56 1.877334l-3.84-2.56-343.04-267.946667z m692.096-34.688H208.896l303.872 237.354667 328.618667-237.354667z" p-id="29157"></path></svg>',
        dianhuaIcon: '<svg width="16px" height="16px" t="1688025697962" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29298" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M221.980444 124.302222l-10.979555 7.964445-5.290667 4.608a59.392 59.392 0 0 0-4.380444 4.721777l-2.104889 2.730667-59.960889 60.074667c-80.213333 80.156444-24.974222 233.244444 120.718222 400.839111l21.447111 24.064c11.036444 12.060444 22.471111 24.177778 34.360889 36.352l24.860445 24.803555c188.871111 184.32 367.331556 263.224889 457.386666 176.64l65.991111-65.991111c49.607111-47.217778 51.427556-127.203556 3.413334-177.664l-8.135111-8.192-3.413334-3.128889-99.441777-79.075555-7.452445-5.290667a127.260444 127.260444 0 0 0-160.824889 17.92l-8.533333 8.476445-12.117333-8.760889A513.649778 513.649778 0 0 1 462.506667 440.376889l-10.24-14.279111 9.671111-11.036445-2.048 2.275556c45.738667-44.373333 51.313778-115.370667 14.222222-166.172445l-79.473778-100.124444a128.910222 128.910222 0 0 0-172.714666-26.737778z m24.462223 63.374222l3.754666-4.835555 4.437334-3.299556a64.739556 64.739556 0 0 1 89.998222 11.377778l74.467555 93.639111c20.423111 24.234667 20.252444 58.424889 1.024 81.692445l-5.973333 6.428444-25.998222 29.240889a31.971556 31.971556 0 0 0-3.185778 38.229333l2.275556 3.640889a578.048 578.048 0 0 0 160.483555 166.115556l18.944 12.515555c12.686222 7.964444 29.184 6.144 39.708445-4.437333l27.363555-27.420444a63.203556 63.203556 0 0 1 83.399111-7.054223l97.450667 77.482667 6.997333 7.111111a62.008889 62.008889 0 0 1-2.275555 87.153778L753.208889 821.475556c-52.906667 50.858667-202.126222-15.075556-367.616-176.583112l-12.515556-12.401777c-51.825778-51.768889-94.549333-102.286222-127.374222-149.048889l-14.449778-21.219556C167.025778 364.088889 149.048889 285.127111 184.547556 249.628444l61.895111-61.952z" p-id="29299"></path></svg>',
        canyurenIcon: '<svg width="20px" height="20px" t="1688025722338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29440" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 85.333333a213.333333 213.333333 0 0 1 103.424 399.957334A341.418667 341.418667 0 0 1 853.333333 810.666667v85.333333H170.666667v-85.333333c0-152.490667 99.968-281.6 237.952-325.376A213.333333 213.333333 0 0 1 512 85.333333z m0 448a277.333333 277.333333 0 0 0-277.162667 267.392L234.666667 810.666667v21.333333h554.666666V810.666667a277.333333 277.333333 0 0 0-267.392-277.162667L512 533.333333z m-106.666667 160a32 32 0 0 1 4.352 63.701334l-4.352 0.298666h-42.666666a32 32 0 0 1-4.352-63.701333l4.352-0.298667h42.666666zM512 149.333333a149.333333 149.333333 0 1 0 0 298.666667 149.333333 149.333333 0 0 0 0-298.666667z" p-id="29441"></path></svg>',
        addIcon: '<svg width="12px" height="12px" t="1688025872901" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30292" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 832a32 32 0 0 0 32-32V544h256a32 32 0 0 0 0-64H544V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32" p-id="30293"></path></svg>',
        tabberShenZhiIcon: `<svg width="20px" height="20px" t="1688025841233" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30149" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M369.792 88.277333c12.16-4.181333 28.416-6.272 44.672 10.453334 28.458667 29.226667 60.970667 45.952 95.488 45.952 38.613333 0 73.173333-14.634667 95.488-43.861334 14.250667-14.634667 30.506667-18.773333 44.714667-12.544a379.562667 379.562667 0 0 1 138.154666 85.674667c14.250667 12.544 18.304 31.317333 12.202667 45.952-12.202667 35.541333-6.101333 75.221333 12.202667 106.581333 18.773333 32.768 42.666667 53.077333 75.008 62.592l8.277333 2.133334h2.048c18.261333 4.224 28.416 18.816 30.464 35.541333 6.101333 27.178667 8.106667 56.405333 10.154667 85.674667 0 22.613333-1.408 45.269333-5.418667 70.314666l-2.688 15.36v2.090667c-6.101333 14.634667-14.250667 25.045333-26.453333 31.317333-2.005333 2.133333-2.005333 2.133333-4.053334 2.133334-36.565333 10.410667-67.029333 33.408-83.285333 62.634666-18.304 33.450667-22.357333 71.04-12.202667 110.762667 6.101333 16.725333 0 37.589333-14.208 45.952-38.613333 33.450667-83.328 60.586667-136.106666 83.584C650.112 938.666667 644.010667 938.666667 640 938.666667c-8.704 0-17.408-4.608-24.832-11.178667l-3.626667-3.413333c-28.416-29.269333-60.928-45.994667-95.488-45.994667-38.613333 0-73.130667 16.725333-95.488 43.861333a46.933333 46.933333 0 0 1-28.032 14.378667l-4.48 0.256h-6.101333c-4.053333 0-6.058667-2.090667-8.106667-2.090667a371.413333 371.413333 0 0 1-140.202666-85.674666c-14.208-12.544-18.261333-31.317333-12.202667-45.952 12.202667-35.541333 6.101333-75.221333-12.16-106.581334-18.773333-32.768-42.709333-53.077333-75.050667-62.592l-8.277333-2.133333h-2.005333c-18.304-4.224-28.458667-18.816-30.506667-35.541333C87.381333 570.88 85.333333 539.605333 85.333333 512.426667c0-22.613333 1.408-45.269333 5.418667-70.314667l2.688-15.36v-2.090667c6.101333-14.634667 14.250667-25.045333 26.453333-31.317333 2.005333-2.133333 2.005333-2.133333 4.053334-2.133333 36.565333-10.410667 67.029333-33.408 83.285333-62.634667 18.304-33.450667 22.357333-71.04 12.202667-110.762667a40.192 40.192 0 0 1 10.197333-42.581333l4.010667-3.413333c38.613333-33.408 83.328-60.586667 136.106666-83.541334z m9.856 65.749334l-14.890667 7.253333c-29.312 14.805333-55.04 31.146667-77.952 49.578667l-2.816 2.304 2.005334 10.794666A209.664 209.664 0 0 1 268.202667 349.866667l-5.034667 9.728c-21.504 38.698667-57.813333 69.077333-101.162667 86.186666l-7.424 2.730667-0.896 5.290667a361.898667 361.898667 0 0 0-4.096 43.562666l-0.256 15.018667c0 19.072 1.109333 37.162667 3.242667 52.138667l1.365333 8.277333 7.338667 2.304c40.661333 14.122667 72.96 40.746667 97.365333 79.061333l5.888 9.813334c24.618667 42.154667 33.28 92.544 22.058667 142.208l-0.938667 3.584 3.754667 3.413333c26.368 23.338667 56.533333 41.813333 90.453333 55.253333l2.176 0.810667 3.072-3.114667a187.306667 187.306667 0 0 1 120.32-51.797333l10.666667-0.298667c45.44 0 87.893333 17.834667 124.757333 49.664l6.272 5.674667 12.117334-5.845333c29.312-14.805333 55.04-31.146667 77.952-49.578667l2.773333-2.346667-1.962667-10.752a209.664 209.664 0 0 1 17.792-125.952l5.034667-9.728c21.504-38.698667 57.813333-69.077333 101.162667-86.186666l7.381333-2.773334 0.938667-5.248c2.261333-14.677333 3.584-28.8 4.096-43.562666l0.213333-12.928-1.792-24.064a504.32 504.32 0 0 0-3.285333-30.805334l-1.621334-9.770666-7.253333-2.261334c-40.661333-14.122667-72.96-40.746667-97.322667-79.061333l-5.930666-9.813333a195.584 195.584 0 0 1-22.058667-142.208l0.896-3.626667-3.584-3.328a313.813333 313.813333 0 0 0-75.52-49.365333l-13.44-5.888-0.298667 0.426666c-31.872 32.981333-75.306667 51.370667-123.136 53.674667l-10.325333 0.256c-45.44 0-87.893333-17.834667-124.757333-49.664l-5.546667-4.992z" p-id="30150"></path><path d="M509.952 364.074667c79.274667 0 142.250667 64.768 142.250667 146.261333s-62.976 146.261333-142.250667 146.261333c-79.232 0-142.208-64.768-142.208-146.261333s62.976-146.261333 142.208-146.261333z m0 64c-43.477333 0-78.208 35.712-78.208 82.261333 0 46.506667 34.730667 82.261333 78.208 82.261333 43.52 0 78.250667-35.712 78.250667-82.261333 0-46.506667-34.730667-82.261333-78.250667-82.261333z" p-id="30151"></path></svg>`,
        tixingIcon: '<svg width="20px" height="20px" t="1688025804300" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30007" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M600.32 790.741333c15.957333 0 29.013333 12.8 29.269333 28.757334a118.229333 118.229333 0 0 1-118.528 117.717333 118.229333 118.229333 0 0 1-118.442666-117.76 29.269333 29.269333 0 0 1 58.496 0 59.989333 59.989333 0 0 0 119.936 0 29.269333 29.269333 0 0 1 29.269333-28.714667zM509.696 92.672c55.168 0 100.053333 39.296 100.053333 87.594667v35.84a291.157333 291.157333 0 0 1 191.445334 272.981333v213.504h17.962666a29.098667 29.098667 0 1 1 0 58.24H200.192a29.141333 29.141333 0 1 1 0-58.24h17.962667v-213.504a291.157333 291.157333 0 0 1 191.488-272.981333v-35.84c0-48.298667 44.885333-87.594667 100.053333-87.594667z m0 163.285333a233.088 233.088 0 0 0-233.088 233.130667v213.504h466.176v-213.504a233.088 233.088 0 0 0-233.088-233.130667z m0-105.045333c-22.570667 0-41.642667 13.44-41.642667 29.354667v21.205333a289.322667 289.322667 0 0 1 83.285334 0v-21.205333c0-15.914667-19.072-29.354667-41.642667-29.354667z" p-id="30008"></path></svg>',
        du1Icon: '<svg width="20px" height="20px" t="1688025755497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29723" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M509.867 144.64a397.056 397.056 0 1 1 0 794.027 397.056 397.056 0 1 1 0-794.027z m0 66.133a330.88 330.88 0 1 0 330.837 330.88 330.88 330.88 0 0 0-330.837-330.88z m-11.094 66.134c18.304 0 33.11 14.848 33.11 33.109v198.528a33.11 33.11 0 1 1-66.134 0V310.016c0-18.261 14.763-33.067 33.067-33.067zM831.36 102.74l140.373 140.374c11.734 11.776 12.8 30.165 3.2 43.093l-3.2 3.712a33.11 33.11 0 0 1-46.805 0L784.555 149.547a33.067 33.067 0 1 1 46.805-46.806z m-591.915-7.594c11.734 11.733 12.8 30.122 3.2 43.093l-3.2 3.67L99.072 282.282a33.11 33.11 0 0 1-50.005-43.094l3.2-3.669L192.64 95.147a33.11 33.11 0 0 1 46.805 0z" p-id="29724"></path></svg>',
        selectXiaIcon: '<svg width="16px" height="16px" t="1688112475115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27892" id="mx_n_1688112475118" width="300" height="300"><path d="M926.144 311.168c15.04 14.976 16.512 38.4 4.48 55.04l-4.48 5.312-384 384a42.688 42.688 0 0 1-55.04 4.48l-5.248-4.48-384-384a42.688 42.688 0 0 1 55.04-64.832l5.248 4.48L512 664.96l353.856-353.792a42.688 42.688 0 0 1 55.04-4.48l5.248 4.48z" p-id="27893"></path></svg>',
        dateTimeIcon: '<svg width="14px" height="14px" t="1688372877952" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3520" width="300" height="300"><path d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z" p-id="3521"></path></svg>',
        bumenIcon: '<svg width="20px" height="20px" t="1688525536464" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27805"><path d="M435.2 384a102.4 102.4 0 1 1 0-204.8h153.6a102.4 102.4 0 1 1 0 204.8h-44.8l-0.042667 96H742.4a32 32 0 0 1 31.658667 27.306667l0.341333 4.693333v128h44.8a102.4 102.4 0 1 1 0 204.8h-153.6a102.4 102.4 0 1 1 0-204.8h44.8v-96h-396.8V640H358.4a102.4 102.4 0 1 1 0 204.8H204.8a102.4 102.4 0 1 1 0-204.8h44.8v-128a32 32 0 0 1 27.306667-31.658667l4.693333-0.341333h198.357333L480 384H435.2z m-76.8 320H204.8a38.4 38.4 0 0 0-5.205333 76.458667l5.205333 0.341333h153.6a38.4 38.4 0 0 0 5.205333-76.458667L358.4 704z m460.8 0h-153.6a38.4 38.4 0 0 0-5.205333 76.458667l5.205333 0.341333h153.6a38.4 38.4 0 0 0 5.205333-76.458667L819.2 704zM588.8 243.2h-153.6a38.4 38.4 0 0 0-5.205333 76.458667l5.205333 0.341333h153.6a38.4 38.4 0 0 0 5.205333-76.458667L588.8 243.2z" p-id="27806"></path></svg>'
      };
      // 语言 
      this.langaugeObj = {
        'zh-CN': {
          DU_title: '新建',
          DU_submit: '发送',
          DU_cancel: '取消',
          DU_type0: '应用内(免费)',
          DU_type1: '短信',
          DU_type2: '电话',
          DU_addBtn: '添加',
          DU_ordinaryDU: '普通DU',
          DU_organizeDU: '组织DU',
          DU_againLabel: '不再次提醒',
          DU_again5Label: '5分钟后提醒',
          DU_again10Label: '10分钟后提醒',
          DU_again15Label: '15分钟后提醒',
          DU_personShortMessageNum: '个人今天剩余可发送条数：',
          DU_organizeShortMessageNum: '组织剩余可发送条数：',
          DU_dingshiDU: '定时DU',
          DU_sendSeparately: '分别发送(接收之间接收，回复互相不见)',
          DU_sendSingle: '发送单聊通知',
          DU_Message_timeError: '设置定时DU是一个过去的时刻，建议重新选择时间',
          DU_Message_sendSuccess: '发送成功',
          DU_Message_requestError: '接口错误',
          DU_Message_userIdsError: '当前选择有不符合状态的用户，请重新选择',
          DU_Message_noUserIdsError: '请选择接收人',
          DU_Message_noDUTextError: '任务内容不能为空',
        },
        'en-US': {
          DU_title: 'Create DU',
          DU_submit: 'Send',
          DU_cancel: 'Cancel',
          DU_type0: 'In-App (Free)',
          DU_type1: 'SMS',
          DU_type2: 'Phone',
          DU_addBtn: 'Add',
          DU_ordinaryDU: 'Regular DU',
          DU_organizeDU: 'Organizational DU',
          DU_againLabel: 'Do not remind again',
          DU_again5Label: 'Remind in 5 minutes',
          DU_again10Label: 'Remind in 10 minutes',
          DU_again15Label: 'Remind in 15 minutes',
          DU_personShortMessageNum: 'Remaining personal sending limit today: ',
          DU_organizeShortMessageNum: 'Remaining organizational sending limit: ',
          DU_dingshiDU: 'Scheduled DU',
          DU_sendSeparately: 'Send separately (receivers cannot see each other and replies are not visible)',
          DU_sendSingle: 'Send individual chat notification',
          DU_Message_timeError: 'The scheduled DU time is in the past. Please choose a different time.',
          DU_Message_sendSuccess: 'Send successful',
          DU_Message_requestError: 'Interface error',
          DU_Message_userIdsError: 'There are users in the current selection that do not meet the required status. Please select again.',
          DU_Message_noUserIdsError: 'Please select recipient',
          DU_Message_noDUTextError: 'Task content cannot be empty',
        },
        'ja-JP': {
          DU_title: '新規DU',
          DU_submit: '送信',
          DU_cancel: 'キャンセル',
          DU_type0: 'アプリ内（無料）',
          DU_type1: 'ショートメッセージ',
          DU_type2: '電話',
          DU_addBtn: '追加',
          DU_ordinaryDU: '通常DU',
          DU_organizeDU: '組織DU',
          DU_againLabel: '再度通知しない',
          DU_again5Label: '5分後に通知',
          DU_again10Label: '10分後に通知',
          DU_again15Label: '15分後に通知',
          DU_personShortMessageNum: '個人今日の送信可能数：',
          DU_organizeShortMessageNum: '組織の送信可能数：',
          DU_dingshiDU: 'タイマーDU',
          DU_sendSeparately: '個別送信（受信者同士のやり取りで相手方が見えず、返信も見えない）',
          DU_sendSingle: '個別チャット通知を送信',
          DU_Message_timeError: '設定したタイマーDUが過去の時刻です。時間を再選択することをお勧めします。',
          DU_Message_sendSuccess: '送信に成功しました',
          DU_Message_requestError: 'インターフェースエラー',
          DU_Message_userIdsError: '現在の選択には状態に合わないユーザーが含まれています。再度選択してください',
          DU_Message_noUserIdsError: '受信者を選択してください',
          DU_Message_noDUTextError: 'タスクの内容を空にすることはできません',
        }
      };

      this.SERVERPATH = "https://static-beta.6du.cn/public/widget/DU_msg";

      /** 引入项目中所用的cdn链接 */
      // 加载组织架构cdn
      if(!window.ContactRelate){
        const ContactRelate = this.createElement('script', {
          src: 'https://static-beta.6du.cn/public/contact_relate_v1.0/contact.relate.js'
        });
        document.head.appendChild(ContactRelate);
      }
     
      // 加载layui cdn
      const layuiJS = this.createElement('script', {
        type: 'text/javascript',
        // src: './layui/layui.js',
        src: `${this.SERVERPATH}/layui/layui.js`,
      });
      document.head.appendChild(layuiJS);

      // 加载layui css
      const layuiCss = document.createElement('link');
      layuiCss.rel = "stylesheet";
      // layuiCss.href = './layui/layui.css';
      layuiCss.href = `${this.SERVERPATH}/layui/layui.css`;
      document.head.appendChild(layuiCss);

      // 加载样式
      const link = document.createElement('link');
      link.rel = "stylesheet";
      // link.href = './light.css';
      link.href = `${this.SERVERPATH}/light.css`;
      document.head.appendChild(link);
    }

    // 初始化
    async init(object, callback, closeCallback){
      this.options = Object.assign({}, this.options, object);
      this.callback = callback;
      this.closeCallback = closeCallback;
      this.localParams.userList = JSON.parse(JSON.stringify(object?.params?.userList || []));
      this.localParams.DuText = object?.params?.DuText;
      this.localParams.tixingValue = object?.params?.again || 0;
      this.localParams.radio1 = object?.params?.regularTimeRadio || false;
      this.localParams.DuTime = object?.params?.DuTime || '';
      this.localParams.radio2 = object?.params?.separateRadio || false;

      // 判断语言环境
      this.langauge = this.langaugeObj[object?.langauge || 'zh-CN'];
      this.localParams.tixingTitle = this.langauge.DU_againLabel;

      // theme为1，引入暗黑样式
      if(this.options.theme === 1){
        this.changeTheme(1);
      }

      this._baseAppend();
    }

    // 切换主题模式 [浅色|暗黑]
    changeTheme(theme){
      const darkLink = document.querySelector('link[title="darkLink"]');
      if(theme === 1){
        if(!darkLink){
          const link = document.createElement('link');
          link.rel = "stylesheet";
          link.title = 'darkLink';
          // link.href = './dark.css';
          link.href = `${this.SERVERPATH}/dark.css`;
          document.head.appendChild(link);
        }
      }else{
        if(darkLink) document.head.removeChild(darkLink);
      }

      window.ContactRelate.loadTheme(theme);
    }

    // 切换语言环境 [中文|英文|日文]
    changeLangauge(lang){
      this.langauge = this.langaugeObj[lang || 'zh-CN'];
      this._baseAppend();
    }

    // 基础填充方法，判断是哪种类型
    _baseAppend(){
      const Add_DU_MsgBox = document.querySelector('.Add_DU_Msg');
      if(Add_DU_MsgBox){
        document.body.removeChild(Add_DU_MsgBox);
      }
      // 先存储到内存中
      this.fragmentDom = document.createDocumentFragment();

      const baseBox = this.createElement('div', {
        classname: 'Add_DU_Msg',
      });

      const DUBox = this.createElement('div', {
        classname: 'DU_box'
      });

      DUBox.appendChild(this.Header_Element());
      DUBox.appendChild(this.Content_Element());
      DUBox.appendChild(this.Footer_Element());
      this.DUBox = DUBox;
      baseBox.appendChild(DUBox);
      this.fragmentDom.appendChild(baseBox);
      document.body.appendChild(this.fragmentDom);
    }

    // 关闭弹框
    closeHandle = function(){
      const baseBox = document.querySelector('.Add_DU_Msg');
      if(baseBox){
        baseBox.parentElement.removeChild(baseBox);
      }
    }

    // 弹框_header
    Header_Element(){
      const DUBox_Header = this.createElement('div', {
        classname: 'DUBox_Header',
        innerHTML: `<div class='DUBox_Header_title'>${this.options.title || this.langauge.DU_title}</div>`
      });
      const DUBox_Header_close = this.createElement('span', {
        innerHTML: `${this.iconConfig.closeIcon}`,
        classname: 'DUBox_Header_close',
        onclick: ()=>{
          this.closeHandle();
          if(this.closeCallback) this.closeCallback();
        }
      });
      DUBox_Header.appendChild(DUBox_Header_close);
      return DUBox_Header;
    }

    // 弹框_footer
    Footer_Element(){
      const DUBox_Footer= this.createElement('div', {
        classname: 'DUBox_Footer',
      });
      const DUBox_Footer_Submit= this.createElement('span', {
        classname: 'DUBox_Footer_Submit',
        innerHTML: this.langauge['DU_submit'],
        onclick: ()=>{
          if(!this.options.loading){
            // 添加loading状态
            this.options.loading = true;
            this.Loading_Element();

            // 判断有没有选择人员
            if(!this.localParams.userList.length){
              this.Message.error(this.langauge.DU_Message_noUserIdsError);
              this.options.loading = false;
              this.closeLoading();
              return false;
            }

            // 判断DU内容是否为空
            if(!this.localParams.DuText){
              this.Message.error(this.langauge.DU_Message_noDUTextError);
              this.options.loading = false;
              this.closeLoading();
              return false;
            }

            // 获取时间控件的值
            const DateTime = document.querySelector('#DateTime');
            if(DateTime){
              if(new Date(this.localParams.DuTime).getTime()<new Date().getTime()){
                this.Message.error(this.langauge.DU_Message_timeError);
                this.options.loading = false;
                this.closeLoading();
                return false;
              }
            }

            const { userInfo, type, params } = this.options;
            const { userList, DuText, tixingValue, radio2, radio3} = this.localParams;

            // 人员id
            let recv_users = [];
            userList.forEach(item=>{ recv_users.push(item.id) });

            // 附件信息
            let appendix = params.appendix;
            appendix[0].description = DuText;

            let obj = {
              user_id: userInfo.user_id,
              du_type: type,
              company_id: userInfo.companyId,
              recv_users,
              content: DuText,
              again: tixingValue,
              timing: this.localParams.radio1 ? this.localParams.DuTime?.slice(0, -3) || '' : '',
              read_only: Number(radio2),
              appendix: JSON.stringify(appendix),
              session: this.options.session ? `0-${userInfo.user_id}` : '',   // 来自会话 0-user_id  单聊  1-group_id 群聊
              create_type: 0,
		          message_id: (Math.random() * 1000000000000).toFixed(),
              is_signle_chat: Number(radio3), // 是否推送单聊du消息
              is_group_chat: 0, // 是否推送群聊du消息(目前应用DU没有群聊推送)
              create_source: 1, // 定义 前端固定 1
              relate_company_id: Number(userInfo.companyId), // 关联公司id, 临时添加, 标识该du和那个公司关联
              organize_du: params.organize_du
            }

            this.request(197, obj).then(res=>{
              this.options.loading = false;
              this.closeLoading();
              if(res && res.code === 0){
                if(this.callback) {
                  this.callback('fulfilled', obj, res);
                } else {
                  this.Message.success(this.langauge.DU_Message_sendSuccess);
                  this.closeHandle();
                }
              } else {
                if(this.callback) {
                  this.callback('rejected', obj, res);
                } else {
                  this.Message.error(res.message || this.langauge.DU_Message_requestError);
                }
              }
            });
          }
        }
      });
      const DUBox_Footer_Cancel = this.createElement('span', {
        classname: 'DUBox_Footer_Cancel',
        innerHTML: this.langauge.DU_cancel,
        onclick: ()=>{
          this.closeHandle();
          if(this.closeCallback) this.closeCallback();
        }
      });
      DUBox_Footer.appendChild(DUBox_Footer_Cancel);
      DUBox_Footer.appendChild(DUBox_Footer_Submit);
      return DUBox_Footer;
    }

    // Loading效果
    Loading_Element(){
      const LoadingElement = this.createElement('div', {
        classname: 'LoadingElement',
        innerHTML: `
          <span class='loadingSpan'></span>
        `
      });
      this.DUBox.appendChild(LoadingElement)
    }

    // 关闭loading
    closeLoading(){
      const loading = document.querySelector('.LoadingElement');
      if(loading){
        this.DUBox.removeChild(loading);
      }
    }

    // 弹框_content
    Content_Element(){
      const DUBox_Content= this.createElement('div', {
        classname: 'DUBox_Content',
      });

      this.DUBox_Content = DUBox_Content;

      if(this.options?.type === 0){
        this.appDU();
      } else if(this.options?.type === 1){
        this.shortDU();
      }

      return DUBox_Content;
    }

    // 类型一：应用内DU
    appDU(){
      while (this.DUBox_Content.hasChildNodes()) {
        this.DUBox_Content.removeChild(this.DUBox_Content.firstChild)
      }
      this.DUBox_Content.appendChild(this.DUType_Element());
      this.DUBox_Content.appendChild(this.AddUser_Element());
      this.DUBox_Content.appendChild(this.Default_DuType_Element());
      this.DUBox_Content.appendChild(this.TextArea_Element());
      this.DUBox_Content.appendChild(this.Select_Time_Element());
      this.DUBox_Content.appendChild(this.Radio_Element());
    }
 
    // 类型二：短信DU
    async shortDU(){
      while (this.DUBox_Content.hasChildNodes()) {
        this.DUBox_Content.removeChild(this.DUBox_Content.firstChild)
      }
      this.DUBox_Content.appendChild(this.DUType_Element());
      this.DUBox_Content.appendChild(this.AddUser_Element());
      this.DUBox_Content.appendChild(this.Default_DuType_Element());
      this.DUBox_Content.appendChild(this.TextArea_Element());
      this.DUBox_Content.appendChild(this.Select_Time_Element());
      this.Department_Element();
      this.DUBox_Content.appendChild(this.Radio_Element());
      // 获取短信条数信息
      this.getDepartmentInfo();
    }

    /** DU的种类 */
    DUType_Element(){
      const duTypeBox = this.createElement('div', {
        classname: 'DUType_Element',
      });
      const DuType0 = this.createElement('div', {
        classname: `DuType0 ${this.options.type === 0 ? 'active' : ''}`,
        style: `cursor: ${this.options.changeDUType ? 'pointer':'not-allowed'}`,
        innerHTML: `
          <span>${this.iconConfig.duanxinyaoqingIcon}</span>
          ${this.langauge.DU_type0}
        `,
        onclick: ()=>{
          if(this.options.changeDUType){
            this.options.type = 0;
            this.appDU();
          }
        }
      });
      const DuType1 = this.createElement('div', {
        classname: `DuType1 ${this.options.type === 1 ? 'active' : ''}`,
        style: `cursor: ${this.options.changeDUType ? 'pointer':'not-allowed'}`,
        innerHTML: `
          <span>${this.iconConfig.youxiangIcon}</span>
          ${this.langauge.DU_type1}
        `,
        onclick: ()=>{
          if(this.options.changeDUType){
            this.options.type = 1;
            this.shortDU();
          }
        }
      });
      const DuType2 = this.createElement('div', {
        classname: `DuType2`,
        innerHTML: `
          <span>${this.iconConfig.dianhuaIcon}</span>
          ${this.langauge.DU_type2}
        `
      });
      duTypeBox.appendChild(DuType0);
      duTypeBox.appendChild(DuType1);
      duTypeBox.appendChild(DuType2);
      return duTypeBox;
    }

    /** 操作1 */
    AddUser_Element(){
      const AddUser_Element = this.createElement('div', {
        classname: 'DUBox_Content_Item_Box',
        innerHTML: `
          <span>${this.iconConfig.canyurenIcon}</span>
        `
      });
      const divBox = this.createElement('div', {
        id: 'AddUser_Element',
        classname: 'DUBox_Content_Item_Box_Right'
      });
      const AddBtn = this.createElement('div', {
        classname: 'AddUser_Element_Add',
        innerHTML: `${this.iconConfig.addIcon}<span>${this.langauge.DU_addBtn}</span>`,
        onclick: ()=>{
          window.ContactRelate.init({
            ...this.options.contactRelate,
            defaultData: this.localParams.userList || [],
            onSubmit: (data)=>{ this.submitHandle(data, divBox) }
          })
        }
      });
      divBox.appendChild(AddBtn);
      this.AddUser_List_Element(divBox);
      AddUser_Element.appendChild(divBox);
      return AddUser_Element;
    }

    // 组织架构弹框 添加人员
    submitHandle(data, parent){
      if(this.options.userControl){
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
          this.Message.info(this.langauge.DU_Message_userIdsError);
          return false;
        }
      }
      this.localParams.userList = [...data];
      this.AddUser_List_Element(parent);
    };

    // 渲染人员列表，人员列表数据改变，需要重新渲染此函数
    AddUser_List_Element(parent){
      const Box = document.querySelector('#AddUser_List_Box');
      if(Box){
        parent.removeChild(Box);
      }
      const ListBox = this.createElement('div', {
        id: 'AddUser_List_Box'
      });
      this.localParams.userList.forEach((item, idx)=>{
        const List_Item = this.createElement('div', {
          key: item.id,
          classname: 'AddUser_List_Item',
          innerHTML: `<span>${item.name}</span>`
        });
        const List_Item_Close = this.createElement('span', {
          classname: 'AddUser_List_Item_Close',
          onclick: ()=>this.closeTabHandle(idx),
          innerHTML: `${this.iconConfig.closeIcon}`
        })
        List_Item.appendChild(List_Item_Close);
        ListBox.appendChild(List_Item);
      });
      parent.appendChild(ListBox);
      // 人员人数大于1，添加一个radio选项, 小于等于1时，移除此radio内容
      if(this.localParams.userList.length > 1){
        if(this.Radio_Element_Box){
          this.Radio3_Box(this.Radio_Element_Box);
        }
      } else {
        const Radio3_Box = document.querySelector('#inputBox3');
        if(this.Radio_Element_Box && Radio3_Box){
          this.localParams.radio3 = false;
          this.Radio_Element_Box.removeChild(Radio3_Box);
        }
      }
    }

    closeTabHandle (idx){
      const parent = document.querySelector('#AddUser_Element');
      this.localParams.userList.splice(idx, 1);
      this.AddUser_List_Element(parent)
    }

    /** 操作二 */
    Default_DuType_Element(){
      const Default_DuType_Element = this.createElement('div', {
        classname: 'DUBox_Content_Item_Box',
        innerHTML: `
          <span>${this.iconConfig.du1Icon}</span>
        `
      });
      const divBox = this.createElement('div', {
        id: 'Default_DuType_Element',
        classname: 'DUBox_Content_Item_Box_Right',
        innerHTML: `
          <span class='duType_span'>${Number(this.options.params.organize_du || null) === 0 ? this.langauge.DU_ordinaryDU : this.langauge.DU_organizeDU }</span>
          <span class='company_name' style='display: ${this.options.params.organize_du ? "":'none'}'>${this.options.userInfo.companyName || ''}</span>
          <span class='selectIcon'>${this.iconConfig.selectXiaIcon}</span>
        `
      });
      Default_DuType_Element.appendChild(divBox);
      return Default_DuType_Element;
    }

    /** 操作三 */
    TextArea_Element(){
      const TextArea_Element = this.createElement('div', {
        classname: 'DUBox_Content_Item_Box',
        innerHTML: `
          <span style='padding-left: 2px'>${this.iconConfig.duanxinyaoqingIcon}</span>
        `
      });
      const divBox = this.createElement('div', {
        id: 'TextArea_Element',
        classname: 'DUBox_Content_Item_Box_Right',
      });
      const textarea = this.createElement('textarea', {
        row: '2',
        onchange: e=>{
          this.localParams.DuText = e.target.value;
        },
      });
      textarea.value = this.localParams.DuText;
      const AppBox = this.createElement('div', {
        classname: 'AppBox',
        innerHTML: `
          <img src = ${this.options.params.iconUrl} />

          <div>${this.options.params.form_title || ''}</div>  
        `
      })
      divBox.appendChild(textarea);
      divBox.appendChild(AppBox);
      TextArea_Element.appendChild(divBox);
      return TextArea_Element;
    }

    /** 操作四 */
    Select_Time_Element(){
      const Select_Time_Element = this.createElement('div', {
        classname: 'DUBox_Content_Item_Box',
        innerHTML: `
          <span>${this.iconConfig.tixingIcon}</span>
        `
      });

      const optionsObj = {
        '0': this.langauge.DU_againLabel,
        '5': this.langauge.DU_again5Label,
        '10': this.langauge.DU_again10Label,
        '15': this.langauge.DU_again15Label,
      };
      const SelectElement = ()=>{
        const selectDiv = this.createElement('div', {
          id: 'Select_Time_Element',
          classname: 'DUBox_Content_Item_Box_Right',
          innerHTML: `
            <span>${optionsObj[`${this.localParams.tixingValue}`]}</span>
            <span class='selectIcon'>${this.iconConfig.selectXiaIcon}</span>
          `
        });
        Select_Time_Element.appendChild(selectDiv);

        if(window.layui){
          const _that = this;
          setTimeout(function(){
            window.layui.use(['dropdown'],()=>{
              window.layui.dropdown.render({
                elem: '#Select_Time_Element',
                className: 'layui_select_tixing',
                data: [
                  { title: _that.langauge.DU_againLabel, id: 0, templet: `<div class=${_that.localParams.tixingValue === 0 ? 'layui-select-selected':''}>${_that.langauge.DU_againLabel}</div>`},
                  { title: _that.langauge.DU_again5Label, id: 5, templet: `<div class=${_that.localParams.tixingValue === 5 ? 'layui-select-selected':''}>${_that.langauge.DU_again5Label}</div>`},
                  { title: _that.langauge.DU_again10Label, id: 10, templet: `<div class=${_that.localParams.tixingValue === 10 ? 'layui-select-selected':''}>${_that.langauge.DU_again10Label}</div>`},
                  { title: _that.langauge.DU_again15Label, id: 15, templet: `<div class=${_that.localParams.tixingValue === 15 ? 'layui-select-selected':''}>${_that.langauge.DU_again15Label}</div>`}
                ],
                click: function(obj){
                  _that.localParams.tixingValue = obj.id;
                  _that.localParams.tixingTitle = obj.title;
                  Select_Time_Element.removeChild(selectDiv);
                  SelectElement();
                },
              })
            })
          }, 100);
        }
      };

      SelectElement();

      return Select_Time_Element;
    }

    /** 短信DU - 选择部门 */
    Department_Element(parent){
      const Department_Element_Box = document.querySelector('#Department_Element_Box');
      if(Department_Element_Box){
        this.DUBox_Content.removeChild(Department_Element_Box);
      }
      const Department_Element = this.createElement('div', {
        classname: 'DUBox_Content_Item_Box',
        id: 'Department_Element_Box',
        innerHTML: `
          <span>${this.iconConfig.bumenIcon}</span>
        `
      });
      const SelectElement = ()=>{
        const Box = this.createElement('div', {
          id: 'Department_Element',
          styles: {
            flex: 1
          }
        });
        const selectDiv = this.createElement('div', {
          classname: 'DUBox_Content_Item_Box_Right selectDiv',
          innerHTML: `
            <span>${this.localParams.department.title}</span>
            <span class='selectIcon'>${this.iconConfig.selectXiaIcon}</span>
          `
        });
        const descriptionDiv = this.createElement('div', {
          classname: 'descriptionDiv',
          innerHTML: `
            <div>${this.langauge.DU_personShortMessageNum}${this.localParams.department.personNum}</div>
            <div>${this.langauge.DU_organizeShortMessageNum}${this.localParams.department.departmentNum}</div>
          `
        });
        Box.appendChild(selectDiv);
        Box.appendChild(descriptionDiv);
        Department_Element.appendChild(Box);
      };

      SelectElement();

      if(parent){
        parent.insertBefore(Department_Element, document.querySelector('#Radio_Element_Box'));
      } else {
        this.DUBox_Content.appendChild(Department_Element);
      }
    }

    /** 短信DU - 获取接口数据 */
    getDepartmentInfo(){
      this.request(206, {user_id: this.options?.userInfo?.user_id}).then(res=>{
        if(res && res.code === 0){
          const obj = res.data?.company_du_balance.find(item=> item.company_id === this.options.userInfo.companyId) || {};
          this.localParams.department = {
            title : obj.company_name,
            personNum: obj.user_du_balance,
            departmentNum: obj.du_balance 
          }
          if(this.options.type === 1) this.Department_Element(this.DUBox_Content);
        }else{
          this.Message.error(res.message || this.langauge.DU_Message_requestError);
        }
      });
    }

    /** 操作五 */
    Radio_Element(){
      const Radio_Element = this.createElement('div', {
        classname: 'DUBox_Content_Item_Box',
        id: 'Radio_Element_Box',
        innerHTML: `
          <span>${this.iconConfig.tabberShenZhiIcon}</span>
        `
      });
      const divBox  = this.createElement('div', {
        id: 'Radio_Element',
      });

      this.Radio_Element_Box = divBox;

      this.Radio1_Box(divBox);
      this.Radio2_Box(divBox);
      if(this.localParams.userList.length > 1){
        this.Radio3_Box(divBox);
      }

      Radio_Element.appendChild(divBox)
      return Radio_Element;
    }

    Radio1_Box(parent){
      const BInput = document.querySelector('#inputBox1');
      if(BInput){
        parent.removeChild(BInput);
      }

      const Box1 = this.createElement('div', {
        id: 'inputBox1',
      })
      const Radio = this.createElement('input', {
        type: 'radio',
        id: 'dingshi',
        onclick: ()=>{
          this.localParams.radio1  = !this.localParams.radio1 ;
          this.Radio1_Box(parent);
        }
      });
      Radio.checked = this.localParams.radio1 || false;
      const Radio_Label = this.createElement('label', {
        for: 'dingshi',
        innerHTML: this.langauge.DU_dingshiDU
      });
      Box1.appendChild(Radio);
      Box1.appendChild(Radio_Label);
     
      if(this.localParams.radio1){
        const TimeDiv = this.createElement('input', {
          type: "text",
          id: 'DateTime'
        });
        const icon = this.createElement('span', {
          classname: 'date_time_icon',
          innerHTML: `${this.iconConfig.dateTimeIcon}`
        });
        Box1.appendChild(TimeDiv);
        Box1.appendChild(icon);
        if(window.layui){
          const _that = this;
          setTimeout(()=>{
            window.layui.use('laydate', ()=>{
              var laydate = layui.laydate;
              laydate.render({
                elem: '#DateTime',  //指定元素
                type: 'datetime',
                value: _that.localParams.DuTime || _that.getTime(),
                theme: 'default',
                lang: _that.options.langauge,
                done: (v, i)=>{
                  _that.localParams.DuTime = v;
                },
              });
            });
          }, 100)
        }
      }
      parent.insertBefore(Box1, document.querySelector('#inputBox2'));
    }

    Radio2_Box(parent){
      const BInput = document.querySelector('#inputBox2');
      if(BInput){
        parent.removeChild(BInput);
      }

      const Box2 = this.createElement('div', {
        id: 'inputBox2',
      })
      const Radio = this.createElement('input', {
        type: 'radio',
        id: 'radio2',
        onclick: ()=>{
          this.localParams.radio2 = !this.localParams.radio2 ;
          this.Radio2_Box(parent);
        }
      });
      Radio.checked = this.localParams.radio2 || false;
      const Radio_Label = this.createElement('label', {
        for: 'radio2',
        innerHTML: this.langauge.DU_sendSeparately
      });
      Box2.appendChild(Radio);
      Box2.appendChild(Radio_Label);
      if(document.querySelector('#inputBox3')){
        parent.insertBefore(Box2, document.querySelector('#inputBox3'));
      }else{
        parent.appendChild(Box2);
      }
    }

    Radio3_Box(parent){
      const BInput = document.querySelector('#inputBox3');
      if(BInput){
        parent.removeChild(BInput);
      }
  
      const Box3 = this.createElement('div', {
        id: 'inputBox3',
      })
      const Radio = this.createElement('input', {
        type: 'radio',
        id: 'radio3',
        onclick: ()=>{
          this.localParams.radio3 = !this.localParams.radio3 ;
          this.Radio3_Box(parent);
        }
      });
      Radio.checked = this.localParams.radio3 || false;
      const Radio_Label = this.createElement('label', {
        for: 'radio3',
        innerHTML: this.langauge.DU_sendSingle
      });
      Box3.appendChild(Radio);
      Box3.appendChild(Radio_Label);
      parent.appendChild(Box3);
    }
  }
  /**
   * 工具函数 生成DOM类
   * @param {string} type 
   * @param {Object} propertys 
   * @returns {Element} element
  */
  Du.prototype.createElement = function (type, propertys) {
    const ele = document.createElement(type);
    for (let key in propertys) {
        switch (key.toLowerCase()) {
            case 'innertext':
                ele.innerText = propertys[key]
                break;
            case 'innerhtml':
                ele.innerHTML = propertys[key]
                break;
            case 'id':
                ele.id = propertys[key]
                break;
            case 'classname':
                ele.className = propertys[key]
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
   * 自定义Message提示组件
  */
  Du.prototype.Message = {
    messageFun(icon, classname, data){
      const MessageBox = Du.prototype.createElement('div', {
        classname: `DU_Message ${classname}`,
        innerHTML: `
          <span class='icon'>${icon}</span>
          <span>${data}</span>
        `
      });
      document.body.appendChild(MessageBox);
      const timeout = setTimeout(()=>{
        document.body.removeChild(MessageBox);
        clearTimeout(timeout);
      }, 3000);
    },
    infoSvg : '<svg width="18px" height="18px" t="1688549743225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14504"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m10.666667 585.898667a32.426667 32.426667 0 0 0-32 32.768 32.426667 32.426667 0 0 0 32 32.768 32.426667 32.426667 0 0 0 32-32.768 32.426667 32.426667 0 0 0-32-32.768zM523.434667 256a31.232 31.232 0 0 0-31.274667 31.232v278.869333a31.232 31.232 0 0 0 62.506667 0V287.232A31.232 31.232 0 0 0 523.434667 256z" p-id="14505"></path></svg>',
    info(data){
      this.messageFun(this.infoSvg, 'DU_Message-info', data);
    },
    errorSvg: '<svg width="18px" height="18px" t="1688550855102" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14654"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333zM360.362667 315.605333A32 32 0 0 0 318.72 363.946667L466.730667 512l-148.053334 148.053333-3.072 3.584a32 32 0 0 0 48.341334 41.642667L512 557.269333l148.053333 148.053334 3.584 3.072a32 32 0 0 0 41.642667-48.341334L557.269333 512l148.053334-148.053333 3.072-3.584a32 32 0 0 0-48.341334-41.642667L512 466.730667l-148.053333-148.053334z" p-id="14655"></path></svg>',
    error(data){
      this.messageFun(this.errorSvg, 'DU_Message-error', data);
    },
    successSvg: '<svg width="18px" height="18px" t="1688635416586" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="42639"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m244.266667 220.330667a28.885333 28.885333 0 0 0-42.709334 5.717333l-242.56 336.938667-168.192-116.138667-3.968-2.304c-13.568-6.570667-29.866667-1.578667-38.058666 12.416-9.045333 15.36-4.864 35.84 9.344 45.610667l191.573333 132.266667 4.053333 2.346666a29.013333 29.013333 0 0 0 36.266667-9.898666l259.541333-360.576 2.517334-4.096a34.944 34.944 0 0 0-7.808-42.282667z" p-id="42640"></path></svg>',
    success(data){
      this.messageFun(this.successSvg, 'DU_Message-success', data)
    }
  }

  /**
   * 获取当前时间格式
  */
  Du.prototype.getTime = function(){
    const time = new Date();
    const year = time.getFullYear();
    const month = this.setTimeFormat(time.getMonth() + 1);
    const day = this.setTimeFormat(time.getDate());
    const hour = this.setTimeFormat(time.getHours());
    const minutes = this.setTimeFormat(time.getMinutes());
    const second = this.setTimeFormat(time.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`;
  }

  /**
   * 补充时间格式 例2023-01-01 01:01:01
  */ 
  Du.prototype.setTimeFormat = function(value){
    return value < 10 ? `0${value}` : value;
  }

  /**
   * 封装request - python请求
  */
  Du.prototype.request = async function(cmd_id, params){
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
      })
    }
    const url = `${this.options.env === 'beta' ? 'https://webim-beta.6du.cn' : 'https://webim.6du.cn'}/api/v1/messages`;
    return fetch(url, options).then((res) => {
        return res.json();
      }, (err) => {
        console.log('err', err);
      }).then(data => {
        return data;
      })
      .catch((err) => {
        return err;
      })
  }

  const DU = new Du();
  // 兼容处理 全局挂载
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = DU;
  } else {
    window.DU_msg = DU;
  }

})();