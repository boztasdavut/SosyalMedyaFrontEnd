import React, { useState } from 'react'
import "./RegisterButton.css"; 
import "react-toastify/dist/ReactToastify.css"; // Toastify stillerini eklemeyi unutma
import { ToastContainer, toast } from "react-toastify";
import {register} from "../../services/Register";
import { useNavigate } from 'react-router-dom';



function RegisterButton({butonBilgisi, kullaniciBilgileri, disabled, validasyon}) {
  const navigate = useNavigate();


  const handleClick = async() =>{
    console.log("Kullanıcı bilgileri",kullaniciBilgileri);
    console.log("Validasyon",validasyon);
    console.log("eposta validasyon",validasyon.ePosta);
    let totalHataMesaji = '';
    
    if(!validasyon.ePosta){
      totalHataMesaji = totalHataMesaji+" E-Posta Alanı Hatası. ";
    }
    if(!validasyon.kullaniciTakmaAd){
      totalHataMesaji = totalHataMesaji+" Takma Ad Alanı Hatası. ";
    }
    if(!validasyon.kullaniciTelefonNo){
      totalHataMesaji = totalHataMesaji+" Telefon Alanı Hatası. ";
    }
    if(!validasyon.sifre){
      totalHataMesaji = totalHataMesaji+ " Şifre Alanı Hatası. ";
    }
    if(!validasyon.kullaniciDogumTarihi){
      totalHataMesaji = totalHataMesaji+" Dogum tarihi Alanı Geçersiz.";
    }




    if (totalHataMesaji) {
      toast.error(totalHataMesaji, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    
  }

  return (
    <div className='registerButonAnaDiv'>
        <button disabled={disabled} onClick={handleClick} id='RegisterButton'>{butonBilgisi}</button>
        <ToastContainer />
    </div>
    
  )
}

export default RegisterButton
