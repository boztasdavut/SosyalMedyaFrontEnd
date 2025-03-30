import React, { useEffect, useState } from "react";
import "./KullaniciGonderileri.css";
import { tumGonderiler } from "../../services/KullaniciTumGonderileri";
import emptyProfilePicture from "../../assests/empty.png";
import { BsThreeDots } from "react-icons/bs";

function KullaniciGonderileri() {
  const [kullaniciVerileri, setKullaniciVerileri] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const gelenVeri = await tumGonderiler();
      setKullaniciVerileri(gelenVeri);
    };
    fetchData();
  }, []);
  return (
    <div className="kullanicininTumGonderileriAnaDiv">
      {kullaniciVerileri.map((veri) => (
        <div key={veri.gonderiId} className="profilResmiIcerigiVeAyarlarDiv">
          <div className="profilResmiVeIcerigiDiv" key={veri.gonderiId}>
            <div>
              <img
                className="anasayfaProfilResmi"
                src={emptyProfilePicture}
                alt="Logo"
                width={60}
                height={60}
              />
            </div>
            <div className="kullanicininPaylastigiGonderi">{veri.gonderiIcerigi}</div>
          </div>
          <div>
            <BsThreeDots size={25} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default KullaniciGonderileri;
