import React, { useEffect, useState } from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';
import { Navigate } from 'react-router-dom';
function headerPrivate({text, name, menu}) {

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
          <div className='userMenu textHeaderPrivate'>
            <p>{name}</p>
          </div>
          <SideMenu menuClass={menu}></SideMenu>
        </div>
      </nav>
    </header>
  )
}

export default headerPrivate