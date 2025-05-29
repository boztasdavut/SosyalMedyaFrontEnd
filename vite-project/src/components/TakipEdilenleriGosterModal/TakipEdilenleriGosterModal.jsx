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
        <div className="modalBaslik">Takip Edilenler</div>
        {takipEdilenlerListesi.follow.map((person) => (
          <div
            onClick={() => takipEdilenProfileGit(person.kullaniciTakmaAd)}
            className="takipEdilenleriGosterModalResimVeTakmaAd"
          >
            <div>
              <img
                className="takipEdilenleriGosterModalResim"
                src={
                  person.kullaniciProfilResmi?.endsWith("empty.png")
                    ? "https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"
                    : person.kullaniciProfilResmi
                }
                alt="Profil"
              />
              {/*<img
                className="takipEdilenleriGosterModalResim"
                src={person.kullaniciProfilResmi}
              />*/}
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
