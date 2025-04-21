import React, { useEffect, useState } from "react";
import "./Mesajlasma.css";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { mesajBaslangicSayfasiGetir } from "../../services/MesajlasmaBaslangicSayfasi";

function Mesajlasma() {
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  const [mesajBaslangicSayfasi, setMesajBaslangicSayfasi] = useState([]);

  useEffect(() => {
    const baslangicMesajlariGetir = async () => {
      const mesajBaslangic = await mesajBaslangicSayfasiGetir();
      console.log("Mesajlar verisi= ", mesajBaslangic);
      setMesajBaslangicSayfasi(mesajBaslangic);
    };
    baslangicMesajlariGetir();
  }, []);

  const handleClickMesajlasma = () => {
    setMesajlasmaKutusuAcikMi(!mesajlasmaKutusuAcikMi);
  };

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
                {mesajBaslangicSayfasi.map((mesaj) => (
                  <div key={mesaj.mesajId} className="cardDiv">
                    <div className="profilResmiVeTakmaAd">
                      <div>
                        <img src={mesaj.karsiTarafProfilResmi} />
                      </div>
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
