import React from 'react'
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import "./SolMenuAnasayfa.css";
function SolMenuAnasayfa() {
  const navigate = useNavigate();

  const handleClickAnasayfa = () =>{
    navigate("/anasayfa");
  }
  return (
    <div onClick={handleClickAnasayfa} className='anasayfaIconAnaDiv'>
        <div className='anasayfaIcon'>
            <IoMdHome />
        </div>
        <div>
            Anasayfa
        </div>

    </div>
  )
}

export default SolMenuAnasayfa
