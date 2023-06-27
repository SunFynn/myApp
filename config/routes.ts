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
    component: './home1',
  },
  {
    path: '/design',
    name: '个人前端组件库',
    icon: 'AntDesignOutlined',
    component: './design1',
  },
  {
    path: '/charts',
    name: '大屏图表例',
    icon: 'ConsoleSqlOutlined',
    component: './chartsCom1',
  },
  {
    path: '/relschema',
    name: '关系图',
    icon: 'BranchesOutlined',
    component: './relSchema1',
  },
  {
    path: '/pinterest',
    name: '交叉瀑布流',
    icon: 'LaptopOutlined',
    component: './pinterest1',
  },
  {
    path: '/imageLazyLoading',
    name: '图片懒加载',
    icon: 'FileImageOutlined',
    component: './imageLazyLoading1',
  },
  {
    path: '/map',
    name: '地图业务',
    icon: 'InsertRowBelowOutlined',
    routes: [
      {
        path: '/map/amap',
        name: '高德地图',
        component: './map1/AMap',
      },
      {
        path: '/map/bmap',
        name: '百度地图',
        component: './map1/BMap',
      },
      {
        path: '/map/tmap',
        name: '天地图',
        component: './map1/TMap/Box',
      },
    ],
  },
  {
    path: '/utils',
    name: '封装方法调用展示',
    icon: 'SlidersOutlined',
    component: './utilsCom',
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
        component: './design1',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
