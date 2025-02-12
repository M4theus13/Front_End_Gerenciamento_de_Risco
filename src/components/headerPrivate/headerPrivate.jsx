import React, { useEffect, useRef, useState } from 'react'
import './headerPrivate.css'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Logout from '../logout/logout';
import { use } from 'react';

function headerPrivate({text, name}) {
  const [userAdminInfo, setUserAdminInfo] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Usuário não encontrado HEader')
      return
    } 
    const decoded = jwtDecode(token); //aqui
    const userAdminInfo = decoded.admin; // Obtém se é ADMIN do usuário do token decodificado
    setUserAdminInfo(userAdminInfo)
  }, [])
  
  const handdleClick = () => {
    document.getElementById('buttonMenuOpen').classList.toggle('hidden')
    document.getElementById('buttonMenuClose').classList.toggle('hidden')
    document.querySelector('.menuHeader').classList.toggle('open')
    document.querySelector('.menuHeader').classList.toggle('close')
  } 

  const logoutElement = useRef()
  const logout = () => {
    const element = logoutElement.current
    console.log(element)
    element.classList.toggle('hidden')
    console.log('logout')
  }

  return (
    <header className='headerPrivate'>
      <nav className='navPrivate'>
        <p>{text}</p>
        <div className='userMenu'>
          <div>
            <p>{name}</p>
          </div>
          <button onClick={handdleClick} className='buttonMenu' >
            <IoMenu className='' id='buttonMenuOpen'/>
            <IoClose className='hidden' id='buttonMenuClose'/>
          </button>
        </div>
      </nav>

      <div className='menuHeader close'>
        {userAdminInfo ? <Link to='/admin/listar-usuarios'>Administrador</Link> : ''}
        <p>Perfil</p>
        <p>Configurações</p>
        <button onClick={logout}>Sair</button>
      </div>
      <Logout ref={logoutElement}></Logout>
    </header>
  )
}

export default headerPrivate