import React from "react";
import "./AramaSonuclariGoster.css";

function AramaSonuclariGoster({ aramaSonuclari, setAramaSonuclari }) {
  return (
    <div>
      {aramaSonuclari.map((sonuc) => (
        <div key={sonuc.kullaniciId} className="aramaSonuclarDiv">
          <div>{sonuc.kullaniciProfilResmi}</div>
          <div>{sonuc.kullaniciTakmaAd}</div>
        </div>
      ))}
    </div>
  );
}

export default AramaSonuclariGoster;
