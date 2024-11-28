import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import api from '../../../service/api'
import { useRef, useEffect } from 'react'
import './cadastrar.css'

function cadastrar() {

  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  const textName = useRef()
  const textEmail = useRef()
  const textPassword = useRef()

  const inputs = [
    {ref: inputName, textRef: textName},
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

  async function createUser() {
    let hasError = false
    inputs.forEach((input) => { 
      const valueInput = input.ref.current.value.trim()
      if (!valueInput) {
        input.ref.current.classList.add('errorEmptyInput')
        input.textRef.current.classList.remove('okText')
        input.textRef.current.classList.add('errorEmptyText')
      } else {
        input.ref.current.classList.remove('errorEmptyInput');
        input.textRef.current.classList.remove('errorEmptyText');
        input.textRef.current.classList.add('okText');
      }
    }) 

    if (!inputName. current.value.trim() || inputEmail.current.value.trim() || inputPassword.current.value.trim() ) {
      hasError = true
      return
    }
    
    if (!hasError) {

        try {
          if (hasError) {
            
          }
          await api.post('/usuarios/cadastro', {
            name: inputName.current.value,
          email: inputEmail.current.value,
          password: inputPassword.current.value
        })
        console.log(api)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='box-cadastrar'>
      <Header text='Cadastrar'></Header>
      <div className='box-form'>
        <form>
          <span  className='okText' ref={textName}>Nome Vazio</span>
          <input id='name' placeholder='Nome' ref={inputName}/>
          <span className='okText' ref={textEmail}>Email Vazio</span>
          <input id='email' type="text" placeholder='Email' ref={inputEmail}/>
          <span className='okText' ref={textPassword}>Senha Vazia</span>
          <input id='password' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-cadastrar' type='button' onClick={createUser}>Criar</button>
        </form>
        <Link id='logar' to='/login'>Já tem conta? clique aqui</Link>
      </div>
    </div>
  )
}

export default cadastrar