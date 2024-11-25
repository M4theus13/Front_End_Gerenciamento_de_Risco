import React from 'react'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import './home.css'

function home() {
  return (
    <div className='home-page'>
      <Header text='Pagina Principal'></Header>    
      <Link to='/cadastrar'>Criar conta</Link>
    </div>
  )
}

export default home