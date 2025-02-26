import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import { GetUserInfo } from '../../../service/getUsers'
import api from '../../../service/api'
import MenuConfigs from '../../components/configs/menuConfigs/menuConfigs'
import { Component1, Component2, Component3, Component4 } from '../../components/configs/componentsConfigs/componentsConfigs'
import './config.css'


function config() {

  const token = localStorage.getItem('token')
  let [userLogado, setUserLogado] = useState([])
  let [usersInfo, setUserInfo] = useState([]) 

  useEffect(() => {
    GetUserInfo(token, setUserLogado, setUserInfo)
  }, [])

  const [currentComponent, setCurrentComponent] = useState('Component1');

  let RenderComponent;
  switch (currentComponent) {
    case 'Component1':
      RenderComponent = Component1;
      break;
    case 'Component2':
      RenderComponent = Component2;
      break;
    case 'Component3':
      RenderComponent = Component3;
      break;
    case 'Component4':
      RenderComponent = Component4;
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