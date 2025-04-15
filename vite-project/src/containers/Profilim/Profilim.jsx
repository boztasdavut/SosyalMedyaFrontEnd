import React, { useEffect, useState } from "react";
import "./Profilim.css";
import SolMenu from "../SolMenu/SolMenu";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { IoSettingsOutline } from "react-icons/io5";
import { kullanicininTumGonderileriniGetir } from "../../services/KullaniciTumGonderileri.js";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";

function Profilim() {
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const [kullanicininTumGonderileri, setKullanicininTumGonderileri] = useState(
    []
  );

  useEffect(() => {
    const profilBilgileriGetir = async () => {
      const profilBilgileri = await kullaniciProfilBilgileriGetir();
      console.log("Profil bilgilerim= ", profilBilgileri);
      setKullaniciProfilBilgileri(profilBilgileri);
    };
    const gonderileriGetir = async () => {
      const gonderiler = await kullanicininTumGonderileriniGetir();
      setKullanicininTumGonderileri(gonderiler);
      console.log("kullanicinin gonderileri=", gonderiler);
    };
    profilBilgileriGetir();
    gonderileriGetir();
  }, []);

  return (
    <div className="profilim-container">
      <SolMenu />
      <div className="profilim-content">
        <div className="profilim-header">
          <div className="profilim-avatar">Profil Resmi</div>
          <div className="profilim-info">
            <div className="profilim-top-bar">
              <div className="profilim-username">
                {kullaniciProfilBilgileri.kullaniciTakmaAd}
              </div>
              <button className="takipEt-button">Takip Et</button>
              <button className="mesajAt-button">Mesaj</button>
              <div className="profilim-settings">
                <IoSettingsOutline size={22} />
              </div>
            </div>
            <div className="profilim-stats">
              <div>
                <strong>15</strong> gönderi
              </div>
              <div>
                <strong>120</strong> takipçi
              </div>
              <div>
                <strong>85</strong> takip
              </div>
            </div>
            <div className="profilim-bio">
              <div>{kullaniciProfilBilgileri.kullaniciBio}</div>
              <div>{kullaniciProfilBilgileri.kullaniciUyeOlmaTarihi}</div>
            </div>
          </div>
        </div>
        <div>
          {kullanicininTumGonderileri.map((gonderi) => (
            <div key={gonderi.gonderiId} className="gonderCardDiv">
              <div className="profilResmiVeTakmaAdDiv">
                <div>Profil Resmi</div>
                <div>@{gonderi.takipEdilenKullaniciTakmaAd}</div>
              </div>
              <div className="gonderiIcerigi">{gonderi.gonderiIcerigi}</div>
              <div className="gonderiAksiyonlariDiv">
                <div
                  onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                  className="begenmeButonu"
                >
                  {gonderi.begenildiMi ? (
                    <IoIosHeart size={30} color="red" />
                  ) : (
                    <IoIosHeartEmpty size={30} />
                  )}
                  <span>{gonderi.begeniSayisi}</span>
                </div>
                <div className="yorumButonu">
                  <GoComment size={25} />
                </div>
                <div className="gondermeButonu">
                  <BsSend size={25} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profilim;
