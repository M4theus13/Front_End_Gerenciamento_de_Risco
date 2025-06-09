import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import Header from '../../components/header/header'
import { Link, useNavigate } from 'react-router-dom'
import './paginaInicial.css'
import { Me } from '../../../service/me'
import UserIcon from '../../assets/default-avatar-user.jpg'
import { jwtDecode } from 'jwt-decode'

function paginaInicial() {
  const userIcon = UserIcon
  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp === undefined) {
        return false;
      }
      console.log(decoded)

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
    <div className='paginaInicial'>
      {
         !token ? <Header text='Pagina Principal' cadastro='ativado' login='ativado'></Header> : <HeaderPrivate text='Página inicial' user={{name: userData?.name, isAdmin: userData?.isAdmin}}></HeaderPrivate> 
      }
      <div className='container-pagina-inicial'>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error voluptates at sint dolorem et atque optio expedita magni doloribus unde minus amet veniam, enim in ea illum? Non, nemo voluptas.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error voluptates at sint dolorem et atque optio expedita magni doloribus unde minus amet veniam, enim in ea illum? Non, nemo voluptas.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error voluptates at sint dolorem et atque optio expedita magni doloribus unde minus amet veniam, enim in ea illum? Non, nemo voluptas.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error voluptates at sint dolorem et atque optio expedita magni doloribus unde minus amet veniam, enim in ea illum? Non, nemo voluptas.</p>
      </div>
    </div>
  )
}

export default paginaInicial