import React from 'react'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import './paginaInicial.css'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'

function paginaInicial() {

  const token = localStorage.getItem('token')


  return (
    <div className='paginaInicial'>
      {
        token ? 
        <div>asdaga</div> : <Header text='Pagina Principal' cadastro='ativado' login='ativado'></Header> 
      }
    </div>
  )
}

export default paginaInicial