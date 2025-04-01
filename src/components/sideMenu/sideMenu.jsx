import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';
import './sideMenu.css'
import Logout from '../logout/logout';

function sideMenu({menuClass}) {
  const token = localStorage.getItem('token')

  if (!token) {
    console.log('sem token side menu')
    return
  }

  const decoded = jwtDecode(token) 
  const userAdminInfo = decoded.isAdmin
  const [menu,setMenu] = useState(false) //menu começa como false
  
  const handdleClick = () => {
    setMenu(!menu)
  } 

  const logoutElement = useRef()
  const buttonLogout = useRef()

  const logout = () => {
    const logout = logoutElement.current

    const button = buttonLogout.current
    console.log(logout)
    logout.classList.toggle('hidden')
    console.log('logout')
  }

  const logoutBoxRef = useRef()

  const closeLogout = () => {
    const logoutBox = logoutBoxRef.current
    logoutBox.classList.toggle('hidden')
  }

  return (
    <div className={menuClass ? menuClass: ''}>
      <button onClick={handdleClick} className='buttonMenu' >
        <IoMenu className={`icon-button ${menu ? 'hidden' : ''}`}/>
        <IoClose className={`icon-button ${!menu ? 'hidden' : ''}`}/>
      </button>
      <div className={`menuHeader ${menu ? 'open' : 'close'}`}>
        <button className='buttonMenuSide'>
          {userAdminInfo ? <Link to='/admin/usuarios'>Administrador</Link> : ''}
        </button>
        <button className='buttonMenuSide'><Link to={'/'}>Página Inicial</Link></button>
        <button className='buttonMenuSide'><Link to='/menu'>Menu</Link></button>
        <button className='buttonMenuSide'><Link to='/menu/perfil'>Perfil</Link></button>
        <button className='buttonMenuSide'><Link to='/menu/configuracao'>Configurações</Link></button>
        <button ref={logoutElement} onClick={logout} className='buttonMenuSide'>Sair</button>
        <Logout ref={logoutElement}  onClick={logout} classList='hidden'></Logout>
      </div>
    </div>
  )
}

export default sideMenu