import React from 'react'
import './headerPrivate.css'


function headerPrivate({text, name}) {

  return (
    <header>
      <nav>
        <p>{text}</p>
        <p></p>

      </nav>
    </header>
  )
}

export default headerPrivate