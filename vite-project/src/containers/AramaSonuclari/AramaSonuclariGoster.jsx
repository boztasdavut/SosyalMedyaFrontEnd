import React, { useEffect, useState } from "react";
import "./AramaSonuclariGoster.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { aramaGecmisiKaydet } from "../../services/KullaniciAramaGecmisiKaydet.js";
import { aramaGecmisiGetir } from "../../services/KullanicininTumAramaGecmisi.js";

function AramaSonuclariGoster({ query = "", aramaSonuclari = [], isLoading }) {
  const navigate = useNavigate();
  const [aramaGecmisiSonuclari, setAramaGecmisiSonuclari] = useState([]);

  const kullanicininTumAramaGecmisiniGetir = async () => {
    const aramaGecmisi = await aramaGecmisiGetir();
    setAramaGecmisiSonuclari(aramaGecmisi);
    console.log("Arama gecmisi sonucları= ", aramaGecmisi);
  };

  useEffect(() => {
    kullanicininTumAramaGecmisiniGetir();
    console.log("Query bilgisi= ", aramaSonuclari);
  }, [aramaSonuclari]);

  if (!query.trim()) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Arama Geçmişi</h3>
        {aramaGecmisiSonuclari.map((aramaGecmisi) => (
          <div key={aramaGecmisi.aramaGecmisiId} className="aramaGecmisiDiv">
            <img src={aramaGecmisi.kullaniciProfilResmi} />
            <div>{aramaGecmisi.aramaIcerigi}</div>
          </div>
        ))}
      </div>
    );
  }

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

  if (aramaSonuclari.length === 0) {
    return <div className="no-results">Sonuç bulunamadı.</div>;
  }

  const aramadanKullaniciProfilineYonlendir = async (takmaAd) => {
    const yonlendirilecekUrlAdresi = `/profil/${takmaAd}`;
    navigate(yonlendirilecekUrlAdresi);
    const aramaBilgisi = {
      aramaIcerigi: takmaAd,
    };
    const gelenVeri = aramaGecmisiKaydet(aramaBilgisi);
    console.log("Arama bilgisi kaydedildi mi? ", gelenVeri);
  };

  // 4) Sonuç varsa listele
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Arama Sonuçları</h3>
      {aramaSonuclari.map((sonuc) => (
        <div
          key={sonuc.kullaniciId}
          className="aramaSonuclarDiv"
          onClick={() =>
            aramadanKullaniciProfilineYonlendir(sonuc.kullaniciTakmaAd)
          }
        >
          <img src={sonuc.kullaniciProfilResmi} alt="" />
          <div>{sonuc.kullaniciTakmaAd}</div>
        </div>
      ))}
    </div>
  );
}

export default AramaSonuclariGoster;
