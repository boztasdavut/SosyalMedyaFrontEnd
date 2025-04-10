import React, { useState } from "react";
import "./GirisYap.css";
import InputText from "../../components/InputText/InputText";
import TextButton from "../../components/TextButton/TextButton";
import Button from "../../components/Button/Button";
import logo from "./LoginEkraniResmi.jpg";
import logo2 from "./loginEkraniResmi2.jpg";
import logo3 from "./loginEkraniResmi3.jpg";
import { login } from "../../services/Login.js";

function GirisYap() {
  const [kullaniciEPosta, setKullaniciEPosta] = useState("");
  const [kullaniciSifre, setKullaniciSifre] = useState("");

  const girisYapHandle = async () => {
    const kullanicininGirdigiBilgiler = {
      ePosta: kullaniciEPosta,
      sifre: kullaniciSifre,
    };
    const apidenGelenCevap = await login(kullanicininGirdigiBilgiler);
    console.log("Gelen cevap= ", apidenGelenCevap);
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
            placeholder="Telefon numarası, kullanıcı adı veya e posta"
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
          <TextButton butonAdi="Kaydol" label="Hesabın yok mu?" />
        </div>
      </div>
      <div>
        <img className="girisYapResim" src={logo3} />
      </div>
    </div>
  );
}

export default GirisYap;
