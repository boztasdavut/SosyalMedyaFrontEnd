import React, { useEffect, useState } from "react";
import "./ProfilimPageHeader.css";
import { kullaniciProfilBilgileriGetir } from "../../services/KullaniciProfilBilgileri.js";
import { IoSettingsOutline } from "react-icons/io5";
import { kullanicininTumTakipcileriniGetir } from "../../services/KullaniciTumTakipcileriGetir.js";
import { kullaniciTumTakipEdilenleriGetir } from "../../services/KullaniciTumTakipEdilenlerGetir.js";
import { ClipLoader } from "react-spinners";
import { CiEdit } from "react-icons/ci";
import { PiCheckThin } from "react-icons/pi";
import { profilResmiGuncelle } from "../../services/ProfilResmiGuncelle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { bioGuncelle } from "../../services/BioGuncelle.js";
import TakipcileriGosterModal from "../../components/TakipcileriGosterModal/TakipcileriGosterModal.jsx";

function ProfilimPageHeader({
  gonderiSayisi,
  setIsTakipcilerModalOpen,
  setTakipcilerListesi,
  setTakipEdilenlerListesi,
  setIsTakipEdilenlerModalOpen,
}) {
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
        console.log("Takipciler bilgisi= ", takipciler);
        console.log("Takip edilenler= ", takipEdilenler);
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

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const gelenVeri = await bioGuncelle(bio);
      toast.success("Bio Başarıyla Güncellendi", {
        style: {
          width: "500px",
        },
      });
    } catch (err) {
      console.log("Bio güncellenirken bir hata meydana geldi= ", err);
    }
  };

  const resimGuncelleAcilis = () => {
    document.getElementById("profilResmiInput").click();
  };

  const resimGuncelleHandle = async (e) => {
    const dosya = e.target.files[0];
    if (!dosya) return;

    const gecerliTipler = ["image/png", "image/jpeg"];
    if (!gecerliTipler.includes(dosya.type)) {
      toast.error(
        "Sadece PNG, JPG veya JPEG formatındaki dosyaları yükleyebilirsiniz.",
        {
          style: {
            width: "500px",
          },
        }
      );

      return;
    }

    console.log("resim yüklenen= ", dosya);
    const formData = new FormData();
    formData.append("resim", dosya);

    try {
      const gelenVeri = await profilResmiGuncelle(formData);
      console.log("Profil resmi guncelleme sonuc= ", gelenVeri);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Profil resmi güncelleme hatası:", err);
    }
  };

  const takipcilerModalHandle = () => {
    setTakipcilerListesi(kullaniciTakipcileri);
    setIsTakipcilerModalOpen(true);
  };

  const takipEdilenlerModalHandle = () => {
    setTakipEdilenlerListesi(kullaniciTakipEttikleri);
    setIsTakipEdilenlerModalOpen(true);
  };

  return (
    <div>
      <ToastContainer position="top-center" />

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
              <div
                onClick={resimGuncelleAcilis}
                className="profilim-avatar-edit"
              >
                <CiEdit size={24} />
              </div>
              <input
                type="file"
                id="profilResmiInput"
                accept="image/"
                style={{ display: "none" }}
                onChange={resimGuncelleHandle}
              />
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
                <div onClick={takipcilerModalHandle}>
                  <strong>{kullaniciTakipcileri.followCount}</strong> takipçi
                </div>
                <div onClick={takipEdilenlerModalHandle}>
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
