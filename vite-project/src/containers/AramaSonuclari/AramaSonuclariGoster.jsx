import React, { useEffect, useState } from "react";
import "./AramaSonuclariGoster.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { aramaGecmisiKaydet } from "../../services/KullaniciAramaGecmisiKaydet.js";
import { aramaGecmisiGetir } from "../../services/KullanicininTumAramaGecmisi.js";
import { TiDelete } from "react-icons/ti";
import { aramaGecmisiSil } from "../../services/KullaniciAramaGecmisiSil.js";
import { tumAramaGecmisiniSil } from "../../services/TumAramaGecmisiniSil.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
function AramaSonuclariGoster({ query = "", aramaSonuclari = [], isLoading }) {
  const navigate = useNavigate();
  const [aramaGecmisiSonuclari, setAramaGecmisiSonuclari] = useState([]);
  const [aramaGecmisiLoading, setAramaGecmisiLoading] = useState(true);

  const kullanicininTumAramaGecmisiniGetir = async () => {
    try {
      const aramaGecmisi = await aramaGecmisiGetir();
      setAramaGecmisiSonuclari(aramaGecmisi);
      console.log("Arama gecmisi sonucları= ", aramaGecmisi);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    } finally {
      setAramaGecmisiLoading(false);
    }
  };

  useEffect(() => {
    kullanicininTumAramaGecmisiniGetir();
    console.log("Query bilgisi= ", aramaSonuclari);
  }, [aramaSonuclari]);

  const aramaGecmisindenKullaniciProfilineGit = async (kullaniciTakmaAd) => {
    const yonlendirilecekUrlAdresi = `/profil/${kullaniciTakmaAd}`;
    navigate(yonlendirilecekUrlAdresi);
  };

  const birAramaGecmisiniSil = async (aramaGecmisiId) => {
    try {
      setAramaGecmisiLoading(true);
      const gelenVeri = await aramaGecmisiSil(aramaGecmisiId);
      console.log("Belirli bir arama gecmisi silme= ", gelenVeri);
      const filtrelenmisAramaGecmisiSonuclari = aramaGecmisiSonuclari.filter(
        (aramaGecmisi) => aramaGecmisi.aramaGecmisiId !== aramaGecmisiId
      );
      setAramaGecmisiSonuclari(filtrelenmisAramaGecmisiSonuclari);
    } catch (err) {
      console.log("Arama gecmisini silme işleminde hata var= ", err);
    } finally {
      setAramaGecmisiLoading(false);
    }
  };

  const aramaGecmisiTemizle = async () => {
    try {
      setAramaGecmisiLoading(true);
      const gelenVeri = await tumAramaGecmisiniSil();
      setAramaGecmisiSonuclari([]);
    } catch (err) {
      console.log("Tüm arama geçmişini silme işleminde bir hata var= ", err);
    } finally {
      setAramaGecmisiLoading(false);
    }
  };

  if (!query.trim()) {
    if (aramaGecmisiSonuclari && aramaGecmisiSonuclari.length !== 0) {
      if (aramaGecmisiLoading === false) {
        return (
          <div>
            <h3 style={{ textAlign: "center" }}>Arama Geçmişi</h3>
            <h5 onClick={aramaGecmisiTemizle} style={{ textAlign: "center" }}>
              Tüm Arama Geçmişini Temizle
            </h5>
            {aramaGecmisiSonuclari.map((aramaGecmisi) => (
              <div
                key={aramaGecmisi.aramaGecmisiId}
                className="aramaGecmisiDiv"
              >
                <div
                  onClick={() =>
                    aramaGecmisindenKullaniciProfilineGit(
                      aramaGecmisi.kullaniciTakmaAd
                    )
                  }
                  className="aramaGecmisiProfilResmiVeTakmaAdDiv"
                >
                  <img src={aramaGecmisi.kullaniciProfilResmi} />
                  <div>{aramaGecmisi.kullaniciTakmaAd}</div>
                </div>

                <div
                  onClick={() =>
                    birAramaGecmisiniSil(aramaGecmisi.aramaGecmisiId)
                  }
                >
                  <DeleteOutlineOutlinedIcon />
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ClipLoader color="#4a90e2" size={30} />
          </div>
        );
      }
    } else {
      return (
        <div style={{ textAlign: "center" }}>Arama Geçmişi bulunamadı</div>
      );
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <ClipLoader color="#4a90e2" size={30} />
      </div>
    );
  }

  if (aramaSonuclari.length === 0) {
    return <div className="no-results">Sonuç bulunamadı.</div>;
  }

  const aramadanKullaniciProfilineYonlendir = async (
    takmaAd,
    gidilenKullaniciId
  ) => {
    const yonlendirilecekUrlAdresi = `/profil/${takmaAd}`;
    navigate(yonlendirilecekUrlAdresi);
    const aramaBilgisi = {
      arananKullaniciId: gidilenKullaniciId,
    };
    const gelenVeri = aramaGecmisiKaydet(aramaBilgisi);
    console.log("Arama bilgisi kaydedildi mi? ", gelenVeri);
  };

  // 4) Sonuç varsa listele
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Arama Sonuçları</h3>
      {aramaSonuclari.map((sonuc) => (
        <div
          key={sonuc.kullaniciId}
          className="aramaSonuclarDiv"
          onClick={() =>
            aramadanKullaniciProfilineYonlendir(
              sonuc.kullaniciTakmaAd,
              sonuc.kullaniciId
            )
          }
        >
          <img src={sonuc.kullaniciProfilResmi} alt="" />
          <div>{sonuc.kullaniciTakmaAd}</div>
        </div>
      ))}
    </div>
  );
}

export default AramaSonuclariGoster;
