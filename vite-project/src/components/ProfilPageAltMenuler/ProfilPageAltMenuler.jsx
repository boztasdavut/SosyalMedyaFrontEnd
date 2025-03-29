import React, { useEffect, useState } from "react";
import "./ProfilPageAltMenuler.css";
import { useNavigate } from "react-router-dom";
import GonderiFrame from "../GonderiFrame/GonderiFrame";
import { anasayfa } from "../../services/Anasayfa";
import { totalBegeniApi } from "../../services/GonderiTotalBegeniSayisi";

function ProfilPageAltMenuler() {
  const [gelenVeriler, setGelenVeriler] = useState([]);
  const [totalBegeniler, setTotalBegeniler] = useState([]);
  const [gonderilerVisibility, setGonderilerVisibility] = useState(true);
  const [begenilerVisibility, setBegenilerVisibility] = useState(false);
  const [yorumlarVisibility, setYorumlarVisibility] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const veriler = await anasayfa();
        const begeniSayisi = await totalBegeniApi();

        if (veriler && begeniSayisi) {
          setGelenVeriler(veriler);
          setTotalBegeniler(begeniSayisi);
        }
      } catch (error) {
        console.error("Verileri çekerken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  const setGonderilerGorunurlugu = () => {
    setBegenilerVisibility(false);
    setYorumlarVisibility(false);
    setGonderilerVisibility(true);
  };

  const setBegenilerGorunurlugu = () => {
    setBegenilerVisibility(true);
    setYorumlarVisibility(false);
    setGonderilerVisibility(false);
  };

  const setYorumlarGorunurlugu = () => {
    setBegenilerVisibility(false);
    setGonderilerVisibility(false);
    setYorumlarVisibility(true);
  };

  return (
    <div className="profilPageAltMenulerVeIcerikAnaDiv">
      <div className="profilPageAltMenulerAnaDiv">
        <div className="gonderilerButonDiv">
          <button onClick={setGonderilerGorunurlugu}>Gönderiler</button>
        </div>
        <div className="begenilerButonDiv">
          <button onClick={setBegenilerGorunurlugu}>Beğeniler</button>
        </div>
        <div className="yorumlarButonDiv">
          <button onClick={setYorumlarGorunurlugu}>Yorumlar</button>
        </div>
      </div>
      {gonderilerVisibility && (
        <div className="gonderilerDiv">
          <GonderiFrame
            veriler={gelenVeriler}
            totalBegeniSayisi={totalBegeniler}
          />
        </div>
      )}
      {begenilerVisibility && (
        <div className="begenilerDiv">begeniler kısmı açıldı.</div>
      )}
      {yorumlarVisibility && (
        <div className="yorumlarDiv">yorumlar div açıldı.</div>
      )}
    </div>
  );
}

export default ProfilPageAltMenuler;
