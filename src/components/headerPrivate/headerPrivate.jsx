import React from 'react'
import './headerPrivate.css'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {GetUserInfo} from '../../../service/getUsers.js'
import { jwtDecode } from 'jwt-decode';

function headerPrivate({text, name}) {

  const handdleClick = () => {
    document.getElementById('buttonMenuOpen').classList.toggle('hidden')
    document.getElementById('buttonMenuClose').classList.toggle('hidden')
    document.querySelector('.menuHeader').classList.toggle('open')
    document.querySelector('.menuHeader').classList.toggle('close')
  } 

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) 
  
  useEffect(() => {
    GetUserInfo(token , setUserLogado, setUsersInfo)
  }, [])

  const decoded = jwtDecode(token ,process.env.JWT_SECRET); //aqui

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
        {userLogado.Admin ? <Link to='/admin/listar-usuarios'>Administrador</Link> : ''}
        <p>Perfil</p>
        <p>Configurações</p>
        <p>Sair</p>
      </div>
    </header>
  )
}

export default headerPrivate