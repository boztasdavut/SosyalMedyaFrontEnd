import React, { useState } from "react";
import "./AnketSilmeOnayModal.css";
import { birAnketiSil } from "../../services/BirAnketiSil.js";
import { useNavigate } from "react-router-dom";

function AnketSilmeOnayModal({ modalControl, anketId }) {
  const navigate = useNavigate();
  const evetButonunaTiklandi = async () => {
    try {
      const gelenVeri = await birAnketiSil(anketId);
      modalControl(false);
      console.log("Evet butonuna tiklandi");
      console.log("Anket id bilgisi= ", anketId);
      const gidilecekUrlAdresi = "/anketlerim/anketlerimiGor?anketId=all";
      navigate(gidilecekUrlAdresi);
    } catch (err) {
      console.log("Anketi silerken bir hata meydana geldi= ", err);
    }
  };

  const hayirButonunaTiklandi = () => {
    modalControl(false);
    console.log("hayir butonuna tiklandi");
    console.log("Anket id bilgisi= ", anketId);
  };

  return (
    <div className="anketSilmeOnayModalAnaDiv">
      <div className="modalKutucugDiv">
        <div className="modalKutucuBasligiDiv">
          <div>Anketi Silmek İstediğinize Emin Misiniz?</div>
        </div>
        <div className="modalCevaplarAnaDiv">
          <div onClick={evetButonunaTiklandi} className="modalCevapDiv">
            Evet
          </div>
          <div onClick={hayirButonunaTiklandi} className="modalCevapDiv">
            Hayır
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnketSilmeOnayModal;
