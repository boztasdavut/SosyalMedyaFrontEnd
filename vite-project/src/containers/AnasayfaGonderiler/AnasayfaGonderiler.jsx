import React, { useEffect, useRef, useState } from "react";
import "./AnasayfaGonderiler.css";
import { gonderiBegen } from "../../services/GonderiBegen";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { BiSend } from "react-icons/bi";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import PaylasimTakipciler from "../../components/PaylasimTakipciler/PaylasimTakipciler.jsx";
import { birGonderiyeYorumYap } from "../../services/BirGonderiyeYorumYap.js";

function AnasayfaGonderiler({
  takipEdilenlerinTumGonderileri,
  setTakipEdilenlerinGonderileri,
}) {
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState(null);
  const inputRefs = useRef({});
  const [gonderiyiPaylasModalAcikMi, setGonderiyiPaylasModalAcikMi] =
    useState(false);
  const [tumTakipciler, setTumTakipciler] = useState({});
  const [yorumlariGorAcikMi, setYorumlarAcikMi] = useState(false);
  const birGonderiyiBegen = async (gonderiId) => {
    const gonderi = takipEdilenlerinTumGonderileri.find(
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

  const gonderiPaylasanProfilineGit = async (takmaAd) => {
    const yonlendirilecekUrlAdresi = `/profil/${takmaAd}`;
    navigate(yonlendirilecekUrlAdresi);
  };

  const gonderiIcineTiklandi = async (gonderiId, kullaniciTakmaAd) => {
    console.log("Gönderi içine tiklandi.");
    try {
      navigate(`/gonderiler/${kullaniciTakmaAd}/${gonderiId}`);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  const yorumGonderHandle = async (gonderiId) => {
    const yorumIcerigi = inputRefs.current[gonderiId].value;
    const yorumBilgisi = {
      gonderiId: gonderiId,
      yorumIcerigi: yorumIcerigi,
    };
    try {
      const yorumYapmaGelenVeri = await birGonderiyeYorumYap(yorumBilgisi);
      console.log("Anasayfa Yorum yapma durumu sonuc= ", yorumYapmaGelenVeri);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  const gonderiyiBaskalariylaPaylasModalHandle = async () => {
    try {
      const gelenVeri = await kullanicininTumTakipcileriniGetir();
      console.log("Tum takipciler= ", gelenVeri);
      setTumTakipciler(gelenVeri);
      console.log("Paylasma modal aktif edildi.!");
    } catch (err) {
      console.log("Gonderme baskalariyla paylas hatasi= ", err);
    }
  };

  useEffect(() => {
    if (Object.keys(tumTakipciler).length > 0) {
      setGonderiyiPaylasModalAcikMi(true);
    }
  }, [tumTakipciler]);

  return (
    <div>
      {gonderiyiPaylasModalAcikMi ? (
        <PaylasimTakipciler
          setGonderiyiPaylasModalAcikMi={setGonderiyiPaylasModalAcikMi}
          tumTakipciler={tumTakipciler.follow}
        />
      ) : (
        <div>
          {takipEdilenlerinTumGonderileri.map((gonderi) => (
            <div key={gonderi.gonderiId} className="gonderCardDiv">
              <div
                className="profilResmiVeTakmaAdDiv"
                onClick={() =>
                  gonderiIcineTiklandi(
                    gonderi.gonderiId,
                    gonderi.takipEdilenKullaniciTakmaAd
                  )
                }
              >
                <div>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      gonderiPaylasanProfilineGit(
                        gonderi.takipEdilenKullaniciTakmaAd
                      );
                    }}
                    id="anasayfaProfilResim"
                    src={gonderi.kullaniciResim}
                  />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    gonderiPaylasanProfilineGit(
                      gonderi.takipEdilenKullaniciTakmaAd
                    );
                  }}
                  id="anasayfaGonderiPaylasanTakmaAd"
                >
                  @{gonderi.takipEdilenKullaniciTakmaAd}
                </div>
              </div>
              <div className="gonderiIcerigi">
                <div>{gonderi.gonderiIcerigi}</div>
                <div>
                  {gonderi.gonderiMedyaUrl && (
                    <>
                      {gonderi.gonderiMedyaUrl
                        .toLowerCase()
                        .endsWith(".mp4") ? (
                        <video
                          className="anasayfaMedyaVideo"
                          src={gonderi.gonderiMedyaUrl}
                          controls
                        />
                      ) : (
                        <img
                          className="anasayfaMedyaResim"
                          src={gonderi.gonderiMedyaUrl}
                          alt="gonderi"
                          onClick={() =>
                            setLightboxImage(gonderi.gonderiMedyaUrl)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="gonderiAksiyonlariDiv">
                <div
                  onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                  className="begenmeButonu"
                >
                  {gonderi.begenildiMi ? (
                    <FavoriteIcon style={{ fontSize: "30px", color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon style={{ fontSize: "30px" }} />
                  )}
                  <span>{gonderi.begeniSayisi}</span>
                </div>
                <div
                  onClick={() =>
                    gonderiIcineTiklandi(
                      gonderi.gonderiId,
                      gonderi.takipEdilenKullaniciTakmaAd
                    )
                  }
                  className="yorumButonu"
                >
                  <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
                  <span>{gonderi.gonderiYorumSayisi}</span>
                </div>
                <div
                  onClick={gonderiyiBaskalariylaPaylasModalHandle}
                  className="gondermeButonu"
                >
                  <SendOutlinedIcon style={{ fontSize: "30px" }} />
                </div>
              </div>
              <div className="anasayfaGonderiYorumYazmaDivi">
                <div className="anasayfaYorumYazmaInputDiv">
                  <input
                    ref={(el) => (inputRefs.current[gonderi.gonderiId] = el)}
                    type="text"
                    placeholder="Yorumunuzu yazın..."
                  />
                </div>
                <div
                  onClick={() => yorumGonderHandle(gonderi.gonderiId)}
                  className="anasayfaYorumYazmaGonderDiv"
                >
                  <BiSend size={25} />
                </div>
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

export default AnasayfaGonderiler;
