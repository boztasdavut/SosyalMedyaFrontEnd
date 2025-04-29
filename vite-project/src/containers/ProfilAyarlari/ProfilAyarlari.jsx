import React, { useEffect, useState } from "react";
import "./ProfilAyarlari.css";
import SolMenu from "../SolMenu/SolMenu";
import Mesajlasma from "../Mesajlasma/Mesajlasma";
import { jwtParse } from "../../services/ParseJWT.js";
import { ePostaGuncelle } from "../../services/KullaniciEPostaGuncelle.js";

function ProfilAyarlari() {
  const [secilenBaslik, setSecilenBaslik] = useState("ePostaGuncelle");
  const [kullaniciEPostaBilgisi, setKullaniciEPostaBilgisi] = useState("");
  const [kullaniciSifreBilgisi, setKullaniciSifreBilgisi] = useState("");
  const [kullaniciYeniEPostaBilgisi, setKullaniciYeniEPostaBilgisi] =
    useState("");
  useEffect(() => {
    const gelenVeri = jwtParse();
    console.log("Jwt degeri = ", gelenVeri);
    setKullaniciEPostaBilgisi(gelenVeri);
  }, []);

  const ePostaGuncelleOnClick = async (e) => {
    e.preventDefault();
    console.log("Eski e posta adresi= ", kullaniciEPostaBilgisi);
    console.log("Yeni e posta bilgisi= ", kullaniciYeniEPostaBilgisi);
    console.log("Sifre bilgisi= ", kullaniciSifreBilgisi);
    const myInformationObject = {
      eskiEPosta: kullaniciEPostaBilgisi,
      sifre: kullaniciSifreBilgisi,
      yeniEPosta: kullaniciYeniEPostaBilgisi,
    };
    try {
      const gelenVeri = await ePostaGuncelle(myInformationObject);
      console.log("E Posta adresi güncellendi.", gelenVeri);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  return (
    <div className="profil-ayarlari-container">
      <SolMenu />
      <Mesajlasma />
      <div className="ayarlar-icerik">
        <div className="basliklar">
          <button
            className={`baslik-btn ${
              secilenBaslik === "ePostaGuncelle" ? "aktif" : ""
            }`}
            onClick={() => setSecilenBaslik("ePostaGuncelle")}
          >
            E-Posta Adresi Güncelle
          </button>
          <button
            className={`baslik-btn ${
              secilenBaslik === "sifreGuncelle" ? "aktif" : ""
            }`}
            onClick={() => setSecilenBaslik("sifreGuncelle")}
          >
            Şifre Değiştir
          </button>
        </div>

        <div className="icerik-alani">
          {secilenBaslik === "ePostaGuncelle" && (
            <form className="form" onSubmit={ePostaGuncelleOnClick}>
              <label>
                Eski E-Posta Adresi:
                <input
                  type="email"
                  value={kullaniciEPostaBilgisi}
                  placeholder="eski@example.com"
                  readOnly
                />
              </label>
              <label>
                Şifreniz:
                <input
                  onChange={(e) => setKullaniciSifreBilgisi(e.target.value)}
                  value={kullaniciSifreBilgisi}
                  type="password"
                />
              </label>
              <label>
                Yeni E-Posta Adresi:
                <input
                  onChange={(e) =>
                    setKullaniciYeniEPostaBilgisi(e.target.value)
                  }
                  value={kullaniciYeniEPostaBilgisi}
                  type="email"
                />
              </label>
              <button type="submit" className="guncelle-btn">
                Güncelle
              </button>
            </form>
          )}

          {secilenBaslik === "sifreGuncelle" && (
            <form className="form">
              <label>
                Mevcut Şifre:
                <input type="password" />
              </label>
              <label>
                Yeni Şifre:
                <input type="password" />
              </label>
              <label>
                Yeni Şifre (Tekrar):
                <input type="password" />
              </label>
              <button type="submit" className="guncelle-btn">
                Şifreyi Güncelle
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilAyarlari;
