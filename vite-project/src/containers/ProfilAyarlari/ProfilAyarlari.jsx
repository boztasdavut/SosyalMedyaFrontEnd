import React, { useEffect, useState } from "react";
import "./ProfilAyarlari.css";
import SolMenu from "../SolMenu/SolMenu";
import Mesajlasma from "../Mesajlasma/Mesajlasma";
import { useNavigate } from "react-router-dom";
import EPostaGuncelle from "../../components/EPostaGuncelle/EPostaGuncelle.jsx";
import SifreGuncelle from "../../components/SifreGuncelle/SifreGuncelle.jsx";

function ProfilAyarlari() {
  const [secilenBaslik, setSecilenBaslik] = useState("ePostaGuncelle");


  return (
    <div className="profil-ayarlari-container">
      <SolMenu />
      <Mesajlasma />
      <div className="ayarlar-icerik">
        <div className="basliklar">
          <button
            className={`baslik-btn ${
              secilenBaslik === "ePostaGuncelle" ? "aktif" : ""
            }`}
            onClick={() => setSecilenBaslik("ePostaGuncelle")}
          >
            E-Posta Adresi Güncelle
          </button>
          <button
            className={`baslik-btn ${
              secilenBaslik === "sifreGuncelle" ? "aktif" : ""
            }`}
            onClick={() => setSecilenBaslik("sifreGuncelle")}
          >
            Şifre Değiştir
          </button>
        </div>

        <div className="icerik-alani">
          {secilenBaslik === "ePostaGuncelle" && <EPostaGuncelle />}

          {secilenBaslik === "sifreGuncelle" && <SifreGuncelle />}
        </div>
      </div>
    </div>
  );
}

export default ProfilAyarlari;
