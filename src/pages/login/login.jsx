import React, { useRef } from 'react'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import './login.css'

function login() {
  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  async function createUser() {
    try {

      await api.post('/usuarios/login', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='box-logar'>
      <Header text='Login'></Header>
      <div className='box-form'>
        <form>
          <input id='email' type="text" placeholder='Email'/>
          <input id='password' type="text" placeholder='Senha' />
          <button className='button-logar' type='button' onClick={createUser}>Criar</button>
        </form>
      <Link id='cadastrar' to='/cadastrar'>Não tem conta? clique aqui</Link>
      </div>
    </div>
  )
}

export default login