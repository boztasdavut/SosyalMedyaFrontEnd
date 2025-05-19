import React, { useEffect, useState } from "react";
import "./Profilim.css";
import SolMenu from "../SolMenu/SolMenu";
import ProfilimGonderiler from "../ProfilimGonderiler/ProfilimGonderiler.jsx";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";
import ProfilimPageHeader from "../ProfilimPageHeader/ProfilimPageHeader.jsx";
import TakipcileriGosterModal from "../../components/TakipcileriGosterModal/TakipcileriGosterModal.jsx";
import TakipEdilenleriGosterModal from "../../components/TakipEdilenleriGosterModal/TakipEdilenleriGosterModal.jsx";
function Profilim() {
  const [gonderiSayisi, setGonderiSayisi] = useState(null);
  const [isTakipcilerModalOpen, setIsTakipcilerModalOpen] = useState(false);
  const [takipcilerListesi, setTakipcilerListesi] = useState(null);
  const [isTakipEdilenlerModalOpen, setIsTakipEdilenlerModalOpen] =
    useState(false);
  const [takipEdilenlerListesi, setTakipEdilenlerListesi] = useState(null);
  return (
    <div>
      <SolMenu />
      {isTakipcilerModalOpen && (
        <TakipcileriGosterModal
          takipcilerListesi={takipcilerListesi}
          setIsTakipcilerModalOpen={setIsTakipcilerModalOpen}
        />
      )}

      {isTakipEdilenlerModalOpen && (
        <TakipEdilenleriGosterModal
          takipEdilenlerListesi={takipEdilenlerListesi}
          setIsTakipEdilenlerModalOpen={setIsTakipEdilenlerModalOpen}
        />
      )}

      <ProfilimPageHeader
        setIsTakipcilerModalOpen={setIsTakipcilerModalOpen}
        gonderiSayisi={gonderiSayisi}
        setTakipcilerListesi={setTakipcilerListesi}
        setTakipEdilenlerListesi={setTakipEdilenlerListesi}
        setIsTakipEdilenlerModalOpen={setIsTakipEdilenlerModalOpen}
      />
      <ProfilimGonderiler setGonderiSayisi={setGonderiSayisi} />
      <Mesajlasma />
    </div>
  );
}

export default Profilim;
