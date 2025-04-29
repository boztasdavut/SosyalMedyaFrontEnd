import React, { useEffect, useState } from "react";
import "./Mesajlasma.css";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { mesajBaslangicSayfasiGetir } from "../../services/MesajlasmaBaslangicSayfasi";
import IcMesajIcerigi from "../IcMesajIcerigi/IcMesajIcerigi.jsx";

function Mesajlasma() {
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  const [mesajBaslangicSayfasi, setMesajBaslangicSayfasi] = useState([]);
  const [icMesajAcikMi, setIcMesajAcikMi] = useState(false);
  const [karsiTarafIdBilgisi, setKarsiTarafIdBilgisi] = useState("");
  const [icMesajlasmaLoading, setIcMesajlasmaLoading] = useState(false);
  const [karsiTarafAdi, setKarsiTarafAdi] = useState("");
  useEffect(() => {
    const baslangicMesajlariGetir = async () => {
      try {
        const mesajBaslangic = await mesajBaslangicSayfasiGetir();
        console.log("Mesajlar verisi= ", mesajBaslangic);
        setMesajBaslangicSayfasi(mesajBaslangic);
      } catch (err) {
        console.log("Mesajlasma sayfasinda bir hata meydana geldi= ", err);
      }
    };
    baslangicMesajlariGetir();
  }, []);

  const handleClickMesajlasma = () => {
    setMesajlasmaKutusuAcikMi(!mesajlasmaKutusuAcikMi);
    setIcMesajAcikMi(false); // Mesaj kutusuna geri dönünce iç mesaj kapanmalı
  };

  const icMesajlasmaHandle = async (karsiTarafId, karsiTarafAdi) => {
    try {
      setIcMesajlasmaLoading(true);
      setIcMesajAcikMi(true); // İç mesaja girildi
      setKarsiTarafIdBilgisi(karsiTarafId);
      setKarsiTarafAdi(karsiTarafAdi);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    } finally {
      setIcMesajlasmaLoading(false);
    }
  };

  return (
    <div>
      <div className="mesajlasmaAnaDiv">
        {mesajlasmaKutusuAcikMi ? (
          <div className="mesajKutusuAcikDurum">
            <div
              onClick={handleClickMesajlasma}
              className="mesajKutusuAcikBaslikVeIcon"
            >
              <div>Mesajlarım</div>
              <div>
                <MdOutlineKeyboardDoubleArrowDown size={50} />
              </div>
            </div>
            <div>
              <div className="profilResmiMesajVeGonderenDiv">
                {icMesajAcikMi ? (
                  <IcMesajIcerigi
                    karsiTarafIdBilgisi={karsiTarafIdBilgisi}
                    icMesajlasmaLoading={icMesajlasmaLoading}
                    setIcMesajlasmaLoading={setIcMesajlasmaLoading}
                    setIcMesajAcikMi={setIcMesajAcikMi}
                    karsiTarafAdi={karsiTarafAdi}
                  />
                ) : (
                  mesajBaslangicSayfasi.map((mesaj) => (
                    <div
                      onClick={() =>
                        icMesajlasmaHandle(
                          mesaj.karsiTarafId,
                          mesaj.karsiTarafAdi
                        )
                      }
                      key={mesaj.mesajId}
                      className="cardDiv"
                    >
                      <div className="profilResmiVeTakmaAd">
                        <div>
                          <img src={mesaj.karsiTarafProfilResmi} alt="Profil" />
                        </div>
                        <div>@{mesaj.karsiTarafAdi}</div>
                      </div>
                      <div className="mesajVeGonderenDiv">
                        <div>{mesaj.mesajIcerigi}</div>
                      </div>
                    </div>
                  ))
                )}
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
