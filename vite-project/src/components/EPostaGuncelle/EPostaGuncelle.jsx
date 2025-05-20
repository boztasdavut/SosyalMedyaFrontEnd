import React, { useEffect, useRef, useState } from "react";
import "./EPostaGuncelle.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { jwtParse } from "../../services/ParseJWT.js";
import { ePostaGuncelle } from "../../services/KullaniciEPostaGuncelle.js";
import { logout } from "../../services/Logout.js";
import { useNavigate } from "react-router-dom";
import { emailChangeValidasyon } from "../../services/EmailChangeValidasyon.js";

function EPostaGuncelle() {
  const [kullaniciEPostaBilgisi, setKullaniciEPostaBilgisi] = useState("");
  const [kullaniciSifreBilgisi, setKullaniciSifreBilgisi] = useState("");
  const [kullaniciYeniEPostaBilgisi, setKullaniciYeniEPostaBilgisi] =
    useState("");
  const [mailOtpBilgisi, setMailOtpBilgisi] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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
      eskiEposta: kullaniciEPostaBilgisi,
      sifre: kullaniciSifreBilgisi,
      yeniEposta: kullaniciYeniEPostaBilgisi,
    };

    try {
      const gelenVeri = await ePostaGuncelle(myInformationObject);
      console.log("Mail Validasyon Kodu Gönderildi= ", gelenVeri);

      toast.success("Validasyon Kodu Mail Adresinize Başarıyla Gönderildi.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const element = document.getElementById("ePostaGuncelleOtpKutucugu");
      element.classList.remove("ePostaGuncelleOtpKutucuguClosedForm");
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
      toast.error("Validasyon Adresi Gönderimi Başarısız.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const characters = pastedData.split("").slice(0, 6); // en fazla 6 karakter al

    characters.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // Bir sonraki inputa geç
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (e.target.value === "" && index > 0) {
        // Geri silme ve kutu boşsa önceki kutuya geç
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpOnayMaili = async () => {
    console.log("Handle otp onay mailine tiklandi");
    const otp = inputRefs.current.map((input) => input.value).join("");

    console.log("Girilen OTP Kodu: ", otp);

    // İsteğe bağlı: OTP boş ya da eksikse uyarı ver
    if (otp.length < 6) {
      toast.error("Boş Veya Eksik kod girişi yaptınız", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearOtpValues();
      return;
    }
    const gonderilecekVeri = {
      yeniEposta: kullaniciYeniEPostaBilgisi,
      otp: otp,
    };

    try {
      const gelenVeri = await emailChangeValidasyon(gonderilecekVeri);
      toast.success("Mail Adresiniz Başarıyla Güncellendi.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Mail degistirme bilgisi= ", gelenVeri);
      setTimeout(async () => {
        const basariDurumu = await logout();
        console.log("Logout durumu= ", basariDurumu);
        localStorage.removeItem("jwt");
        navigate("/girisYap");
      }, 4000);
    } catch (err) {
      console.log("Bir hata meydana geldi.");
    }
  };

  const clearOtpValues = () => {
    const characters = Array(6).fill(""); // ["", "", "", "", "", ""]

    characters.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
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

      <div
        id="ePostaGuncelleOtpKutucugu"
        className="form  ePostaGuncelleOtpKutucuguClosedForm"
      >
        <div className="kutucuklarInputKapsayiciDiv">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="ePostaGuncelleOtpInput"
              ref={(el) => (inputRefs.current[i] = el)}
              onPaste={handlePaste}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        <div>
          <button onClick={handleOtpOnayMaili} className="mailOtpOnaylaButonu">
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
}

export default EPostaGuncelle;
