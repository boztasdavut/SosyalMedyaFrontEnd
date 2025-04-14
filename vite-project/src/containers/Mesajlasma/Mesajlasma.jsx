import React, { useEffect, useState } from "react";
import "./Mesajlasma.css";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { mesajBaslangicSayfasi } from "../../services/MesajlasmaBaslangicSayfasi";

function Mesajlasma() {
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  const [baslangicMesajlari, setBaslangicMesajlari] = useState([]);

  const handleClickMesajlasma = () => {
    setMesajlasmaKutusuAcikMi(!mesajlasmaKutusuAcikMi);
  };

  useEffect(() => {
    const mesajVerileriniAl = async () => {
      const gelenVeri = await mesajBaslangicSayfasi();
      setBaslangicMesajlari(gelenVeri);
    };
    mesajVerileriniAl();
  }, []);
  useEffect(() => {
    console.log(baslangicMesajlari);
  }, [baslangicMesajlari]);
  return (
    <div>
      <div className="mesajlasmaAnaDiv">
        {mesajlasmaKutusuAcikMi ? (
          <div onClick={handleClickMesajlasma} className="mesajKutusuAcikDurum">
            <div className="mesajKutusuAcikBaslikVeIcon">
              <div>Mesajlarım</div>
              <div>
                <MdOutlineKeyboardDoubleArrowDown size={50} />
              </div>
            </div>
            <div>
              <div className="profilResmiMesajVeGonderenDiv">
                {baslangicMesajlari.map((mesaj) => (
                  <div key={mesaj.mesajId} className="cardDiv">
                    <div className="profilResmiVeTakmaAd">
                      <div>profilResmi</div>
                      <div>@{mesaj.karsiTarafAdi}</div>
                    </div>
                    <div className="mesajVeGonderenDiv">
                      <div>{mesaj.mesajIcerigi}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClickMesajlasma}
            className="mesajKutusuKapaliDurum"
          >
            <div>Mesajlarım</div>
            <div>
              <MdOutlineKeyboardDoubleArrowUp size={50} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mesajlasma;
