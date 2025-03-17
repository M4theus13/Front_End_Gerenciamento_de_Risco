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
      event.target.placeholder = ''
    };

    const removeErrorLegend = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.innerText = ''
      }
    };

    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeErrorInput);
      input.ref.current.addEventListener('focus', removeErrorLegend);
    })
  }, [])

  const legendNewName = useRef()
  const inputNewName = useRef()

  const inputs = [
    {ref: inputNewName, textRef: legendNewName},
  ]

    async function alterarNome() {

      inputs.forEach((input) => {
      if (inputNewName.current?.value.trim() === '') {
          input.ref.current.classList.add('error')
          input.textRef.current.innerText = 'Campo obrigatório'
          hasError = true
        } else {
          hasError = false
        }
      })

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
      <div className='componentName-current-name-legend-box'>
        <legend>Nome Atual:</legend>
      </div>

      <div className='componentName-current-name-input-box'>
        <input type="text" value={userLogado?.name || ''} readOnly/>
      </div>
    </div>

    <div className='componentName-new-name'>
      <div className='componentName-new-name-legend-box'>
        <legend>Nome:</legend>
      </div>

      <div className='componentName-new-name-input-box'>
        <p className='componentName-new-name-text' ref={legendNewName}></p>
        <input type="text" ref={inputNewName}/>
      </div>
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
      event.target.placeholder = ''
    };

    inputEmail.current.addEventListener('focus', removeErrorInput)
    inputNewEmail.current.addEventListener('focus', removeErrorInput)
  }, [])

  const inputEmail = useRef()
  const inputNewEmail = useRef()

  let hasErrorEmail = false
  async function alterarEmail() {
    //validação se o campo do email novo esta vazio
    if (inputNewEmail.current?.value.trim() === '') {
      inputNewEmail.current.placeholder = 'Campo obrigatório'
      inputNewEmail.current.classList.add('error')
    } 
    //validação se o campo do email atual esta vazio
    if (inputEmail.current?.value.trim() === '') {
      inputEmail.current.placeholder = 'Campo obrigatório'
      inputEmail.current.classList.add('error')
    } 
    //validação se o campo do email atual e novo email estao vazios para nao fazer a requisição
    if (inputEmail.current?.value.trim() === '' || inputNewEmail.current?.value.trim() === '') {
      hasErrorEmail = true 
      return
    }

    //validação se o email novo tem @ e .com
    if  (!inputNewEmail.current?.value.includes('@') || !inputNewEmail.current?.value.includes('.com')) {
      inputEmail.current.value = ''
      inputNewEmail.current.placeholder = 'Email deve conter @ e .com'
      inputNewEmail.current.classList.add('error')
      hasErrorEmail = true
    } else {
      hasErrorEmail = false 
    }

    //validação se o email atual é correspondente ao email do usuario
    if (!hasErrorEmail) {
      //guarda valor do email do usuario que esta no banco de dados
      try  {
        const verificaEmail = await api.post(`/verify-email/${userLogado.id}`, {
          email: inputEmail.current.value
        }, {
          headers: {Authorization : `Bearer ${token}`}
        })

        //verifica se o email atual e o email do banco de dados são iguais
        if (verificaEmail.data.emailUser[0].email !== inputEmail.current.value) {
          inputEmail.current.value = ''
          inputEmail.current.placeholder = 'Email Incorreto'
          inputEmail.current.classList.add('error')
          hasErrorEmail = true
          return
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (!hasErrorEmail) {
      updateEmail()
      navigate('/menu')
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
    <div className='componentEmail-current-email'>
      <div className='componentEmail-legend-box'>
        <legend>Email Atual</legend>
      </div>
      <div className='componentEmail-input-box'>
        <p className='componentEmail-text'>Erro</p>
        <input type="text" ref={inputEmail}/>
      </div>
    </div>

    <div className='componentEmail-new-email'>
      <div className='componentEmail-legend-box'>
        <legend>Novo Email</legend>
      </div>
      <div className='componentEmail-input-box'>
        <p className='componentEmail-text'>Erro</p>
        <input type="text" ref={inputNewEmail}/>
      </div>
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

    const removeErrorInput = (event) => {
      event.target.classList.remove('error')
      event.target.placeholder = ''
    };

    inputPassword.current.addEventListener('focus', removeErrorInput)
    inputNewPassword.current.addEventListener('focus', removeErrorInput)
    inputConfirmNewPassword.current.addEventListener('focus', removeErrorInput)

  }, [])

  const navigate = useNavigate()
  let hasErrorPassword = false

  const inputPassword = useRef()
  const inputNewPassword = useRef()
  const inputConfirmNewPassword = useRef()

  async function updatePassword() {

    //validacao se campo de senha esta vazio
    if (inputPassword.current?.value.trim() === '') {
      inputPassword.current.value = ''
      inputPassword.current.placeholder = 'Campo obrigatório'
      inputPassword.current.classList.add('error')
    }
    //validacao se campo de nova senha esta vazio
    if (inputNewPassword.current?.value.trim() === '') {
      inputNewPassword.current.value = ''
      inputNewPassword.current.placeholder = 'Campo obrigatório'
      inputNewPassword.current.classList.add('error')
    }
    //validacao se campo de confirmar senha esta vazio
    if (inputConfirmNewPassword.current?.value.trim() === '') {
      inputConfirmNewPassword.current.value = ''
      inputConfirmNewPassword.current.placeholder = 'Campo obrigatório'
      inputConfirmNewPassword.current.classList.add('error')
    }

    //verifica se algum campo esta vazio e retorna erro
    if (inputPassword.current?.value.trim() === '' || inputNewPassword.current?.value.trim() === '' || inputConfirmNewPassword.current?.value.trim() === '') {
      hasErrorPassword = true
      return
    }

    //verifica se a nova senha é igual a senha de confirmação
    if (inputNewPassword.current?.value !== inputConfirmNewPassword.current?.value) {
      inputNewPassword.current.value = ''
      inputConfirmNewPassword.current.value = ''
      inputNewPassword.current.placeholder = 'Senha não corresponde'
      inputConfirmNewPassword.current.placeholder = 'Senha não corresponde'
      inputNewPassword.current.classList.add('error')
      inputConfirmNewPassword.current.classList.add('error')
      hasErrorPassword = true
    } 

    if (!hasErrorPassword) {
      try {
        const userPassword = await api.post(`/verify-password/${userLogado.id}`, {
          password: inputPassword.current.value
        },{
          headers: {Authorization : `Bearer ${token}`}
        })
        console.log(userPassword)
      if (userPassword.status === 200) {
        console.log('senha correta')
      } else {
        inputPassword.current.value = ''
        inputPassword.current.placeholder = 'Senha Incorreta'
        inputPassword.current.classList.add('error')
        hasErrorPassword = true
      }
  
      } catch (err) {
        console.log(err)
      }
    }

    if (!hasErrorPassword) {
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

  }

  return <div className='componentPassword'>
    <div className='componentPassword-current-password'>
      <div className='componentPassword-current-password-legend-box'>
        <legend>Senha Atual: </legend>
      </div>
      <div className='componentPassword-current-password-input-box'>
        <p className='componentPassword-errorText'>Error</p>
        <input type="text" ref={inputPassword}/>
      </div>
    </div>

    <div className='componentPassword-new-password'>
      <div className='componentPassword-new-password-legend-box'>
        <legend >Nova Senha: </legend>
      </div>
      <div className='componentPassword-new-password-input-box'>
        <p className='componentPassword-errorText'>Error</p>
       <input type="text" ref={inputNewPassword}/>
      </div>
    </div>

    <div className='componentPassword-confirm-new-password'>
      <div className='componentPassword-confirm-new-password-legend-box'>
        <legend>Confirmar Nova Senha: </legend>
      </div>
      <div className='componentPassword-confirm-new-password-input-box'>
        <p className='componentPassword-errorText'>Error</p>
        <input type="text" ref={inputConfirmNewPassword}/>
      </div>
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
