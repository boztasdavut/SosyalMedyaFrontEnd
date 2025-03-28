import React, { useEffect, useState } from "react";
import RegisterLoginBio from "../../components/RegisterLoginBio/RegisterLoginBio";
import RegisterButton from "../../components/RegisterButton/RegisterButton";
import RegisterLoginDate from "../../components/RegisterLoginDate/RegisterLoginDate";
import RegisterLoginPassword from "../../components/RegisterLoginPassword/RegisterLoginPassword";
import RegisterLoginPhone from "../../components/RegisterLoginPhone/RegisterLoginPhone";
import RegisterLoginText from "../../components/RegisterLoginText/RegisterLoginText";
import "./RegisterPage.css";
import LoginRegisterGecis from "../../components/LoginRegisterGecis/LoginRegisterGecis";
import { CiCircleCheck } from "react-icons/ci";
import RegisterKurallari from "../../components/RegisterKurallari/RegisterKurallari";

function LoginPage() {
  const [ePosta, setEPosta] = useState("");
  const [kullaniciTakmaAd, setKullaniciTakmaAd] = useState("");
  const [kullaniciTelefonNo, setKullaniciTelefonNo] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [kullaniciDogumTarihi, setKullaniciDogumTarihi] = useState("");
  const [ePostaController, setEPostaController] = useState(false);
  const [takmaAdController, setTakmaAdController] = useState(false);
  const [telefonController, setTelefonController] = useState(false);
  const [sifreController, setSifreController] = useState(false);
  const [sifreTekrarController, setSifreTekrarController] = useState(false);
  const [dogumTarihiController, setDogumTarihiController] = useState(false);

  useEffect(() => {
    document.title = "Kayıt Ekranı";
  }, []);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEPostaController(emailRegex.test(ePosta));
  }, [ePosta]);

  useEffect(() => {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    setTakmaAdController(usernameRegex.test(kullaniciTakmaAd));
  }, [kullaniciTakmaAd]);

  useEffect(() => {
    const phoneRegex = /^\d{3}\d{3}\d{2}\d{2}$/;
    setTelefonController(phoneRegex.test(kullaniciTelefonNo));
  }, [kullaniciTelefonNo]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    setSifreController(passwordRegex.test(sifre));
  }, [sifre]);

  useEffect(() => {
    setSifreTekrarController(sifreTekrar === sifre && sifre.length > 0);
  }, [sifreTekrar, sifre]);

  useEffect(() => {
    const birthDate = new Date(kullaniciDogumTarihi);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    setDogumTarihiController(age >= 18);
  }, [kullaniciDogumTarihi]);

  return (
    <div id="registerPageAnaDiv">
      <div className="registerPageContentDiv">
        <LoginRegisterGecis adres={"/"} />
        <div className="checkDiv">
          <RegisterLoginText
            placeholder={"E-Posta"}
            value={ePosta}
            onChange={setEPosta}
          />
          <CiCircleCheck className={ePostaController ? "visible" : "hidden"} />
        </div>

        <div className="checkDiv">
          <RegisterLoginText
            placeholder={"Takma Ad"}
            value={kullaniciTakmaAd}
            onChange={setKullaniciTakmaAd}
          />
          <CiCircleCheck className={takmaAdController ? "visible" : "hidden"} />
        </div>

        <div className="checkDiv">
          <RegisterLoginPhone
            placeholder={"(XXX)-XXX-XX-XX"}
            value={kullaniciTelefonNo}
            onChange={setKullaniciTelefonNo}
          />
          <CiCircleCheck className={telefonController ? "visible" : "hidden"} />
        </div>

        <div className="checkDiv">
          <RegisterLoginPassword
            placeholder={"Şifre Girin"}
            value={sifre}
            onChange={setSifre}
          />
          <CiCircleCheck className={sifreController ? "visible" : "hidden"} />
        </div>

        <div className="checkDiv">
          <RegisterLoginPassword
            placeholder={"Tekrar Şifre Girin"}
            value={sifreTekrar}
            onChange={setSifreTekrar}
          />
          <CiCircleCheck
            className={sifreTekrarController ? "visible" : "hidden"}
          />
        </div>

        <div className="checkDiv">
          <RegisterLoginDate
            value={kullaniciDogumTarihi}
            onChange={setKullaniciDogumTarihi}
          />
          <CiCircleCheck
            className={dogumTarihiController ? "visible" : "hidden"}
          />
        </div>
        <RegisterButton
          butonBilgisi={"Kayıt Ol"}
          kullaniciBilgileri={{
            ePosta,
            kullaniciTakmaAd,
            kullaniciTelefonNo,
            sifre,
            kullaniciDogumTarihi,
          }}
          validasyon={{
            ePosta: ePostaController,
            kullaniciTakmaAd: takmaAdController,
            kullaniciTelefonNo: telefonController,
            sifre: sifreController,
            kullaniciDogumTarihi: dogumTarihiController,
          }}
        />
        <RegisterKurallari />
      </div>
    </div>
  );
}

export default LoginPage;
