import { SettingDrawer, PageLoading } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { DragIcon } from '@weblife-wei/web_design/src';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import logo from '../public/logo.svg';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import Helmet from './components/Helmet';
import MobileInterface from '@/utils/mobileInterface';

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
  // 将MobileInterface操作对象挂载到window上
  (window as any).MobileInterface = new MobileInterface(Number(3));
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
              title={'DUDUDUDU'}
              onClick={() => {
                console.log('新建DU', '========');
                /* 配置参考文档 http://www.wtz-lmm.cn/publicShareCDN/_DU/pc/DU.html */
                const options = {
                  type: 0,
                  theme: 0,
                  langauge: 'zh-CN',
                  title: 'DUDUDUDU',
                  env: 'beta',
                  source: 'salarySheet',
                  userControl: true,
                  changeDUType: true,
                  session: true,
                  params: {
                    userList: [
                      { id: 202429, name: '李春阳' },
                      { id: 202444, name: '魏廷州' },
                    ],
                    organize_du: 0, // 0 普通DU   1 组织DU
                    iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg',
                    form_title: '请假请假',
                    DuText: '请假请假描述描述，啊噢雷雷',
                    again: 5,
                    regularTimeRadio: true,
                    DuTime: '2020-10-10 10:10:10',
                    separateRadio: true,
                    appendix: [
                      {
                        file_type: 'web',
                        iconUrl: 'http://www.wtz-lmm.cn/publicShareCDN/image/3.jpg',
                        iconType: 4,
                        title: '请假请假',
                      },
                    ],
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

                window.DU_msg.init(
                  options,
                  (status: string, params: any, data: any) => {
                    /* 发送操作的callback函数，
                    status为接口状态[fulfilled成功 | rejected失败]
                    params 接口参数
                    data 接口返回结果 
                */
                    console.log(status, params, data);
                    if (status === 'fulfilled') {
                      window.DU_msg.Message.success('发送成功');
                      window.DU_msg.closeHandle(); // 关闭弹框方法
                    } else if (status === 'rejected') {
                      window.DU_msg.Message.error(data.message || '接口错误错误嘞');
                    }
                  },
                  () => {
                    // 取消/× 操作的回调函数
                    console.log('closeCallback');
                  },
                );
              }}
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
