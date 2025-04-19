import React from "react";
import "./AramaSonuclariGoster.css";
import { useNavigate } from "react-router-dom";

function AramaSonuclariGoster({ aramaSonuclari, setAramaSonuclari }) {
  const navigate = useNavigate("");
  const navigateUserProfile = (kullaniciTakmaAd)=>{
    navigate(`/profil/${kullaniciTakmaAd}`)
  }
  return (
    <div>
      {aramaSonuclari.map((sonuc) => (
        <div onClick={()=>navigateUserProfile(sonuc.kullaniciTakmaAd)} key={sonuc.kullaniciId} className="aramaSonuclarDiv">
          <div>{sonuc.kullaniciProfilResmi}</div>
          <div>{sonuc.kullaniciTakmaAd}</div>
        </div>
      ))}
    </div>
  );
}

export default AramaSonuclariGoster;
