import React from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';
import { Navigate } from 'react-router-dom';
import UserIcon from '../../assets/user-icon.jpg'

function headerPrivate({text, name, menu}) {
  const userIcon = UserIcon
  const token = localStorage.getItem('token')

  // Redireciona imediatamente se não houver token
  if (!token) {
    console.log('sem token')
    return <Navigate to="/login" replace />
  }

  return (
    <header className='headerPrivate'>
      <nav className='navPrivate textHeaderPrivate'>
        <p>{text}</p>
        <div className='userMenuBox'>
          <div className='userMenu textHeaderPrivate userInfo'>
            <p>{name}</p>
            <img src={userIcon} alt="userIcon" className='userIcon'/>
          </div>
          <SideMenu menuClass={menu}></SideMenu>
        </div>
      </nav>
    </header>
  )
}

export default headerPrivate