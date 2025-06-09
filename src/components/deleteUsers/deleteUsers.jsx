import React, { forwardRef } from 'react'
import './deleteUsers.css'
import { useNavigate } from 'react-router-dom'
import api from '../../../service/api'

const deleteUsers = forwardRef(( { onConfirm, onCancel }, refs) => {

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const handleDeleteUsersTextClick = (event) => {
    event.stopPropagation() // Impede a propagação do evento de clique para o elemento pai
  }

  return (
    <div className='deleteUsers hidden' onClick={handleContainerClick} ref={refs}>
      <div className='deleteUsers-text' onClick={handleDeleteUsersTextClick}>
        <p>
          Deseja excluir esta conta? não será possível reverter esta ação!
        </p>
        <div>
          <button onClick={onConfirm} className='buttonOptionDeleteUsers'>Sim</button>
          <button onClick={onCancel} className='buttonOptionDeleteUsers'>Não</button>
        </div>
      </div>
    </div>
  )
})

export default deleteUsers