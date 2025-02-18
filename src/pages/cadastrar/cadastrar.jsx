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
      event.target.classList.remove('errorEmptyInput');
    };

    const removeErrorText = (event) => {
      // Acessa a referência ao texto relacionado ao input focado
      const textRef = inputs.find(input => input.ref.current === event.target)?.textRef;
      if (textRef?.current) {
        textRef.current.classList.remove('errorEmptyText');
        textRef.current.classList.add('okText-cadastrar');
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
        input.ref.current.classList.add('errorEmptyInput')
        input.textRef.current.classList.remove('okText-cadastrar')
        input.textRef.current.classList.add('errorEmptyText')
        hasError = true
      } 
    }) 

    if (!inputs[1].ref.current.value.includes('@') && !inputs[1].ref.current.value.includes('.com') ) {
      hasErrorEmail = true
    }

    if (hasErrorEmail) { //CONTINUAR AQUI
      inputs.forEach((input) => {
        inputs[1].ref.current.classList.add('errorEmptyInput')
        inputs[1].textRef.current.classList.remove('okText-cadastrar')
        inputs[1].textRef.current.classList.add('errorEmptyText')
        inputs[1].textRef.current.innerText = 'Email deve conter @ e .com'
      })
      hasError = true
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
          navigate('/login')
        } catch (err) {
          console.log(err)
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
    <div className='box-cadastrar'>
      <Header text='Cadastrar' cadastro='desativado' login='ativado'></Header>
      <div className='box-form'>
        <form className='form-cadastrar'>
          <span  className='okText-cadastrar' ref={textName}>Nome Vazio</span>
          <input id='name-cadastrar' placeholder='Nome' ref={inputName}/>
          <span className='okText-cadastrar' ref={textEmail}>Email Vazio</span>
          <input id='email-cadastrar' type="text" placeholder='seu@email.com' ref={inputEmail}/>
          <span className='okText-cadastrar' ref={textPassword}>Senha Vazia</span>
          <input id='password-cadastrar' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-cadastrar' type='button' onClick={createUser}>Criar</button>
          <Link id='logar' to='/login'>Já tem conta? clique aqui</Link>
        </form>
      </div>
    </div>
  )
}

export default cadastrar