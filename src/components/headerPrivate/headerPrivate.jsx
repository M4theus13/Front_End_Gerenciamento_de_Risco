import React from 'react'
import './headerPrivate.css'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

function headerPrivate({text, name}) {

  const handdleClick = () => {
    document.getElementById('buttonMenuOpen').classList.toggle('hidden')
    document.getElementById('buttonMenuClose').classList.toggle('hidden')
    document.querySelector('.menuHeader').classList.toggle('open')
    document.querySelector('.menuHeader').classList.toggle('close')
  } 

  return (
    <header className='headerPrivate'>
      <nav className='navPrivate'>
        <p>{text}</p>
        <div className='userMenu'>
          <p>{name}</p>
          <button onClick={handdleClick} className='buttonMenu' >
            <IoMenu className='hidden' id='buttonMenuOpen'/>
            <IoClose className='' id='buttonMenuClose'/>
          </button>
        </div>
      </nav>

      <div className='menuHeader open'>
        <Link to='/listar-usuarios'>Administrador</Link>
        <p>Perfil</p>
        <p>Configurações</p>
        <p>Sair</p>
      </div>
    </header>
  )
}

export default headerPrivate