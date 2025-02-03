import React from 'react'
import './headerPrivate.css'


function headerPrivate({text, name}) {

  return (
    <header>
      <nav>
        <p>{text}</p>
        <p>{name}</p>

      </nav>
    </header>
  )
}

export default headerPrivate