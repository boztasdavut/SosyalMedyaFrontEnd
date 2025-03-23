import React from 'react'
import "./RegisterLoginText.css";

function RegisterLoginText({placeholder, value, onChange}) {

  return (
    <div>
          <input
              type="text"
              className="custom-input-text"
              placeholder={placeholder}
              maxLength={30}
              value={value}
              onChange={(e)=>onChange(e.target.value)}
          />
    </div>
  );
}

export default RegisterLoginText
