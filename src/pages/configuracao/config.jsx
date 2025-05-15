import React, { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/headerPrivate/headerPrivate'
import MenuConfigs from '../../components/configs/menuConfigs/menuConfigs'
import { ComponentUpdateAvatar, ComponentName, ComponentEmail, ComponentPassword, ComponentDeleteAccount  } from '../../components/configs/componentsConfigs/componentsConfigs'
import './config.css'
import { useNavigate } from 'react-router-dom'
import { Me } from '../../../service/me'

function config() {
  const navigate = useNavigate()
  let [userData, setUserData] = useState(null)//informações do usuario logado para o user info
  const [token, setToken] = useState(null); // Estado para o token

  useEffect(() => {
    const controller = new AbortController(); // Para cancelar requisições pendentes

    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          setToken(null); // Atualiza estado do token
          navigate('/login')
          return
        } 
        setToken(storedToken); // Atualiza estado do token
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

    return () => controller.abort(); // Cancela a requisição se o componente for desmontado
  }, [token]); // Ainda dependemos do token para recarregar quando houver mudanças


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
      <HeaderPrivate text='Configuração' user={{name: userData?.name, isAdmin: userData?.isAdmin}} ></HeaderPrivate>
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