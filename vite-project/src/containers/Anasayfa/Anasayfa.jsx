import React, { useEffect, useState } from "react";
import "./Anasayfa.css";
import { useNavigate } from "react-router-dom";

import Mesajlasma from "../Mesajlasma/Mesajlasma";
import SolMenu from "../SolMenu/SolMenu";
import AnasayfaGonderiler from "../AnasayfaGonderiler/AnasayfaGonderiler";
import { anasayfa } from "../../services/Anasayfa";
import { mesajBaslangicSayfasiGetir } from "../../services/MesajlasmaBaslangicSayfasi";
import GonderiPaylas from "../../components/GonderiPaylas/GonderiPaylas";

function Anasayfa() {
  const [takipEdilenlerinGonderileri, setTakipEdilenlerinGonderileri] =
    useState([]);
  const [mesajBaslangicSayfasi, setMesajBaslangicSayfasi] = useState([]);

  useEffect(() => {
    const anasayfaTumVerileriCek = async () => {
      try {
        setTakipEdilenlerinGonderileri(await anasayfa());
        setMesajBaslangicSayfasi(await mesajBaslangicSayfasiGetir());
      } catch (err) {
        console.log("Hata=", err);
      }
    };
    anasayfaTumVerileriCek();
  }, []);

  return (
    <div>
      <SolMenu />
      <GonderiPaylas/>
      <AnasayfaGonderiler
        takipEdilenlerinTumGonderileri={takipEdilenlerinGonderileri}
        setTakipEdilenlerinGonderileri={setTakipEdilenlerinGonderileri}
      />
      <Mesajlasma
        mesajBaslangicSayfasi={mesajBaslangicSayfasi}
        setMesajBaslangicSayfasi={setMesajBaslangicSayfasi}
      />
    </div>
  );
}

export default Anasayfa;
