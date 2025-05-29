import React, { useEffect, useState } from "react";
import "./SolMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { ClipLoader } from "react-spinners";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Tooltip from "@mui/material/Tooltip";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import LogoutModal from "../../components/LogoutModal/LogoutModal.jsx";

function SolMenu() {
  const [kullanicininProfilBilgileri, setKullanicininProfilBilgileri] =
    useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  useEffect(() => {
    const profilBilgisiGetir = async () => {
      try {
        const profilBilgileri = await kullaniciProfilBilgileriGetir();
        console.log("Profil Bilgilerim= ", profilBilgileri);
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
    setLogoutModalIsOpen(true);
  };

  const ayarlaraGit = async () => {
    navigate("/ayarlar");
  };

  const anketlereGit = async () => {
    navigate("/anketlerim/anketOnerileri");
  };

  return (
    <div>
      {logoutModalIsOpen ? (
        <LogoutModal setLogoutModalIsOpen={setLogoutModalIsOpen} />
      ) : isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
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
          <Tooltip title="Anketler">
            <div onClick={anketlereGit}>
              <PollOutlinedIcon style={{ fontSize: "50px" }} />
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
                src={
                  kullanicininProfilBilgileri.kullaniciProfilResmi?.endsWith(
                    "empty.png"
                  )
                    ? "https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"
                    : kullanicininProfilBilgileri.kullaniciProfilResmi
                }
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
