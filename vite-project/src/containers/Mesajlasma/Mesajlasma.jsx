import React, { useEffect, useState } from "react";
import "./Mesajlasma.css";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { mesajBaslangicSayfasiGetir } from "../../services/MesajlasmaBaslangicSayfasi";
import IcMesajIcerigi from "../IcMesajIcerigi/IcMesajIcerigi.jsx";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { connect, disconnect } from "../../services/SocketBaglantisi.js";
import YeniMesajModal from "../../components/YeniMesajModal/YeniMesajModal.jsx";
import { useGlobalContext } from "../../GlobalProvider";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { mesajSil } from "../../services/MesajSilme.js";

function Mesajlasma() {
  const [mesajBaslangicSayfasi, setMesajBaslangicSayfasi] = useState([]);
  const [
    ikiKullaniciArasindakiTumMesajlar,
    setIkiKullaniciArasindakiTumMesajlar,
  ] = useState([]);
  /*
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  bu kod çalışmaktadır.
  */
  const {
    karsiTarafIdBilgisi,
    setKarsiTarafIdBilgisi,
    karsiTarafAdi,
    setKarsiTarafAdi,
    profilResmi,
    setProfilResmi,
    icMesajAcikMi,
    setIcMesajAcikMi,
    icMesajlasmaLoading,
    setIcMesajlasmaLoading,
    mesajlasmaKutusuAcikMi,
    setMesajlasmaKutusuAcikMi,
    baslangicMesaji,
    setBaslangicMesaji,
  } = useGlobalContext();

  /*
  const [icMesajAcikMi, setIcMesajAcikMi] = useState(false);
  bu kod başarılı bir biçimde çalışmaktadır.
  */

  /*
  const [karsiTarafIdBilgisi, setKarsiTarafIdBilgisi] = useState("");
  Bu kod başarılı bir biçimde çalışmaktadır.
  */

  /*
  const [icMesajlasmaLoading, setIcMesajlasmaLoading] = useState(false);
  bu kod başarılı bir biçimde çalışmaktadır.
  */

  /*
  const [karsiTarafAdi, setKarsiTarafAdi] = useState("");
  Bu kod başarılı bir biçimde çalışmaktadır.
  */

  const [yeniMesajModalIsOpen, setYeniMesajModalIsOpen] = useState(false);

  /*
  const [profilResmi, setProfilResmi] = useState("");
  Bu kod başarılı bir biçimde çalışmaktadır.
  */

  const onMessageReceivedMesajBaslangicSayfasi = (message) => {
    console.log("Mesajlasma sayfasındaki onMessage calisti.");
    setMesajBaslangicSayfasi((prevMesajlar) => {
      // Eğer aynı kişiyle mesajlaşma zaten varsa güncelle, yoksa ekle
      const mevcutIndex = prevMesajlar.findIndex(
        (m) => m.karsiTarafId === message.gonderenKullaniciId
      );

      if (mevcutIndex !== -1) {
        const guncellenmisMesaj = {
          ...prevMesajlar[mevcutIndex],
          mesajIcerigi: message.mesajIcerigi,
        };

        const yeniMesajlar = [...prevMesajlar];
        yeniMesajlar.splice(mevcutIndex, 1); // eskiyi kaldır
        return [guncellenmisMesaj, ...yeniMesajlar]; // en üste ekle
      } else {
        // Yeni bir kullanıcıdan ilk kez mesaj geldi
        return [
          {
            karsiTarafId: message.gonderenKullaniciId,
            karsiTarafAdi: message.mesajAtanKullaniciTakmaAdi,
            mesajIcerigi: message.mesajIcerigi,
            mesajId: message.mesajId,
            mesajGonderilmeZamani: message.mesajGonderilmeZamani,
            karsiTarafProfilResmi: message.mesajAtanKullaniciFoto,
          },
          ...prevMesajlar,
        ];
      }
    });
  };

  useEffect(() => {
    const baslangicMesajlariGetir = async () => {
      try {
        const mesajBaslangic = await mesajBaslangicSayfasiGetir();
        console.log("Baslangic mesaj verileri= ", mesajBaslangic);
        setMesajBaslangicSayfasi(mesajBaslangic);
      } catch (err) {
        console.log("Mesajlasma sayfasinda bir hata meydana geldi= ", err);
      }
    };
    baslangicMesajlariGetir();
    connect(onMessageReceivedMesajBaslangicSayfasi);

    return () => {
      console.log("Mesajlasma componenti disconnect calisti");
      disconnect();
    };
  }, []);

  /*useEffect(() => {
    const baslangicMesajlariGetir = async () => {
      try {
        const mesajBaslangic = await mesajBaslangicSayfasiGetir();
        console.log("Baslangic mesaj verileri= ", mesajBaslangic);
        setMesajBaslangicSayfasi(mesajBaslangic);
      } catch (err) {
        console.log("Mesajlasma sayfasinda bir hata meydana geldi= ", err);
      }
    };
    baslangicMesajlariGetir();
  }, [icMesajAcikMi]);*/

  useEffect(() => {
    console.log("Mesaj baslangic sayfasi= ", mesajBaslangicSayfasi);
  }, [mesajBaslangicSayfasi]);

  const handleClickMesajlasma = () => {
    setMesajlasmaKutusuAcikMi(!mesajlasmaKutusuAcikMi);
    setIcMesajAcikMi(false); // Mesaj kutusuna geri dönünce iç mesaj kapanmalı
  };

  const icMesajlasmaHandle = async (
    karsiTarafId,
    karsiTarafAdi,
    karsiTarafProfilResmi
  ) => {
    try {
      setIcMesajlasmaLoading(true);
      setIcMesajAcikMi(true); // İç mesaja girildi
      setKarsiTarafIdBilgisi(karsiTarafId);
      setKarsiTarafAdi(karsiTarafAdi);
      setProfilResmi(karsiTarafProfilResmi);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    } finally {
      setIcMesajlasmaLoading(false);
    }
  };

  const yeniMesajModalHandle = () => {
    setYeniMesajModalIsOpen(true);
    console.log(
      "Butonu aktif etme butonu çalıştı deger= ",
      yeniMesajModalIsOpen
    );
  };

  const yeniMesajKisilerListesiniKapat = () => {
    setYeniMesajModalIsOpen(false);
  };

  const mesajSilState = (karsiTarafId) => {
    setMesajBaslangicSayfasi((prevMesajlar) =>
      prevMesajlar.filter((mesaj) => mesaj.karsiTarafId !== karsiTarafId)
    );
  };

  const mesajSilmeyeTiklandi = async (karsiTarafKullaniciId, e) => {
    e.stopPropagation();
    console.log("karsi taraf kullanici id= ", karsiTarafKullaniciId);
    try {
      setIkiKullaniciArasindakiTumMesajlar([]);
      console.log("Mesaj silme calisti.");
      const gelenVeri = await mesajSil(karsiTarafKullaniciId);
      mesajSilState(karsiTarafKullaniciId);
    } catch (err) {
      console.log("Mesaj silmede bir hata meydana geldi= ", err);
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
              <div className="mesajKutusuIconVeBaslik">
                <div>
                  <MarkunreadOutlinedIcon />
                </div>
                <div>Mesajlarım</div>
              </div>
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
                    profilResmi={profilResmi}
                    baslangicMesaji={baslangicMesaji}
                    setBaslangicMesaji={setBaslangicMesaji}
                    ikiKullaniciArasindakiTumMesajlar={
                      ikiKullaniciArasindakiTumMesajlar
                    }
                    setIkiKullaniciArasindakiTumMesajlar={
                      setIkiKullaniciArasindakiTumMesajlar
                    }
                    connect={connect}
                    disconnect={disconnect}
                    setMesajBaslangicSayfasi={setMesajBaslangicSayfasi}
                    onMessageReceivedMesajBaslangicSayfasi={
                      onMessageReceivedMesajBaslangicSayfasi
                    }
                  />
                ) : (
                  <div>
                    {yeniMesajModalIsOpen ? (
                      <div>
                        <div
                          onClick={yeniMesajKisilerListesiniKapat}
                          className="yeniMesajOlusturDiv"
                        >
                          <div>Listeyi Kapat</div>
                          <div>
                            <AddBoxOutlinedIcon />
                          </div>
                        </div>
                        <YeniMesajModal
                          setIcMesajAcikMi={setIcMesajAcikMi}
                          setKarsiTarafIdBilgisi={setKarsiTarafIdBilgisi}
                          setKarsiTarafAdi={setKarsiTarafAdi}
                          setProfilResmi={setProfilResmi}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={yeniMesajModalHandle}
                        className="yeniMesajOlusturDiv"
                      >
                        <div>Yeni Mesaj</div>
                        <div>
                          <AddBoxOutlinedIcon />
                        </div>
                      </div>
                    )}

                    {mesajBaslangicSayfasi.map((mesaj) => (
                      <div
                        onClick={() =>
                          icMesajlasmaHandle(
                            mesaj.karsiTarafId,
                            mesaj.karsiTarafAdi,
                            mesaj.karsiTarafProfilResmi
                          )
                        }
                        key={mesaj.mesajId}
                        className="cardDiv"
                      >
                        <div className="profilBilgisiVeSilmeButonu">
                          <div className="profilResmiVeTakmaAd">
                            <div>
                              <img
                                src={
                                  mesaj.karsiTarafProfilResmi?.endsWith(
                                    "empty.png"
                                  )
                                    ? "https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"
                                    : mesaj.karsiTarafProfilResmi
                                }
                                alt="Profil"
                              />
                              {/*<img
                                src={mesaj.karsiTarafProfilResmi}
                                alt="Profil"
                              />*/}
                            </div>
                            <div>@{mesaj.karsiTarafAdi}</div>
                          </div>
                          <div>
                            <DeleteOutlineOutlinedIcon
                              onClick={(e) =>
                                mesajSilmeyeTiklandi(mesaj.karsiTarafId, e)
                              }
                            />
                          </div>
                        </div>

                        <div className="mesajVeGonderenDiv">
                          <div className="lastMessage">
                            {mesaj.mesajIcerigi}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClickMesajlasma}
            className="mesajKutusuKapaliDurum"
          >
            <div className="mesajKutusuIconVeBaslik">
              <div>
                <MarkunreadOutlinedIcon />
              </div>
              <div>Mesajlarım</div>
            </div>

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
