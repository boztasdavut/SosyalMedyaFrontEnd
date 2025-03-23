import React, { useState } from 'react'
import "./RegisterLoginPhone.css";
function RegisterLoginPhone({placeholder, value, onChange}) {

      
  return (
    <div>
      <input
            type="tel"
            className="custom-input-phone"
            placeholder={placeholder}
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            maxLength={21}
            pattern="[0-9]{10}"
      />
    </div>
  )
}

export default RegisterLoginPhone
