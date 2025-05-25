import React, { useEffect, useRef, useState } from "react";
import "./YorumlariGor.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { birYorumuBegen } from "../../services/BirYorumuBegen.js";
import { birYorumdanBegeniKaldir } from "../../services/BirYorumBegeniKaldir.js";
import { BiSend } from "react-icons/bi";
import { birYorumaYorumYap } from "../../services/BirYorumaYorumYap.js";
import { ClipLoader } from "react-spinners";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AltYorum from "../AltYorum/AltYorum.jsx";
import { jwtTakmaAdAl } from "../../services/MevcutTakmaAdAl.js";

function YorumlariGor({ gonderiBilgisi }) {
  const [yorumBegeniBilgisi, setYorumBegeniBilgisi] = useState({});
  const [yorumBegeniSayisi, setYorumBegeniSayisi] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [altYorumlariGor, setAltYorumlariGor] = useState({});
  const [yorumlarState, setYorumlarState] = useState([]);
  const [girisYapanKullaniciFoto, setGirisYapanKullaniciFoto] = useState("");
  const [yorumaYapilanYorum, setYorumaYapilanYorum] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [acikCevapVerId, setAcikCevapVerId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("gonderi bilgisi= ", gonderiBilgisi);
    if (gonderiBilgisi.yorumlar.length > 0) {
      setIsLoading(true);
      const yeniBegeniBilgisi = {};
      const yeniBegeniSayisi = {};
      gonderiBilgisi.yorumlar.forEach((yorum) => {
        yeniBegeniBilgisi[yorum.yorumId] = yorum.yorumuBegendimMi;
        yeniBegeniSayisi[yorum.yorumId] = yorum.yeniYorumBegeniSayisi;
      });
      setYorumBegeniBilgisi(yeniBegeniBilgisi);
      setYorumBegeniSayisi(yeniBegeniSayisi);
      setYorumlarState(gonderiBilgisi.yorumlar);
      setGirisYapanKullaniciFoto(gonderiBilgisi.kullaniciFoto);
    } else {
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(yorumBegeniBilgisi).length > 0 &&
      Object.keys(yorumBegeniSayisi).length > 0 &&
      yorumlarState !== undefined
    ) {
      setIsLoading(false);
    }
  }, [yorumBegeniBilgisi, yorumBegeniSayisi, yorumlarState]);

  const birYorumuBegenHandle = (yorumId) => {
    setYorumBegeniBilgisi((prev) => ({
      ...prev,
      [yorumId]: true,
    }));
    setYorumBegeniSayisi((prev) => ({
      ...prev,
      [yorumId]: prev[yorumId] + 1,
    }));
    birYorumuBegen(yorumId);
  };

  const birYorumdanBegeniKaldirHandle = (yorumId) => {
    setYorumBegeniBilgisi((prev) => ({
      ...prev,
      [yorumId]: false,
    }));
    setYorumBegeniSayisi((prev) => ({
      ...prev,
      [yorumId]: Math.max(0, prev[yorumId] - 1),
    }));
    birYorumdanBegeniKaldir(yorumId);
  };

  const yorumaYorumYapHandle = async (yorumId) => {
    setIsLoading(true);
    const yorumIcerigiObje = {
      yorumIcerigi: yorumaYapilanYorum,
    };

    try {
      const mevcutTakmaAd = await jwtTakmaAdAl();
      let yorumaYorumYapGelenVeri = await birYorumaYorumYap(
        yorumId,
        yorumIcerigiObje
      );
      setYorumaYapilanYorum("");
      yorumaYorumYapGelenVeri = JSON.parse(yorumaYorumYapGelenVeri);
      yorumaYorumYapGelenVeri.altYorumlar = [];
      yorumaYorumYapGelenVeri.yorumYapanResim = gonderiBilgisi.kullaniciFoto;
      yorumaYorumYapGelenVeri.yorumYapanTakmaAd = mevcutTakmaAd;

      setYorumlarState((prev) =>
        prev.map((yorum) => {
          if (yorum.yorumId === yorumId) {
            const yeniAltYorumlar = [
              ...(yorum.altYorumlar || []),
              yorumaYorumYapGelenVeri,
            ];
            return {
              ...yorum,
              altYorumlar: yeniAltYorumlar,
            };
          }
          return yorum;
        })
      );
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  const belirliYorumaOdaklan = (yorumId) => {
    const mevcutYorumId = searchParams.get("comments");

    // Eğer mevcut yorum ID'si ile aynıysa çık, değilse gir
    if (mevcutYorumId === yorumId.toString()) {
      const baseUrl = location.pathname + "?comments=all";
      navigate(baseUrl);
    } else {
      const baseUrl = location.pathname + `?comments=${yorumId}`;
      navigate(baseUrl);
    }
  };

  useEffect(() => {
    if (yorumlarState.length > 0) {
      console.log("Yorum state= ", yorumlarState);
    }
  }, [yorumlarState]);

  const yorumaCevapVer = (yorumId) => {
    setIsLoading(true);
    setAcikCevapVerId(yorumId);
  };

  useEffect(() => {
    if (acikCevapVerId !== null) {
      setIsLoading(false);
    }
  }, [acikCevapVerId]);

  useEffect(() => {
    const yorumId = searchParams.get("comments");
    if (yorumId) {
      setIsLoading(false); // URL değişimi tamamlandığında loading'i kapat
    }
  }, [searchParams]); // searchParams her değiştiğinde kontrol et

  const yorumdanProfileGit = (kullaniciTakmaAd, e) => {
    e.stopPropagation();
    navigate(`/profil/${kullaniciTakmaAd}`);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        yorumlarState.map((yorum) => {
          // Fixed the conditional rendering
          if (
            searchParams.get("comments") === "all" ||
            searchParams.get("comments") === yorum.yorumId.toString()
          ) {
            return (
              <div
                onClick={() => belirliYorumaOdaklan(yorum.yorumId)}
                className="yorumlarAnaDiv"
                key={yorum.yorumId}
              >
                <div
                  onClick={(e) =>
                    yorumdanProfileGit(yorum.yorumYapanTakmaAd, e)
                  }
                  className="anaYorumFotoVeTakmaAd"
                >
                  <div>
                    <img src={yorum.yorumYapanResim} alt="" />
                  </div>
                  <div>
                    <span>@{yorum.yorumYapanTakmaAd}</span>
                  </div>
                </div>
                <div style={{ fontSize: "20px" }}>{yorum.yeniYorumIcerigi}</div>
                <div className="yorumlarinAksiyonlari">
                  <div className="begenmeButonu">
                    {yorumBegeniBilgisi[yorum.yorumId] === false ? (
                      <FavoriteBorderIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          birYorumuBegenHandle(yorum.yorumId);
                        }}
                        style={{ fontSize: "30px" }}
                      />
                    ) : (
                      <FavoriteIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          birYorumdanBegeniKaldirHandle(yorum.yorumId);
                        }}
                        style={{ fontSize: "30px", color: "red" }}
                      />
                    )}
                    <span>{yorumBegeniSayisi[yorum.yorumId] ?? 0}</span>
                  </div>
                  <div className="yorumButonu">
                    <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
                    <span>{yorum.altYorumlar?.length ?? 0}</span>
                  </div>
                </div>
                {searchParams.get("comments") === yorum.yorumId.toString() && (
                  <div className="yorumlariGorYorumYazmaDivi">
                    <div className="yorumlariGorYorumYazmaInputDiv">
                      <input
                        value={yorumaYapilanYorum}
                        onChange={(e) => {
                          setYorumaYapilanYorum(e.target.value);
                        }}
                        onClick={(event) => event.stopPropagation()}
                        type="text"
                        placeholder="Yorumunuzu yazın... "
                      />
                    </div>
                    <div
                      onClick={(event) => {
                        event.stopPropagation();
                        yorumaYorumYapHandle(yorum.yorumId);
                      }}
                      className="yorumlariGorYorumYazmaGonderDiv"
                    >
                      <BiSend size={25} />
                    </div>
                  </div>
                )}

                {searchParams.get("comments") === yorum.yorumId.toString() && (
                  <div>
                    <AltYorum altYorumlar={yorum.altYorumlar} />
                  </div>
                )}
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
}

export default YorumlariGor;
