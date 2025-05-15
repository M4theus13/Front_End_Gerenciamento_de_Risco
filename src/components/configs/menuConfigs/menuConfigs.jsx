import React from 'react';
import './menuConfigs.css'

function menuConfigs({ setComponent }) {
  return (
    <div className='container-menu-config'>
      <div>
        <button onClick={() => setComponent('ComponentUpdateAvatar')} className='button-menu-config'>Alterar Foto de Perfil</button>
      </div>
      <div>
       <button onClick={() => setComponent('ComponentName')} className='button-menu-config'>Alterar Nome</button>
      </div>
      <div>
        <button onClick={() => setComponent('ComponentEmail')} className='button-menu-config'>Alterar Email</button>
      </div>
      <div>
        <button onClick={() => setComponent('ComponentPassword')} className='button-menu-config'>Alterar Senha</button>
      </div>
      <div>
        <button onClick={() => setComponent('ComponentDeleteAccount')} className='button-menu-config'>Excluir Conta</button>
      </div>
    </div>
  );
}

export default menuConfigs;
