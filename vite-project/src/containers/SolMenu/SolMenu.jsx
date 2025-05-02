import React, { useEffect, useState } from "react";
import "./SolMenu.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Logout.js";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { ClipLoader } from "react-spinners";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Tooltip from "@mui/material/Tooltip";

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

  const ayarlaraGit = async () => {
    navigate("/ayarlar");
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
          <Tooltip title="Anasayfa">
            <div onClick={anasayfaYonlendir}>
              <HomeOutlinedIcon
                style={{ fontSize: "50px", cursor: "pointer" }}
              />
            </div>
          </Tooltip>
          <Tooltip title="Arama Yap">
            <div onClick={aramaYap}>
              <SearchOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </Tooltip>
          <Tooltip title="Ayarlar">
            <div onClick={ayarlaraGit}>
              <SettingsOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </Tooltip>
          <Tooltip title="Profilim">
            <div onClick={profilYonlendir} className="solMenu-profilResmi">
              <img
                src={kullanicininProfilBilgileri.kullaniciProfilResmi}
                alt="Profilim"
              />
            </div>
          </Tooltip>

          <Tooltip title="Çıkış Yap">
            <div onClick={cikisYap}>
              <ExitToAppOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default SolMenu;
