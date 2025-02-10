import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function header({text, cadastro ,login}) {
  return (
    <header className='headerPublic'>
      <nav className='navPublic'>
        <p>{text}</p>
        <div>
          {cadastro === 'ativado' ? <Link to='/cadastrar'><button>Criar conta</button></Link> : null}
          {login === 'ativado' ? <Link to='/login'><button>Logar</button></Link> : null}
        </div>
      </nav>
    </header>
  )
}

export default header