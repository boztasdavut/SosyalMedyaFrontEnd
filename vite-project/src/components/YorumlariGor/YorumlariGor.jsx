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

function YorumlariGor({ gonderiBilgisi }) {
  const [yorumBegeniBilgisi, setYorumBegeniBilgisi] = useState({});
  const [yorumBegeniSayisi, setYorumBegeniSayisi] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [altYorumlariGor, setAltYorumlariGor] = useState({});
  const inputRefs = useRef({});
  const [yorumlarState, setYorumlarState] = useState([]);
  const [girisYapanKullaniciFoto, setGirisYapanKullaniciFoto] = useState("");
  useEffect(() => {
    setIsLoading(true);
    if (gonderiBilgisi.yorumlar.length > 0) {
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
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(yorumBegeniBilgisi).length > 0 &&
      Object.keys(yorumBegeniSayisi).length > 0 &&
      yorumlarState !== undefined
    ) {
      console.log("veri= ", yorumlarState);
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
    const yapilanYorum = inputRefs.current[yorumId].value;

    const yorumIcerigiObje = {
      yorumIcerigi: yapilanYorum,
    };

    try {
      let yorumaYorumYapGelenVeri = await birYorumaYorumYap(
        yorumId,
        yorumIcerigiObje
      );
      yorumaYorumYapGelenVeri = JSON.parse(yorumaYorumYapGelenVeri);
      setYorumlarState((prev) =>
        prev.map((yorum) => {
          if (yorum.yorumId === yorumId) {
            // Alt yorumları yeni bir dizi olarak ayarlıyoruz
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

  const yorumlariGizleHandle = (yorumId) => {
    setAltYorumlariGor((prev) => ({
      ...prev,
      [yorumId]: false,
    }));
  };

  const yorumlariGosterHandle = (yorumId) => {
    setAltYorumlariGor((prev) => ({
      ...prev,
      [yorumId]: true,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        yorumlarState.map((yorum) => (
          <div className="yorumlarAnaDiv" key={yorum.yorumId}>
            <div>
              <img src={girisYapanKullaniciFoto} alt="" />
            </div>
            <div style={{ fontSize: "20px" }}>{yorum.yeniYorumIcerigi}</div>
            <div className="yorumlarinAksiyonlari">
              <div className="begenmeButonu">
                {yorumBegeniBilgisi[yorum.yorumId] === false ? (
                  <FavoriteBorderIcon
                    onClick={() => birYorumuBegenHandle(yorum.yorumId)}
                    style={{ fontSize: "30px" }}
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() => birYorumdanBegeniKaldirHandle(yorum.yorumId)}
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
            <div className="yorumlariGorYorumYazmaDivi">
              <div className="yorumlariGorYorumYazmaInputDiv">
                <input
                  ref={(el) => (inputRefs.current[yorum.yorumId] = el)}
                  type="text"
                  placeholder="Yorumunuzu yazın..."
                />
              </div>
              <div className="yorumlariGorYorumYazmaGonderDiv">
                <BiSend
                  onClick={() => yorumaYorumYapHandle(yorum.yorumId)}
                  size={25}
                />
              </div>
            </div>
            <div>
              {altYorumlariGor[yorum.yorumId] ? (
                <div
                  onClick={() => yorumlariGizleHandle(yorum.yorumId)}
                  className="yorumlariGorBolumu"
                >
                  Yorumları Gizle
                </div>
              ) : (
                <div
                  onClick={() => yorumlariGosterHandle(yorum.yorumId)}
                  className="yorumlariGorBolumu"
                >
                  Yorumları Gör
                </div>
              )}
            </div>
            <div>
              {altYorumlariGor[yorum.yorumId] &&
                yorum.altYorumlar.map((altYorum) => (
                  <div>{altYorum.yeniYorumIcerigi}</div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default YorumlariGor;
