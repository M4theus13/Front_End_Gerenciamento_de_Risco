import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { Me } from '../../../service/me'
import './perfil.css'
import UserIcon from '../../assets/user-icon.jpg'
import EditImageIcon from '../../assets/edit-image-icon.png'
import { useNavigate } from 'react-router-dom'

function perfil() {
  const navigate = useNavigate()
  let [userData, setUserData] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      return
    } 
    const fetchData = async () => {
      try {
        const data = await Me(token);
        if (data === undefined) {
          localStorage.removeItem('token')
        }
        setUserData(data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData()
  }, [])
  
  const userIcon = UserIcon
  const editImageIcon = EditImageIcon


  function clickEditImage () {
    navigate('/menu/configuracao')
  }

  return (
    <div>
      <HeaderPrivate text='Perfil' user={{name: userData?.name, avatarURL:userData?.avatarURL}}></HeaderPrivate>
      <div className='container-perfil'>
        <div className='perfil'>
          <div className='perfil-info'>
            <div className='boxUserIconPerfil'>
              <img src={userIcon} alt="userIcon" className='userIconPerfil'/>
            <div className='boxEditImageIcon' onClick={clickEditImage}>
              <img src={editImageIcon} alt="userIcon" className='editImageIcon'/>
            </div>
            </div>
            <div>
              <p>Nome: {userData.name}</p>
              <p>Email: {userData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default perfil