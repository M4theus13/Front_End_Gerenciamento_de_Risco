import React, { useEffect, useRef, useState } from 'react';
import { GetUserInfo } from '../../../../service/getUsers';
import './componentsConfigs.css'
import api from '../../../../service/api';
import { Navigate, useNavigate } from 'react-router-dom';

function Component1() {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState()
  let [usersInfo, setUserInfo] = useState() 


  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo )
  }, [])

  const inputNewName = useRef()

  async function alterarNome() {
    await api.put(`/edit-name-user/${userLogado.id}`, {
      name: inputNewName.current.value
    }, {
      headers: {Authorization : `Bearer ${token}`}
    })

    navigate('/menu')
  }

  return <div className='component1'>
    <div className='component1-current-name'>
      <legend>Nome Atual</legend>
      <input type="text" value={userLogado?.name || ''} readOnly='disable'/>
    </div>

    <div className='component1-new-name'>
      <legend>Nome</legend>
      <input type="text" ref={inputNewName}/>
    </div>

    <button onClick={alterarNome}>Enviar</button>
  </div>;
}

function Component2() {
  return <div>

    <div>
      <legend>Senha Atual</legend>
      <input type="text" />
    </div>

    <div>
      <legend>Nova Senha</legend>
      <input type="text" />
    </div>

    <div>
      <legend>Confirmar Senha</legend>
      <input type="text" />
    </div>

  </div>;
}

function Component3() {
  return <div>
        <div>
      <legend>Email Atual</legend>
      <input type="text" />
    </div>

    <div>
      <legend>Novo Email</legend>
      <input type="text" />
    </div>


  </div>;
}

function Component4() {
  return <div>Esta é a tela do Componente 4</div>;
}

export { Component1, Component2, Component3, Component4 };
