import React from 'react'
import "./Button.css";

function Button({butonAdi}) {
  return (
    <div>
      <button id='butonInputArea'>{butonAdi}</button>
    </div>
  )
}

export default Button
