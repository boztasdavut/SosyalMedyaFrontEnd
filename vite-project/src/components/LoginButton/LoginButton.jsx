import React from 'react'
import {login} from "../../services/Login";
import "./LoginButton.css";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function LoginButton({butonBilgisi, kullaniciBilgileri}) {
  const navigate = useNavigate();

  


  const handleClick = async () => {
    try {
      const donenVeri = await login(kullaniciBilgileri);
      console.log("Dönen veri: ", donenVeri);
      if (!donenVeri || donenVeri.error) {  
        console.log("Hatalı giriş");
        toast.error(donenVeri.error || "E-Posta ya da Şifre Hatalı", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        console.log("Giriş başarılı");
        toast.success("Giriş başarılı! Yönlendiriliyorsunuz...", {
          position: "top-right",
          autoClose: 2000,
          className:"girisBasariliToastify",
          onClose: () => navigate("/anasayfa"), 
        });
      }
    } catch (error) {
      console.error("Giriş işlemi sırasında hata oluştu:", error);
      toast.error(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className='loginButonAnaDiv'>
        <button onClick={handleClick} id='LoginButton'>{butonBilgisi}</button>
        <ToastContainer />
    </div>
  )
}

export default LoginButton
