import React from "react";
import "./AramaSonuclariGoster.css";
import { useNavigate } from "react-router-dom";

function AramaSonuclariGoster({
  query = "",
  aramaSonuclari = [],
  setAramaSonuclari,
}) {
  const navigate = useNavigate();

  if (!query.trim()) return null;

  if (aramaSonuclari.length === 0) {
    return <div className="no-results">Sonuç bulunamadı.</div>;
  }

  return (
    <div>
      {aramaSonuclari.map((sonuc) => (
        <div
          key={sonuc.kullaniciId}
          className="aramaSonuclarDiv"
          onClick={() => navigate(`/profil/${sonuc.kullaniciTakmaAd}`)}
        >
          <img src={sonuc.kullaniciProfilResmi} alt="" />
          <div>{sonuc.kullaniciTakmaAd}</div>
        </div>
      ))}
    </div>
  );
}

export default AramaSonuclariGoster;
