import React, { useEffect, useRef, useState } from 'react';
import { GetUserInfo } from '../../../../service/getUsers';
import './componentsConfigs.css'
import api from '../../../../service/api';
import { Navigate, useNavigate } from 'react-router-dom';

function ComponentName() {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState()
  let [usersInfo, setUserInfo] = useState() 


  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo )
  }, [])

  const inputNewName = useRef()

  async function alterarNome() {
    await api.put(`/edit-name-user/${userLogado.id}`, {
      name: inputNewName.current.value
    }, {
      headers: {Authorization : `Bearer ${token}`}
    })

    navigate('/menu')
  }

  return <div className='componentName'>
    <div className='componentName-current-name'>
      <legend>Nome Atual</legend>
      <input type="text" value={userLogado?.name || ''} readOnly='disable'/>
    </div>

    <div className='componentName-new-name'>
      <legend>Nome</legend>
      <input type="text" ref={inputNewName}/>
    </div>

    <button onClick={alterarNome}>Enviar</button>
  </div>;
}

function ComponentEmail() {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState()
  let [usersInfo, setUserInfo] = useState() 


  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo )
  }, [])

  const inputEmail = useRef()
  const inputNewEmail = useRef()

  async function alterarEmail() {

    try {
      const user = await api.post('/usuarios/user' , {
        email: inputEmail.current.value
      })
      if  (user.status === 201) { //se status 201 nao existe esse email
        console.log('email nao cadastrado ou nao encontrado')
      }
      if (user.status === 200) { //se status 200 ja existe usuario com esse email
        console.log('email encontrado')
        updateEmail()

      }
    } catch (err) {
      console.log(err)
    }

    async function updateEmail() {
      try {
        await api.put(`/edit-email-user/${userLogado.id}`, {
          newEmail: inputNewEmail.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
      } catch(err) {
        console.log(err)
      }
    }
    navigate('/menu')
  }

  return <div className='componentEmail'>
    <div>
      <legend>Email Atual</legend>
      <input type="text" ref={inputEmail}/>
    </div>

    <div>
      <legend>Novo Email</legend>
      <input type="text" ref={inputNewEmail}/>
    </div>

    <button onClick={alterarEmail}>Alterar</button>
  </div>;

}

function ComponentPassword() {

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState()
  let [usersInfo, setUserInfo] = useState() 


  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo )
  }, [])

  const navigate = useNavigate()
  const inputNewPassword = useRef()
  async function updatePassword() {
    try {
      await api.put(`/edit-password-user/${userLogado.id}`, {
        newPassword: inputNewPassword.current.value
      }, {
        headers: {Authorization : `Bearer ${token}`}
      })
    } catch(err) {
      console.log(err)
    }
    navigate('/menu')

  }


  return <div className='componentPassword'>
    <div>
      <legend>Senha Atual</legend>
      <input type="text" />
    </div>

    <div>
      <legend >Nova Senha</legend>
      <input type="text" ref={inputNewPassword}/>
    </div>

    <div>
      <legend>Confirmar Senha</legend>
      <input type="text" />
    </div>
    <button onClick={updatePassword}>Enviar</button>
  </div>;
}

function ComponentDeleteAccount() {
  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState()
  let [usersInfo, setUserInfo] = useState() 


  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo )
  }, [])

  const navigate = useNavigate()

  async function deleteAccount() {
    try {
      await api.delete(`/edit-delete-user/${userLogado.id}`, {
        headers: {Authorization : `Bearer ${token}`}
      })
    } catch (err) {
      console.log(err)
    }
    navigate('/')
    localStorage.removeItem('token')
  
  }

  return <div className='componentDeleteAccount'>
    <p>Deseja excluir sua conta?</p>
    <button onClick={deleteAccount}>Excluir</button>
  </div>;
}

export { ComponentName, ComponentEmail, ComponentPassword, ComponentDeleteAccount };
