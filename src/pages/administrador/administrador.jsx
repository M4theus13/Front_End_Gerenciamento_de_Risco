import React, { useEffect, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { Me } from '../../../service/me.js'
import { Users }from '../../../service/users.js'
import './administrador.css'
import { replace, useNavigate } from 'react-router-dom'
import UserIcon from '../../assets/default-avatar-user.jpg'


function administrador() {
  const userIcon = UserIcon
  const navigate = useNavigate()

  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  let [usersData, setUsersData] = useState([]) //informações dos usuarios que estão no site
  
  const [token, setToken] = useState(null); // Estado para o token
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); // Atualiza o estado do token
  }, []);

  useEffect(() => {

    if (!token) {

      console.log('sem token na pagina administrador')
      return
    } 

    // if (!userData?.isAdmin) {
    //   navigate('/menu', replace)
    //   console.log('sem permissão')
    //   return
    // }

    const fetchData = async () => {
      try {
        const data = await Me(token);
        const dataUsers = await Users(token)
        setUserData(data)
        setUsersData(dataUsers)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        localStorage.removeItem('token'); // Token inválido, remove
        setToken(null); // Atualiza estado do token
      }
    };

    fetchData()
  }, [token])
  
  const ativarConta = async (userId) => {
    try{
      await api.put(`/admin/active-account/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
        
      })

    } catch (err) {
      console.log(err.message)
    }
  }

  const desativarConta = async (userId) => {
    try{
      await api.put(`/admin/desactive-account/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
        
      })

    } catch (err) {
      console.log(err.message)
    }
  }

  const tornarAdmin = async (userId) => {
    try{
      await api.put(`/admin/add-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
        
      })
      console.log('aqui')

    } catch (err) {
      console.log(err.message)
    }
  }

  const removerAdmin = async (userId) => {
    try{
      await api.put(`/admin/rem-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })

    } catch (err) {
      console.log(err.message)
    }
  }

  const excluirUser = async (userId) => {
    try{
      await api.put(`/admin/delete-user/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })

      } catch (err) {
        console.log(err)
      } 
  }

  console.log(userData)
  console.log(usersData)
  if (!userData) {
    return <div className='headerPrivate'><p>Carregando...</p></div>
  } else{

  return (
    
    <div >
      <HeaderPrivate text='Usuarios' user={{name: userData?.name}} ></HeaderPrivate>
      <div className='box-listar'>
        {usersData.map((usersData, key = usersData.id) => (
          <div key={key}>
            <div className='user-box'>
              <div className='user-box-infos'>
                <div className='user-box-name'>
                  <img src={userIcon} alt="userIcon" className='userIcon'/>
                  <p>{usersData.name}</p>
                </div>
                <p>{usersData.isAdmin ? 'Administrador' : ''}</p>
                <div className='user-box-account'>
                  <div className={usersData.accountActive ? 'circle-status-account-on' : 'circle-status-account-off'}></div>
                  <p>{usersData.accountActive ? 'Conta Ativa' : 'Conta desativada'}</p>
                </div>
              </div>
              <div className='user-box-buttons'>
                {(userData.isAdmin && !usersData.isAdmin) ?  <button className='buttonAdmin' onClick={() => tornarAdmin(usersData.id)}>Tornar administrador</button> : ''}
                {(userData.isAdmin && usersData.isAdmin) ?  <button className='buttonAdmin' onClick={() => removerAdmin(usersData.id)}>Remover administrador</button> : ''}
                {usersData.accountActive ?
                <button className='buttonDesactiveAccount' onClick={() => desativarConta(usersData.id)}>Desativar Conta</button> 
                : ''}
                {!usersData.accountActive ? <button className='buttonActiveAccount' onClick={() => ativarConta(usersInfo.id)}>Ativar Conta</button> : ''}
                {userData.isAdmin ? <button className='buttonDeleteUser' onClick={() => excluirUser(usersData.id)}>Deletar Usuário</button> : ''}
              </div>
            </div>
          </div>
        ))}
        <p></p>
      </div>
    </div>
  )
}
}

export default administrador