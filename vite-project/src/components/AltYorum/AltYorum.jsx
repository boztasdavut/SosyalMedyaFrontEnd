import React, { useEffect, useState } from "react";
import "./AltYorum.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ClipLoader } from "react-spinners";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { birYorumuBegen } from "../../services/BirYorumuBegen.js";
import { birYorumdanBegeniKaldir } from "../../services/BirYorumBegeniKaldir.js";
import { BiSend } from "react-icons/bi";

function AltYorum({ altYorumlar }) {
  const [isLoading, setIsLoading] = useState(true);
  const [begeniBilgisi, setBegeniBilgisi] = useState({});
  const [begeniSayisi, setBegeniSayisi] = useState({});
  const [girilenAltYorum, setGirilenAltYorum] = useState(-1);
  const [altYorum, setAltYorum] = useState("");
  useEffect(() => {
    if (Object.keys(altYorumlar).length > 0) {
      setIsLoading(false);
      const yeniBegeniBilgisi = {};
      const yeniBegeniSayisi = {};
      altYorumlar.forEach((altYorum) => {
        yeniBegeniBilgisi[altYorum.yorumId] = altYorum.yorumuBegendimMi;
        yeniBegeniSayisi[altYorum.yorumId] = altYorum.yeniYorumBegeniSayisi;
      });
      setBegeniBilgisi(yeniBegeniBilgisi);
      setBegeniSayisi(yeniBegeniSayisi);
    }
    console.log("Altyorum componentine gelen veri= ", altYorumlar);
  }, [altYorumlar]);

  useEffect(() => {
    if (
      Object.keys(begeniBilgisi).length > 0 &&
      Object.keys(begeniSayisi).length > 0
    ) {
      setIsLoading(false);
    }
  }, [begeniBilgisi, begeniSayisi]);

  const yorumaYorumBegenHandle = (yorumId) => {
    setBegeniBilgisi((prev) => ({
      ...prev,
      [yorumId]: true,
    }));
    setBegeniSayisi((prev) => ({
      ...prev,
      [yorumId]: prev[yorumId] + 1,
    }));
    birYorumuBegen(yorumId);
  };

  const yorumaYorumBegeniKaldirHandle = (yorumId) => {
    setBegeniBilgisi((prev) => ({
      ...prev,
      [yorumId]: false,
    }));

    setBegeniSayisi((prev) => ({
      ...prev,
      [yorumId]: Math.max(0, prev[yorumId] - 1),
    }));
    birYorumdanBegeniKaldir(yorumId);
  };

  const altYorumTiklandi = (yorumId) => {
    setGirilenAltYorum(yorumId);
  };

  const altYorumYapildi = () => {
    console.log("alt yorum icerigi= ", altYorum);
    setAltYorum("");
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div className="alt-yorum-container">
          {altYorumlar.map(
            (yorum) =>
              (girilenAltYorum === -1 || girilenAltYorum === yorum.yorumId) && (
                <div
                  onClick={() => altYorumTiklandi(yorum.yorumId)}
                  key={yorum.yorumId}
                  className="alt-yorum-card"
                >
                  <img
                    src={yorum.yorumYapanResim}
                    alt={yorum.yorumYapanTakmaAd}
                    className="profile-image"
                  />
                  <div className="yorum-content">
                    <p className="yorum-username">@{yorum.yorumYapanTakmaAd}</p>
                    <p className="yorum-text">{yorum.yeniYorumIcerigi}</p>
                    <div className="yorum-actions">
                      {begeniBilgisi[yorum.yorumId] ? (
                        <div className="begenmeButonu">
                          <FavoriteIcon
                            onClick={() =>
                              yorumaYorumBegeniKaldirHandle(yorum.yorumId)
                            }
                            style={{ fontSize: "30px", color: "red" }}
                          />
                          <span>{begeniSayisi[yorum.yorumId]}</span>
                        </div>
                      ) : (
                        <div className="yorumButonu">
                          <FavoriteBorderIcon
                            onClick={() =>
                              yorumaYorumBegenHandle(yorum.yorumId)
                            }
                            style={{ fontSize: "30px" }}
                          />
                          <span>{begeniSayisi[yorum.yorumId]}</span>
                        </div>
                      )}

                      <ChatBubbleOutlineIcon style={{ fontSize: "30px" }} />
                      <span>{yorum.altYorumlar.length}</span>
                    </div>
                    {girilenAltYorum === yorum.yorumId && (
                      <div className="yorumlariGorYorumYazmaDivi">
                        <div className="yorumlariGorYorumYazmaInputDiv">
                          <input
                            type="text"
                            placeholder="Yorumunuzu yazın... "
                            value={altYorum}
                            onChange={(e) => setAltYorum(e.target.value)}
                          />
                        </div>
                        <div className="yorumlariGorYorumYazmaGonderDiv">
                          <BiSend onClick={altYorumYapildi} size={25} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default AltYorum;
