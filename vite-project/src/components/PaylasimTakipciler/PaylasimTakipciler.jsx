import React, { useEffect, useState } from "react";
import "./PaylasimTakipciler.css";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../GlobalProvider.jsx";

function PaylasimTakipciler({
  tumTakipciler,
  setGonderiyiPaylasModalAcikMi,
  tumTakipEdilenler,
}) {
  const [totalListe, setTotalListe] = useState([]);
  const {
    karsiTarafIdBilgisi,
    setKarsiTarafIdBilgisi,
    karsiTarafAdi,
    setKarsiTarafAdi,
    profilResmi,
    setProfilResmi,
    icMesajAcikMi,
    setIcMesajAcikMi,
    icMesajlasmaLoading,
    setIcMesajlasmaLoading,
    mesajlasmaKutusuAcikMi,
    setMesajlasmaKutusuAcikMi,
  } = useGlobalContext();

  const modalClose = () => {
    setGonderiyiPaylasModalAcikMi(false);
  };

  useEffect(() => {
    const birlesikListe = [...tumTakipciler, ...tumTakipEdilenler];
    const idSet = new Set();
    const benzersizKullanicilar = [];

    for (const kullanici of birlesikListe) {
      if (!idSet.has(kullanici.kullaniciId)) {
        idSet.add(kullanici.kullaniciId);
        benzersizKullanicilar.push(kullanici);
      }
    }
    setTotalListe(benzersizKullanicilar);
  }, []);

  const mesajGonderHandle = () => {
    setMesajlasmaKutusuAcikMi(true);
  };

  return (
    <div className="takipciler-modal-overlay">
      <div className="takipciler-modal">
        <CloseIcon
          onClick={modalClose}
          className="paylasimTakipcilerModalClose"
        />
        <div className="takipci-listesi">
          {tumTakipciler && tumTakipciler.length > 0 ? (
            totalListe.map((takipci, index) => (
              <div
                onClick={mesajGonderHandle}
                key={index}
                className="takipci-karti"
              >
                <img
                  src={takipci.kullaniciProfilResmi || "/default-avatar.png"}
                  alt="Takipçi"
                  className="takipci-avatar"
                />
                <span className="takipci-isim">
                  @{takipci.kullaniciTakmaAd}
                </span>
              </div>
            ))
          ) : (
            <p className="bos-mesaj">Takipçi bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaylasimTakipciler;
