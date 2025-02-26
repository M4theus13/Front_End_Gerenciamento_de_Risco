import React from 'react';
import './menuConfigs.css'

function menuConfigs({ setComponent }) {
  return (
    <div>
      <button onClick={() => setComponent('Component1')} className='button-menu-config'>Nome</button>
      <button onClick={() => setComponent('Component2')} className='button-menu-config'>Alterar Senha</button>
      <button onClick={() => setComponent('Component3')} className='button-menu-config'>Alterar Email</button>
      <button onClick={() => setComponent('Component4')} className='button-menu-config'>Excluir conta</button>
    </div>
  );
}

export default menuConfigs;
