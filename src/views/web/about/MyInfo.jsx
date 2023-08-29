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
        {/* <li>
          其他
          <ul>
            <li>常用开发工具： idea、pycharm、vscode、git、</li>
            <li>熟悉的 UI 框架： Ant Design、Element UI、Element Plus、Ant Design Mobile</li>
            <li>具备良好的编码风格和习惯，团队规范意识，乐于分享</li>
          </ul>
        </li> */}
      </ul>
    </>
  )
}

export default MyInfo
