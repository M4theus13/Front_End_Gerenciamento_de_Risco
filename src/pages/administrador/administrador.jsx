import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { GetUserInfo }from '../../../service/getUsers'
import { jwtDecode } from 'jwt-decode'
import './administrador.css'
import { replace, useNavigate } from 'react-router-dom'
import UserIcon from '../../assets/user-icon.jpg'

function administrador() {

  const userIcon = UserIcon

  const navigate = useNavigate()

  let [userLogado, setUserLogado] = useState([])//informações do usuario logado para o user info
  let [usersInfo, setUsersInfo] = useState([]) //informações dos usuarios que estão no site
  
  let [userIdInfo, setUserIdInfo] = useState([]) //informações do usuario logado para o user info 
  let [userAdminInfo, setUserAdminInfo] = useState() //informações do usuario logado para o user info  

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      console.log('sem token')
      navigate('/login', replace)
      return
    } 
    const decoded = jwtDecode(token);
    
    setUserIdInfo(decoded.id) // Obtém o ID do usuário do token decodificado
    setUserAdminInfo(decoded.admin) // Obtém se é ADMIN do usuário do token decodificado
    
   if (!decoded.admin) {
     navigate('/menu', replace)
     return
   }

    GetUserInfo(token, setUserLogado, setUsersInfo)
  }, [])
  
  const ativarConta = async (userId) => {
    try{
      await api.put(`/admin/active-account/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
        
      })
      GetUserInfo(token, setUserLogado, setUsersInfo)

    } catch (err) {
      console.log(err.message)
    }
  }

  const desativarConta = async (userId) => {
    try{
      await api.put(`/admin/desactive-account/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
        
      })
      GetUserInfo(token, setUserLogado, setUsersInfo)

    } catch (err) {
      console.log(err.message)
    }
  }


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
      <HeaderPrivate text='Usuarios' user={{name: userLogado?.name, avatarURL:userLogado?.avatarURL}} ></HeaderPrivate>
      <div className='box-listar'>
        {usersInfo.map((usersInfo, key = usersInfo.id) => (
          <div key={key}>
            <div className='user-box'>
              <div className='user-box-infos'>
                <div className='user-box-name'>
                  <img src={userIcon} alt="userIcon" className='userIcon'/>
                  <p>{usersInfo.name}</p>
                </div>
                <p>{usersInfo.isAdmin ? 'Administrador' : ''}</p>
                <div className='user-box-account'>
                  <div className={usersInfo.accountActive ? 'circle-status-account-on' : 'circle-status-account-off'}></div>
                  <p>{usersInfo.accountActive ? 'Conta Ativa' : 'Conta desativada'}</p>
                </div>
              </div>
              <div className='user-box-buttons'>
                {(userAdminInfo && !usersInfo.isAdmin) ?  <button className='buttonAdmin' onClick={() => tornarAdmin(usersInfo.id)}>Tornar administrador</button> : ''}
                {(userAdminInfo && usersInfo.isAdmin) ?  <button className='buttonAdmin' onClick={() => removerAdmin(usersInfo.id)}>Remover administrador</button> : ''}
                {usersInfo.accountActive ?
                <button className='buttonDesactiveAccount' onClick={() => desativarConta(usersInfo.id)}>Desativar Conta</button> 
                : ''}
                {!usersInfo.accountActive ? <button className='buttonActiveAccount' onClick={() => ativarConta(usersInfo.id)}>Ativar Conta</button> : ''}
                {userAdminInfo ? <button className='buttonDeleteUser' onClick={() => excluirUser(usersInfo.id)}>Deletar Usuário</button> : ''}
              </div>
            </div>
          </div>
        ))}
        <p></p>
      </div>
    </div>
  )
}

export default administrador