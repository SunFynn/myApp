# 个人技术网站

使用 antd design pro 框架初始化项目。 umi + antd design pro + typescript + less + docker 部署

部署到个人阿里云 ECS 服务器，CentOs 服务器地址 home/myapp

请求接口信息：个人 ECS 服务器 3000 端口

个人阿里云 ECS 服务器：

ip 39.107.12.47

域名 http://www.wtz-lmm.cn

antd design pro 官网地址： https://pro.ant.design

## 配置 nginx

> 详见 ./docker_nginx

## Environment Prepare

Install `node_modules`:

```bash
yarn install
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

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
