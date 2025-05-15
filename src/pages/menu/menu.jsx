import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import './menu.css'
import { Me } from '../../../service/me.js'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function menu() {
  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
    const [token, setToken] = useState(null); // Estado para o token
  
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
    <div>
      <HeaderPrivate text='Menu' user={{name: userData?.name, isAdmin: userData?.isAdmin}} ></HeaderPrivate>
      <div className='box-options'>
        <div className='options'>Conta SPDA</div>
        <div className='options'>Aterramento</div>
      </div>
    </div>
  )
}

export default menu