import React, { useRef } from 'react'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import Login from '../login/login'

function cadastrar() {

  const name = useRef()
  const email = useRef()
  const password = useRef()

  return (
    <div>
      <Header></Header>
      <div>
        <form>
          <input type="text" placeholder='Nome' ref={name}/>
          <input type="text" placeholder='Email'ref={email}/>
          <input type="text" placeholder='Senha'ref={password}/>
          <button type='button'>Criar</button>
        </form>
      </div>
      <Link to={Login}>Já tem conta? clique aqui</Link>
    </div>
  )
}

export default cadastrar