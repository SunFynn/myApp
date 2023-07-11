import { SettingDrawer, PageLoading } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { DragIcon } from '@weblife-wei/web_design/src';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import logo from '../public/logo.svg';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import Helmet from './components/Helmet';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// 判断用户权限，展示不同的菜单项
const formatMenuData = (menuData: MenuDataItem[]) => {
  const isAdmin = JSON.parse(localStorage.getItem('isLogin') || '{}')?.data?.username === 'admin';
  if (isAdmin) {
    return menuData;
  } else {
    return menuData.filter((item) => item.path !== '/admin');
  }
};

export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  return {
    title: '喵喵 & 嘿嘿',
    logo: logo,
    pageTitleRender: false, // ProLayout 会根据菜单和路径来自动匹配浏览器的标题, 例：首页 - title，此配置项可去掉前边的路由标题
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '爱喵喵的嘿嘿呀',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到login页面
      if (!localStorage.getItem('isLogin')) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    menuDataRender: (menuData: MenuDataItem[]) => formatMenuData(menuData),
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <Helmet />
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <DragIcon
              src={'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg'}
              onClick={() => {
                console.log('新建DU');
                const options = {
                  type: 0, // 0 应用内DU   1 短信DU    2 电话DU （暂未开放）
                  theme: 1, // !1 浅色模式   1 黑暗模式
                  langauge: 'zh-CN', // 语言环境   zh-CN 中文   en-US 英文   ja-JP 日文
                  title: '新建DUDUDUDU', // DU弹框名称
                  env: 'beta', // pord 正式接口   beta 测试接口
                  source: 'salarySheet', // 来源   salarySheet 工资条
                  userControl: true, // 人员选择限制，不允许选择传入人员之外的人   例 salarySheet  [工资条]
                  params: {
                    userList: [
                      { id: 202429, name: '李春阳' },
                      { id: 202444, name: '魏廷州' },
                    ], // 用户列表  对象中需要id、name
                    organize_du: 0, // 0 普通DU   1 组织DU
                    iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg', // 执行DU的事由对应app的icon
                    form_title: '请假请假', // 执行DU的事由的名称
                    DuText: '请假请假描述描述，啊噢雷雷', // 来源app的DU事件描述
                    regularTimeRadio: true, // 定时DU，radio
                    DuTime: '2020-10-10 10:10:10', // 定时DU - 时间
                    separateRadio: true, // 分别发送DU，radio
                    appendix: [
                      {
                        file_type: 'web',
                        iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg',
                        iconType: 4,
                        title: '请假请假',
                      },
                    ], // 附件信息[不同来源所需的附近信息不同，各项目自行配置]
                  },
                  userInfo: {
                    accessToken: '77a7e71f6abbaca55f562fc35ef8af9b',
                    companyId: '1450',
                    userId: '2487bdaf0370de990d34b38d3d9fde13',
                    deviceId: '1129cebd1077a83ae1e91110fece07e0',
                    user_id: '202444',
                    deviceType: 'PC',
                    companyName: '集团1',
                  },
                  // 组织架构人员弹框参数配置
                  contactRelate: {
                    theme: 0,
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
                      userId: '2487bdaf0370de990d34b38d3d9fde13',
                      deviceId: '1129cebd1077a83ae1e91110fece07e0',
                      user_id: '202444',
                      deviceType: 'PC',
                      companyName: '集团1',
                    },
                  },
                };

                window._DU.init(
                  options,
                  (status: string, params: any, data: any) => {
                    /* 发送操作的callback函数，
                    status为接口状态[fulfilled成功 | rejected失败]
                    params 接口参数
                    data 接口返回结果 
                */
                    console.log(status, params, data);
                    if (status === 'fulfilled') {
                      window._DU.Message.success('发送成功');
                      window._DU.closeHandle(); // 关闭弹框方法
                    } else if (status === 'rejected') {
                      window._DU.Message.error(data.message || '接口错误错误嘞');
                    }
                  },
                  () => {
                    // 取消/× 操作的回调函数
                    console.log('closeCallback');
                  },
                );
              }}
              title={'DUDUDUDU'}
            />
          )}

          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={() => {
                // setInitialState((preInitialState: any) => ({
                //   ...preInitialState,
                //   settings,
                // }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
