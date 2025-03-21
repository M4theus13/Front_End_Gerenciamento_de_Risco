import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import { GetUserInfo } from '../../../service/getUsers.js'
import './menu.css'
import Logout from '../../components/logout/logout.jsx'
import { useNavigate } from 'react-router-dom'

function menu() {
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return
    } 
    GetUserInfo(token , setUserLogado, setUsersInfo)
  }, [])

  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) 

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