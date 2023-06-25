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
    component: './Design',
  },
  {
    path: '/charts',
    name: '大屏图表例',
    icon: 'ConsoleSqlOutlined',
    component: './ChartsCom',
  },
  {
    path: '/relschema',
    name: '关系图',
    icon: 'BranchesOutlined',
    component: './RelSchema',
  },
  {
    path: '/pinterest',
    name: '交叉瀑布流',
    icon: 'LaptopOutlined',
    component: './Pinterest',
  },
  {
    path: '/imageLazyLoading',
    name: '图片懒加载',
    icon: 'FileImageOutlined',
    component: './ImageLazyLoading',
  },
  {
    path: '/map',
    name: '地图业务',
    icon: 'InsertRowBelowOutlined',
    routes: [
      {
        path: '/map/amap',
        name: '高德地图',
        component: './Map/AMap',
      },
      {
        path: '/map/bmap',
        name: '百度地图',
        component: './Map/BMap',
      },
      {
        path: '/map/tmap',
        name: '天地图',
        component: './Map/TMap/Box',
      },
    ],
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
        component: './Design',
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
