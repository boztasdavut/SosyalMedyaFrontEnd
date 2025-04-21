import React from "react";
import "./AramaSonuclariGoster.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function AramaSonuclariGoster({ query = "", aramaSonuclari = [], isLoading }) {
  const navigate = useNavigate();

  // 1) Henüz yazı yoksa hiçbir şey render etme
  if (!query.trim()) return null;

  // 2) Yükleniyorsa loader göster
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <ClipLoader color="#4a90e2" size={30} />
      </div>
    );
  }

  // 3) Yükleme bitti, sonuç yoksa uyarı göster
  if (aramaSonuclari.length === 0) {
    return <div className="no-results">Sonuç bulunamadı.</div>;
  }

  // 4) Sonuç varsa listele
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
