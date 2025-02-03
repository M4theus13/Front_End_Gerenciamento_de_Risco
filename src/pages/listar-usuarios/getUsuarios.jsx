import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { jwtDecode } from 'jwt-decode'
import './getUsuarios.css'

function GetUsuarios() {
  let [user, setUser] = useState([]) //informações dos usuarios para o user
  let [userInfo, setUserInfo] = useState([])//informações do usuario logado para o user info
  const token = localStorage.getItem('token')

  async function loadUsers() {

    const response = api.get('/listar', {
      headers: {Authorization : `Bearer ${token}`} 
    })
    
    user = (await response).data.user 
    setUser( user )


  }


  useEffect(() => {
    loadUsers()
    getUserInfo()
  }, [])
  
  const getUserInfo = async () => {
    const decodedToken = jwtDecode(token);
    const userIdInfo = decodedToken.id; // Obtém o ID do usuário do token decodificado
    try {
        const response = await api.put(`/info-user/${userIdInfo}`, {},{
          headers: {Authorization : `Bearer ${token}`} 
        })
        setUserInfo(response.data.user[0]) //seta as informações do usuário	logado
    } catch (err) {
      console.log(err.message)
    }
  }

  const tornarAdmin = async (userId) => {
    try{
      await api.put(`/up-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      loadUsers()
    } catch (err) {
      console.log(err.message)
      console.log('erro front')
    }
  }

  const removerAdmin = async (userId) => {
    try{
      await api.put(`/del-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      loadUsers()
    } catch (err) {
      console.log(err.message)
      console.log('erro front')
    }
  }

  return (
    <div >
      <HeaderPrivate text='Usuarios' name={userInfo ? userInfo.name : ''}></HeaderPrivate>
      <div className='box-listar'>
      <p>Tela do adminstrador</p>
        {user.map((user, key = user.id) => (
          <div key={key}>
            <div className='user-box'>
              <p>{user.name}</p>
              <p>{user.isAdmin ? 'Administrador' : ''}</p>
              {user.isAdmin ? '' : <button onClick={() => tornarAdmin(user.id)}>Tornar administrador</button>}
              {user.isAdmin ?  <button onClick={() => removerAdmin(user.id)}>Remover administrador</button> : ''}
            </div>
          </div>
        ))}
        <p></p>
      </div>

    </div>
  )
}

export default GetUsuarios