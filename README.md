# React Blog 


[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)



一键式安装部署React博客，解放你的双手，只需要修改配置文件就可以拥有一个完美的个人技术博客!!


这个自述文件包含以下内容:
1. 如何安装和部署博客
2. 如何配置前端页面信息
3. 如何配置敏感后端信息


## 目录

- [React Blog](#react-blog)
  - [目录](#目录)
  - [背景](#背景)
  - [安装](#安装)
  - [使用](#使用)
  - [功能和个人配置](#功能和个人配置)
    - [特性](#特性)
    - [个性化配置](#个性化配置)
    - [个性化信息配置](#个性化信息配置)
    - [后台敏感信息配置](#后台敏感信息配置)
  - [维护人员](#维护人员)

## 背景

`React Blog`最初是在[alvin0216](https://github.com/alvin0216)创建的[alvin0216/React-Blog] (https://github.com/alvin0216/react-blog)项目的基础上建立的，为了修复一些已知的问题，增加更多的个性化元素，最后但并非最不重要的是，我增加了网站的各种安全保证，使它更酷，更容易使用。


为了建立个人网站，首先需要租用云服务器(本文中一般使用centos)，并使用阿里云、腾讯云/AWS来托管网站。或者你可以使用Ngrok进行内部网渗透，并在你的PC上部署网站。


## 安装

如果您想部署在Centos服务器上，您可以直接使用我们的一键式安装部署脚本:
```sh
$ sh install.sh
```
如果您想自己安装和配置，请使用[node](http://nodejs.org),[npm](https://npmjs.com),[yarn](),[forever]() for this project. Please make sure You have performed the correct installation locally.

```sh
$ npm install --global yarn
$ npm install --global forever
```


## 使用

如果您使用上述一键式安装脚本，请付费后续启动时注意端口是否被占用:

```sh
$ yum install lsof
$ lsof -i:80
$ lsof -i:6060
```
如果端口被占用，请结束进程或修改端口

然后执行生产部署的以下说明

```sh
$ cd src
$ yarn build
$ nohup serve -s build -l 80 &
$
$ cd server
$ forever start app.js
```

Or for development environment deployment

```sh
$ cd src
$ nohup yarn dev
$
$ cd server
$ forever start app.js
```



## 功能和个人配置

### 特性

- [x] Front Desk: Homepage + List Page + Search Page + Category Page + Tab Page
- [x] Backstage: article management + user management
- [x] Responsive, article anchor navigation, back to top, `markdown` code highlighting, `mathjax` support
- [x] Users: users on the site, users authorized to log in by a third-party `github`
- [x] Users can comment and reply, as well as the status of **mail notification** reply
- [x] `md` file import and export function! You can directly upload the `md` file to generate an article
- [x] Separation of private and public articles
- [x] One-click comment without registration
- [x] Homepage background
- [x] Top of article
- [x] Gossip
- [x] Get the mailbox secret dynamically
- [x] Password transmission encryption
- [x] Background chart
- [x] Share Link for the admain to manage the visiablity of the private article
- [ ] Smart Recommendation (Related Recommendation)

### 个性化配置

个性化配置文件位置 ```src/config.js```

```js
import React from 'react'
import {Icon} from 'antd'
import SvgIcon from '@/components/SvgIcon'

import Href from '@/components/Href'
import MyInfo from '@/views/web/about/MyInfo'
import {GithubFill} from 'utils/antdIcon'
// API_BASE_URL
// export const SERVER_URL = 'http://127.0.0.1'
export const SERVER_URL = 'http://39.106.132.8'
export const API_BASE_URL = SERVER_URL + ':6060'
// export const API_BASE_URL = 'http://127.0.0.1:6060'
// project config
export const HEADER_BLOG_NAME = '菜园子' // header title 显示的名字

// === sidebar
export const SIDEBAR = {
  avatar: require('@/assets/images/avatar.jpeg'), // 侧边栏头像
  title: '蜡笔小开心❤️', // 标题
  subTitle: 'Crayon Little Happy', // 子标题
  // 个人主页
  homepages: {
    github: {
      link: 'https://github.com/514420887wzr',
      icon: <GithubFill className='homepage-icon' />,
    },
  },
  friendslink: {
    // 友情链接
    // lizi: {
    //   link: 'http://xxx/',
    //   img: 'http://xxx',
    // },
  },
}

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: 'b0090d8c2341f2c89ab0', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize', // 跳转的登录的地址
}

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, // 关于页面是否开启讨论
  renderMyInfo: <MyInfo /> // 我的介绍 自定义组件 => src/views/web/about/MyInfo.jsx
}

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: false, // 是否开启
  content: (
    <>
      {/* 个人笔记网站，请访问
      <Href href='https://www.yuque.com/zhongcaidexiaopengyou/kb'> panyunyi's note</Href> */}
    </>
  )
}

```
### 个性化信息配置

个性化信息配置文件位置 ```src/view/web/about/index.jsx```
```js
import React from 'react'

// components
import { Divider, Rate, Avatar } from 'antd'
import Href from '@/components/Href'
import SvgIcon from '@/components/SvgIcon'
import { QqOutline } from 'utils/antdIcon'

const skills = [
  {
    label: '熟练掌握 HTML5，CSS/CSS3，JavaScript ，ES6 语法',
    rate: 5
  },
  {
    label: '熟练掌握 Vue 全家桶（vue.js、vue-cli、vuex、vue router）',
    rate: 5
  },
  {
    label: '熟练使用 Element UI，Element Plus，Vant，Ant Design，Ant Design Mobile 等前端 UI 组件库',
    rate: 5
  },
  {
    label: '熟练使用 sass，less 预处理器执行编译 css',
    rate: 5
  },
  {
    label: '熟练使用 sourcetree、git 版本控制工具进行代码管理，快速解决代码冲突，远程合并分支',
    rate: 5
  },
  {
    label: '熟悉 npm、cnpm、pnpm、yarn 包管理工具',
    rate: 5
  },
  {
    label: '熟悉 TypeScript 的特性，可使用 TypeScript 进行开发',
    rate: 5
  },
  {
    label: '熟悉 echarts 可视化工具、百度地图、高德地图',
    rate: 5
  },
  {
    label: '熟练微信小程序开发，以及 uniapp 开发',
    rate: 5
  },
  {
    label: '熟悉 Node.js、Python 后端语言，以及 Mysql、MongoDB 数据库，可独立进行开发',
    rate: 4
  },
  {
    label: '熟悉 Koa、Mysql，针对需求可以做到简单的数据库设计、接口的开发与设计！',
    rate: 4
  },
  {
    label: '深入了解组件化开发，可进行二次开发组件',
    rate: 5
  },
  {
    label: '熟悉 Webpack、vite 等自动化工具',
    rate: 5
  },
  {
    label: '了解代码打包上传服务器、使用Apache工具、服务器优化等一系列操作',
    rate: 3
  },
  {
    label: '熟练使用Artplayer.js完成视频广告开发',
    rate: 5
  },
  {
    label: '熟悉使用lodash对array、object 和 string等数据处理',
    rate: 4
  },
  {
    label: '了解WebSocket、WebRtc工作流程，可进行开发',
    rate: 5
  }
]

const MyInfo = () => {
  return (
    <>

      <Divider orientation='center'>关于我</Divider>

      <ul className='about-list'>
        <li>姓名：王子润</li>
        <li>本科： 三亚学院（信息与智能工程学院）</li>
        <li>
          联系方式：
          <QqOutline /> 514420887
          <Divider type='vertical' />
          <SvgIcon type='iconemail' style={{ marginRight: 5, transform: 'translateY(2px)' }} />
          <a href='mailto:514420887@qq.com'>514420887@qq.com</a>
        </li>
        <li>工作地：上海</li>
        <li>
          技能
          <ul>
            {skills.map((item, i) => (
              <li key={i}>
                {item.label}
                <Rate defaultValue={item.rate} disabled />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  )
}

export default MyInfo

```
### 后台敏感信息配置


后台的敏感信息通过``server\config\index.js``进行配置，包括后台的启动端口、数据库的配置、评论邮件通知的配置。

```js
const devMode = process.env.NODE_ENV === 'development'
const config = {
  PORT: 6060, // 启动端口
  ADMIN_GITHUB_LOGIN_NAME: '514420887wzr', // 博主的 github 登录的账户名 user
  GITHUB: {
    client_id: 'b0090d8c2341f2c89ab0',
    client_secret: '1083e4b3a75526fdde8e5512f7aee8877b842795',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user', // 用于 oauth2
    fetch_user: 'https://api.github.com/user' // fetch user url https://api.github.com/users/gershonv
  },
  EMAIL_NOTICE: {
    // 邮件通知服务
    // detail: https://nodemailer.com/
    enable: true, // 开关
    transporterConfig: {
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: '514420887@qq.com', // generated ethereal user
        pass: 'pvyglnxelumtbhfh' // generated ethereal password 授权码 而非 密码
      }
    },
    subject: '蜡笔小开心的博客 - 您的评论获得新的回复！', // 主题
    text: '您的评论获得新的回复！',
    WEB_HOST: 'http://www.wangzirun.xyz' // email callback url
  },
  TOKEN: {
    secret: 'root', // secret is very important!
    expiresIn: '720h' // token 有效期
  },
  DATABASE: {
    database: 'blogs',
    user: 'root',
    password: 'root',
    options: {
      host: '127.0.0.1', // 连接的 host 地址
      dialect: 'mysql', // 连接到 mysql
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false, // 默认不加时间戳
        freezeTableName: true // 表名默认不加 s
      },
      timezone: '+08:00'
    }
  }
}

// 部署的环境变量设置
if (!devMode) {
  console.log('env production....')

  // ==== 配置数据库
  config.DATABASE = {
    database: 'blogs',
    user: 'root',
    password: 'root',
    options: {
      host: '127.0.0.1', // 连接的 host 地址
      dialect: 'mysql', // 连接到 mysql
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false, // 默认不加时间戳
        freezeTableName: true // 表名默认不加 s
      },
      timezone: '+08:00'
    }
  }

  // 配置 github 授权
  config.GITHUB.client_id = 'b0090d8c2341f2c89ab0'
  config.GITHUB.client_secret = '1083e4b3a75526fdde8e5512f7aee8877b842795'

  // ==== 配置 token 密钥
  config.TOKEN = {
    secret: 'root', // secret is very important!
    expiresIn: '720h' // token 有效期
  }

  // ==== 配置邮箱

  // config.EMAIL_NOTICE.enable = true
  config.EMAIL_NOTICE.transporterConfig.auth = {
    user: '514420887@qq.com', // generated ethereal user
    pass: 'pvyglnxelumtbhfh' // generated ethereal password 授权码 而非 密码
  }
  config.EMAIL_NOTICE.WEB_HOST = 'https://wangzirun.xyz'
}

module.exports = config
```

## 维护人员

[@蜡笔小开心❤️](https://github.com/514420887wzr)。
