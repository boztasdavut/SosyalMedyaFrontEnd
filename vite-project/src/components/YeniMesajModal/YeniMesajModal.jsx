import React, { useEffect, useState } from "react";
import "./YeniMesajModal.css";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import { kullaniciTumTakipEdilenleriGetir } from "../../services/KullaniciTumTakipEdilenlerGetir.js";

function YeniMesajModal({
  setKarsiTarafIdBilgisi,
  setKarsiTarafAdi,
  setIcMesajAcikMi,
  setProfilResmi,
}) {
  const [takipcilerVeTakipEdilenler, setTakipcilerVeTakipEdilenler] = useState(
    []
  );
  useEffect(() => {
    const takipVerileriniGetir = async () => {
      try {
        const takipcilerVeri = await kullanicininTumTakipcileriniGetir();
        const takipEdilenlerVeri = await kullaniciTumTakipEdilenleriGetir();

        const tumKullanicilar = [
          ...takipcilerVeri.follow,
          ...takipEdilenlerVeri.follow,
        ];

        // Tekil kullanıcıları filtrele (kullaniciId'ye göre)
        const benzersizKullanicilarMap = new Map();
        for (const kullanici of tumKullanicilar) {
          if (!benzersizKullanicilarMap.has(kullanici.kullaniciId)) {
            benzersizKullanicilarMap.set(kullanici.kullaniciId, kullanici);
          }
        }

        const benzersizKullanicilar = Array.from(
          benzersizKullanicilarMap.values()
        );
        setTakipcilerVeTakipEdilenler(benzersizKullanicilar);
      } catch (error) {
        console.error("Takip verileri alınırken hata oluştu:", error);
      }
    };

    takipVerileriniGetir();
  }, []);

  useEffect(() => {
    console.log("Tum liste= ", takipcilerVeTakipEdilenler);
  }, [takipcilerVeTakipEdilenler]);

  const mesajGonderHandle = (karsiTarafAdi, karsiTarafId, profilResmi) => {
    setKarsiTarafAdi(karsiTarafAdi);
    setKarsiTarafIdBilgisi(karsiTarafId);
    setProfilResmi(profilResmi);
    setIcMesajAcikMi(true);
  };

  return (
    <div className="yeniMesajModalAnaDiv">
      <div className="yeniMesajModalCardDiv">
        {takipcilerVeTakipEdilenler.map((kisi) => (
          <div className="yeniMesajKullaniciDiv">
            <div className="yeniMesajResimAnaDiv">
              <img id="yeniMesajResim" src={kisi.kullaniciProfilResmi} />
            </div>
            <div>@{kisi.kullaniciTakmaAd}</div>
            <div
              onClick={() =>
                mesajGonderHandle(
                  kisi.kullaniciTakmaAd,
                  kisi.kullaniciId,
                  kisi.kullaniciProfilResmi
                )
              }
              className="yeniMesajGondermeDiv"
            >
              Mesaj Gönder
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YeniMesajModal;
