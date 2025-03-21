import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import './paginaInicial.css'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { GetUserInfo }from '../../../service/getUsers'

function paginaInicial() {

  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) //informações dos usuarios que estão no site
  
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return
    } 
    GetUserInfo(token, setUserLogado, setUsersInfo)
  }, [])

  return (
    <div className='paginaInicial'>
      {
         !token ? <Header text='Pagina Principal' cadastro='ativado' login='ativado'></Header> : <HeaderPrivate text='Página inicial' name={userLogado.name}></HeaderPrivate> 
      }
      <button>
        <Link to='/menu'>Menu</Link>
      </button>
    </div>
  )
}

export default paginaInicial