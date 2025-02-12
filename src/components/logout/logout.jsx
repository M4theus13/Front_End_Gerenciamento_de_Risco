import React, { forwardRef, useRef } from 'react'
import './logout.css'
import { useNavigate } from 'react-router-dom'

const logout = forwardRef((props, refs) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    navigate('/', {replace: true})
  }

  const noLogout = () => {
    document.querySelector('.logout').classList.add('hidden')
  }

  return (
    <div className='logout hidden' ref={refs}>
      <p>
        Deseja sair? Será nescessario fazer o login novamente
      </p>
      <div>
        <button onClick={logout}>Sim</button>
        <button onClick={noLogout}>Não</button>
      </div>
    </div>
  )
})

export default logout