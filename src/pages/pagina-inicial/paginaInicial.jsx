import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { data, Link } from 'react-router-dom'
import './paginaInicial.css'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { Me } from '../../../service/me'
import { jwtDecode } from 'jwt-decode'

function paginaInicial() {

  let [userData, setUserData] = useState([])//informações do usuario logado para o user info
  
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return
    } 
    const fetchData = async () => {
      try {
        const data = await Me(token);
        if (data === undefined) {
          localStorage.removeItem('token')
        }
        setUserData(data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData()
  }, [])

  return (
    <div className='paginaInicial'>
      {
         !token ? <Header text='Pagina Principal' cadastro='ativado' login='ativado'></Header> : <HeaderPrivate text='Página inicial' user={{name: userData?.name, avatarURL:userData?.avatarURL}}></HeaderPrivate> 
      }
      <button>
        <Link to='/menu'>Menu</Link>
      </button>
    </div>
  )
}

export default paginaInicial