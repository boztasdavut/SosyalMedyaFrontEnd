import React from 'react'
import "./RegisterLoginDate.css";

function RegisterLoginDate({value, onChange}) {
  return (
    <div>
        <input
          type="date"
          className="custom-date"
          value={value}
          onChange={(e)=>onChange(e.target.value)}
        />
    </div>
  )
}

export default RegisterLoginDate
