import React from "react";
import "./TakipcileriGosterModal.css";
import { useNavigate } from "react-router-dom";

function TakipcileriGosterModal({
  takipcilerListesi,
  setIsTakipcilerModalOpen,
}) {
  const navigate = useNavigate();
  const takipcileriGosterModuluKapat = () => {
    setIsTakipcilerModalOpen(false);
  };

  const takipciProfileGit = (takmaAd) => {
    navigate(`/profil/${takmaAd}`);
  };
  return (
    <div className="takipcileriGosterDiv">
      <div className="takipciListesiAnaDiv">
      <div className="modalBaslik">Takipçiler</div>
        {takipcilerListesi.follow.map((person) => (
          <div
            onClick={() => takipciProfileGit(person.kullaniciTakmaAd)}
            className="takipcileriGosterModalResimVeTakmaAd"
          >
            <div>
              <img
                className="takipcileriGosterModalResim"
                src={person.kullaniciProfilResmi}
              />
            </div>
            <div>@{person.kullaniciTakmaAd}</div>
          </div>
        ))}
        <div
          onClick={takipcileriGosterModuluKapat}
          className="takipcilleriGosterModalClose"
        >
          Kapat
        </div>
      </div>
    </div>
  );
}

export default TakipcileriGosterModal;
