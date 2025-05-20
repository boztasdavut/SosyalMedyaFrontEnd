import React, { useState } from "react";
import "./ProfilimGonderilerModal.css";
import { belirtilenGonderiyiSil } from "../../services/GonderiSil.js";

function ProfilimGonderilerModal({
  setModalIsOpen,
  gonderiIdModal,
  kullanicininTumGonderileri,
  setKullanicininTumGonderileri,
}) {
  const [eminMisinizAcikMi, setEminMisinizAcikMi] = useState(false);

  const handleGonderiSil = async (gonderiId) => {
    try {
      const gelenVeri = await belirtilenGonderiyiSil(gonderiId);
      setKullanicininTumGonderileri((prevGonderiler) => {
        const yeniListe = prevGonderiler.filter(
          (gonderi) => gonderi.gonderiId !== gonderiId
        );
        return yeniListe;
      });
    } catch (err) {
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  const eminMisinizHandle = () => {
    setEminMisinizAcikMi(!eminMisinizAcikMi);
  };

  const hayirSecengineTiklandi = () => {
    setModalIsOpen(false);
  };

  const evetSecenegineTiklandi = () => {
    setModalIsOpen(false);
    handleGonderiSil(gonderiIdModal);
  };

  return (
    <div className="profilimGonderilerModalAnaDiv">
      <div className="profilimGonderilerModalKutucuk">
        <div
          onClick={eminMisinizHandle}
          className="profilimGonderilerModalSilButonu"
        >
          Gönderiyi Sil
        </div>
        {eminMisinizAcikMi && (
          <div className="profilimGonderilerModalEminMisinizDiv">
            <div onClick={evetSecenegineTiklandi} className="eminMisinizDiv">
              Evet
            </div>
            <div onClick={hayirSecengineTiklandi} className="eminMisinizDiv">
              Hayır
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilimGonderilerModal;
