import React from "react";
import "./ProfilPagePersonalInfo.css";
import emptyProfilePicture from "../../assests/empty.png";

function ProfilPagePersonalInfo() {
  return (
    <div className="profilPagePersonalAnaDiv">
      <div className="profilResmiVeBioAnaDiv">
        <div className="profilResmi">
          <img
            className="anasayfaProfilResmi"
            src={emptyProfilePicture}
            alt="Logo"
            width={160}
            height={60}
          />
        </div>
        <div className="takipciTakipEdilenVeBioAnaDiv">
          <div className="takipciTakipEdilenDiv">
            <div className="takipciDiv"></div>
            <div className="takipEdilenDiv"></div>
          </div>
          <div className="bioDiv"></div>
        </div>
      </div>
      <div className="editProfilDiv"></div>
    </div>
  );
}

export default ProfilPagePersonalInfo;
