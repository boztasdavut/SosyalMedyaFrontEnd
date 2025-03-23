import React from 'react'
import "./RegisterLoginBio.css";

function RegisterLoginBio({placeholder, value, onChange}) {
  return (
    <div>
            <textarea 
              className="custom-textarea" 
              placeholder={placeholder}
              value={value}
              onChange={(e)=>onChange(e.target.value)}
              >

            </textarea>
    </div>
  )
}

export default RegisterLoginBio
