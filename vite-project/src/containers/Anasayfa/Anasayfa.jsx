import React, { useEffect, useState } from "react";
import "./Anasayfa.css";
import { useNavigate } from "react-router-dom";

import Mesajlasma from "../Mesajlasma/Mesajlasma";
import SolMenu from "../SolMenu/SolMenu";
import AnasayfaGonderiler from "../AnasayfaGonderiler/AnasayfaGonderiler";
import { anasayfa } from "../../services/Anasayfa";
import GonderiPaylas from "../../components/GonderiPaylas/GonderiPaylas";

function Anasayfa() {
  const [takipEdilenlerinGonderileri, setTakipEdilenlerinGonderileri] =
    useState([]);

  useEffect(() => {
    const anasayfaTumVerileriCek = async () => {
      try {
        const anasayfaGonderiler = await anasayfa();
        setTakipEdilenlerinGonderileri(anasayfaGonderiler);
        console.log("anasayfa gonderileri= ", anasayfaGonderiler);
      } catch (err) {
        console.log("Hata=", err);
      }
    };
    anasayfaTumVerileriCek();
  }, []);

  return (
    <div>
      {/*<SolMenu />*/}
      <GonderiPaylas />
      <AnasayfaGonderiler
        takipEdilenlerinTumGonderileri={takipEdilenlerinGonderileri}
        setTakipEdilenlerinGonderileri={setTakipEdilenlerinGonderileri}
      />
      {/*<Mesajlasma />*/}
    </div>
  );
}

export default Anasayfa;
