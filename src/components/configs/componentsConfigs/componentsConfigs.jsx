import React, { useEffect, useRef, useState } from 'react';
import { GetUserInfo } from '../../../../service/getUsers';
import './componentsConfigs.css'
import api from '../../../../service/api';
import { Navigate, useNavigate } from 'react-router-dom';

function ComponentName() {
  const navigate = useNavigate()
  let hasError = false

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState()
  let [usersInfo, setUserInfo] = useState() 


  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo )

    const removeErrorInput = (event) => {
      event.target.classList.remove('error');
    };

    inputNewName.current.addEventListener('focus', removeErrorInput)
  }, [])

  const inputNewName = useRef()

    async function alterarNome() {

      if (inputNewName.current?.value.trim() === '') {
        inputNewName.current.placeholder = 'Campo obrigatório'
        inputNewName.current.classList.toggle('error')
        hasError = true
      } else {
        hasError = false
      }

      if (!hasError) {

        await api.put(`/edit-name-user/${userLogado.id}`, {
          name: inputNewName.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })
    
        navigate('/menu')

      } else {
        console.log('erro')
      }
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
    
    const removeErrorInput = (event) => {
      event.target.classList.remove('error');
    };

    inputEmail.current.addEventListener('focus', removeErrorInput)
    inputNewEmail.current.addEventListener('focus', removeErrorInput)
  }, [])

  const inputEmail = useRef()
  const inputNewEmail = useRef()

  let hasErrorEmail = false
  let input
  async function alterarEmail() {
    //validação se o campo do email novo esta vazio
    if (inputNewEmail.current?.value.trim() === '') {
      inputNewEmail.current.placeholder = 'Campo obrigatório'
      inputNewEmail.current.classList.toggle('error')
      console.log('teste1')
    } 
    //validação se o campo do email atual esta vazio
    if (inputEmail.current?.value.trim() === '') {
      inputEmail.current.placeholder = 'Campo obrigatório'
      inputEmail.current.classList.toggle('error')
      console.log('teste2')
    } 
    //validação se o campo do email atual e novo email estao vazios para nao fazer a requisição
    if (inputEmail.current?.value.trim() === '' || inputNewEmail.current?.value.trim() === '') {
      hasErrorEmail = true 
      console.log('teste3')
      return
    }

    //validação do email com  @ e .com
    if  (!inputNewEmail.current?.value.includes('@') || !inputNewEmail.current?.value.includes('.com')) {
      inputNewEmail.current.placeholder = 'Email deve conter @ e .com'
      inputNewEmail.current.classList.toggle('error')
      hasErrorEmail = true
    } else {
      hasErrorEmail = false 
    }

    if (!hasErrorEmail) {
      try {
        const user = await api.post('/usuarios/user' , {
          email: inputEmail.current.value
        })

        if  (user.status === 201) { //se status 201 nao existe esse email
          console.log('email nao cadastrado ou nao encontrado')
          inputEmail.current.placeholder = 'Email Incorreto ou não encontrado'
          inputEmail.current.classList.toggle('error')
          hasErrorEmail = true
          return
        }

        if (user.status === 200) { //se status 200 ja existe usuario com esse email
          console.log('email encontrado')
          if (!hasErrorEmail) {
            updateEmail()
            navigate('/menu')
          }

        }
      } catch (err) {
        console.log(err)
      }
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
