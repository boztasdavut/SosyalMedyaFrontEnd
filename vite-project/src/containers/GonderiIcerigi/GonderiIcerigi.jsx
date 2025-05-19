import React, { useEffect, useRef, useState } from "react";
import "./GonderiIcerigi.css";
import { useNavigate, useParams } from "react-router-dom";
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
import YorumlariGor from "../../components/YorumlariGor/YorumlariGor.jsx";
import { birGonderiyeYorumYap } from "../../services/BirGonderiyeYorumYap.js";
import { jwtDecode } from "../../services/JwtDecode.js";
import { useSearchParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { jwtTakmaAdAl } from "../../services/MevcutTakmaAdAl.js";

function GonderiIcerigi() {
  const { gonderiId, takmaAd } = useParams();
  const [searchParams] = useSearchParams();
  const comments = searchParams.get("comments"); // Örneğin "all" veya "10"

  const [gonderiBilgisi, setGonderiBilgisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [yapilanYorum, setYapilanYorum] = useState("");
  const [yorumlariGorAcikMi, setYorumlariGorAcikMi] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const gonderiIcerigineTiklandi = async () => {
      try {
        setIsLoading(true);
        const gelenVeri = await belirliBirGonderiyiGetir(gonderiId);
        console.log("GönderiBilgisi verisi= ", gelenVeri);
        setGonderiBilgisi(gelenVeri);
      } catch (err) {
        console.log("Bir hata meydana geldi= ", err);
      }
    };
    gonderiIcerigineTiklandi();
  }, []);

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
    if (!yapilanYorum.trim()) return; // boş yorumları engelle

    const yorumBilgisi = {
      gonderiId: gonderiId,
      yorumIcerigi: yapilanYorum,
    };

    try {
      setIsLoading(true);
      const kullaniciTakmaAdiBilgisi = await jwtTakmaAdAl();
      const yorumYapmaGelenVeri = await birGonderiyeYorumYap(yorumBilgisi);
      console.log("yorumYapmaGelenVeri= ", yorumYapmaGelenVeri);
      const yorumlarListesineEklenecekObje = {
        altYorumlar: [],
        yeniYorumBegeniSayisi: 0,
        yeniYorumIcerigi: yapilanYorum,
        yeniYorumOlusturulmaTarihi:
          yorumYapmaGelenVeri.yeniYorumOlusturulmaTarihi,
        yorumId: yorumYapmaGelenVeri.yorumId,
        yorumuBegendimMi: false,
        yorumYapanTakmaAd: kullaniciTakmaAdiBilgisi,
        yorumYapanResim: gonderiBilgisi.kullaniciFoto,
      };
      if (yorumYapmaGelenVeri) {
        console.log("gonderi bilgisi= ", gonderiBilgisi);
        setYapilanYorum("");
        setGonderiBilgisi((prev) => ({
          ...prev,
          yorumlar: [...prev.yorumlar, yorumlarListesineEklenecekObje],
        }));
      }
    } catch (err) {
      console.log("Yorum gönderme hatası: ", err);
    }
  };

  useEffect(() => {
    if (
      gonderiBilgisi?.begenildiMi !== undefined &&
      gonderiBilgisi?.gonderiAtanKullaniciFoto !== undefined &&
      gonderiBilgisi?.gonderiBegeniSayisi !== undefined &&
      gonderiBilgisi?.gonderiIcerigi !== undefined &&
      gonderiBilgisi?.gonderiId !== undefined &&
      gonderiBilgisi?.gonderiMedyaUrl !== undefined &&
      gonderiBilgisi?.gonderiTarihi !== undefined &&
      gonderiBilgisi?.gonderiYorumSayisi !== undefined &&
      gonderiBilgisi?.kullaniciFoto !== undefined &&
      gonderiBilgisi?.kullaniciId !== undefined &&
      gonderiBilgisi?.kullaniciTakmaAd !== undefined
      //gonderiBilgisi?.yorumlar?.length
    ) {
      setIsLoading(false);
    }
  }, [gonderiBilgisi]);

  const gonderiPaylasanProfilineGit = async (takmaAd, kullaniciId) => {
    const kullaniciIdBilgisi = await jwtDecode();
    if (kullaniciIdBilgisi === kullaniciId) {
      const yonlendirilecekUrlAdresi = "/profilim";
      navigate(yonlendirilecekUrlAdresi);
    } else {
      const yonlendirilecekUrlAdresi = `/profil/${takmaAd}`;
      navigate(yonlendirilecekUrlAdresi);
    }
  };

  const geriDon = () => {
    navigate(-1);
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
            <div onClick={geriDon}>
              <ArrowBackOutlinedIcon className="gonderidenGeriDon" />
            </div>
            <div className="profilResmiVeTakmaAdDiv">
              <div>
                <img
                  onClick={() =>
                    gonderiPaylasanProfilineGit(
                      gonderiBilgisi.kullaniciTakmaAd,
                      gonderiBilgisi.kullaniciId
                    )
                  }
                  id="anasayfaProfilResim"
                  src={gonderiBilgisi.gonderiAtanKullaniciFoto}
                />
              </div>
              <div
                onClick={() =>
                  gonderiPaylasanProfilineGit(
                    gonderiBilgisi.kullaniciTakmaAd,
                    gonderiBilgisi.kullaniciId
                  )
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
                <span>{gonderiBilgisi.yorumlar.length}</span>
              </div>
              <div className="gondermeButonu">
                <SendOutlinedIcon style={{ fontSize: "30px" }} />
              </div>
            </div>
            <div className="anasayfaGonderiYorumYazmaDivi">
              <div className="anasayfaYorumYazmaInputDiv">
                <input
                  value={yapilanYorum}
                  onChange={(e) => setYapilanYorum(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
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
            <div>
              <YorumlariGor gonderiBilgisi={gonderiBilgisi} />
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
