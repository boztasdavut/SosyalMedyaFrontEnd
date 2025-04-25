import React, { useEffect, useState } from "react";
import "./BaskasininProfiliHeader.css";
import { IoSettingsOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { birKullaniciyiTakipEt } from "../../services/BirKullaniciyiTakipEt.js";

function BaskasininProfiliHeader({ baskasininProfiliBilgileri }) {
  const [isLoading, setIsLoading] = useState(true);
  const [kullaniciyiTakipEdiyorMuyum, setKullaniciyiTakipEdiyorMuyum] =
    useState(null);
  useEffect(() => {
    if (
      baskasininProfiliBilgileri &&
      Array.isArray(baskasininProfiliBilgileri.gonderiler)
    ) {
      setIsLoading(false);
      console.log("Baskasinin profil bilgileri= ", baskasininProfiliBilgileri);
      setKullaniciyiTakipEdiyorMuyum(
        baskasininProfiliBilgileri.kullaniciyiTakipEdiyorMuyum
      );
    }
  }, [baskasininProfiliBilgileri]);

  const kullaniciyiTakipEt = async (takipEdilenId) => {
    setKullaniciyiTakipEdiyorMuyum(true);
    const gelenVeri = await birKullaniciyiTakipEt(takipEdilenId);
    console.log("Kullanici takip etme dönüş= ", gelenVeri);
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
                {kullaniciyiTakipEdiyorMuyum ? (
                  <button className="takipEdiliyor-button">
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

                <button className="mesajAt-button">Mesaj</button>
                <div className="profilim-settings">
                  <IoSettingsOutline size={22} />
                </div>
              </div>
              <div className="profilim-stats">
                <div>
                  <strong>
                    {baskasininProfiliBilgileri.gonderiler.length}
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
