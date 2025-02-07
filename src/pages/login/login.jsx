import React, { useRef, useEffect } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import api from '../../../service/api'


function login() {
  const navigate = useNavigate()
  const inputEmail = useRef()
  const inputPassword = useRef()

  const textEmail = useRef()
  const textPassword = useRef()
  
  const inputs = [
    {ref: inputEmail, textRef: textEmail},
    {ref: inputPassword, textRef: textPassword}
  ]


  useEffect(() => {

    const removeErrorInput = (event) => {
      event.target.classList.remove('errorEmptyInput');
    };

    const removeErrorText = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.classList.remove('errorEmptyText');
        textRef.current.classList.add('okText-login');
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
      const valueInput = input.ref.current.value.trim()

      if (!valueInput) {
        input.ref.current.classList.add('errorEmptyInput')
        input.textRef.current.classList.remove('okText-login')
        input.textRef.current.classList.add('errorEmptyText')
        hasError = true

      }
    })

    if (!hasError) {
        try {

          const { data:token } =  await api.post('/usuarios/login', { //pegando apenas a data { data } do objeto, e chamando de token ":token"
            email: inputEmail.current.value,
            password: inputPassword.current.value
          })
          localStorage.setItem('token', token)
          navigate('/menu')

        } catch (err) {
          if (err.status === 404) {
            inputs[0].textRef.current.innerText = 'Usuário não encontrado ou senha inválida.'
            inputs[0].textRef.current.classList.remove('okText-login')
            inputs[0].textRef.current.classList.add('errorEmptyText')
            inputs.forEach((input) => {
              input.ref.current.classList.add('errorEmptyInput')
            })
          } else {
            // setError('Ocorreu um erro inesperado. Tente novamente.');
          }
        }
      }
  }

  return (
    <div className='box-logar'>
      <HeaderPrivate text='Login'></HeaderPrivate>
      <div className='box-form-login'>
        <form className='form-login'>
          <span className='okText-login' ref={textEmail}>Email Vazio</span>
          <input id='email' type="text" placeholder='Email' ref={inputEmail} required/>
          <span className='okText-login' ref={textPassword}>Senha Vazia</span>
          <input id='password' type="text" placeholder='Senha' ref={inputPassword} required/>
          <button className='button-logar' type='button' onClick={loginUser}>Entrar</button>
          <Link id='cadastrar' to='/cadastrar'>Não tem conta? clique aqui</Link>
        </form>
      </div>
    </div>
  )
}

export default login