import React, { useEffect, useState } from "react";
import "./AltYorum.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BiSend } from "react-icons/bi";
import { birYorumuBegen } from "../../services/BirYorumuBegen.js";
import { birYorumdanBegeniKaldir } from "../../services/BirYorumBegeniKaldir.js";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { birYorumaYorumYap } from "../../services/BirYorumaYorumYap.js";

function AltYorum({ altYorumlar }) {
  const [altYorumlarState, setAltYorumlarState] = useState([]);
  const [yanitVer, setYanitVer] = useState("");
  const [acikCevapVerId, setAcikCevapVerId] = useState(null);
  const [yorumlariGoster, setYorumlariGoster] = useState([]);
  useEffect(() => {
    setAltYorumlarState(altYorumlar);
    console.log("alt yorumlar= ", altYorumlar);
  }, [altYorumlar]);

  const birYorumuBegenHandle = (yorumId, e) => {
    e.stopPropagation();
    setAltYorumlarState((prev) =>
      prev.map((yorum) =>
        yorum.yorumId === yorumId
          ? {
              ...yorum,
              yorumuBegendimMi: true,
              yeniYorumBegeniSayisi: (yorum.yeniYorumBegeniSayisi || 0) + 1,
            }
          : yorum
      )
    );

    birYorumuBegen(yorumId);
  };

  const birYorumdanBegeniKaldirHandle = (yorumId, e) => {
    e.stopPropagation();
    setAltYorumlarState((prev) =>
      prev.map((yorum) =>
        yorum.yorumId === yorumId
          ? {
              ...yorum,
              yorumuBegendimMi: false,
              yeniYorumBegeniSayisi: Math.max(
                0,
                (yorum.yeniYorumBegeniSayisi || 1) - 1
              ),
            }
          : yorum
      )
    );

    birYorumdanBegeniKaldir(yorumId);
  };

  const yanitVerHandle = async (yorumId) => {
    console.log("Yorum icerigi= ", yanitVer);
    console.log("Yorum id= ", yorumId);
    const yorumIcerigiObje = {
      yorumIcerigi: yanitVer,
    };

    try {
      let yorumaYorumYapGelenVeri = await birYorumaYorumYap(
        yorumId,
        yorumIcerigiObje
      );
      setYanitVer("");
      yorumaYorumYapGelenVeri = JSON.parse(yorumaYorumYapGelenVeri);
      yorumaYorumYapGelenVeri.altYorumlar = [];
      setAltYorumlarState((prev) =>
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

  const yorumaCevapVer = (yorumId) => {
    setAcikCevapVerId(yorumId);
  };

  const yanitlariGostermeStateHandle = (yorumId) => {
    setYorumlariGoster((prevState) => {
      if (prevState.includes(yorumId)) {
        return prevState.filter((id) => id !== yorumId);
      } else {
        return [...prevState, yorumId];
      }
    });
    setAcikCevapVerId("");
  };

  return (
    <div className="altYorumlarContainer">
      {altYorumlarState.map((altYorum) => (
        <div
          onClick={(event) => {
            event.stopPropagation();
            yanitlariGostermeStateHandle(altYorum.yorumId);
          }}
          className="altYorum"
          key={altYorum.yorumId}
        >
          <div className="altYorumHeader">
            <div>
              <img
                src={altYorum.yorumYapanResim}
                alt="avatar"
                className="altYorumAvatar"
              />
            </div>
            <div>
              <span className="altYorumUsername">
                @{altYorum.yorumYapanTakmaAd}
              </span>
            </div>
          </div>
          <div style={{ fontSize: "20px" }}>{altYorum.yeniYorumIcerigi}</div>
          <div className="altYorumActions">
            <div className="yorumBegenmeDivi">
              {altYorum.yorumuBegendimMi ? (
                <div>
                  <FavoriteIcon
                    onClick={(e) =>
                      birYorumdanBegeniKaldirHandle(altYorum.yorumId, e)
                    }
                    className="altYorumLikedIcon altYorumActionIcon"
                    style={{ fontSize: "30px", color: "red" }}
                  />
                </div>
              ) : (
                <div>
                  <FavoriteBorderIcon
                    onClick={(e) => birYorumuBegenHandle(altYorum.yorumId, e)}
                    className="altYorumLikeIcon altYorumActionIcon"
                    style={{ fontSize: "30px" }}
                  />
                </div>
              )}
              <div>
                <span className="altYorumLikeCount">
                  {altYorum.yeniYorumBegeniSayisi}
                </span>
              </div>
            </div>
            <div className="yorumYorumDivi">
              <div>
                <ChatBubbleOutlineIcon
                  style={{ fontSize: "30px" }}
                  className="altYorumCommentIcon altYorumActionIcon"
                />
              </div>
              <div>
                <span className="altYorumCommentCount">
                  {altYorum.altYorumlar.length}
                </span>
              </div>
            </div>
          </div>
          {acikCevapVerId === altYorum.yorumId ? (
            <div className="altYorumCevapVerAnaDiv">
              <div className="altYorumCevapVerInputDiv">
                <input
                  value={yanitVer}
                  onChange={(e) => setYanitVer(e.target.value)}
                  type="text"
                  placeholder="Yorumunuzu yazın... "
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
              <div className="altYorumCevapVerSendDiv">
                <BiSend
                  onClick={() => yanitVerHandle(altYorum.yorumId)}
                  size={25}
                />
              </div>
            </div>
          ) : (
            <p
              onClick={(event) => {
                event.stopPropagation();
                yorumaCevapVer(altYorum.yorumId);
              }}
            >
              Yanıt Ver
            </p>
          )}
          {yorumlariGoster.includes(altYorum.yorumId) && (
            <AltYorum altYorumlar={altYorum.altYorumlar} />
          )}
        </div>
      ))}
    </div>
  );
}

export default AltYorum;
