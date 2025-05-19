import React from "react";
import "./TakipEdilenleriGosterModal.css";
import { useNavigate } from "react-router-dom";

function TakipEdilenleriGosterModal({
  takipEdilenlerListesi,
  setIsTakipEdilenlerModalOpen,
}) {
  const navigate = useNavigate();
  const takipEdilenleriGosterModuluKapat = () => {
    setIsTakipEdilenlerModalOpen(false);
  };

  const takipEdilenProfileGit = (takmaAd) => {
    navigate(`/profil/${takmaAd}`);
  };

  return (
    <div className="takipEdilenleriGosterDiv">
      <div className="takipEdilenlerListesiAnaDiv">
        {takipEdilenlerListesi.follow.map((person) => (
          <div
            onClick={() => takipEdilenProfileGit(person.kullaniciTakmaAd)}
            className="takipEdilenleriGosterModalResimVeTakmaAd"
          >
            <div>
              <img
                className="takipEdilenleriGosterModalResim"
                src={person.kullaniciProfilResmi}
              />
            </div>
            <div>@{person.kullaniciTakmaAd}</div>
          </div>
        ))}
        <div
          onClick={takipEdilenleriGosterModuluKapat}
          className="takipEdilenleriGosterModalClose"
        >
          Kapat
        </div>
      </div>
    </div>
  );
}

export default TakipEdilenleriGosterModal;
