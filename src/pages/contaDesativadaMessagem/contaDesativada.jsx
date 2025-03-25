import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import '../erro/erro.jsx'
import iconErro from '../../assets/erro-icon.png'
import { useNavigate } from 'react-router-dom'
import { Me } from '../../../service/me.js'

function contaDesativada() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState([])

// ad
useEffect(() => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  } 

  const fetchData = async () => {
    try {
      const data = await Me(token);
      setUserLogado(data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  fetchData()
}, [])

// if (userData === null) {
//   return <div>Carregando...</div>;
// }

useEffect(() => {

  console.log(userLogado)


}, [userLogado])
if (userLogado?.accountActive) {
  console.log('conta ativa')
  return
}

// a

  function returnToHome() {
    navigate('/')
  }

  return (
    <div>
      <HeaderPrivate text='' name={userLogado.name} menu='hidden'></HeaderPrivate>
      <div className='box-erro'>
        <div className='box-erro-container'>
          <img src={iconErro} alt="error-icone" className='error-icone'/>
          {/* <span className='erro-description'>Gerenciamento de Risco</span> */}
          <span className='erro-text'>Conta desativada</span>
          <span className='erro-description'>Ops, sua conta está desativada, entre em contato com o suporte!</span>
        </div>
        <button onClick={returnToHome} className='button-erro'>Voltar para a página inicial</button>
      </div>
    </div>
  )
}

export default contaDesativada