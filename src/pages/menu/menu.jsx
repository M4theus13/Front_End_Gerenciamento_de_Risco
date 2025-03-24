import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import './menu.css'
import { Me } from '../../../service/me.js'
import { jwtDecode } from 'jwt-decode'

function menu() {

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return
    } 
    const decodedToken = jwtDecode(token)
    if (!decodedToken.accountActive) {
      console.log('conta não esta ativada')
      return
    }
    Me(token, setUserLogado)
  }, [])

  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info

  return (
    <div>
      <HeaderPrivate text='Menu' name={userLogado.name}></HeaderPrivate>
      <div className='box-options'>
        <div className='options'>Conta SPDA</div>
        <div className='options'>Aterramento</div>
      </div>
    </div>
  )
}

export default menu