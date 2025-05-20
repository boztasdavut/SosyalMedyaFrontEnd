import React, { useRef, useState } from "react";
import "./GirisYap.css";
import InputText from "../../components/InputText/InputText";
import TextButton from "../../components/TextButton/TextButton";
import Button from "../../components/Button/Button";
import logo from "./LoginEkraniResmi.jpg";
import logo2 from "./loginEkraniResmi2.jpg";
import logo3 from "./loginEkraniResmi3.jpg";
import { login } from "../../services/Login.js";
import { useNavigate } from "react-router-dom";
import { anasayfa } from "../../services/Anasayfa.js";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function GirisYap() {
  const [kullaniciEPosta, setKullaniciEPosta] = useState("");
  const [kullaniciSifre, setKullaniciSifre] = useState("");
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const girisYapHandle = async () => {
    const kullanicininGirdigiBilgiler = {
      ePosta: kullaniciEPosta,
      sifre: kullaniciSifre,
    };

    try {
      const apidenGelenCevap = await login(kullanicininGirdigiBilgiler);
      toast.success("Başarıyla Giriş Yapıldı", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          navigate("/anasayfa");
        },
      });
    } catch (error) {
      toast.error("E-Posta Adresi Veya Şifre Yanlış", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => {
          setKullaniciEPosta("");
          setKullaniciSifre("");
        },
      });
    }
  };

  const kayitOlButonHandle = () => {
    navigate("/kayitOl");
  };

  return (
    <div className="componentDiv">
      <ToastContainer />

      <div className="girisYapAnaDiv">
        <div>
          <h1>Giriş Yap</h1>
        </div>
        <div>
          <InputText
            inputValue={kullaniciEPosta}
            setInputValue={setKullaniciEPosta}
            placeholder="E-Posta"
            type="text"
          />
        </div>
        <div>
          <InputText
            placeholder="Şifre"
            type="password"
            inputValue={kullaniciSifre}
            setInputValue={setKullaniciSifre}
          />
        </div>
        <div>
          <TextButton butonAdi="Şifreni mi unuttun?" />
        </div>
        <div onClick={girisYapHandle}>
          <Button butonAdi="Giriş Yap" />
        </div>
        <div>
          <TextButton
            onClickMethod={kayitOlButonHandle}
            butonAdi="Kaydol"
            label="Hesabın yok mu?"
          />
        </div>
      </div>
      <div>
        <img className="girisYapResim" src={logo3} />
      </div>
    </div>
  );
}

export default GirisYap;
