import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { Me } from '../../../service/me'
import './perfil.css'
import UserIcon from '../../assets/user-icon.jpg'

function perfil() {

  let [userLogado, setUserLogado] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      return
    } 
    Me(token, setUserLogado)
  }, [])
  
  const userIcon = UserIcon

  return (
    <div>
      <HeaderPrivate text='Perfil' name={userLogado.name}></HeaderPrivate>
      <div className='container-perfil'>
        <div className='perfil'>
          <div className='perfil-info'>
            <img src={userIcon} alt="userIcon" className='userIconPerfil'/>
            <div>
              <p>Nome: {userLogado.name}</p>
              <p>Email: {userLogado.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default perfil