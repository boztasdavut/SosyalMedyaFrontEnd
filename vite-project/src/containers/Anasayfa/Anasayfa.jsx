import React, { useEffect, useState } from "react";
import "./Anasayfa.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { anasayfa } from "../../services/Anasayfa";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners"; // Kullanmak istediğin spinner türüne göre değişir
import { IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";

function Anasayfa() {
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  const [mesajBaslangicSayfasiVerileri, setMesajBaslangicSayfasiVerileri] =
    useState([]);
  const [takipEdilenlerinGonderiler, setTakipEdilenlerinGonderileri] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const anasayfaApiIstegi = async () => {
      try {
        const gelenVeri = await anasayfa();
        console.log("gelen veri= ", gelenVeri);
        setTakipEdilenlerinGonderileri(gelenVeri);
      } catch (error) {
        if (error.message.includes("401")) {
          navigate("/girisYap");
        }
      } finally {
        setIsLoading(false); // Veri çekme işlemi tamamlandıktan sonra loading'i false yap
      }
    };

    anasayfaApiIstegi();
  }, []);

  const handleClickMesajlasma = () => {
    setMesajlasmaKutusuAcikMi(!mesajlasmaKutusuAcikMi);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <RingLoader color="#3498db" loading={true} size={50} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="solMenu">
          <div>
            <GrHomeRounded size={50} />
          </div>
          <div>
            <IoSearchOutline size={50} />
          </div>
          <div>
            <BiMessageRoundedDetail size={50} />
          </div>
          <div>
            <IoSettingsOutline size={50} />
          </div>
          <div>
            <FaRegCircle size={50} />
          </div>
        </div>
        <div>
          {takipEdilenlerinGonderiler.map((gonderi) => (
            <div className="gonderCardDiv">
              <div className="profilResmiVeTakmaAdDiv">
                <div>Profil Resmi</div>
                <div>@{gonderi.takipEdilenKullaniciTakmaAd}</div>
              </div>
              <div className="gonderiIcerigi">{gonderi.gonderiIcerigi}</div>
              <div className="gonderiAksiyonlariDiv">
                <div className="begenmeButonu">
                  <IoIosHeartEmpty size={25} />
                </div>
                <div className="yorumButonu">
                  <GoComment size={25} />
                </div>
                <div className="gondermeButonu">
                  <BsSend size={25} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mesajlasmaAnaDiv">
          {mesajlasmaKutusuAcikMi ? (
            <div
              onClick={handleClickMesajlasma}
              className="mesajKutusuAcikDurum"
            >
              <div className="mesajKutusuAcikBaslikVeIcon">
                <div>Mesajlarım</div>
                <div>
                  <MdOutlineKeyboardDoubleArrowDown size={50} />
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={handleClickMesajlasma}
              className="mesajKutusuKapaliDurum"
            >
              <div>Mesajlar</div>
              <div>
                <MdOutlineKeyboardDoubleArrowUp size={50} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Anasayfa;
