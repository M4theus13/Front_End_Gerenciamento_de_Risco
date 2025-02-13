import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';
import './sideMenu.css'

function sideMenu({menuClass}) {

  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token) 
  const userAdminInfo = decoded.admin

  const [menu,setMenu] = useState(false) //menu começa como false
  
  const handdleClick = () => {
    setMenu(!menu)
  } 

/*   const logoutElement = useRef()
  const logout = () => {
    const element = logoutElement.current
    console.log(element)
    element.classList.toggle('hidden')
    console.log('logout')
  }
*/

  return (
    <div className={`${menuClass}`}>
      <button onClick={handdleClick} className='buttonMenu' >
        <IoMenu className={`icon-button ${menu ? 'hidden' : ''}`}/>
        <IoClose className={`icon-button ${!menu ? 'hidden' : ''}`}/>
      </button>
      <div className={`menuHeader ${menu ? 'open' : 'close'}`}>
        {userAdminInfo ? <Link to='/admin/listar-usuarios'>Administrador</Link> : ''}
        <p>Perfil</p>
        <p>Configurações</p>
        <button>Sair</button>
      </div>
    </div>
  )
}

export default sideMenu