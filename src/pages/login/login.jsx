import React, { useRef } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import api from '../../../service/api'


function login() {
  const navigate = useNavigate()

  const inputEmail = useRef()
  const inputPassword = useRef()

  async function loginUser() {
    try {

      const { data:token } =  await api.post('/usuarios/login', { //pegando apenas a data { data } do objeto, e chamando de token ":token"
        email: inputEmail.current.value,
        password: inputPassword.current.value
      })
      localStorage.setItem('token', token)
      navigate('/listar-usuarios')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='box-logar'>
      <HeaderPrivate text='Login'></HeaderPrivate>
      <div className='box-form'>
        <form>
          <input id='email' type="text" placeholder='Email' ref={inputEmail}/>
          <input id='password' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-logar' type='button' onClick={loginUser}>Entrar</button>
        </form>
      <Link id='cadastrar' to='/cadastrar'>Não tem conta? clique aqui</Link>
      </div>
    </div>
  )
}

export default login