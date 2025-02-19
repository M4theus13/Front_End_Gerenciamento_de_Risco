import Header from '../../components/header/header'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import api from '../../../service/api'
import { useRef, useEffect } from 'react'
import './cadastrar.css'

function cadastrar() {
  const navigate = useNavigate()

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
      event.target.classList.remove('error-empty-input-cadastrar');
    };

    const removeErrorText = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.classList.remove('error-empty-text-cadastrar');
        textRef.current.classList.add('text-input-cadastrar');
      }
    };

    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeErrorInput);
      input.ref.current.addEventListener('focus', removeErrorText)
    })
  }, [])

  async function createUser() {
    let hasError = false
    let hasErrorEmail = false
    inputs.forEach((input) => { 
      const valueInput = input.ref.current.value.trim()
      if (!valueInput) {
        input.ref.current.classList.add('error-empty-input-cadastrar')
        input.textRef.current.classList.remove('text-input-cadastrar')
        input.textRef.current.classList.add('error-empty-text-cadastrar')
        hasError = true
      } 
    }) 

    if (!inputs[1].ref.current.value.includes('@') && !inputs[1].ref.current.value.includes('.com') ) {
      hasErrorEmail = true
    }

    if (hasErrorEmail) {
      inputs[1].ref.current.classList.add('error-empty-input-cadastrar')
      inputs[1].textRef.current.classList.remove('text-input-cadastrar')
      inputs[1].textRef.current.classList.add('error-empty-text-cadastrar')
      if (inputs[1].ref.current.value.trim() === '') {
        inputs[1].textRef.current.innerText = 'Email vazio'
      } else {
        inputs[1].textRef.current.innerText = 'Email deve conter @ e .com'
      }
      hasError = true
    }

    if (!hasError) {
      try {
        const user = await api.post('/usuarios/user' , {
          email: inputEmail.current.value
        })
        if  (user.data.message === 'usuario não encontrado') {
          console.log('email nao cadastrado')
          sendingData()
        } else {
          hasErrorEmail = true 
          inputs[1].ref.current.classList.add('error-empty-input-cadastrar')
          inputs[1].textRef.current.classList.remove('text-input-cadastrar')
          inputs[1].textRef.current.classList.add('error-empty-text-cadastrar')
          inputs[1].textRef.current.innerText = 'Este email já esta cadastrado'
        }
        console.log('user', user)
      } catch (err) {
        console.log(err)
      }
    }

    async function sendingData() {
      try {
        await api.post('/usuarios/cadastro', {
          name: inputName.current.value,
          email: inputEmail.current.value,
          password: inputPassword.current.value
        })
        navigate('/login')
      } catch (err) {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    } 
  }

  return (
    <div className='box-cadastrar'>
      <Header text='Cadastrar' cadastro='desativado' login='ativado'></Header>
      <div className='box-form-cadastrar'>
        <form className='form-cadastrar'>
          <span id='text-cadastrar-name' className='text-input-cadastrar' ref={textName}>Nome Vazio</span>
          <input id='name-cadastrar' className='input-cadastrar' placeholder='Nome' ref={inputName}/>
          <span id='text-cadastrar-email' className='text-input-cadastrar' ref={textEmail}>Email Vazio</span>
          <input id='email-cadastrar' className='input-cadastrar' type="text" placeholder='seu@email.com' ref={inputEmail}/>
          <span id='text-cadastrar-password' className='text-input-cadastrar' ref={textPassword}>Senha Vazia</span>
          <input id='password-cadastrar' className='input-cadastrar' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-cadastrar' type='button' onClick={createUser}>Criar</button>
          <Link id='logar' to='/login'>Já tem conta? clique aqui</Link>
        </form>
      </div>
    </div>
  )
}

export default cadastrar