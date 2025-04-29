import React, { useEffect, useState } from "react";
import "./EPostaGuncelle.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { jwtParse } from "../../services/ParseJWT.js";
import { ePostaGuncelle } from "../../services/KullaniciEPostaGuncelle.js";
import { logout } from "../../services/Logout.js";
import { useNavigate } from "react-router-dom";

function EPostaGuncelle() {
  const [kullaniciEPostaBilgisi, setKullaniciEPostaBilgisi] = useState("");
  const [kullaniciSifreBilgisi, setKullaniciSifreBilgisi] = useState("");
  const [kullaniciYeniEPostaBilgisi, setKullaniciYeniEPostaBilgisi] =
    useState("");

  useEffect(() => {
    const gelenVeri = jwtParse();
    console.log("Jwt degeri = ", gelenVeri);
    setKullaniciEPostaBilgisi(gelenVeri);
  }, []);
  const navigate = useNavigate();
  const ePostaGuncelleOnClick = async (e) => {
    e.preventDefault();

    console.log("Eski e posta adresi= ", kullaniciEPostaBilgisi);
    console.log("Yeni e posta bilgisi= ", kullaniciYeniEPostaBilgisi);
    console.log("Sifre bilgisi= ", kullaniciSifreBilgisi);

    const myInformationObject = {
      eskiEposta: kullaniciEPostaBilgisi,
      sifre: kullaniciSifreBilgisi,
      yeniEposta: kullaniciYeniEPostaBilgisi,
    };

    try {
      const gelenVeri = await ePostaGuncelle(myInformationObject);
      console.log("E Posta adresi güncellendi.", gelenVeri);

      toast.success("E-posta başarıyla güncellendi!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Toast gösterimi bitince logout ve navigate işlemi başlasın
      setTimeout(() => {
        try {
          logout();
          navigate("/girisYap");
        } catch (err) {
          console.log("Çıkış sırasında hata meydana geldi= ", err);
        }
      }, 4000);
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
      toast.error("E-posta güncellenemedi!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <ToastContainer />

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
            onChange={(e) => setKullaniciYeniEPostaBilgisi(e.target.value)}
            value={kullaniciYeniEPostaBilgisi}
            type="email"
          />
        </label>
        <button type="submit" className="guncelle-btn">
          Güncelle
        </button>
      </form>
    </div>
  );
}

export default EPostaGuncelle;
