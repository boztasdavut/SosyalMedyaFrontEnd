import React, { useEffect, useRef, useState } from "react";
import "./BaskasininProfiliGonderiler.css";
import { ClipLoader } from "react-spinners";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { gonderiBegen } from "../../services/GonderiBegen.js";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir.js";
import { BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function BaskasininProfiliGonderiler({
  baskasininProfiliBilgileri,
  setBaskasininProfiliBilgileri,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const inputRefs = useRef({});
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(false);
    console.log("baskasinin profil bilgileri= ", baskasininProfiliBilgileri);
  }, [baskasininProfiliBilgileri]);

  const birGonderiyiBegen = async (gonderiId) => {
    const gonderi = baskasininProfiliBilgileri.gonderiler.find(
      (g) => g.gonderiId === gonderiId
    );
    if (!gonderi) return;

    if (!gonderi.begenildiMi) {
      const gelenVeri = await gonderiBegen(gonderiId);
      if (gelenVeri === "Beğeni eklendi!") {
        setBaskasininProfiliBilgileri((prev) => ({
          ...prev,
          gonderiler: prev.gonderiler.map((g) =>
            g.gonderiId === gonderiId
              ? {
                  ...g,
                  begenildiMi: true,
                  gonderiBegeniSayisi: g.gonderiBegeniSayisi + 1,
                }
              : g
          ),
        }));
      }
    } else {
      await begeniKaldir(gonderiId);
      setBaskasininProfiliBilgileri((prev) => ({
        ...prev,
        gonderiler: prev.gonderiler.map((g) =>
          g.gonderiId === gonderiId
            ? {
                ...g,
                begenildiMi: false,
                gonderiBegeniSayisi: g.gonderiBegeniSayisi - 1,
              }
            : g
        ),
      }));
    }
  };

  const yorumGonderHandle = async (gonderiId) => {
    const kullaniciId = await jwtDecode();
    const yorumIcerigi = inputRefs.current[gonderiId].value;

  };

  const gonderiIcineTiklandi = async (gonderiId, kullaniciTakmaAd) => {
    try {
      navigate(`/gonderiler/${kullaniciTakmaAd}/${gonderiId}`);
    } catch (err) {
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="gonderi-loading">
          <ClipLoader color="#4a90e2" size={40} />
        </div>
      ) : (
        <div>
          {baskasininProfiliBilgileri?.gonderiler?.map((gonderi) => (
            <div key={gonderi.gonderiId} className="gonderi-karti">
              <div
                className="gonderi-baslik"
                onClick={() =>
                  gonderiIcineTiklandi(
                    gonderi.gonderiId,
                    baskasininProfiliBilgileri.kullaniciTakmaAd
                  )
                }
              >
                <div className="gonderi-kullanici">
                  <img
                    className="gonderi-profil-resmi"
                    src={baskasininProfiliBilgileri.kullaniciProfilResmi}
                    alt="Profil"
                  />
                  <div className="gonderi-takma-ad">
                    @{gonderi.kullaniciTakmaAd}
                  </div>
                </div>
                <div className="gonderi-menusu">
                  <PiDotsThreeOutlineThin />
                </div>
              </div>
              <div className="gonderi-icerik">
                <div>{gonderi.gonderiIcerigi}</div>
                <div>
                  {gonderi.gonderiMedyaUrl && (
                    <>
                      {gonderi.gonderiMedyaUrl
                        .toLowerCase()
                        .endsWith(".mp4") ? (
                        <video
                          className="baskasininProfiliVideo"
                          src={gonderi.gonderiMedyaUrl}
                          controls
                        />
                      ) : (
                        <img
                          className="baskasininProfiliResim"
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

              <div className="gonderi-aksiyonlar">
                <div
                  onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                  className="gonderi-begen"
                >
                  {gonderi.begenildiMi ? (
                    <IoIosHeart size={30} color="red" />
                  ) : (
                    <IoIosHeartEmpty size={30} />
                  )}
                  <span>{gonderi.gonderiBegeniSayisi}</span>
                </div>
                <div className="gonderi-yorum">
                  <GoComment size={25} />
                </div>
                <div className="gonderi-paylas">
                  <BsSend size={25} />
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

      {/* → Lightbox Overlay */}
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

export default BaskasininProfiliGonderiler;
