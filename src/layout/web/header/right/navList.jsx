import React from 'react'
import { EditOutline, FolderOutline, HomeOutline, MessageOutline, UserOutline, InstagramOutlined } from 'utils/antdIcon'

export default [
  {
    icon: <HomeOutline style={{ marginRight: 15 }} />,
    title: '首页',
    link: '/home'
  },
  {
    icon: <InstagramOutlined style={{ marginRight: 15 }} />,
    title: '美图分享',
    link: '/prettyPictures'
  },
  {
    icon: <FolderOutline style={{ marginRight: 15 }} />,
    title: '快捷导航',
    link: '/QuickNavigation'
  },
  {
    icon: <EditOutline style={{ marginRight: 15 }} />,
    title: '代码编辑器',
    link: '/codeEditor'
  },
  {
    icon: <UserOutline style={{ marginRight: 15 }} />,
    title: '关于',
    link: '/about'
  },
  {
    icon: <MessageOutline style={{ marginRight: 15 }} />,
    title: '碎🐡',
    link: '/fragment'
  },
  {
    icon: <EditOutline style={{ marginRight: 15 }} />,
    title: '归档',
    link: '/archives'
  },
  {
    icon: <FolderOutline style={{ marginRight: 15 }} />,
    title: '分类',
    link: '/categories'
  },
]
