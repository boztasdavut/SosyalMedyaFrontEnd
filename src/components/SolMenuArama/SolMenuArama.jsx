import React from 'react'
import { FaSearch } from "react-icons/fa";
import "./SolMenuArama.css";
function SolMenuArama() {
  return (
    <div className='aramaIconAnaDiv'>
        <div className='aramaIcon'>
            <FaSearch />
        </div>
        <div>
            Arama
        </div>
      
    </div>
  )
}

export default SolMenuArama
