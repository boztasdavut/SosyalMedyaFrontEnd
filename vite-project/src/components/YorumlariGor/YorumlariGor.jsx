import React, { useEffect, useRef, useState } from "react";
import "./YorumlariGor.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { birYorumuBegen } from "../../services/BirYorumuBegen.js";
import { birYorumdanBegeniKaldir } from "../../services/BirYorumBegeniKaldir.js";
import { BiSend } from "react-icons/bi";
import { birYorumaYorumYap } from "../../services/BirYorumaYorumYap.js";

function YorumlariGor({ gonderiBilgisi, gonderiId }) {
  const [yorumBegeniBilgisi, setYorumBegeniBilgisi] = useState({});
  const [yorumBegeniSayisi, setYorumBegeniSayisi] = useState({});
  const inputRefs = useRef({});
  useEffect(() => {
    if (gonderiBilgisi.yorumlar.length > 0) {
      const yeniBegeniBilgisi = {};
      const yeniBegeniSayisi = {};
      gonderiBilgisi.yorumlar.forEach((yorum) => {
        yeniBegeniBilgisi[yorum.yorumId] = yorum.yorumuBegendimMi;
        yeniBegeniSayisi[yorum.yorumId] = yorum.yeniYorumBegeniSayisi;
      });
      setYorumBegeniBilgisi(yeniBegeniBilgisi);
      setYorumBegeniSayisi(yeniBegeniSayisi);
    }
    console.log("Yorumlar= ", gonderiBilgisi.yorumlar);
  }, [gonderiBilgisi]);

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

  const yorumaYorumYapHandle = (yorumId) => {
    const yapilanYorum = inputRefs.current[yorumId].value;
    const yorumIcerigiObje = {
      yorumIcerigi: yapilanYorum,
    };
    try {
      const yorumaYorumYapGelenVeri = birYorumaYorumYap(
        yorumId,
        yorumIcerigiObje
      );
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  return (
    <div>
      {gonderiBilgisi.yorumlar.map((yorum) => (
        <div className="yorumlarAnaDiv">
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
              <span>{yorumBegeniSayisi[yorum.yorumId]}</span>
            </div>
            <div className="yorumButonu">
              <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
              <span>{gonderiBilgisi.yorumlar.altYorumlar.length}</span>
            </div>
          </div>
          <div className="anasayfaGonderiYorumYazmaDivi">
            <div className="anasayfaYorumYazmaInputDiv">
              <input
                ref={(el) => (inputRefs.current[yorum.yorumId] = el)}
                type="text"
                placeholder="Yorumunuzu yazın..."
              />
            </div>
            <div className="anasayfaYorumYazmaGonderDiv">
              <BiSend
                onClick={() => yorumaYorumYapHandle(yorum.yorumId)}
                size={25}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default YorumlariGor;
