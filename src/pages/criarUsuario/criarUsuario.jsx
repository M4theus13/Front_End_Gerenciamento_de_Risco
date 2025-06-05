import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Me } from '../../../service/me.js';
import { jwtDecode } from 'jwt-decode';
import './criarUsuario.css';
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx';
import api from '../../../service/api.js';

function CriarUsuario() {

  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token
  
  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  const textName = useRef()
  const textEmail = useRef()
  const textPassword = useRef()

  //organiza as mensagens referentes aos inputs em objetos
  const inputs = [
    {ref: inputName, textRef: textName},
    {ref: inputEmail, textRef: textEmail},
    {ref: inputPassword, textRef: textPassword}
  ]

  // funcao de remover o erro do input
  function removeErrorInput(event) {
    event.target.classList.remove('error-empty-input-cadastrar')
  };

  // funcao de remover o erro da mensagem do input
  function removeErrorText(event) {
    // Acessa a referência ao texto relacionado ao input focado
    const textRef = inputs.find(input => input.ref.current === event.target)?.textRef
    if (textRef?.current) {
      textRef.current.classList.remove('error-empty-text-cadastrar')
      textRef.current.classList.add('text-input-cadastrar')
    }
  }

  // agrupamento das funcoes de remover erro
  function removeError(event) {
    removeErrorInput(event)
    removeErrorText(event)
  }

  useEffect(() => {
    // remove os erros quando clicado no input e atualiza seu visual
    inputs.forEach((input) => {
      input.ref.current.addEventListener('focus', removeError);
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
        if  (user.status === 200) {
          sendingData()
        } else {
          hasErrorEmail = true 
          inputs[1].ref.current.classList.add('error-empty-input-cadastrar')
          inputs[1].textRef.current.classList.remove('text-input-cadastrar')
          inputs[1].textRef.current.classList.add('error-empty-text-cadastrar')
          inputs[1].textRef.current.innerText = 'Este email já esta cadastrado'
        }
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

        inputName.current.value = ''
        inputEmail.current.value = ''
        inputPassword.current.value = ''
      } catch (err) {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    } 
  }

    function isTokenExpired(token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp === undefined) {
          return false;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; 
      }
    }
  
    useEffect(() => {
      const controller = new AbortController();
  
      const fetchData = async () => {
        try {
          const storedToken = localStorage.getItem('token');
          if (!storedToken || isTokenExpired(storedToken)) {
            console.log('Token inválido ou expirado!');
            setToken(null); 
            navigate('/login')
            return
          } 
          setToken(storedToken); 
          const data = await Me(storedToken, { signal: controller.signal });
          setUserData(data);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Erro ao buscar dados:', error);
            if (localStorage.getItem('token')) {
              console.log('removendo token')
              localStorage.removeItem('token');
              setToken(null);
            }
          }
        }
      };
  
      fetchData()
      return () => controller.abort();
    }, [token]); 

  return (
    <div className='box-criar-usuario'>
      <HeaderPrivate text='Criar Usuário' user={{name: userData?.name, isAdmin: userData?.isAdmin}} ></HeaderPrivate>
      <div className='box-form-cadastrar'>
        <form className='form-cadastrar'>
          <span id='text-cadastrar-name' className='text-input-cadastrar' ref={textName}>Nome Vazio</span>
          <input id='name-cadastrar' className='input-cadastrar' placeholder='Nome' ref={inputName}/>
          <span id='text-cadastrar-email' className='text-input-cadastrar' ref={textEmail}>Email Vazio</span>
          <input id='email-cadastrar' className='input-cadastrar' type="text" placeholder='seu@email.com' ref={inputEmail}/>
          <span id='text-cadastrar-password' className='text-input-cadastrar' ref={textPassword}>Senha Vazia</span>
          <input id='password-cadastrar' className='input-cadastrar' type="text" placeholder='Senha' ref={inputPassword}/>
          <button className='button-cadastrar' type="button" onClick={createUser}>Criar</button>
        </form>
      </div>
    </div>
  )
}

export default CriarUsuario