import React, { useEffect, useState } from "react";
import "./ProfilimPageHeader.css";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { IoSettingsOutline } from "react-icons/io5";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import { kullaniciTumTakipEdilenleriGetir } from "../../services/KullaniciTumTakipEdilenlerGetir.js";
import { ClipLoader } from "react-spinners";

function ProfilimPageHeader({ gonderiSayisi }) {
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const [kullaniciTakipcileri, setKullaniciTakipcileri] = useState({});
  const [kullaniciTakipEttikleri, setKullaniciTakipEttikleri] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const profilBilgileriGetir = async () => {
      try {
        const profilBilgileri = await kullaniciProfilBilgileriGetir();
        const takipciler = await kullanicininTumTakipcileriniGetir();
        const takipEdilenler = await kullaniciTumTakipEdilenleriGetir();

        console.log("Kendi profili bilgiler= ", profilBilgileri);

        setKullaniciProfilBilgileri(profilBilgileri);
        setKullaniciTakipcileri(takipciler);
        setKullaniciTakipEttikleri(takipEdilenler);
      } catch (err) {
        console.log("Bir hata oluştu: ", err);
      } finally {
        // Her halükarda loading'i false yap
        setIsLoading(false);
      }
    };

    profilBilgileriGetir();
  }, []);

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
              <img src={kullaniciProfilBilgileri.kullaniciProfilResmi} />
            </div>
            <div className="profilim-info">
              <div className="profilim-top-bar">
                <div className="profilim-username">
                  {kullaniciProfilBilgileri.kullaniciTakmaAd}
                </div>
                <div className="profilim-settings">
                  <IoSettingsOutline size={22} />
                </div>
              </div>
              <div className="profilim-stats">
                <div>
                  <strong>{gonderiSayisi}</strong> gönderi
                </div>
                <div>
                  <strong>{kullaniciTakipcileri.followCount}</strong> takipçi
                </div>
                <div>
                  <strong>{kullaniciTakipEttikleri.followCount}</strong> takip
                </div>
              </div>
              <div className="profilim-bio">
                <div>{kullaniciProfilBilgileri.kullaniciBio}</div>
                <div>{kullaniciProfilBilgileri.kullaniciUyeOlmaTarihi}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilimPageHeader;
