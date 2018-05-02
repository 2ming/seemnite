# seemnite
A blog system by node


## 目标功能

- [x] list -- 完成
- [x] page -- 完成
- [x] tag -- 完成
- [x] new and edit -- 完成
- [x] markdown -- 完成
- [ ] 上传.md文件生成 -- 未完成
- [x] 登陆 -- 完成
- [x] Github登录 -- 完成
- [ ] 微信登录 -- 未完成
- [ ] 文章对应用户 -- 未完成


### Launch

```sh

$ npm run dev
# Visit http://127.0.0.1:7300
# 文章发布地址 http://0.0.0.0:7300/admin
```

## More Commands

```sh
# Build front-end assets
$ npm run build

# Run Easy Mock as production environment (You should run `build` first)
$ npm run start

# Run unit test
$ npm run test

# Test lint
$ npm run lint
```
## 目录

``` bash
├── README.md
├── app.js //入口文件
├── build //打包配置目录
├── config //环境参数配置目录
│   └── default.json //默认配置文件
├── controllers //接口目录
│   ├── article.js //文章
│   ├── index.js
│   ├── user.js //用户
│   └── util.js //其他
├── dist //打包文件
├── middlewares //中间件
│   ├── auth.js
│   ├── index.js
│   └── view.js //SSR渲染文件
├── models //models
│   ├── article.js
│   ├── index.js
│   ├── tag.js
│   └── user.js
├── package.json
├── proxy //models方法
│   ├── article.js
│   └── index.js
├── public 
├── router-config.js //路由配置
├── server
├── static
├── util //公共方法
│   └── index.js
└── views //前端项目
    ├── App.vue
    ├── api //前端接口
    │   └── index.js
    ├── asset
    │   └── style
    │       ├── screen.less
    │       └── them.css
    ├── components //组件
    │   └── message
    │       ├── index.js
    │       └── message.vue
    ├── config.json //环境参数配置
    ├── entry-client.js //客户端入口
    ├── entry-server.js //服务器入口
    ├── index.html
    ├── layouts
    │   ├── default.vue
    │   └── error.vue
    ├── main.js //前端入口
    ├── pages //页面
    │   ├── about.vue
    │   ├── admin.vue
    │   ├── common
    │   │   ├── AuthorSide.vue
    │   │   └── Nav.vue
    │   ├── details.vue
    │   ├── index.vue
    │   ├── login.vue
    │   └── logout.vue
    ├── router //路由
    │   └── index.js
    ├── store
    │   ├── actions.js
    │   ├── getters.js
    │   ├── index.js
    │   └── mutations.js
    └── util
        ├── fetch.js //axios配置
        ├── filters.js //vue配置filter方法
        └── title.js
```
