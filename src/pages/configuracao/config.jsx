import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import MenuConfigs from '../../components/configs/menuConfigs/menuConfigs'
import { ComponentUpdateAvatar, ComponentName, ComponentEmail, ComponentPassword, ComponentDeleteAccount  } from '../../components/configs/componentsConfigs/componentsConfigs'
import './config.css'
import { useNavigate } from 'react-router-dom'
import { Me } from '../../../service/me'
function config() {

  const token = localStorage.getItem('token')
  let [userData, setUserData] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      console.log('sem token')
      navigate('/login')
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

  const [currentComponent, setCurrentComponent] = useState('ComponentUpdateAvatar');

  let RenderComponent;
  switch (currentComponent) {
    case 'ComponentUpdateAvatar':
      RenderComponent = ComponentUpdateAvatar;
      break;
    case 'ComponentName':
      RenderComponent = ComponentName;
      break;
    case 'ComponentEmail':
      RenderComponent = ComponentEmail;
      break;
    case 'ComponentPassword':
      RenderComponent = ComponentPassword;
      break;
    case 'ComponentDeleteAccount':
      RenderComponent = ComponentDeleteAccount;
      break;

    default:
      RenderComponent = ComponentUpdateAvatar;
  }

  return (
    <div>
      <HeaderPrivate text='Configuração' user={{name: userData?.name, avatarURL:userData?.avatarURL}} ></HeaderPrivate>
      {/* alterar senha, email, deletar conta,*/}
      <div className='container-config'>
        <div className='container-options-config'>
          <MenuConfigs setComponent={setCurrentComponent}></MenuConfigs>
        </div>
        
        <div className='container-content-config'>
          <RenderComponent></RenderComponent>
        </div> 

      </div>
      
    </div>
  )
}

export default config