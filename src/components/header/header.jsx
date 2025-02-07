import React from 'react'
import './header.css'
function header({text}) {
  return (
    <header className='header'>
      <nav>
        <p>{text}</p>
      </nav>
    </header>
  )
}

export default header