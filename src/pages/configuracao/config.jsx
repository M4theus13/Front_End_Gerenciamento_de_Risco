import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { GetUserInfo } from '../../../service/getUsers'
import api from '../../../service/api'
import MenuConfigs from '../../components/configs/menuConfigs/menuConfigs'
import { ComponentName, ComponentEmail, ComponentPassword, ComponentDeleteAccount } from '../../components/configs/componentsConfigs/componentsConfigs'
import './config.css'
import { useNavigate } from 'react-router-dom'

function config() {

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState([])
  let [usersInfo, setUserInfo] = useState([]) 

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      console.log('sem token')
      navigate('/login')
      return
    } 
    GetUserInfo(token, setUserLogado, setUserInfo)
  }, [])

  const [currentComponent, setCurrentComponent] = useState('ComponentName');

  let RenderComponent;
  switch (currentComponent) {
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
      RenderComponent = Component1;
  }

  return (
    <div>
      <HeaderPrivate text='Configuração' name={userLogado.name} ></HeaderPrivate>
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