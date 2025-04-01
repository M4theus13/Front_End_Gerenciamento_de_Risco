import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import './menu.css'
import { Me } from '../../../service/me.js'

function menu() {

  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      console.log('sem tokena')
      return
    } 

    const fetchData = async () => {
      try {
        const data = await Me(token);
        if (data === undefined) {
          // localStorage.removeItem('token')
        }
        setUserData(data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData()
  }, [])
  
  return (
    <div>
      <HeaderPrivate text='Menu' user={{name: userData?.name, avatarURL:userData?.avatarURL}} ></HeaderPrivate>
      <div className='box-options'>
        <div className='options'>Conta SPDA</div>
        <div className='options'>Aterramento</div>
      </div>
    </div>
  )
}

export default menu