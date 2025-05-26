import React, { useEffect, useRef, useState } from "react";
import "./ProfilimGonderiler.css";
import { kullanicininTumGonderileriniGetir } from "../../services/KullaniciTumGonderileri.js";
import { useNavigate } from "react-router-dom";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
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
import ProfilimGonderilerModal from "../../components/ProfilimGonderilerModal/ProfilimGonderilerModal.jsx";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import { kullaniciTumTakipEdilenleriGetir } from "../../services/KullaniciTumTakipEdilenlerGetir.js";
import PaylasimTakipciler from "../../components/PaylasimTakipciler/PaylasimTakipciler.jsx";

function ProfilimGonderiler({
  setGonderiSayisi,
  modalIsOpen,
  setModalIsOpen,
  setGonderiIdModal,
  kullanicininTumGonderileri,
  setKullanicininTumGonderileri,
}) {
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const [aktifGonderiId, setAktifGonderiId] = useState(null);
  const [gonderiSilmeLoading, setGonderiSilmeLoading] = useState(false);
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [secilenGonderi, setSecilenGonderi] = useState(null);
  const [gonderiyiPaylasModalAcikMi, setGonderiyiPaylasModalAcikMi] =
    useState(false);
  const [tumTakipciler, setTumTakipciler] = useState({});
  const [tumTakipEdilenler, setTumTakipEdilenler] = useState({});
  const [paylasilanGonderiSahibiTakmaAd, setPaylasilanGonderiSahibiTakmaAd] =
    useState("");
  const [paylasilanGonderiId, setPaylasilanGonderiId] = useState("");
  const birGonderiyiBegen = async (gonderiId, e) => {
    e.stopPropagation();
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

  const gonderiyiBaskalariylaPaylasModalHandle = async (
    gonderiSahibiTakmaAd,
    gonderiId,
    e
  ) => {
    try {
      e.stopPropagation();
      const gelenVeri = await kullanicininTumTakipcileriniGetir();
      const gelenVeri2 = await kullaniciTumTakipEdilenleriGetir();
      setPaylasilanGonderiSahibiTakmaAd(gonderiSahibiTakmaAd);
      setPaylasilanGonderiId(gonderiId);
      console.log("Tum takipciler= ", gelenVeri);
      console.log("Tum takip edilenler= ", gelenVeri2);
      setTumTakipciler(gelenVeri.follow);
      setTumTakipEdilenler(gelenVeri2.follow);
      setGonderiyiPaylasModalAcikMi(true);
      console.log("Paylasma modal aktif edildi.!");
    } catch (err) {
      console.log("Gonderme baskalariyla paylas hatasi= ", err);
    }
  };

  useEffect(() => {
    const gonderileriGetir = async () => {
      try {
        const gonderiler = await kullanicininTumGonderileriniGetir();
        console.log("Profilim tum gonderiler= ", gonderiler);
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

  const gonderiIcineTiklandi = async (gonderiId, kullaniciTakmaAd) => {
    try {
      navigate(`/gonderiler/${kullaniciTakmaAd}/${gonderiId}?comments=all`);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  const gonderiyiAyarlariniSec = (gonderiId, event) => {
    event.stopPropagation();
    setModalIsOpen(true);
    setGonderiIdModal(gonderiId);
  };

  return (
    <div className="profilimTumGonderiYapisiAnaDiv">
      {gonderiyiPaylasModalAcikMi ? (
        <PaylasimTakipciler
          setGonderiyiPaylasModalAcikMi={setGonderiyiPaylasModalAcikMi}
          tumTakipciler={tumTakipciler}
          tumTakipEdilenler={tumTakipEdilenler}
          paylasilanGonderiSahibiTakmaAd={paylasilanGonderiSahibiTakmaAd}
          paylasilanGonderiId={paylasilanGonderiId}
        />
      ) : gonderiSilmeLoading ? (
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
              <div className="profilimGonderiCardDiv">
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
                  <div>
                    <MoreVertOutlinedIcon
                      onClick={(event) =>
                        gonderiyiAyarlariniSec(gonderi.gonderiId, event)
                      }
                    />
                  </div>
                </div>

                <div className="profilimGonderiIcerigi">
                  <div>{gonderi.gonderiIcerigi}</div>
                  <div>
                    {gonderi.gonderiMedyaUrl && (
                      <div>
                        {gonderi.gonderiMedyaUrl
                          .toLowerCase()
                          .endsWith(".mp4") ? (
                          <video
                            src={gonderi.gonderiMedyaUrl}
                            className="profilimGonderiMedya"
                            onClick={() =>
                              setLightboxImage(gonderi.gonderiMedyaUrl)
                            }
                            style={{ cursor: "pointer" }}
                            controls
                          />
                        ) : (
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
                    )}
                  </div>
                </div>

                <div className="profilimGonderiAksiyonlariDiv">
                  <div
                    onClick={(e) => birGonderiyiBegen(gonderi.gonderiId, e)}
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
                  <div
                    onClick={(e) =>
                      gonderiyiBaskalariylaPaylasModalHandle(
                        gonderi.kullaniciTakmaAd,
                        gonderi.gonderiId,
                        e
                      )
                    }
                    className="profilimGondermeButonu"
                  >
                    <SendOutlinedIcon style={{ fontSize: "30px" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" />

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
