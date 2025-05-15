import React from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';
import UserIcon from '../../assets/default-avatar-user.jpg'


function headerPrivate({text, user, menu}) {
  const userIcon = UserIcon
  return (
    <header className='headerPrivate'>
      <nav className='navPrivate textHeaderPrivate'>
        <p>{text}</p>
        <div className='userMenuBox'>
          <div className='userMenu textHeaderPrivate userInfo'>
            <p>{user?.name}</p>
            <img src={userIcon} className='userIcon'/>
          </div>
          <SideMenu menuClass={menu} isAdmin={user.isAdmin}></SideMenu>
        </div>
      </nav>
    </header>
  )
} 

export default headerPrivate