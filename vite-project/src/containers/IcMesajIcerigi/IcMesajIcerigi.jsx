import React, { useEffect, useState, useRef } from "react";
import "./IcMesajIcerigi.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { ikiKullaniciArasindakiMesajlar } from "../../services/İkiKullaniciArasindakiMesajlar.js";
import { jwtDecode } from "../../services/JwtDecode.js";
import { useNavigate } from "react-router-dom";
//import { connect, disconnect } from "../../services/SocketBaglantisi.js";
import { birKullaniciyaMesajGonder } from "../../services/BirKullaniciyaMesajGonder.js";
import { jwtTakmaAdAl } from "../../services/MevcutTakmaAdAl.js";
import Linkify from "linkify-react";

function IcMesajIcerigi({
  karsiTarafIdBilgisi,
  icMesajlasmaLoading,
  setIcMesajlasmaLoading,
  setIcMesajAcikMi,
  karsiTarafAdi,
  profilResmi,
  baslangicMesaji,
  setBaslangicMesaji,
  ikiKullaniciArasindakiTumMesajlar,
  setIkiKullaniciArasindakiTumMesajlar,
  connect,
  disconnect,
  setMesajBaslangicSayfasi,
  onMessageReceivedMesajBaslangicSayfasi,
}) {
  useEffect(() => {
    console.log("ic mesaj profil resmi bilgisi= ", profilResmi);
    console.log("ic mesaj karsi taraf adi bilgisi= ", karsiTarafAdi);
  }, [profilResmi, karsiTarafAdi]);

  const [yazilanMesaj, setYazilanMesaj] = useState("");

  useEffect(() => {
    if (baslangicMesaji !== undefined) {
      setYazilanMesaj(baslangicMesaji);
    }
  }, [baslangicMesaji]);
  const [oturumSahibiKullaniciId, setOturumSahibiKullaniciId] = useState(0);
  const mesajListesiRef = useRef(null);

  const mesajSayfasinaGeriDon = () => {
    setIcMesajAcikMi(false);
  };
  const navigate = useNavigate();

  const onMessageReceived = (message) => {
    let yeniObje = {
      mesajGonderilenKullaniciAdi: message.mesajAtilanKullaniciTakmaAdi,
      mesajGonderenKullaniciAdi: message.mesajAtanKullaniciTakmaAdi,
      mesajGonderenKullaniciResmi: message.mesajAtanKullaniciFoto,
      mesajId: message.mesajId,
      gonderenKullaniciId: message.gonderenKullaniciId,
      aliciKullaniciId: message.aliciKullaniciId,
      mesajIcerigi: message.mesajIcerigi,
      mesajGonderilmeZamani: message.mesajGonderilmeZamani,
      mesajOkunduMu: message.mesajOkunduMu,
      mesajGonderilenKullaniciResmi: message.mesajAtilanKullaniciFoto,
    };
    onMessageReceivedMesajBaslangicSayfasi(message);
    setIkiKullaniciArasindakiTumMesajlar((prev) => [...prev, yeniObje]);
    console.log(
      "iki kullanici arasindaki mesajlar= ",
      ikiKullaniciArasindakiTumMesajlar
    );
  };

  useEffect(() => {
    connect(onMessageReceived);

    return () => {
      console.log("İç mesaj içeriği disconnect calisti.");
      disconnect();
    };
  }, []);

  const mesajGondermeButonuHandle = async () => {
    if (yazilanMesaj === "") {
      return;
    }
    console.log(
      "Mesaj gonderme butonuna tiklandi, mesaj icerigi= ",
      yazilanMesaj
    );

    try {
      let flag = 0;
      let nesne = {};
      for (const obj of ikiKullaniciArasindakiTumMesajlar) {
        if (obj["gonderenKullaniciId"] === oturumSahibiKullaniciId) {
          nesne["aliciKullaniciId"] = karsiTarafIdBilgisi; // var
          nesne["gonderenKullaniciId"] = oturumSahibiKullaniciId; //var
          nesne["mesajIcerigi"] = yazilanMesaj; //var
          nesne["mesajGonderilenKullaniciResmi"] =
            obj["mesajGonderilenKullaniciResmi"]; //var
          nesne["mesajGonderilenKullaniciAdi"] =
            obj["mesajGonderilenKullaniciAdi"]; //var
          nesne["mesajId"] = obj["mesajId"]; //var
          nesne["mesajOkunduMu"] = obj["mesajOkunduMu"]; //var
          nesne["mesajGonderenKullaniciResmi"] =
            obj["mesajGonderenKullaniciResmi"]; //var
          nesne["mesajGonderenKullaniciAdi"] = obj["mesajGonderenKullaniciAdi"]; //var
          nesne["mesajGonderilmeZamani"] = obj["mesajGonderilmeZamani"]; //var
          flag = flag + 1;
          break;
        }
      }
      if (flag === 0) {
        nesne["aliciKullaniciId"] = karsiTarafIdBilgisi;
        nesne["gonderenKullaniciId"] = oturumSahibiKullaniciId;
        nesne["mesajIcerigi"] = yazilanMesaj;
        nesne["mesajGonderilenKullaniciResmi"] = profilResmi;
        nesne["mesajGonderilenKullaniciAdi"] = karsiTarafAdi;
        nesne["mesajOkunduMu"] = false;
        nesne["mesajGonderenKullaniciResmi"] = null;
        nesne["mesajGonderenKullaniciAdi"] = jwtTakmaAdAl();
        nesne["mesajGonderilmeZamani"] = null;
        nesne["mesajId"] = null;
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
      setBaslangicMesaji("");
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  /*const mesajGondermeButonuHandle = async () => {
    try {
      await birKullaniciyaMesajGonder(yazilanMesaj, karsiTarafIdBilgisi);
      setYazilanMesaj("");
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };*/

  useEffect(() => {
    const mesajVerileriniAl = async (karsiTarafId) => {
      try {
        setIcMesajlasmaLoading(true);
        const kullaniciId = await jwtDecode();
        setOturumSahibiKullaniciId(kullaniciId);
        const gelenVeri = await ikiKullaniciArasindakiMesajlar(karsiTarafId);
        console.log("iki kullanici arasindaki mesajlar gelen= ", gelenVeri);
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
        {ikiKullaniciArasindakiTumMesajlar && (
          <div
            onClick={() => mesajdanProfileYonlendir(karsiTarafAdi)}
            className="mesajlasilanKullaniciBasligi"
          >
            <img
              id="mesajBasligiResimId"
              src={
                profilResmi?.endsWith("empty.png")
                  ? "https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"
                  : profilResmi
              }
              alt="Profil"
            />
            {/*<img id="mesajBasligiResimId" src={profilResmi} alt="Profil" />*/}
            <div>@{karsiTarafAdi}</div>
          </div>
        )}
      </div>

      {/* Mesajlar veya Yükleyici */}
      {icMesajlasmaLoading ? (
        <div className="loaderContainer">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        ikiKullaniciArasindakiTumMesajlar && (
          <>
            <div className="mesajlarContainer" ref={mesajListesiRef}>
              {ikiKullaniciArasindakiTumMesajlar.map((mesaj, index) => (
                <div key={index} className="mesajCard">
                  {mesaj.gonderenKullaniciId === oturumSahibiKullaniciId ? (
                    <div className="benimMesajimCard">
                      <div className="benimAttigimMesajDiv">
                        <Linkify
                          options={{
                            rel: "noopener noreferrer",
                          }}
                        >
                          {mesaj.mesajIcerigi}
                        </Linkify>
                      </div>
                    </div>
                  ) : (
                    <div className="onunMesajiCard">
                      <div className="banaAtilanMesajDiv">
                        <Linkify
                          options={{
                            rel: "noopener noreferrer",
                          }}
                        >
                          {mesaj.mesajIcerigi}
                        </Linkify>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sabit Input */}
            <div className="inputContainer">
              <div className="mesajGondermeDivi">
                <textarea
                  className="mesajTextarea"
                  type="text"
                  value={yazilanMesaj}
                  onChange={(e) => setYazilanMesaj(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // input'ta yeni satır oluşturulmasını önler
                      mesajGondermeButonuHandle();
                    }
                  }}
                  placeholder="Mesajınızı yazın..."
                />
              </div>
              <div onClick={mesajGondermeButonuHandle} className="gonderButton">
                <BiSend size={25} />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default IcMesajIcerigi;
