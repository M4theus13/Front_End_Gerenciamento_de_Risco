import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { GetUserInfo }from '../../../service/getUsers'
import './getUsuarios.css'

function GetUsuarios() {
  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) //informações dos usuarios que estão no site
  const token = localStorage.getItem('token')

  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUsersInfo)
  }, [])
  

  const tornarAdmin = async (userId) => {
    try{
      await api.put(`/admin/add-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      GetUserInfo(token, setUserLogado, setUsersInfo)
    } catch (err) {
      console.log(err.message)
    }
  }

  const removerAdmin = async (userId) => {
    try{
      await api.put(`/admin/rem-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      GetUserInfo(token, setUserLogado, setUsersInfo)
    } catch (err) {
      console.log(err.message)
    }
  }

  const excluirUser = async (userId) => {
    try{
      await api.put(`/admin/delete-user/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      GetUserInfo(token, setUserLogado, setUsersInfo)
      } catch (err) {
        console.log(err)
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
              {(userLogado.isAdmin && !usersInfo.isAdmin) ?  <button onClick={() => tornarAdmin(usersInfo.id)}>Tornar administrador</button> : ''}
              {(userLogado.isAdmin && usersInfo.isAdmin) ?  <button onClick={() => removerAdmin(usersInfo.id)}>Remover administrador</button> : ''}
              {userLogado.isAdmin ? <button onClick={() => excluirUser(usersInfo.id)}>Excluir</button> : ''}
            </div>
          </div>
        ))}
        <p></p>
      </div>
    </div>
  )
}

export default GetUsuarios