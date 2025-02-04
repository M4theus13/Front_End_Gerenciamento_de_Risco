import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { jwtDecode } from 'jwt-decode'
import './getUsuarios.css'

function GetUsuarios() {
  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) //informações dos usuarios que estão no site
  const token = localStorage.getItem('token')

  useEffect(() => {
    getUserInfo()
  }, [])
  
  const getUserInfo = async () => {
    const decodedToken = jwtDecode(token);
    const userIdInfo = decodedToken.id; // Obtém o ID do usuário do token decodificado
    try {
        const response = await api.put(`/info-user/${userIdInfo}`, {},{
          headers: {Authorization : `Bearer ${token}`} 
        })
        setUserLogado(response.data.userLogado[0]) //seta as informações do usuário	logado
        setUsersInfo(response.data.usersInfo) //seta as informações dos usuários
    } catch (err) {
      console.log(err.message)
    }
  }

  const tornarAdmin = async (userId) => {
    try{
      await api.put(`/up-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      getUserInfo()
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
      getUserInfo()
    } catch (err) {
      console.log(err.message)
      console.log('erro front')
    }
  }

  return (
    <div >
      <HeaderPrivate text='Usuarios' name={userLogado ? userLogado.name : ''}></HeaderPrivate>
      <div className='box-listar'>
      <p>Tela do adminstrador</p>
        {usersInfo.map((usersInfo, key = usersInfo.id) => (
          <div key={key}>
            <div className='user-box'>
              <p>{usersInfo.name}</p>
              <p>{usersInfo.isAdmin ? 'Administrador' : ''}</p>
              {usersInfo.isAdmin ? '' : <button onClick={() => tornarAdmin(usersInfo.id)}>Tornar administrador</button>}
              {usersInfo.isAdmin ?  <button onClick={() => removerAdmin(usersInfo.id)}>Remover administrador</button> : ''}
            </div>
          </div>
        ))}
        <p></p>
      </div>
    </div>
  )
}

export default GetUsuarios