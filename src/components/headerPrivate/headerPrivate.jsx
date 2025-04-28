import React from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';
import { Navigate } from 'react-router-dom';
import UserIcon from '../../assets/default-avatar-user.jpg'


function headerPrivate({text, user, menu}) {
  const userIcon = UserIcon

  const token = localStorage.getItem('token')

  if (! token) {
    console.log('sem token')
    return <Navigate to="/login" replace />
  }


  return (
    <header className='headerPrivate'>
      <nav className='navPrivate textHeaderPrivate'>
        <p>{text}</p>
        <div className='userMenuBox'>
          <div className='userMenu textHeaderPrivate userInfo'>
            <p>{user?.name}</p>
            <img src={userIcon} className='userIcon'/>
          </div>
          <SideMenu menuClass={menu}></SideMenu>
        </div>
      </nav>
    </header>
  )
} 

export default headerPrivate