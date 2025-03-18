import React, { useRef, useEffect } from 'react'
import Header from '../../components/header/header.jsx'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import api from '../../../service/api'

function login() {
  const navigate = useNavigate()

  //ref input
  const inputEmail = useRef()
  const inputPassword = useRef()

  //ref mensagem de erro input
  const textEmail = useRef()
  const textPassword = useRef()
  
  const inputs = [
    {ref: inputEmail, textRef: textEmail},
    {ref: inputPassword, textRef: textPassword}
  ]

  useEffect(() => {
    const removeErrorInput = (event) => {
      event.target.classList.remove('error-empty-input-login');
      hasError = false;
    };

    const removeErrorText = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.classList.remove('error-empty-text-login');
        textRef.current.classList.add('text-input-login');
      }
    };

    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeErrorInput);
      input.ref.current.addEventListener('focus', removeErrorText)
    })
  }, [])

  async function loginUser() {
    let hasError = false

    inputs.forEach((input) => {
      const valueInput = input.ref.current.value.trim() //remove os espaços em branco do input

      if (!valueInput) {
        input.ref.current.classList.add('error-empty-input-login')
        input.textRef.current.classList.remove('text-input-login')
        input.textRef.current.classList.add('error-empty-text-login')
        hasError = true
      }
    })

    if (!hasError) { //caso não tenha nenhum erro
        // guardando o token que chega da api 
        try {
          const response =  await api.post('/usuarios/login', { 
            email: inputEmail.current.value,
            password: inputPassword.current.value
          })
          const token = response.data
          localStorage.setItem('token', token)
          navigate('/menu')
        } catch (err) {
          if (err.status === 404) {
            inputs[0].textRef.current.innerText = 'Usuário não encontrado ou senha inválida.'
            inputs[0].textRef.current.classList.remove('text-input-login')
            inputs[0].textRef.current.classList.add('error-empty-text-login')
            inputs.forEach((input) => {
              input.ref.current.classList.add('error-empty-input-login')
            })
          } else {
            setError('Ocorreu um erro inesperado. Tente novamente.');
          }
        }
      }
  }

  return (
    <div className='box-login'>
      <Header text='Login' cadastro='ativado' login='desativado'></Header>
      <div className='box-form-login'>
        <form className='form-login'>
          <span id='text-login-email' className='text-input-login' ref={textEmail}>Email Vazio</span>
          <input id='email-login' className='input-login' type="text" placeholder='Email' ref={inputEmail} required/>
          <span id='text-login-password' className='text-input-login' ref={textPassword}>Senha Vazia</span>
          <input id='password-login' className='input-login' type="text" placeholder='Senha' ref={inputPassword} required/>
          <button className='button-login' type='button' onClick={loginUser}>Entrar</button>
          <Link id='cadastrar' to='/cadastrar'>Não tem conta? clique aqui</Link>
        </form>
      </div>
    </div>
  )
}

export default login