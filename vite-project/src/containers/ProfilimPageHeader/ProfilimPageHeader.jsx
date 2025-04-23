import React, { useEffect, useState } from "react";
import "./ProfilimPageHeader.css";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { IoSettingsOutline } from "react-icons/io5";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import { kullaniciTumTakipEdilenleriGetir } from "../../services/KullaniciTumTakipEdilenlerGetir.js";
import { ClipLoader } from "react-spinners";
import { CiEdit } from "react-icons/ci";
import { PiCheckThin } from "react-icons/pi";

function ProfilimPageHeader({ gonderiSayisi }) {
  const [kullaniciProfilBilgileri, setKullaniciProfilBilgileri] = useState({});
  const [kullaniciTakipcileri, setKullaniciTakipcileri] = useState({});
  const [kullaniciTakipEttikleri, setKullaniciTakipEttikleri] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const profilBilgileriGetir = async () => {
      try {
        const profilBilgileri = await kullaniciProfilBilgileriGetir();
        const takipciler = await kullanicininTumTakipcileriniGetir();
        const takipEdilenler = await kullaniciTumTakipEdilenleriGetir();
        setBio(profilBilgileri.kullaniciBio);
        setKullaniciProfilBilgileri(profilBilgileri);
        setKullaniciTakipcileri(takipciler);
        setKullaniciTakipEttikleri(takipEdilenler);
      } catch (err) {
        console.log("Bir hata oluştu: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    profilBilgileriGetir();
  }, []);

  const handleInputChange = (e) => {
    setBio(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // İsteğe bağlı: sunucuya bio'yu güncellemek için API çağrısı yapılabilir.
    setIsEditing(false);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div className="profilim-content">
          <div className="profilim-header">
            <div className="profilim-avatar-container">
              <div className="profilim-avatar">
                <img
                  src={kullaniciProfilBilgileri.kullaniciProfilResmi}
                  alt="Profil"
                />
              </div>
              <div className="profilim-avatar-edit">
                <CiEdit size={24} />
              </div>
            </div>
            <div className="profilim-info">
              <div className="profilim-top-bar">
                <div className="profilim-username">
                  {kullaniciProfilBilgileri.kullaniciTakmaAd}
                </div>
              </div>
              <div className="profilim-stats">
                <div>
                  <strong>{gonderiSayisi}</strong> gönderi
                </div>
                <div>
                  <strong>{kullaniciTakipcileri.followCount}</strong> takipçi
                </div>
                <div>
                  <strong>{kullaniciTakipEttikleri.followCount}</strong> takip
                </div>
              </div>
              <div className="profilim-bio">
                <div className="bio-text-with-edit">
                  <textarea
                    type="text"
                    value={bio}
                    readOnly={!isEditing}
                    className="bio-readonly-input"
                    onChange={handleInputChange}
                  />
                  {!isEditing ? (
                    <button
                      className="bio-edit-button"
                      onClick={handleEditClick}
                    >
                      <CiEdit size={30} />
                    </button>
                  ) : (
                    <button
                      className="bio-save-button"
                      onClick={handleSaveClick}
                    >
                      <PiCheckThin size={30} />
                    </button>
                  )}
                </div>
                <div className="join-date">
                  {kullaniciProfilBilgileri.kullaniciUyeOlmaTarihi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilimPageHeader;
