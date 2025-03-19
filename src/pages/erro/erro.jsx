import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import { GetUserInfo } from '../../../service/getUsers.js'
import Header from '../../components/header/header.jsx'
import './erro.css'
import iconErro from '../../assets/erro-icon.png'
import { useNavigate } from 'react-router-dom'

function erro() {

  const navigate = useNavigate()

  function returnToHome() {
    navigate('/')
  }

  return (
    <div>
      <Header text='Erro'></Header>
      <div className='box-erro'>
        <div className='box-erro-container'>
          <img src={iconErro} alt="error-icone" className='error-icone'/>
          <span className='erro-description'>Gerenciamento de Risco</span>
          <span className='erro-text'>Erro</span>
          <span className='erro-description'>Ops, parece que houve um imprevisto!</span>
        </div>
        <button onClick={returnToHome} className='button-erro'>Voltar para a página inicial</button>
      </div>
    </div>
  )
}

export default erro