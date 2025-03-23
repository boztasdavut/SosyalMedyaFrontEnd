import React from 'react'
import {login} from "../../services/Login";
import "./LoginButton.css";
import { useNavigate } from 'react-router-dom';

function LoginButton({butonBilgisi, kullaniciBilgileri}) {
  const navigate = useNavigate();

    const handleClick = async() =>{
        console.log("Gelen veri: ",kullaniciBilgileri);
        const donenVeri = await login(kullaniciBilgileri);
        console.log("Donen veri: ",donenVeri);
        navigate("/anasayfa");
    }

  return (
    <div className='loginButonAnaDiv'>
        <button onClick={handleClick} id='LoginButton'>{butonBilgisi}</button>
    </div>
  )
}

export default LoginButton
