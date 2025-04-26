import React, { useEffect, useState } from "react";
import "./ProfilimGonderiler.css";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { kullanicininTumGonderileriniGetir } from "../../services/KullaniciTumGonderileri.js";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";

function ProfilimGonderiler({ setGonderiSayisi }) {
  const [kullanicininTumGonderileri, setKullanicininTumGonderileri] = useState(
    []
  );
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const navigate = useNavigate();

  const birGonderiyiBegen = async (gonderiId) => {
    const gonderi = kullanicininTumGonderileri.find(
      (g) => g.gonderiId === gonderiId
    );

    if (!gonderi) return;

    if (gonderi.begenildiMi === false) {
      const gelenVeri = await gonderiBegen(gonderiId);
      if (gelenVeri === "Beğeni eklendi!") {
        setTakipEdilenlerinGonderileri((prevGonderiler) =>
          prevGonderiler.map((gonderi) =>
            gonderi.gonderiId === gonderiId
              ? {
                  ...gonderi,
                  begenildiMi: true,
                  begeniSayisi: gonderi.begeniSayisi + 1,
                }
              : gonderi
          )
        );
      }
    } else {
      await begeniKaldir(gonderiId);
      setTakipEdilenlerinGonderileri((prevGonderiler) =>
        prevGonderiler.map((gonderi) =>
          gonderi.gonderiId === gonderiId
            ? {
                ...gonderi,
                begenildiMi: false,
                begeniSayisi: gonderi.begeniSayisi - 1,
              }
            : gonderi
        )
      );
    }
  };

  useEffect(() => {
    const gonderileriGetir = async () => {
      try {
        const gonderiler = await kullanicininTumGonderileriniGetir();
        setGonderiSayisi(gonderiler.length);
        setKullanicininTumGonderileri(gonderiler);
        console.log("kullanicinin gonderileri=", gonderiler);
        const profilBilgileri = await kullaniciProfilBilgileriGetir();
        setKullaniciProfilBilgileri(profilBilgileri);
      } catch (error) {
        if (error.message.includes("401")) {
          navigate("/girisYap");
        }
      }
    };
    gonderileriGetir();
  }, []);
  return (
    <div>
      <div>
        {kullanicininTumGonderileri.map((gonderi) => (
          <div key={gonderi.gonderiId} className="gonderCardDiv">
            <div className="profilimProfilResmiVeTakmaAdDiv">
              <div>
                <div>
                  <img
                    id="profilimGonderilerProfilResmi"
                    src={kullaniciProfilBilgileri.kullaniciProfilResmi}
                  />
                </div>
                <div>@{gonderi.kullaniciTakmaAd}</div>
              </div>
              <div>
                <PiDotsThreeOutlineThin />
              </div>
            </div>
            <div className="profilimGonderiIcerigi">
              <div>{gonderi.gonderiIcerigi}</div>
              <div>
                {gonderi.gonderiMedyaUrl !== null && (
                  <img src={gonderi.gonderiMedyaUrl} className="gonderiMedya" />
                )}
              </div>
            </div>
            <div className="profilimGonderiAksiyonlariDiv">
              <div
                onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                className="profilimBegenmeButonu"
              >
                {gonderi.begenildiMi ? (
                  <IoIosHeart size={30} color="red" />
                ) : (
                  <IoIosHeartEmpty size={30} />
                )}
                <span>{gonderi.begeniSayisi}</span>
              </div>
              <div className="profilimYorumButonu">
                <GoComment size={25} />
              </div>
              <div className="profilimGondermeButonu">
                <BsSend size={25} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilimGonderiler;
