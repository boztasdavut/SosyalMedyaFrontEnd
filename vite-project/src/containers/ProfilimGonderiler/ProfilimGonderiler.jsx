import React, { useEffect, useRef, useState } from "react";
import "./ProfilimGonderiler.css";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { kullanicininTumGonderileriniGetir } from "../../services/KullaniciTumGonderileri.js";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { belirtilenGonderiyiSil } from "../../services/GonderiSil.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function ProfilimGonderiler({ setGonderiSayisi }) {
  const [kullanicininTumGonderileri, setKullanicininTumGonderileri] = useState(
    []
  );
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const [aktifGonderiId, setAktifGonderiId] = useState(null);
  const [gonderiSilmeLoading, setGonderiSilmeLoading] = useState(false);
  const refs = useRef({});
  const navigate = useNavigate();

  const birGonderiyiBegen = async (gonderiId) => {
    const gonderi = kullanicininTumGonderileri.find(
      (g) => g.gonderiId === gonderiId
    );
    if (!gonderi) return;

    if (!gonderi.begenildiMi) {
      const gelenVeri = await gonderiBegen(gonderiId);
      if (gelenVeri === "Beğeni eklendi!") {
        setKullanicininTumGonderileri((prev) =>
          prev.map((g) =>
            g.gonderiId === gonderiId
              ? { ...g, begenildiMi: true, begeniSayisi: g.begeniSayisi + 1 }
              : g
          )
        );
      }
    } else {
      await begeniKaldir(gonderiId);
      setKullanicininTumGonderileri((prev) =>
        prev.map((g) =>
          g.gonderiId === gonderiId
            ? { ...g, begenildiMi: false, begeniSayisi: g.begeniSayisi - 1 }
            : g
        )
      );
    }
  };

  useEffect(() => {
    const gonderileriGetir = async () => {
      try {
        const gonderiler = await kullanicininTumGonderileriniGetir();
        console.log(
          "kullanicinin tum gonderileri= ",
          kullanicininTumGonderileri
        );
        setGonderiSayisi(gonderiler.length);
        setKullanicininTumGonderileri(gonderiler);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aktifGonderiId !== null &&
        refs.current[aktifGonderiId] &&
        !refs.current[aktifGonderiId].contains(event.target)
      ) {
        setAktifGonderiId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aktifGonderiId]);

  const gonderiSeceneklerineTiklandi = (gonderiId) => {
    if (aktifGonderiId === gonderiId) {
      setAktifGonderiId(null);
    } else {
      setAktifGonderiId(gonderiId);
    }
  };

  const handleGonderiSil = async (gonderiId) => {
    setGonderiSilmeLoading(true);
    console.log("Gonderi sil butonuna tiklandi.", gonderiId);
    try {
      const gelenVeri = await belirtilenGonderiyiSil(gonderiId);
      console.log("Gönderi silme bilgisi= ", gelenVeri);
      setAktifGonderiId(null);
      setKullanicininTumGonderileri((prevGonderiler) => {
        const yeniListe = prevGonderiler.filter(
          (gonderi) => gonderi.gonderiId !== gonderiId
        );
        setGonderiSayisi(yeniListe.length); // burada yeni state üzerinden hesaplama yapıyoruz
        return yeniListe;
      });
      setGonderiSilmeLoading(false);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  return (
    <div className="profilimTumGonderiYapisiAnaDiv">
      <ToastContainer position="top-center" />
      {gonderiSilmeLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div>
          {kullanicininTumGonderileri.map((gonderi) => (
            <div
              key={gonderi.gonderiId}
              className="profilimGonderiCardVeGonderiAyarlari"
            >
              <div
                ref={(el) => {
                  refs.current[gonderi.gonderiId] = el;
                }}
                className="profilimGonderiCardDiv"
              >
                <div className="profilimProfilResmiVeTakmaAdVeAyarlarDiv">
                  <div className="profilimProfilResmiVeTakmaAdDiv">
                    <div>
                      <img
                        id="profilimGonderilerProfilResmi"
                        src={kullaniciProfilBilgileri.kullaniciProfilResmi}
                        alt="Profil Resmi"
                      />
                    </div>
                    <div>@{gonderi.kullaniciTakmaAd}</div>
                  </div>
                </div>

                <div className="profilimGonderiIcerigi">
                  <div>{gonderi.gonderiIcerigi}</div>
                  <div>
                    {gonderi.gonderiMedyaUrl && (
                      <img
                        src={gonderi.gonderiMedyaUrl}
                        className="profilimGonderiMedya"
                        alt="Gönderi Medya"
                      />
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

                {aktifGonderiId === gonderi.gonderiId ? (
                  <div className="profilimGonderiSecenekleri">
                    <div onClick={() => handleGonderiSil(gonderi.gonderiId)}>
                      Gönderiyi Sil
                    </div>
                    <div>Gönderi İstatistikleri</div>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      gonderiSeceneklerineTiklandi(gonderi.gonderiId)
                    }
                    className="profilimGonderiSecenekleriGiris"
                  >
                    <MoreVertIcon />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilimGonderiler;
