import React, { useEffect, useState } from "react";
import "./ProfilPagePersonalInfo.css";
import emptyProfilePicture from "../../assests/empty.png";
import { me } from "../../services/Me";
import { FaRegCalendarCheck } from "react-icons/fa6";

function ProfilPagePersonalInfo() {
  const [userInformation, setUserInformation] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const gelenVeri = await me();
      console.log("Gelen veri= ", gelenVeri);
      setUserInformation(gelenVeri);
    };
    fetchData();
  }, []);

  return (
    <div className="profilPagePersonalInfoAnaDiv">
      <div className="profilResmiTakipciVeTakipEdilenDiv">
        <div>
          <img
            className="anasayfaProfilResmi"
            src={emptyProfilePicture}
            alt="Logo"
            width={60}
            height={60}
          />
        </div>
        <div className="bioTakipcilerVeTakipEdilenlerDiv">
          <div className="takipcilerVeTakipEdilenlerDiv">
            <div>
              <button id="takipcileriButonDiv">Takipçiler</button>
            </div>
            <div>
              <button id="takipEdilenlerButonDiv">Takip Edilenler</button>
            </div>
          </div>
          <div className="kullaniciBioDiv">{userInformation.kullaniciBio}</div>
          <div className="katilmaTarihi">
            <FaRegCalendarCheck />
            {userInformation.kullaniciUyeOlmaTarihi}
          </div>
        </div>
      </div>
      <div>
        <button id="profilDuzenle">Profili Düzenle</button>
      </div>
    </div>
  );
}

export default ProfilPagePersonalInfo;
