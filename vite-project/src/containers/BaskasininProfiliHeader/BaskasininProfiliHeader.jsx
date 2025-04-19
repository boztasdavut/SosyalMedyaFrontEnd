import React, { useEffect } from "react";
import "./BaskasininProfiliHeader.css";
import { IoSettingsOutline } from "react-icons/io5";

function BaskasininProfiliHeader() {
  useEffect(() => {}, []);
  return (
    <div>
      <div className="profilim-content">
        <div className="profilim-header">
          <div className="profilim-avatar">Profil Resmi</div>
          <div className="profilim-info">
            <div className="profilim-top-bar">
              <div className="profilim-username">{}</div>
              <button className="takipEt-button">Takip Et</button>
              <button className="mesajAt-button">Mesaj</button>
              <div className="profilim-settings">
                <IoSettingsOutline size={22} />
              </div>
            </div>
            <div className="profilim-stats">
              <div>
                <strong>15</strong> gönderi
              </div>
              <div>
                <strong>120</strong> takipçi
              </div>
              <div>
                <strong>85</strong> takip
              </div>
            </div>
            <div className="profilim-bio">
              <div>{}</div>
              <div>{}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaskasininProfiliHeader;
