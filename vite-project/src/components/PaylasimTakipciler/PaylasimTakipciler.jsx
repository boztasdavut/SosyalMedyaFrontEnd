import React, { useEffect, useState } from "react";
import "./PaylasimTakipciler.css";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../../GlobalProvider.jsx";
import { useNavigate } from "react-router-dom";

function PaylasimTakipciler({
  tumTakipciler,
  setGonderiyiPaylasModalAcikMi,
  tumTakipEdilenler,
  paylasilanGonderiSahibiTakmaAd,
  paylasilanGonderiId,
}) {
  const [totalListe, setTotalListe] = useState([]);
  const navigate = useNavigate();
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
    baslangicMesaji,
    setBaslangicMesaji,
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
  }, [tumTakipEdilenler, tumTakipciler]);

  const mesajGonderHandle = (kullaniciId, kullaniciTakmaAd, profilResmi) => {
    const domain = window.location.hostname;
    console.log("Domain name= ", domain);
    console.log("Total list= ", totalListe);
    setKarsiTarafIdBilgisi(kullaniciId);
    setKarsiTarafAdi(kullaniciTakmaAd);
    setProfilResmi(profilResmi);
    setBaslangicMesaji(
      `https://localhost:5173/gonderiler/${paylasilanGonderiSahibiTakmaAd}/${paylasilanGonderiId}?comments=all`
    );
    setGonderiyiPaylasModalAcikMi(false);
    setMesajlasmaKutusuAcikMi(true);
    setIcMesajAcikMi(true);
  };

  return (
    <div className="takipciler-modal-overlay">
      <div className="takipciler-modal">
        <CloseIcon
          onClick={modalClose}
          className="paylasimTakipcilerModalClose"
        />
        <div className="takipci-listesi">
          {tumTakipciler ? (
            totalListe.map((takipci, index) => (
              <div
                onClick={() =>
                  mesajGonderHandle(
                    takipci.kullaniciId,
                    takipci.kullaniciTakmaAd,
                    takipci.kullaniciProfilResmi
                  )
                }
                key={index}
                className="takipci-karti"
              >
                <img
                  src={
                    takipci.kullaniciProfilResmi?.endsWith("empty.png")
                      ? "https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"
                      : takipci.kullaniciProfilResmi
                  }
                  alt="Profil"
                  className="takipci-avatar"
                />
                {/*<img
                  src={takipci.kullaniciProfilResmi || "/default-avatar.png"}
                  alt="Takipçi"
                  className="takipci-avatar"
                />*/}
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
