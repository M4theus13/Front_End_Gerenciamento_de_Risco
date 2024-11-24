import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import api from '../../../service/api'
import { useRef } from 'react'
import './cadastrar.css'

function cadastrar() {

  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  async function createUser() {
    try {

      await api.post('/usuarios/cadastro', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='box-cadastrar'>
      <Header text='Cadastrar'></Header>
      <div className='box-form'>
        <form>
          <input id='name' type="text" placeholder='Nome' ref={inputName}/>
          <input id='email' type="text" placeholder='Email' ref={inputEmail}/>
          <input id='password' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-cadastrar' type='button' onClick={createUser}>Criar</button>
        </form>
        <Link id='logar' to='/login'>Já tem conta? clique aqui</Link>
      </div>
    </div>
  )
}

export default cadastrar