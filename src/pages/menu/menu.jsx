import React, { useEffect, useState} from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate.jsx'
import './menu.css'
import { Me } from '../../../service/me.js'
import { data, useNavigate } from 'react-router-dom'

function menu() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    } 

    const fetchData = async () => {
      try {
        const data = await Me(token);
        setUserData(data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData()
  }, [])
  
  return (
    <div>
      <HeaderPrivate text='Menu' name={userData?.name} ></HeaderPrivate>
      <div className='box-options'>
        <div className='options'>Conta SPDA</div>
        <div className='options'>Aterramento</div>
      </div>
    </div>
  )
}

export default menu