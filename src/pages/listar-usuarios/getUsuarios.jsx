import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import './getUsuarios.css'

function GetUsuarios() {
  let [user, setUser] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function loadUsers() {
      
      const response = api.get('/listar', {
        headers: {Authorization : `Bearer ${token}`} 
      })
      
      user = (await response).data.user 
      setUser( user )
      console.log(user)
    }

    loadUsers()

  }, [])
  
  const tornarAdmin = async (userId) => {
    try{
      console.log(userId)
      const response =  await api.put(`/admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
    } catch (err) {
      console.log(err.message)
      console.log('erro front')
    }
  }

  return (
    <div >
      <HeaderPrivate text='Usuarios' ></HeaderPrivate>
      <div className='box-listar'>

        {user.map((user, key = user.id) => (
          <div key={key}>
            <div className='user-box'>
              <p>a: {user.id}</p>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => tornarAdmin(user.id)}>Tornar administrador</button>
            </div>
          </div>
        ))}
        <p></p>
      </div>

    </div>
  )
}

export default GetUsuarios