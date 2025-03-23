import React from 'react'
import "./SolMenuAyarlar.css";
import { IoMdSettings } from "react-icons/io";

function SolMenuAyarlar() {
  return (
    <div className='ayarlarIconAnaDiv'>
      <div className='ayarlarIcon'>
        <IoMdSettings />
      </div>
      <div>
        Ayarlar
      </div>
    </div>
  )
}

export default SolMenuAyarlar
