import React, { useEffect, useState } from "react";
import "./KullaniciGonderileri.css";
import { tumGonderiler } from "../../services/KullaniciTumGonderileri";
import emptyProfilePicture from "../../assests/empty.png";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";

function KullaniciGonderileri() {
  const [kullaniciVerileri, setKullaniciVerileri] = useState([]);
  const [gonderiAyarlariVisibility, setGonderiAyarlariVisibility] = useState(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const gelenVeri = await tumGonderiler();
      setKullaniciVerileri(gelenVeri);
    };
    fetchData();
  }, []);

  // Ayar açma/kapama fonksiyonu
  const gonderiAyarlariHandle = (gonderiId) => {
    setGonderiAyarlariVisibility((prevState) => {
      const newState = { ...prevState };
      if (newState[gonderiId]) {
        delete newState[gonderiId];
      } else {
        Object.keys(newState).forEach((key) => {
          delete newState[key];
        });
        newState[gonderiId] = true;
      }
      return newState;
    });
  };

  // Sayfa dışında tıklama kontrolü
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profilResmiIcerigiVeAyarlarDiv")) {
        setGonderiAyarlariVisibility({});
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="kullanicininTumGonderileriAnaDiv">
      {kullaniciVerileri.length === 0 ? (
        <div className="gonderiBulunamadi">Herhangi gönderiniz bulunmuyor.</div>
      ) : (
        kullaniciVerileri.map((veri) => (
          <div key={veri.gonderiId} className="profilResmiIcerigiVeAyarlarDiv">
            <div className="profilResmiVeIcerigiDiv">
              <div>
                <img
                  className="anasayfaProfilResmi"
                  src={emptyProfilePicture}
                  alt="Logo"
                  width={60}
                  height={60}
                />
              </div>
              <div className="kullanicininPaylastigiGonderi">
                {veri.gonderiIcerigi}
              </div>
            </div>
            <div className="gonderiAyarlariIconDiv">
              <BsThreeDots
                id="gonderiAyarlari"
                size={25}
                onClick={() => gonderiAyarlariHandle(veri.gonderiId)}
              />
            </div>
            {gonderiAyarlariVisibility[veri.gonderiId] && (
              <div className="gonderiAyarlariDiv">
                <div className="gönderiSilmeAnaDiv">
                  <MdDelete />
                  <div>Gönderiyi Sil</div>
                </div>
                <div className="gonderiyiDuzenlemeAnaDiv">
                  <MdEditSquare />
                  <div>Gönderiyi Düzenle</div>
                </div>
                <div className="gonderiIstatistikleriniGor">
                  <IoStatsChartSharp />
                  <div>Gönderi İstatistikleri</div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default KullaniciGonderileri;
