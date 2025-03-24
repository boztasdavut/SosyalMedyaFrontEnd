import React from 'react'
import "./Logout.css";
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxLine } from "react-icons/ri";
import {logout} from "../../services/Logout";
import { ToastContainer, toast } from "react-toastify";


function Logout() {
    const navigate = useNavigate();

    const handleLogoutClick = async() =>{
        const donenVeri = await logout();
        console.log("donen veri",donenVeri);
        if(donenVeri === "Çıkış Yapıldı."){
            toast.error("Çıkış Yapılıyor...", {
                      position: "top-right",
                      autoClose: 2000,
                      onClose: () => navigate("/loginPage"), 
            });
        }
    }

  return (
    <div onClick={handleLogoutClick} className='logoutAnaDiv'>
        <div className='logoutIcon'>
            <RiLogoutBoxLine />
        </div>
        <div>
            Çıkış Yap
        </div>
        <ToastContainer />
    </div>
  )
}

export default Logout
