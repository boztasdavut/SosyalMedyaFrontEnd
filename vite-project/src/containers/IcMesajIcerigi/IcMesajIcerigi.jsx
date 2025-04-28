import React, { useEffect, useState, useRef } from "react";
import "./IcMesajIcerigi.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { ikiKullaniciArasindakiMesajlar } from "../../services/İkiKullaniciArasindakiMesajlar.js";
import { jwtDecode } from "../../services/JwtDecode.js";

function IcMesajIcerigi({
  karsiTarafIdBilgisi,
  icMesajlasmaLoading,
  setIcMesajlasmaLoading,
  setIcMesajAcikMi,
}) {
  const [
    ikiKullaniciArasindakiTumMesajlar,
    setIkiKullaniciArasindakiTumMesajlar,
  ] = useState([]);
  const [oturumSahibiKullaniciId, setOturumSahibiKullaniciId] = useState(0);

  const mesajListesiRef = useRef(null); // Mesajlar container'ı için ref

  const mesajSayfasinaGeriDon = () => {
    setIcMesajAcikMi(false);
  };

  useEffect(() => {
    const mesajVerileriniAl = async (karsiTarafId) => {
      try {
        setIcMesajlasmaLoading(true);
        const kullaniciId = await jwtDecode();
        setOturumSahibiKullaniciId(kullaniciId);
        const gelenVeri = await ikiKullaniciArasindakiMesajlar(karsiTarafId);
        console.log("kisi ile olan mesajlar= ", gelenVeri);
        setIkiKullaniciArasindakiTumMesajlar(gelenVeri);
      } catch (err) {
        console.log("Bir hata meydana geldi= ", err);
      } finally {
        setIcMesajlasmaLoading(false);
      }
    };
    mesajVerileriniAl(karsiTarafIdBilgisi);
  }, []);

  // Scroll işlemi, yeni mesajlar eklendiğinde en alta kaydırmak için
  useEffect(() => {
    if (mesajListesiRef.current) {
      mesajListesiRef.current.scrollTop = mesajListesiRef.current.scrollHeight;
    }
  }, [ikiKullaniciArasindakiTumMesajlar]);

  return (
    <div className="icMesajEkrani">
      {/* Mesajların Görünmesi */}
      {icMesajlasmaLoading ? (
        <div className="loaderContainer">
          <ClipLoader size={100} color="#4a90e2" className="loader" />
        </div>
      ) : ikiKullaniciArasindakiTumMesajlar.length > 0 ? (
        <div className="mesajlarContainer" ref={mesajListesiRef}>
          <div className="mesajSayfasinaDonDiv" onClick={mesajSayfasinaGeriDon}>
            <div>
              <div>
                <AiOutlineDoubleLeft />
              </div>
            </div>
            <div className="mesajlasilanKullaniciBasligi">
              <div>
                <img
                  src={
                    ikiKullaniciArasindakiTumMesajlar[0]
                      .mesajGonderilenKullaniciResmi
                  }
                />
              </div>
              <div>
                @
                {
                  ikiKullaniciArasindakiTumMesajlar[0]
                    .mesajGonderilenKullaniciAdi
                }
              </div>
            </div>
          </div>
          {ikiKullaniciArasindakiTumMesajlar.map((mesaj, index) => (
            <div key={index} className="mesajCard">
              {mesaj.gonderenKullaniciId === oturumSahibiKullaniciId ? (
                <div className="benimMesajimCard">
                  <div className="benimAttigimMesajDiv">
                    <p>{mesaj.mesajIcerigi}</p>
                  </div>
                </div>
              ) : (
                <div className="onunMesajiCard">
                  <div className="banaAtilanMesajDiv">
                    <p>{mesaj.mesajIcerigi}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Mesaj Yazma Input'u */}
          <div className="inputContainer">
            <input type="text" placeholder="Mesajınızı yazın..." />
          </div>
        </div>
      ) : (
        <p>Mesaj bulunamadı.</p>
      )}
    </div>
  );
}

export default IcMesajIcerigi;
