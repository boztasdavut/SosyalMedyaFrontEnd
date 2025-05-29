import React, { useEffect, useState } from "react";
import "./Profilim.css";
import SolMenu from "../SolMenu/SolMenu";
import ProfilimGonderiler from "../ProfilimGonderiler/ProfilimGonderiler.jsx";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";
import ProfilimPageHeader from "../ProfilimPageHeader/ProfilimPageHeader.jsx";
import TakipcileriGosterModal from "../../components/TakipcileriGosterModal/TakipcileriGosterModal.jsx";
import TakipEdilenleriGosterModal from "../../components/TakipEdilenleriGosterModal/TakipEdilenleriGosterModal.jsx";
import ProfilimGonderilerModal from "../../components/ProfilimGonderilerModal/ProfilimGonderilerModal.jsx";
function Profilim() {
  const [gonderiSayisi, setGonderiSayisi] = useState(null);
  const [isTakipcilerModalOpen, setIsTakipcilerModalOpen] = useState(false);
  const [takipcilerListesi, setTakipcilerListesi] = useState(null);
  const [isTakipEdilenlerModalOpen, setIsTakipEdilenlerModalOpen] =
    useState(false);
  const [takipEdilenlerListesi, setTakipEdilenlerListesi] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gonderiIdModal, setGonderiIdModal] = useState(null);
  const [kullanicininTumGonderileri, setKullanicininTumGonderileri] = useState(
    []
  );
  return (
    <div>
      {modalIsOpen && (
        <ProfilimGonderilerModal
          setModalIsOpen={setModalIsOpen}
          gonderiIdModal={gonderiIdModal}
          kullanicininTumGonderileri={kullanicininTumGonderileri}
          setKullanicininTumGonderileri={setKullanicininTumGonderileri}
        />
      )}

      {/*<SolMenu />*/}
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
      <ProfilimGonderiler
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setGonderiSayisi={setGonderiSayisi}
        setGonderiIdModal={setGonderiIdModal}
        kullanicininTumGonderileri={kullanicininTumGonderileri}
        setKullanicininTumGonderileri={setKullanicininTumGonderileri}
      />
      {/*<Mesajlasma />*/}
    </div>
  );
}

export default Profilim;
