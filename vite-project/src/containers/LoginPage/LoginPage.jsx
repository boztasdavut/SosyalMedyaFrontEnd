import React, { useState } from 'react'
import RegisterLoginText from '../../components/RegisterLoginText/RegisterLoginText'
import RegisterLoginPassword from '../../components/RegisterLoginPassword/RegisterLoginPassword'
import LoginButton from '../../components/LoginButton/LoginButton'
import "./LoginPage.css";
import LoginRegisterGecis from '../../components/LoginRegisterGecis/LoginRegisterGecis';
import HesapOlusturYonlendir from '../../components/HesapOlusturYonlendir/HesapOlusturYonlendir';
import SifremiUnuttum from '../../components/SifremiUnuttum/SifremiUnuttum';

function LoginPage() {
    const[ePosta, setEPosta] = useState("");
    const[sifre, setSifre] = useState("");

    const userData={
        ePosta,
        sifre
    }



  return (
    <div id='loginPageAnaDiv'>
      <div className='loginPageContentDiv'>
        <div className='componentDiv'>
          <LoginRegisterGecis adres={"/loginPage"} /> 
        </div>
        <div className='componentDiv'>
          <RegisterLoginText placeholder={"E-Posta"} value={ePosta} onChange={setEPosta} />
        </div>
        <div className='componentDiv'>
          <RegisterLoginPassword placeholder={"Şifre Girin"} value={sifre} onChange={setSifre} />
        </div>
        <SifremiUnuttum />
        <div className='componentDiv'>
          <LoginButton butonBilgisi={"Giriş Yap"} kullaniciBilgileri={userData} />
        </div>
        <HesapOlusturYonlendir />
      </div>
        
        
    </div>
  )
}

export default LoginPage
