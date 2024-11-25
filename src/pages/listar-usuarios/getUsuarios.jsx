import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import './getUsuarios.css'

function GetUsuarios() {
  const [user, setUser] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function loadUsers() {
      
      const response = api.get('/listar', {
        headers: {Authorization : `Bearer ${token}`} 
      })
      
      const usuarios = (await response).data.user 
      console.log(response)
      setUser( usuarios )
    }

    loadUsers()

  }, [])
  
  return (
    <div >
      <HeaderPrivate text='Usuarios' ></HeaderPrivate>
      <div className='box-listar'>

        {user.map((user, id = user.id) => (
          <div key={id}>
            <div className='user-box'>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        ))}
        <p></p>
      </div>

    </div>
  )
}

export default GetUsuarios