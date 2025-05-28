import React from "react";
import "./LogoutModal.css";
import { logout } from "../../services/Logout.js";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalProvider.jsx";
import { disconnect } from "../../services/SocketBaglantisi.js";

function LogoutModal({ setLogoutModalIsOpen }) {
  const { setMesajlasmaKutusuAcikMi } = useGlobalContext();
  const navigate = useNavigate();
  const logoutModalKapat = () => {
    setLogoutModalIsOpen(false);
  };

  const cikisYap = async () => {
    const basariDurumu = await logout();
    console.log("Logout durumu= ", basariDurumu);
    localStorage.removeItem("jwt");
    setMesajlasmaKutusuAcikMi(false);
    disconnect();
    navigate("/girisYap");
  };

  return (
    <div className="logoutModalAnaDiv">
      <div className="logoutModalKutucuk">
        <div className="logoutModalBaslik">
          Çıkış Yapmak İstediğinize Emin Misiniz?
        </div>
        <div className="logoutModalCevaplar">
          <div onClick={cikisYap} className="logoutModalSecenekEvet">
            Evet
          </div>
          <div onClick={logoutModalKapat} className="logoutModalSecenekHayır">
            Hayır
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
