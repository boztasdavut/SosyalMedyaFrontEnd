import React, { useState } from "react";

import "./SifreGuncelle.css";
import { sifreGuncelle } from "../../services/KullaniciSifreGuncelle.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SifreGuncelle() {
  const [mevcutSifre, setMevcutSifre] = useState("");
  const [yeniSifre1, setYeniSifre1] = useState("");
  const [yeniSifre2, setYeniSifre2] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Mevcut sifre= ", mevcutSifre);
      console.log("Yeni sifre1= ", yeniSifre1);
      console.log("Yeni sifre2= ", yeniSifre2);
      if (yeniSifre1 !== yeniSifre2) {
        toast.error("Yeni şifreler uyumsuz, doğru biçimde tekrar giriniz.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setMevcutSifre("");
        setYeniSifre1("");
        setYeniSifre2("");
        return;
      }
      const obj = {
        eskiSifre: mevcutSifre,
        yeniSifre: yeniSifre1,
      };
      const gelenVeri = await sifreGuncelle(obj);
      toast.success("Şifre başarıyla değiştirildi.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        try {
          navigate("/anasayfa");
        } catch (err) {
          console.log("Çıkış sırasında hata meydana geldi= ", err);
        }
      }, 4000);
    } catch (err) {
      toast.error("Eski Şifreyi Yanlış Girdiniz.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Bir hata meydana geldi= ", err);
    }
    setMevcutSifre("");
    setYeniSifre1("");
    setYeniSifre2("");
  };

  return (
    <div>
      <ToastContainer />

      <form className="form" onSubmit={handleChangePassword}>
        <label>
          Mevcut Şifre:
          <input
            value={mevcutSifre}
            onChange={(e) => setMevcutSifre(e.target.value)}
            type="password"
          />
        </label>
        <label>
          Yeni Şifre:
          <input
            value={yeniSifre1}
            onChange={(e) => setYeniSifre1(e.target.value)}
            type="password"
          />
        </label>
        <label>
          Yeni Şifre (Tekrar):
          <input
            value={yeniSifre2}
            onChange={(e) => setYeniSifre2(e.target.value)}
            type="password"
          />
        </label>
        <button type="submit" className="guncelle-btn">
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
}

export default SifreGuncelle;
