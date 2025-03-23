import React, { useState } from 'react'
import "./RegisterButton.css"; 
import "react-toastify/dist/ReactToastify.css"; // Toastify stillerini eklemeyi unutma
import { ToastContainer, toast } from "react-toastify";
import {register} from "../../services/Register";
import { useNavigate } from 'react-router-dom';



function RegisterButton({butonBilgisi, kullaniciBilgileri, disabled}) {
  const navigate = useNavigate();

  const handleClick = async() =>{
    console.log("Gelen bilgiler",kullaniciBilgileri);
    console.log(typeof JSON.stringify(kullaniciBilgileri));
    try{
      const donenVeri = await register(kullaniciBilgileri);
      console.log("Donen veri: ",donenVeri);
      if (donenVeri === "User registered successfully") {
        toast.success("Kayıt Başarılı, Yönlendiriliyorsunuz...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // 3 saniye sonra yönlendirme yap
        setTimeout(() => {
          navigate("/loginPage");
        }, 3000);
      }
    }
    catch(err){
      toast.error("Kayıt başarısız! "+err, {
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
