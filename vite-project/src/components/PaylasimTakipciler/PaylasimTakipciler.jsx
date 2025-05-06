import React from "react";
import "./PaylasimTakipciler.css";
import CloseIcon from "@mui/icons-material/Close";
function PaylasimTakipciler({ tumTakipciler, setGonderiyiPaylasModalAcikMi }) {
  const modalClose = () => {
    setGonderiyiPaylasModalAcikMi(false);
  };
  return (
    <div className="takipciler-modal-overlay">
      <div className="takipciler-modal">
        <CloseIcon
          onClick={modalClose}
          className="paylasimTakipcilerModalClose"
        />
        <div className="takipci-listesi">
          {tumTakipciler && tumTakipciler.length > 0 ? (
            tumTakipciler.map((takipci, index) => (
              <div key={index} className="takipci-karti">
                <img
                  src={takipci.kullaniciProfilResmi || "/default-avatar.png"}
                  alt="Takipçi"
                  className="takipci-avatar"
                />
                <span className="takipci-isim">
                  @{takipci.kullaniciTakmaAd}
                </span>
              </div>
            ))
          ) : (
            <p className="bos-mesaj">Takipçi bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaylasimTakipciler;
