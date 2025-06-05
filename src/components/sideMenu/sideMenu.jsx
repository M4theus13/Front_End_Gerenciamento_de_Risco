import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import './sideMenu.css'
import Logout from '../logout/logout';
import '../../../src/index.css'

function sideMenu({menuClass, isAdmin}) {
  const [menu,setMenu] = useState(false) //menu começa como false
  
  const handdleClick = () => {
    setMenu(!menu)
  } 

  const logoutElement = useRef()

  const logout = () => {
    const logout = logoutElement.current

    console.log(logout)
    logout.classList.toggle('hidden')
    console.log('logout')
  }

  return (
    <div className={menuClass ? menuClass: ''}>
      <button onClick={handdleClick} className='buttonMenu' >
        <IoMenu className={`icon-button ${menu ? 'hidden' : ''}`}/>
        <IoClose className={`icon-button ${!menu ? 'hidden' : ''}`}/>
      </button>
      <div className={`menuHeader ${menu ? 'open' : 'close'}`}>
        {isAdmin ? <button className='buttonMenuSide'><Link to='/admin/usuarios'>Administrador</Link></button>  : <div className='displaynone'></div>}
        {isAdmin ? <button className='buttonMenuSide'><Link to='/admin/criar-usuario'>Criar Usuário</Link></button> : <div className='displaynone'></div>}
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