import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, useLocation, useHistory } from 'react-router-dom'
import { Menu } from 'antd'

import navList from './navList'

function NavBar(props) {
  const location = useLocation()
  const history = useHistory()
  const { mode = 'horizontal' } = props
  const onClick = (MenuItem) => {
    history.push(MenuItem.link)
  }
  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
    // <Menu
    //   mode={mode} selectedKeys={[location.pathname]} className='header-nav'
    //   defaultSelectedKeys={['1']}
    //   defaultOpenKeys={['sub1']}
    //   theme="dark"
    //   items={navList}
    //   onClick={onClick} // 点击子菜单触发
    // // inlineCollapsed={false}
    // >
    // </Menu>
  )
}

export default NavBar
