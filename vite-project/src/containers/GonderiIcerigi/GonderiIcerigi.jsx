import React, { useEffect, useRef, useState } from "react";
import "./GonderiIcerigi.css";
import { useParams } from "react-router-dom";
import { belirliBirGonderiyiGetir } from "../../services/BelirliBirGonderiyiGetir.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { gonderiBegen } from "../../services/GonderiBegen";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir";
import SolMenu from "../SolMenu/SolMenu.jsx";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";
import { BiSend } from "react-icons/bi";
import { jwtDecode } from "../../services/JwtDecode";

function GonderiIcerigi() {
  const { gonderiId, takmaAd } = useParams();
  const [gonderiBilgisi, setGonderiBilgisi] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [yazilanYorum, setYazilanYorum] = useState("");
  const inputRefs = useRef({});

  useEffect(() => {
    const gonderiIcerigineTiklandi = async () => {
      try {
        const gelenVeri = await belirliBirGonderiyiGetir(gonderiId);
        console.log("Gelen veri= ", gelenVeri);
        setGonderiBilgisi(gelenVeri);
        setIsLoading(false);
      } catch (err) {
        console.log("Bir hata meydana geldi= ", err);
      }
    };
    gonderiIcerigineTiklandi();
  }, [gonderiId]);

  const birGonderiyiBegen = async (gonderiId) => {
    if (!gonderiBilgisi) return;

    if (gonderiBilgisi.begenildiMi === false) {
      const gelenVeri = await gonderiBegen(gonderiId);
      if (gelenVeri === "Beğeni eklendi!") {
        setGonderiBilgisi((prev) => ({
          ...prev,
          begenildiMi: true,
          gonderiBegeniSayisi: prev.gonderiBegeniSayisi + 1,
        }));
      }
    } else {
      await begeniKaldir(gonderiId);
      setGonderiBilgisi((prev) => ({
        ...prev,
        begenildiMi: false,
        gonderiBegeniSayisi: prev.gonderiBegeniSayisi - 1,
      }));
    }
  };

  const yorumGonderHandle = async (gonderiId) => {
    const kullaniciId = await jwtDecode();
    const yorumIcerigi = inputRefs.current[gonderiId].value;
    console.log("Yorum yapan kullanici id= ", kullaniciId);
    console.log("Yorum icerigi=", yorumIcerigi);
    console.log("Yorum yapılan gönderi id= ", gonderiId);
  };

  return (
    <div>
      <SolMenu />
      <Mesajlasma />
      <ToastContainer position="top-center" />
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div>
          <div key={gonderiId} className="gonderCardDiv">
            <div className="profilResmiVeTakmaAdDiv">
              <div>
                <img
                  onClick={() =>
                    gonderiPaylasanProfilineGit(gonderiBilgisi.kullaniciTakmaAd)
                  }
                  id="anasayfaProfilResim"
                  src={gonderiBilgisi.gonderiAtanKullaniciFoto}
                />
              </div>
              <div
                onClick={() =>
                  gonderiPaylasanProfilineGit(gonderiBilgisi.kullaniciTakmaAd)
                }
                id="anasayfaGonderiPaylasanTakmaAd"
              >
                @{gonderiBilgisi.kullaniciTakmaAd}
              </div>
            </div>
            <div className="gonderiIcerigi">
              <div>{gonderiBilgisi.gonderiIcerigi}</div>
              <div>
                {gonderiBilgisi.gonderiMedyaUrl && (
                  <>
                    {gonderiBilgisi.gonderiMedyaUrl
                      .toLowerCase()
                      .endsWith(".mp4") ? (
                      <video
                        className="anasayfaMedyaVideo"
                        src={gonderiBilgisi.gonderiMedyaUrl}
                        controls
                      />
                    ) : (
                      <img
                        className="anasayfaMedyaResim"
                        src={gonderiBilgisi.gonderiMedyaUrl}
                        alt="gonderi"
                        onClick={() =>
                          setLightboxImage(gonderiBilgisi.gonderiMedyaUrl)
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
                onClick={() => birGonderiyiBegen(gonderiBilgisi.gonderiId)}
                className="begenmeButonu"
              >
                {gonderiBilgisi.begenildiMi ? (
                  <FavoriteIcon style={{ fontSize: "30px", color: "red" }} />
                ) : (
                  <FavoriteBorderIcon style={{ fontSize: "30px" }} />
                )}
                <span>{gonderiBilgisi.gonderiBegeniSayisi}</span>
              </div>
              <div className="yorumButonu">
                <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
              </div>
              <div className="gondermeButonu">
                <SendOutlinedIcon style={{ fontSize: "30px" }} />
              </div>
            </div>
            <div className="anasayfaGonderiYorumYazmaDivi">
              <div className="anasayfaYorumYazmaInputDiv">
                <input
                  ref={(el) => (inputRefs.current[gonderiId] = el)}
                  type="text"
                  placeholder="Yorumunuzu yazın..."
                />
              </div>
              <div
                onClick={() => yorumGonderHandle(gonderiId)}
                className="anasayfaYorumYazmaGonderDiv"
              >
                <BiSend size={25} />
              </div>
            </div>
          </div>
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

export default GonderiIcerigi;
