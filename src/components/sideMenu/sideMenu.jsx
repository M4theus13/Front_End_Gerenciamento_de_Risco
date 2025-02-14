import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';
import './sideMenu.css'
import Logout from '../logout/logout';


function sideMenu({menuClass}) {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token) 
  const userAdminInfo = decoded.admin

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
    <div className={`${menuClass}`}>
      <button onClick={handdleClick} className='buttonMenu' >
        <IoMenu className={`icon-button ${menu ? 'hidden' : ''}`}/>
        <IoClose className={`icon-button ${!menu ? 'hidden' : ''}`}/>
      </button>
      <div className={`menuHeader ${menu ? '' : 'close'}`}>
        <button className='buttonMenuSide'>
          {userAdminInfo ? <Link to='/admin/listar-usuarios'>Administrador</Link> : ''}
        </button>
        <button className='buttonMenuSide'>Perfil</button>
        <button className='buttonMenuSide'>Configurações</button>
        <button ref={logoutElement} onClick={logout} className='buttonMenuSide'>Sair</button>
        <Logout ref={logoutElement}  onClick={logout} classList='hidden'></Logout>
      </div>
    </div>
  )
}

export default sideMenu