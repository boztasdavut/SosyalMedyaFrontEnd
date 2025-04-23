import React, { useEffect, useState } from "react";
import "./SolMenu.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { logout } from "../../services/Logout.js";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { ClipLoader } from "react-spinners";

function SolMenu() {
  const [kullanicininProfilBilgileri, setKullanicininProfilBilgileri] =
    useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profilBilgisiGetir = async () => {
      try {
        const profilBilgileri = await kullaniciProfilBilgileriGetir();
        setKullanicininProfilBilgileri(profilBilgileri);
      } catch (err) {
        console.log("Bir hata meydana geldi.");
      } finally {
        setIsLoading(false);
      }
    };
    profilBilgisiGetir();
  }, []);
  const navigate = useNavigate();
  const profilYonlendir = () => {
    navigate("/profilim");
  };
  const anasayfaYonlendir = () => {
    navigate("/anasayfa");
  };
  const aramaYap = () => {
    navigate("/arama");
  };
  const cikisYap = async () => {
    const basariDurumu = await logout();
    console.log("Logout durumu= ", basariDurumu);
    localStorage.removeItem("jwt");
    navigate("/girisYap");
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Bu, ekranın tamamında ortalanmasını sağlar
          }}
        >
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div className="solMenu">
          <div onClick={anasayfaYonlendir}>
            <GrHomeRounded size={50} />
          </div>
          <div>
            <IoSearchOutline onClick={aramaYap} size={50} />
          </div>
          <div>
            <BiMessageRoundedDetail size={50} />
          </div>
          <div>
            <IoSettingsOutline size={50} />
          </div>
          <div onClick={profilYonlendir} className="solMenu-profilResmi">
            <img
              src={kullanicininProfilBilgileri.kullaniciProfilResmi}
              alt="profil"
            />
          </div>
          <div onClick={cikisYap}>
            <CiLogout size={50} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SolMenu;
