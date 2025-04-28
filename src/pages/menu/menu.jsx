import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import './menu.css'
import { Me } from '../../../service/me.js'

function menu() {
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); // Atualiza o estado do token
  }, []);

  useEffect(() => {

    if (!token) {
      console.log('sem token no menu')
      return
    } 

    const fetchData = async () => {
      try {
        const data = await Me(token);
        setUserData(data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        localStorage.removeItem('token'); // Token inválido, remove
        setToken(null); // Atualiza estado do token
      }
    };

    fetchData()
  }, [token])
  console.log(userData)

  return (
    <div>
      <HeaderPrivate text='Menu' user={{name: userData?.name}} ></HeaderPrivate>
      <div className='box-options'>
        <div className='options'>Conta SPDA</div>
        <div className='options'>Aterramento</div>
      </div>
    </div>
  )
}

export default menu