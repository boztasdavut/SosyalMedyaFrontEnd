import React, { useEffect, useState, useRef } from "react";
import "./IcMesajIcerigi.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { ikiKullaniciArasindakiMesajlar } from "../../services/İkiKullaniciArasindakiMesajlar.js";
import { jwtDecode } from "../../services/JwtDecode.js";
import { useNavigate } from "react-router-dom";
import { connect, disconnect } from "../../services/SocketBaglantisi.js";
import { birKullaniciyaMesajGonder } from "../../services/BirKullaniciyaMesajGonder.js";

function IcMesajIcerigi({
  karsiTarafIdBilgisi,
  icMesajlasmaLoading,
  setIcMesajlasmaLoading,
  setIcMesajAcikMi,
  karsiTarafAdi,
}) {
  const [
    ikiKullaniciArasindakiTumMesajlar,
    setIkiKullaniciArasindakiTumMesajlar,
  ] = useState([]);
  const [oturumSahibiKullaniciId, setOturumSahibiKullaniciId] = useState(0);
  const mesajListesiRef = useRef(null);

  const mesajSayfasinaGeriDon = () => {
    setIcMesajAcikMi(false);
  };
  const navigate = useNavigate();

  const [yazilanMesaj, setYazilanMesaj] = useState("");

  const onMessageReceived = (message) => {
    console.log("Yeni mesaj geldi", message);
    //setIkiKullaniciArasindakiTumMesajlar((prev) => [...prev, message]);
  };

  useEffect(() => {
    connect(onMessageReceived, karsiTarafAdi);

    return () => {
      disconnect();
    };
  }, [karsiTarafAdi]);

  const mesajGondermeButonuHandle = async () => {
    console.log(
      "Mesaj gonderme butonuna tiklandi, mesaj icerigi= ",
      yazilanMesaj
    );

    try {
      let nesne = {};
      for (const obj of ikiKullaniciArasindakiTumMesajlar) {
        console.log("Deger= ", obj["mesajGonderenKullaniciAdi"]);
        if (obj["gonderenKullaniciId"] === oturumSahibiKullaniciId) {
          nesne["aliciKullaniciId"] = karsiTarafIdBilgisi;
          nesne["gonderenKullaniciId"] = oturumSahibiKullaniciId;
          nesne["mesajIcerigi"] = yazilanMesaj;
          nesne["mesajGonderilenKullaniciResmi"] =
            obj["mesajGonderilenKullaniciResmi"];
          nesne["mesajGonderilenKullaniciAdi"] =
            obj["mesajGonderilenKullaniciAdi"];
          break;
        }
      }
      console.log(
        "Listeye eklemek için yeni kaydedilen mesaj nesnesi= ",
        nesne
      );
      setIkiKullaniciArasindakiTumMesajlar([
        ...ikiKullaniciArasindakiTumMesajlar,
        nesne,
      ]);
      const gelenVeri = await birKullaniciyaMesajGonder(
        yazilanMesaj,
        karsiTarafIdBilgisi
      );
      setYazilanMesaj("");
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  useEffect(() => {
    const mesajVerileriniAl = async (karsiTarafId) => {
      try {
        setIcMesajlasmaLoading(true);
        const kullaniciId = await jwtDecode();
        setOturumSahibiKullaniciId(kullaniciId);
        const gelenVeri = await ikiKullaniciArasindakiMesajlar(karsiTarafId);
        setIkiKullaniciArasindakiTumMesajlar(gelenVeri);
      } catch (err) {
        console.error("Hata:", err);
      } finally {
        setIcMesajlasmaLoading(false);
      }
    };
    mesajVerileriniAl(karsiTarafIdBilgisi);
  }, [karsiTarafIdBilgisi]);

  useEffect(() => {
    if (mesajListesiRef.current) {
      mesajListesiRef.current.scrollTop = mesajListesiRef.current.scrollHeight;
    }
    console.log(
      "iki kullanici arasindaki mesaj= ",
      ikiKullaniciArasindakiTumMesajlar
    );
  }, [ikiKullaniciArasindakiTumMesajlar]);

  const mesajdanProfileYonlendir = (takmaAd) => {
    const yonlendirilecekUrlAdresi = `/profil/${takmaAd}`;
    navigate(yonlendirilecekUrlAdresi);
  };

  return (
    <div className="icMesajEkrani">
      {/* Sabit Başlık */}
      <div className="mesajSayfasinaDonDiv">
        <div className="anasayfayaDonArrowDiv" onClick={mesajSayfasinaGeriDon}>
          <FaLongArrowAltLeft size={25} />
        </div>
        {ikiKullaniciArasindakiTumMesajlar.length > 0 && (
          <div
            onClick={() =>
              mesajdanProfileYonlendir(
                ikiKullaniciArasindakiTumMesajlar[0].mesajGonderilenKullaniciAdi
              )
            }
            className="mesajlasilanKullaniciBasligi"
          >
            <img
              id="mesajBasligiResimId"
              src={
                ikiKullaniciArasindakiTumMesajlar[0]
                  .mesajGonderilenKullaniciResmi
              }
              alt="Profil"
            />
            <div>
              @
              {ikiKullaniciArasindakiTumMesajlar[0].mesajGonderilenKullaniciAdi}
            </div>
          </div>
        )}
      </div>

      {/* Mesajlar veya Yükleyici */}
      {icMesajlasmaLoading ? (
        <div className="loaderContainer">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : ikiKullaniciArasindakiTumMesajlar.length > 0 ? (
        <>
          <div className="mesajlarContainer" ref={mesajListesiRef}>
            {ikiKullaniciArasindakiTumMesajlar.map((mesaj, index) => (
              <div key={index} className="mesajCard">
                {mesaj.gonderenKullaniciId === oturumSahibiKullaniciId ? (
                  <div className="benimMesajimCard">
                    <div className="benimAttigimMesajDiv">
                      {mesaj.mesajIcerigi}
                    </div>
                  </div>
                ) : (
                  <div className="onunMesajiCard">
                    <div className="banaAtilanMesajDiv">
                      {mesaj.mesajIcerigi}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sabit Input */}
          <div className="inputContainer">
            <div className="mesajGondermeDivi">
              <input
                type="text"
                value={yazilanMesaj}
                onChange={(e) => setYazilanMesaj(e.target.value)}
                placeholder="Mesajınızı yazın..."
              />
            </div>
            <div onClick={mesajGondermeButonuHandle} className="gonderButton">
              <BiSend size={25} />
            </div>
          </div>
        </>
      ) : (
        <p className="mesajYokText">Mesaj bulunamadı.</p>
      )}
    </div>
  );
}

export default IcMesajIcerigi;
