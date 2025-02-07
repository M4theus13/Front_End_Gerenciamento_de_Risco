import React from 'react'
import './headerPrivate.css'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

function headerPrivate({text, name}) {

  return (
    <header className='headerPrivate'>
      <nav className='navPrivate'>
        <p>{text}</p>
        <div className='userMenu'>
          <p>{name}</p>
          <IoMenu className='menuIcon' id='menu'/>
          <IoClose className='menuIcon' id='menuClose'/>

        </div>
      </nav>

      <div className='menuHeader'>
        <Link To='/listar-usuarios'><p>Administrador</p></Link>
        <p>Perfil</p>
        <p>Configurações</p>
        <p>Sair</p>
      </div>
    </header>
  )
}

export default headerPrivate