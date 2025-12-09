# 个人技术网站

使用 antd design pro 框架初始化项目。

所用到的技术栈： React + umi + antd design pro + typescript + less + jest + docker 部署 + nginx

部署到个人阿里云 ECS 服务器，CentOs 服务器地址 home/myapp

请求接口信息：个人 ECS 服务器 3000 端口

个人阿里云 ECS 服务器：

ip 39.107.12.47

域名 http://www.wtz-lmm.cn

我的大屏图标项目地址：http://www.wtz-lmm.cn/charts/#/

我的组件库项目地址：http://www.wtz-lmm.cn/design/#/

我的jenkins项目部署地址：http://www.wtz-lmm.cn:8080/login

## 配置 nginx

> 详见 ./docker_nginx

## Environment Prepare

Install `node_modules`:

```bash
yarn install
```

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Test code

```bash
npm test
```
