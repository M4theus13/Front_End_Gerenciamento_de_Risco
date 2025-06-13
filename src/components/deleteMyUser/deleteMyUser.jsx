import React, { forwardRef } from 'react'
import './deleteMyUser.css'

const deleteMyUser = forwardRef(( { onConfirm, onCancel }, refs) => {

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const handleDeleteUsersTextClick = (event) => {
    event.stopPropagation() // Impede a propagação do evento de clique para o elemento pai
  }

  return (
    <div className='deleteMyUser hidden' onClick={handleContainerClick} ref={refs}>
      <div className='deleteMyUser-text' onClick={handleDeleteUsersTextClick}>
        <p>
          Deseja excluir esta conta? não será possível reverter esta ação!
        </p>
        <div>
          <button onClick={onConfirm} className='buttonOptionDeleteMyUser'>Sim</button>
          <button onClick={onCancel} className='buttonOptionDeleteMyUser'>Não</button>
        </div>
      </div>
    </div>
  )
})

export default deleteMyUser