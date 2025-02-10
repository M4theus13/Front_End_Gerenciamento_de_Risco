import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import { GetUserInfo } from '../../../service/getUsers.js'

function menu() {
  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) 
  
  useEffect(() => {
    GetUserInfo(token , setUserLogado, setUsersInfo)
  }, [])


  return (
    <div>
      <HeaderPrivate text='Menu' name={userLogado.name}></HeaderPrivate>
      menu  
    </div>
  )
}

export default menu