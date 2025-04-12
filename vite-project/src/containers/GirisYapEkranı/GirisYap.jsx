import React, { useState } from "react";
import "./GirisYap.css";
import InputText from "../../components/InputText/InputText";
import TextButton from "../../components/TextButton/TextButton";
import Button from "../../components/Button/Button";
import logo from "./LoginEkraniResmi.jpg";
import logo2 from "./loginEkraniResmi2.jpg";
import logo3 from "./loginEkraniResmi3.jpg";
import { login } from "../../services/Login.js";
import { useNavigate } from "react-router-dom";

function GirisYap() {
  const [kullaniciEPosta, setKullaniciEPosta] = useState("");
  const [kullaniciSifre, setKullaniciSifre] = useState("");
  const navigate = useNavigate();

  const girisYapHandle = async () => {
    const kullanicininGirdigiBilgiler = {
      ePosta: kullaniciEPosta,
      sifre: kullaniciSifre,
    };
    const apidenGelenCevap = await login(kullanicininGirdigiBilgiler);
    if (apidenGelenCevap.ok) {
      navigate("/anasayfa");
    }
  };

  const kayitOlButonHandle = () => {
    navigate("/kayitOl");
  };

  return (
    <div className="componentDiv">
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
