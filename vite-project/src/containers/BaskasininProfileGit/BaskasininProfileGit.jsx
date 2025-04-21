import React, { useEffect, useState } from "react";
import "./BaskasininProfileGit.css";
import BaskasininProfiliHeader from "../BaskasininProfiliHeader/BaskasininProfiliHeader.jsx";
import BaskasininProfiliGonderiler from "../BaskasininProfiliGonderiler/BaskasininProfiliGonderiler.jsx";
import { baskasininProfiliniGetir } from "../../services/BaskasininProfiliniGetir.js";
import { useParams } from "react-router-dom";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";
import SolMenu from "../SolMenu/SolMenu.jsx";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import { kullaniciTumTakipEdilenleriGetir } from "../../services/KullaniciTumTakipEdilenlerGetir.js";
function BaskasininProfileGit() {
  const [baskasininProfiliBilgileri, setBaskasininProfiliBilgileri] = useState(
    {}
  );
  const { takmaAd } = useParams();

  useEffect(() => {
    const baskasininProfiliGetirDemo = async (takmaAd) => {
      try {
        const gelenVeri = await baskasininProfiliniGetir(takmaAd);
        console.log("baskasinin profili gelen veri= ", gelenVeri);
        setBaskasininProfiliBilgileri(gelenVeri);
      } catch (err) {
        console.log("Bir hata meydana geldi", err);
      }
    };
    baskasininProfiliGetirDemo(takmaAd);
  }, [takmaAd]);

  return (
    <div>
      <SolMenu />
      <BaskasininProfiliHeader
        baskasininProfiliBilgileri={baskasininProfiliBilgileri}
      />
      <BaskasininProfiliGonderiler
        baskasininProfiliBilgileri={baskasininProfiliBilgileri}
      />
      <Mesajlasma />
    </div>
  );
}

export default BaskasininProfileGit;
