import React from 'react'
import { BsPersonCircle } from "react-icons/bs";
import "./SolMenuProfil.css";


function SolMenuProfil() {
  
  return (
    <div className='profilIconAnaDiv'>
        <div className='profilIcon'>
            <BsPersonCircle />
        </div>
        <div>
            Profil
        </div>
    </div>
  )
}

export default SolMenuProfil
