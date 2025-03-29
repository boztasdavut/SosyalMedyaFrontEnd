import React, { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import "./SolMenuProfil.css";
import { useNavigate } from "react-router-dom";
import { me } from "../../services/Me";
function SolMenuProfil() {
  const [gelenVeri, setGelenVeri] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const veri = await me();  // Eğer me() bir async fonksiyonsa burada await kullanmalısın
        setGelenVeri(veri);
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const profileYonlendir = () => {
    navigate(`/${gelenVeri.kullaniciTakmaAd}`);
  };

  return (
    <div onClick={profileYonlendir} className="profilIconAnaDiv">
      <div className="profilIcon">
        <BsPersonCircle />
      </div>
      <div>Profil</div>
    </div>
  );
}

export default SolMenuProfil;
