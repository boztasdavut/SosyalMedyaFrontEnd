import React, { useEffect, useState } from "react";
import "./AltYorum.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ClipLoader } from "react-spinners";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { birYorumuBegen } from "../../services/BirYorumuBegen.js";
import { birYorumdanBegeniKaldir } from "../../services/BirYorumBegeniKaldir.js";
import { BiSend } from "react-icons/bi";
import { birYorumaYorumYap } from "../../services/BirYorumaYorumYap.js";

function AltYorum({ altYorumlar }) {
  const [isLoading, setIsLoading] = useState(true);
  const [begeniBilgisi, setBegeniBilgisi] = useState({});
  const [begeniSayisi, setBegeniSayisi] = useState({});
  const [girilenAltYorum, setGirilenAltYorum] = useState(-1);
  const [altYorum, setAltYorum] = useState("");
  const [altYorumlarState, setAltYorumlarState] = useState([]);
  const [altYorumGorunecekMi, setAltYorumGorunecekMi] = useState(false);
  useEffect(() => {
    if (altYorumlar.length > 0) {
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
    setAltYorumlarState(altYorumlar);
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

  useEffect(() => {
    if (altYorumlarState.length > 0) {
      console.log(altYorumlarState);
      setIsLoading(false);
    }
  }, [altYorumlarState]);

  useEffect(() => {
    if (altYorum.length > 0) {
      setIsLoading(false);
    }
  }, [altYorum]);

  const altYorumYapildi = async (parentYorumId) => {
    setIsLoading(true);
    const gonderilecekObje = {
      yorumIcerigi: altYorum,
    };
    try {
      let yorumaYorumYapGelenVeri = await birYorumaYorumYap(
        parentYorumId,
        gonderilecekObje
      );
      yorumaYorumYapGelenVeri = JSON.parse(yorumaYorumYapGelenVeri);
      yorumaYorumYapGelenVeri.altYorumlar = [];
      console.log("Yorum objesi: ", yorumaYorumYapGelenVeri);
      setAltYorumlarState((prev) => {
        return [...prev, yorumaYorumYapGelenVeri];
      });

      setAltYorum("");
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  const altYorumlariGosterHandle = () => {
    setAltYorumGorunecekMi(true);
  };

  const altYorumlariGizleHandle = () => {
    setAltYorumGorunecekMi(false);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div className="alt-yorum-container">
          {altYorumlarState.map(
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
                          <BiSend
                            onClick={() => altYorumYapildi(yorum.yorumId)}
                            size={25}
                          />
                        </div>
                      </div>
                    )}
                    {altYorumGorunecekMi ? (
                      <div
                        onClick={altYorumlariGizleHandle}
                        className="yorumlariGorBolumu"
                      >
                        Yanıtları Gizle
                      </div>
                    ) : (
                      <div
                        onClick={altYorumlariGosterHandle}
                        className="yorumlariGorBolumu"
                      >
                        Yanıtları Gör
                      </div>
                    )}
                    {altYorumGorunecekMi && (
                      <AltYorum altYorumlar={yorum.altYorumlar} />
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
