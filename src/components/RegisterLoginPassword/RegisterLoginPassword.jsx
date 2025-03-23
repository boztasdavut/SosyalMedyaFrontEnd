import React from 'react'
import "./RegisterLoginPassword.css";

function RegisterLoginPassword({placeholder, value, onChange}) {
  return (
    <div>
            <input
                type="password"
                className="custom-input-password"
                placeholder={placeholder}
                maxLength={30}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
          />
    </div>
  )
}

export default RegisterLoginPassword
