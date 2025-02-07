import React from 'react'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import './paginaInicial.css'

function paginaInicial() {
  return (
    <div className='paginaInicial'>
      <Header text='Pagina Principal'></Header>    
      <Link to='/cadastrar'>Criar conta</Link>
    </div>
  )
}

export default paginaInicial