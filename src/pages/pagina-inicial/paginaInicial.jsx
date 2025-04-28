import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
import './paginaInicial.css'
import { Me } from '../../../service/me'
import UserIcon from '../../assets/default-avatar-user.jpg'

function paginaInicial() {
  const userIcon = UserIcon
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); // Atualiza o estado do token
  }, []);

  useEffect(() => {

    if (!token) {
      console.log('sem token na pagina inicial')
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

  // while (!userData) {
  //   return <div>Loading...</div> // Exibe um carregando enquanto os dados não são obtidos
  // }


  return (
    <div className='paginaInicial'>
      {
         !token ? <Header text='Pagina Principal' cadastro='ativado' login='ativado'></Header> : <HeaderPrivate text='Página inicial' user={{name: userData?.name}}></HeaderPrivate> 
      }
      <button>
        <Link to='/menu'>Menu</Link>
      </button>
    </div>
  )
}

export default paginaInicial