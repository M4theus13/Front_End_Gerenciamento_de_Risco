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
        textRef.current.classList.add('okText');
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
        input.textRef.current.classList.remove('okText')
        input.textRef.current.classList.add('errorEmptyText')
      }
    })

    if (!inputEmail.current.value.trim() || !inputPassword.current.value.trim()) {
      hasError = true
      return
    }

    if (!hasError) {

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
  }

  return (
    <div className='box-logar'>
      <HeaderPrivate text='Login'></HeaderPrivate>
      <div className='box-form'>
        <form>
          <span className='okText' ref={textEmail}>Email vazio</span>
          <input id='email' type="text" placeholder='Email' ref={inputEmail}/>
          <span className='okText' ref={textPassword}>Senha vazia</span>
          <input id='password' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-logar' type='button' onClick={loginUser}>Entrar</button>
        </form>
      <Link id='cadastrar' to='/cadastrar'>Não tem conta? clique aqui</Link>
      </div>
    </div>
  )
}

export default login