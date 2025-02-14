import React, { forwardRef } from 'react'
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

  const handleLogoutTextClick = (event) => {
    event.stopPropagation() // Impede a propagação do evento de clique para o elemento pai
  }

  return (
    <div className='logout hidden' onClick={noLogout} ref={refs}>
      <div className='logout-text' onClick={handleLogoutTextClick}>
        <p>
          Deseja sair? Será nescessario fazer o login novamente
        </p>
        <div>
          <button onClick={logout} className='buttonOptionLogout'>Sim</button>
          <button onClick={noLogout} className='buttonOptionLogout'>Não</button>
        </div>
      </div>
    </div>
  )
})

export default logout