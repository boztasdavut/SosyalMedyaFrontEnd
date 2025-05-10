import React, { useEffect, useRef, useState } from "react";
import "./ProfilimGonderiler.css";
import { kullanicininTumGonderileriniGetir } from "../../services/KullaniciTumGonderileri.js";
import { useNavigate } from "react-router-dom";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { belirtilenGonderiyiSil } from "../../services/GonderiSil.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { gonderiBegen } from "../../services/GonderiBegen.js";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

function ProfilimGonderiler({ setGonderiSayisi }) {
  const [kullanicininTumGonderileri, setKullanicininTumGonderileri] = useState(
    []
  );
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const [aktifGonderiId, setAktifGonderiId] = useState(null);
  const [gonderiSilmeLoading, setGonderiSilmeLoading] = useState(false);
  const refs = useRef({});
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState(null);

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
              ? {
                  ...g,
                  begenildiMi: true,
                  gonderiBegeniSayisi: g.gonderiBegeniSayisi + 1,
                }
              : g
          )
        );
      }
    } else {
      await begeniKaldir(gonderiId);
      setKullanicininTumGonderileri((prev) =>
        prev.map((g) =>
          g.gonderiId === gonderiId
            ? {
                ...g,
                begenildiMi: false,
                gonderiBegeniSayisi: g.gonderiBegeniSayisi - 1,
              }
            : g
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
    try {
      const gelenVeri = await belirtilenGonderiyiSil(gonderiId);
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

  const gonderiIcineTiklandi = async (gonderiId, kullaniciTakmaAd) => {
    try {
      navigate(`/gonderiler/${kullaniciTakmaAd}/${gonderiId}`);
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
              onClick={() =>
                gonderiIcineTiklandi(
                  gonderi.gonderiId,
                  gonderi.kullaniciTakmaAd
                )
              }
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
                        onClick={() =>
                          setLightboxImage(gonderi.gonderiMedyaUrl)
                        }
                        style={{ cursor: "pointer" }}
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
                      <FavoriteIcon
                        style={{ fontSize: "30px", color: "red" }}
                      />
                    ) : (
                      <FavoriteBorderIcon style={{ fontSize: "30px" }} />
                    )}
                    <span>{gonderi.gonderiBegeniSayisi}</span>
                  </div>
                  <div className="profilimYorumButonu">
                    <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
                    <span>{gonderi.gonderiYorumSayisi}</span>
                  </div>
                  <div className="profilimGondermeButonu">
                    <SendOutlinedIcon style={{ fontSize: "30px" }} />
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

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxImage(null)}
        >
          <img src={lightboxImage} alt="" className="lightbox-image" />
        </div>
      )}
    </div>
  );
}

export default ProfilimGonderiler;
