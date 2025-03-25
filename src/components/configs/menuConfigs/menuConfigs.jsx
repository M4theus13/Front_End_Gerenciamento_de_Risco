import React from 'react';
import './menuConfigs.css'

function menuConfigs({ setComponent }) {
  return (
    <div>
      <button onClick={() => setComponent('ComponentUpdateAvatar')} className='button-menu-config'>Alterar Foto de Perfil</button>
      <button onClick={() => setComponent('ComponentName')} className='button-menu-config'>Alterar Nome</button>
      <button onClick={() => setComponent('ComponentEmail')} className='button-menu-config'>Alterar Email</button>
      <button onClick={() => setComponent('ComponentPassword')} className='button-menu-config'>Alterar Senha</button>
      <button onClick={() => setComponent('ComponentDeleteAccount')} className='button-menu-config'>Excluir Conta</button>
    </div>
  );
}

export default menuConfigs;
