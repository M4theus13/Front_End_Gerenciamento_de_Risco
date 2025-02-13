import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { GetUserInfo }from '../../../service/getUsers'
import { jwtDecode } from 'jwt-decode'
import './getUsuarios.css'
import { useNavigate } from 'react-router-dom'

function GetUsuarios() {
  const navigate = useNavigate()

  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) //informações dos usuarios que estão no site
  
  let [userIdInfo, setUserIdInfo] = useState([]) //informações do usuario logado para o user info 
  let [userAdminInfo, setUserAdminInfo] = useState(false) //informações do usuario logado para o user info  

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      console.log('Usuário não encontrado')
      navigate('/')
      return
    } 
    const decoded = jwtDecode(token);

    setUserIdInfo(decoded.id) // Obtém o ID do usuário do token decodificado
    setUserAdminInfo(decoded.admin) // Obtém se é ADMIN do usuário do token decodificado
    
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
      <HeaderPrivate text='Usuarios' name={userLogado ? userLogado.name : ''} menu={'hidden'}></HeaderPrivate>
      <div className='box-listar'>
      <p>Tela do adminstrador</p>
        {usersInfo.map((usersInfo, key = usersInfo.id) => (
          <div key={key}>
            <div className='user-box'>
              <p>{usersInfo.name}</p>
              <p>{usersInfo.isAdmin ? 'Administrador' : ''}</p>
              {(userAdminInfo && !usersInfo.isAdmin) ?  <button onClick={() => tornarAdmin(usersInfo.id)}>Tornar administrador</button> : ''}
              {(userAdminInfo && usersInfo.isAdmin) ?  <button onClick={() => removerAdmin(usersInfo.id)}>Remover administrador</button> : ''}
              {userAdminInfo ? <button onClick={() => excluirUser(usersInfo.id)}>Deletar Usuário</button> : ''}
            </div>
          </div>
        ))}
        <p></p>
      </div>
    </div>
  )
}

export default GetUsuarios