export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: '首页',
    icon: 'smile',
    component: './home',
  },
  {
    path: '/design',
    name: '个人前端组件库',
    icon: 'AntDesignOutlined',
    component: './design',
  },
  {
    path: '/charts',
    name: '大屏图表例',
    icon: 'ConsoleSqlOutlined',
    component: './chartsCom',
  },
  {
    path: '/relschema',
    name: '关系图',
    icon: 'BranchesOutlined',
    component: './relSchema',
  },
  {
    path: '/pinterest',
    name: '交叉瀑布流',
    icon: 'LaptopOutlined',
    component: './pinterest',
  },
  {
    path: '/imageLazyLoading',
    name: '图片懒加载',
    icon: 'FileImageOutlined',
    component: './imageLazyLoading',
  },
  {
    path: '/map',
    name: '地图业务',
    icon: 'InsertRowBelowOutlined',
    routes: [
      {
        path: '/map/amap',
        name: '高德地图',
        component: './map/AMap',
      },
      {
        path: '/map/bmap',
        name: '百度地图',
        component: './map/BMap',
      },
      {
        path: '/map/tmap',
        name: '天地图',
        component: './map/TMap/Box',
      },
    ],
  },
  {
    path: '/utils',
    name: '封装方法调用展示',
    icon: 'SlidersOutlined',
    component: './utilsPage',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        component: './design',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/test',
    name: '测试页面',
    icon: 'SlidersOutlined',
    component: './testPage',
  },
  {
    component: './404',
  },
];
