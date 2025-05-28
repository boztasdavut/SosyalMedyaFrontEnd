import React, { useContext, useEffect, useState } from "react";
import "./BaskasininProfiliHeader.css";
import { IoSettingsOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { birKullaniciyiTakipEt } from "../../services/BirKullaniciyiTakipEt.js";
import { birKullaniciyiTakiptenCik } from "../../services/BirKullaniciyiTakiptenCik.js";
import { useGlobalContext } from "../../GlobalProvider.jsx";

function BaskasininProfiliHeader({
  baskasininProfiliBilgileri,
  setBaskasininProfiliBilgileri,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [kullaniciyiTakipEdiyorMuyum, setKullaniciyiTakipEdiyorMuyum] =
    useState(null);

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

  const handleMessage = () => {
    console.log("Butona tıklandı.");
    setKarsiTarafIdBilgisi(baskasininProfiliBilgileri.kullaniciId);
    setKarsiTarafAdi(baskasininProfiliBilgileri.kullaniciTakmaAd);
    setProfilResmi(baskasininProfiliBilgileri.kullaniciProfilResmi);
    setIcMesajlasmaLoading(false);
    setMesajlasmaKutusuAcikMi(true);
    setIcMesajAcikMi(true);
  };

  useEffect(() => {
    console.log("baskasinin profil bilgileri= ", baskasininProfiliBilgileri);
    setIsLoading(false);
  }, [baskasininProfiliBilgileri]);

  const kullaniciyiTakipEt = async (takipEdilenId) => {
    try {
      const gelenVeri = await birKullaniciyiTakipEt(takipEdilenId);

      // local state güncellemesi
      setBaskasininProfiliBilgileri((prev) => ({
        ...prev,
        kullaniciyiTakipEdiyorMuyum: true,
        takipcisiKisiSayisi: prev.takipcisiKisiSayisi + 1,
      }));
    } catch (err) {
      console.log("Kullaniciyi takip etmede bir hata meydana geldi= ", err);
    }
  };

  const kullaniciTakiptenCik = async (takipEdilenId) => {
    const gelenVeri = await birKullaniciyiTakiptenCik(takipEdilenId);
    setBaskasininProfiliBilgileri((prev) => ({
      ...prev,
      kullaniciyiTakipEdiyorMuyum: false,
      takipcisiKisiSayisi: prev.takipcisiKisiSayisi - 1,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Bu, ekranın tamamında ortalanmasını sağlar
          }}
        >
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div className="profilim-content">
          <div className="profilim-header">
            <div className="profilim-avatar">
              <img src={baskasininProfiliBilgileri.kullaniciProfilResmi} />
            </div>
            <div className="profilim-info">
              <div className="profilim-top-bar">
                <div className="profilim-username">{}</div>
                {baskasininProfiliBilgileri.kullaniciyiTakipEdiyorMuyum ? (
                  <button
                    onClick={() =>
                      kullaniciTakiptenCik(
                        baskasininProfiliBilgileri.kullaniciId
                      )
                    }
                    className="takipEdiliyor-button"
                  >
                    Takip Ediliyor
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      kullaniciyiTakipEt(baskasininProfiliBilgileri.kullaniciId)
                    }
                    className="takipEt-button"
                  >
                    Takip Et
                  </button>
                )}

                <button onClick={handleMessage} className="mesajAt-button">
                  Mesaj
                </button>
              </div>
              <div className="profilim-stats">
                <div>
                  <strong>
                    {baskasininProfiliBilgileri.gonderiler?.length}
                  </strong>{" "}
                  gönderi
                </div>
                <div>
                  <strong>
                    {baskasininProfiliBilgileri.takipcisiKisiSayisi}
                  </strong>{" "}
                  takipçi
                </div>
                <div>
                  <strong>
                    {baskasininProfiliBilgileri.takipEttigiKisiSayisi}
                  </strong>{" "}
                  takip
                </div>
              </div>
              <div className="profilim-bio">
                <div>{baskasininProfiliBilgileri.kullaniciBio}</div>
                <div>{baskasininProfiliBilgileri.kullaniciUyeOlmaTarihi}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BaskasininProfiliHeader;
