import React, { useEffect } from 'react'
import "./LoginRegisterGecis.css";
import { Link } from "react-router-dom";
function LoginRegisterGecis({adres}) {
    useEffect(()=>{
        if(adres === "/"){
            document.getElementById("kayitOlIdLoginRegisterGecis2").classList.add("loginRegisterGecisArkaPlan");
        }
        else if(adres === "/loginPage"){
            document.getElementById("girisYapIdLoginRegisterGecis2").classList.add("loginRegisterGecisArkaPlan");
        }
    },[])
    const goToKayitOl = () =>{
        document.getElementById("girisYapIdLoginRegisterGecis2").classList.remove("loginRegisterGecisArkaPlan");
        document.getElementById("kayitOlIdLoginRegisterGecis2").classList.add("loginRegisterGecisArkaPlan");
    }

    const goToGirisYap = () =>{
        document.getElementById("kayitOlIdLoginRegisterGecis2").classList.remove("loginRegisterGecisArkaPlan");
        document.getElementById("girisYapIdLoginRegisterGecis2").classList.add("loginRegisterGecisArkaPlan");
    }

  return (
    <div className='loginRegisterGecisAnaDiv'>
        <div className='kayitOlLoginRegisterGecis' id='kayitOlIdLoginRegisterGecis2'>
            <Link to="/" id='kayitOlIdLoginRegisterGecis' onClick={goToKayitOl}>Kayıt Ol</Link>
        </div>
        <div className='girisYapLoginRegisterGecis' id='girisYapIdLoginRegisterGecis2'>
            <Link to="/loginPage" id='girisYapIdLoginRegisterGecis' onClick={goToGirisYap}>Giriş Yap</Link>
        </div>
      
    </div>
  )
}

export default LoginRegisterGecis
