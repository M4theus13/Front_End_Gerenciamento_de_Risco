import React, { useEffect, useRef, useState } from 'react'
import api from '../../../service/api'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { Me } from '../../../service/me.js'
import { Users }from '../../../service/users.js'
import './administrador.css'
import UserIcon from '../../assets/default-avatar-user.jpg'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import iconErro from '../../assets/erro-icon.png'
import DeleteUsers from '../../components/deleteUsers/deleteUsers.jsx'

function administrador() {
  const navigate = useNavigate()
  const userIcon = UserIcon
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  let [usersData, setUsersData] = useState([])//informações do usuario logado para o user info

  const [update, setUpdate] = useState(false) // Estado para forçar atualização

  const [token, setToken] = useState(null); // Estado para o token

  const handleDataReload = () => {
    setUpdate(prev => !prev);
    fetchData();
  };

    function isTokenExpired(token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp === undefined) {
          return false;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; 
      }
    }

    const controller = new AbortController(); // Para cancelar requisições pendentes


    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          setToken(null); // Atualiza estado do token
          navigate('/login')
          return
        } 
        setToken(storedToken || isTokenExpired(storedToken)); // Atualiza estado do token
        const dataUser = await Me(storedToken, { signal: controller.signal });
        const dataUsers = await Users(storedToken, { signal: controller.signal });
        setUserData(dataUser);
        setUsersData(dataUsers);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao buscar dados:', error);
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setToken(null);
          }
        }
      }
    };

  useEffect(() => {
    fetchData()
    return () => controller.abort(); // Cancela a requisição se o componente for desmontado
  }, [token, update]); // Ainda dependemos do token para recarregar quando houver mudanças

  const ativarConta = async (userId) => {
    try{
      await api.put(`/admin/active-account/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      handleDataReload()
    } catch (err) {
      console.log(err.message)
    }
  }

  const desativarConta = async (userId) => {
    try{
      await api.put(`/admin/desactive-account/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      handleDataReload()
    } catch (err) {
      console.log(err.message)
    }
  }

  const tornarAdmin = async (userId) => {
    try{
      await api.put(`/admin/add-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
        
      })
      handleDataReload()
    } catch (err) {
      console.log(err.message)
    }
  }

  const removerAdmin = async (userId) => {
    try{
      await api.put(`/admin/rem-admin/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      handleDataReload()
    } catch (err) {
      console.log(err.message)
    }
  }

  const excluirUser = async (userId) => {
    try{
      await api.put(`/admin/delete-user/${userId}`,{} ,{
        headers: {Authorization : `Bearer ${token}`}
      })
      handleDataReload()
      } catch (err) {
        console.log(err)
      } 
  }

  
    const excluirUsers = useRef()
  
    const confirmExcluirUser = (userId) => {
      const logout = excluirUsers.current
  
      console.log(logout)
      logout.classList.toggle('hidden')
      console.log('logout')
    }
  

  return (
    
    <div >
      <HeaderPrivate text='Administrador' user={{name: userData?.name, isAdmin: userData?.isAdmin}} ></HeaderPrivate>
      <div className='box-listar'>
        {
        usersData.length === 0 ?
        <div className='box-erro-administrador'>
          <img src={iconErro} alt="iconErro" className='icon-erro'/>
          <p className='text-erro'>Nenhum usuário cadastrado !</p> 
        </div> :
        usersData.map((usersData, key = usersData.id) => (
          <div key={key}>
            <div className='user-box'>
              <div className='user-box-infos'>
                <div className='user-box-name'>
                  <img src={userIcon} alt="userIcon" className='usersIcon'/>
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
                {!usersData.accountActive ? <button className='buttonActiveAccount' onClick={() => ativarConta(usersData.id)}>Ativar Conta</button> : ''}
                {userData.isAdmin ? <button className='buttonDeleteUser' onClick={() => confirmExcluirUser(usersData.id)}>Deletar Usuário</button> : ''}
              </div>
            </div>
          </div>
        ))
        
        }
        {/* continuar aqui */}
        <DeleteUsers ref={excluirUsers}  onClick={confirmExcluirUser}></DeleteUsers>
      </div>
    </div>
  )
}

export default administrador