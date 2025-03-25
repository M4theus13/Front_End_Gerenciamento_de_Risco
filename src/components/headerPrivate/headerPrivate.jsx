import React from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';
import { Navigate } from 'react-router-dom';

function headerPrivate({text, user, menu}) {
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
            <p>{user?.name}</p>
            <img src={user?.avatarURL} className='userIcon'/>
          </div>
          <SideMenu menuClass={menu}></SideMenu>
        </div>
      </nav>
    </header>
  )
}

export default headerPrivate