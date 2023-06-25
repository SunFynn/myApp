import { SettingDrawer, PageLoading } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
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
