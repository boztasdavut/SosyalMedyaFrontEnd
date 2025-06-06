import React, { useState } from "react";
import "./KayitOl.css";
import InputText from "../../components/InputText/InputText";
import TextButton from "../../components/TextButton/TextButton";
import Button from "../../components/Button/Button";
import { register } from "../../services/Register.js";
import logo3 from "./loginEkraniResmi3.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KayitOl() {
  const [kullaniciEPosta, setKullaniciEPosta] = useState("");
  const [kullaniciTakmaAd, setKullaniciTakmaAd] = useState("");
  const [kullaniciTelefonNo, setKullaniciTelefonNo] = useState("");
  const [kullaniciSifre, setKullaniciSifre] = useState("");
  const [kullaniciSifreTekrar, setKullaniciSifreTekrar] = useState("");
  const [kullaniciDogumTarihi, setKullaniciDogumTarihi] = useState("");
  const [kullaniciBio, setKullaniciBio] = useState("");
  const navigate = useNavigate();

  const registerHandle = async () => {
    if (kullaniciSifre === kullaniciSifreTekrar) {
      if (
        kullaniciEPosta !== "" &&
        kullaniciTakmaAd !== "" &&
        kullaniciTelefonNo &&
        kullaniciSifre !== "" &&
        kullaniciSifreTekrar !== "" &&
        kullaniciDogumTarihi !== ""
      ) {
        const kullanicininGirdigiBilgiler = {
          ePosta: kullaniciEPosta,
          sifre: kullaniciSifre,
          kullaniciTakmaAd: kullaniciTakmaAd,
          kullaniciTelefonNo: kullaniciTelefonNo,
          kullaniciDogumTarihi: kullaniciDogumTarihi,
        };
        
          const donenVeri = await register(kullanicininGirdigiBilgiler);
          navigate("/mailOnay", {
            state: { ePosta: kullaniciEPosta },
          });
         
      } else {
        toast.error("Tüm Alanları Eksiksiz Doldurun.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Şifreler Aynı Değil.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const girisYapButonHandle = () => {
    navigate("/girisYap");
  };

  return (
    <div className="componentDiv">
      <ToastContainer />

      <div className="kayitOlAnaDiv">
        <div>
          <h1>Kayıt Ol</h1>
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
            inputValue={kullaniciTakmaAd}
            setInputValue={setKullaniciTakmaAd}
            placeholder="Takma ad"
            type="text"
          />
        </div>
        <div>
          <InputText
            inputValue={kullaniciTelefonNo}
            setInputValue={setKullaniciTelefonNo}
            placeholder="Telefon No"
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
          <InputText
            placeholder="Şifre tekrar"
            type="password"
            inputValue={kullaniciSifreTekrar}
            setInputValue={setKullaniciSifreTekrar}
          />
        </div>
        <div>
          <InputText
            type="date"
            inputValue={kullaniciDogumTarihi}
            setInputValue={setKullaniciDogumTarihi}
          />
        </div>
        {/*<div>
          <textarea
            value={kullaniciBio}
            onChange={(e) => setKullaniciBio(e.target.value)}
            placeholder="Bio..."
            rows={5}
            cols={50}
            className="kayitOlBioTextArea"
          />
        </div>*/}

        <div onClick={registerHandle}>
          <Button butonAdi="Kayıt Ol" />
        </div>
        <div>
          <TextButton
            onClickMethod={girisYapButonHandle}
            butonAdi="Giriş Yap"
            label="Hesabın var mı?"
          />
        </div>
      </div>
      <div>
        <img className="girisYapResim" src={logo3} />
      </div>
    </div>
  );
}

export default KayitOl;
