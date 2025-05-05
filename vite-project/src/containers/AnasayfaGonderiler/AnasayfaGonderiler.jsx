import React, { useEffect, useState } from "react";
import "./AnasayfaGonderiler.css";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { gonderiBegen } from "../../services/GonderiBegen";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
function AnasayfaGonderiler({
  takipEdilenlerinTumGonderileri,
  setTakipEdilenlerinGonderileri,
}) {
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState(null);

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

  const gonderiIcineTiklandi = () => {
    console.log("Gönderi içine tiklandi.");
  };

  return (
    <div>
      <div>
        {takipEdilenlerinTumGonderileri.map((gonderi) => (
          <div
            key={gonderi.gonderiId}
            onClick={gonderiIcineTiklandi}
            className="gonderCardDiv"
          >
            <div className="profilResmiVeTakmaAdDiv">
              <div>
                <img
                  onClick={() =>
                    gonderiPaylasanProfilineGit(
                      gonderi.takipEdilenKullaniciTakmaAd
                    )
                  }
                  id="anasayfaProfilResim"
                  src={gonderi.kullaniciResim}
                />
              </div>
              <div
                onClick={() =>
                  gonderiPaylasanProfilineGit(
                    gonderi.takipEdilenKullaniciTakmaAd
                  )
                }
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
                    {gonderi.gonderiMedyaUrl.toLowerCase().endsWith(".mp4") ? (
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
              <div className="yorumButonu">
                <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
              </div>
              <div className="gondermeButonu">
                <SendOutlinedIcon style={{ fontSize: "30px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

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
