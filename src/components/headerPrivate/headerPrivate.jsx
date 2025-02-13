import React from 'react'
import './headerPrivate.css'
import SideMenu from '../sideMenu/sideMenu.jsx';

function headerPrivate({text, name, menu}) {

  return (
    <header className='headerPrivate'>
      <nav className='navPrivate'>
        <p>{text}</p>
        <div className='userMenu'>
          <div>
            <p>{name}</p>
          </div>
          <SideMenu menuClass={menu}></SideMenu>
        </div>
      </nav>
    </header>
  )
}

export default headerPrivate