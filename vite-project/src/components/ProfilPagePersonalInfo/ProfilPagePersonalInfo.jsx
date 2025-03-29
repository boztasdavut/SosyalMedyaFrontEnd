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
            width={60}
            height={60}
          />
        </div>
        <div className="takipciTakipEdilenVeBioAnaDiv">
          <div className="takipciTakipEdilenDiv">
            <div className="takipciDiv">
              <button>Takipçiler</button>
            </div>
            <div className="takipEdilenDiv">
              <button>Takip Edilenler</button>
            </div>
          </div>
          <div className="bioDiv">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
            nulla fugit iste nihil sequi magni officiis! Eum expedita ipsum
            blanditiis similique fugit est soluta itaque distinctio delectus,
            laudantium, ex commodi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Accusantium dolore similique modi quod culpa
            commodi delectus! Magni non deserunt temporibus recusandae rerum vel
            quia alias, accusantium, odit autem optio voluptate?
          </div>
        </div>
      </div>
      <div className="editProfilDiv">
        <button>Profili Düzenle</button>
      </div>
    </div>
  );
}

export default ProfilPagePersonalInfo;
