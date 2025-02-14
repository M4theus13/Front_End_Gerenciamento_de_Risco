import React from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';

function headerPrivate({text, name, menu}) {

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