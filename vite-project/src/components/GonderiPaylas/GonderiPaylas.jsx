import React, { useState } from "react";
import "./GonderiPaylas.css";
import { FiSend } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";
import { gonderiPaylas } from "../../services/GonderiPaylas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { resimiGetir } from "../../services/FalAI";
import { uretilenResmiKaydet } from "../../services/UretilenResmiKaydet";
import { ClipLoader } from "react-spinners";

function GonderiPaylas() {
  const [icerik, setIcerik] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [yükleniyor, setYükleniyor] = useState(false);
  const [sihirbazSeciliMi, setSihirbazSeciliMi] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [resimUretildiMi, setResimUretildiMi] = useState(false);

  const handleGonder = async () => {
    if (!icerik.trim() && !mediaFile) return;
    if (resimUretildiMi === true) {
      try {
        console.log("Fal aiden resim üretildi gönderilmeye calisiliyor.");
        const gonderilecekObje = {
          gonderiIcerigi: icerik,
          resimUrl: mediaPreview,
        };
        const gelenVeri = await uretilenResmiKaydet(gonderilecekObje);
        setYükleniyor(true);
        setMediaPreview(null);
        setIcerik("");
        toast.success("Gönderi paylaşıldı.", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.error("Gönderi hatası:", err);
        toast.error("Gönderi paylaşılırken hata oluştu.");
      } finally {
        setYükleniyor(false);
      }
    } else if (resimUretildiMi === false) {
      try {
        setYükleniyor(true);
        await gonderiPaylas(icerik, mediaFile);
        setIcerik("");
        setMediaFile(null);
        setMediaPreview(null);
        toast.success("Gönderi paylaşıldı.", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (err) {
        console.error("Gönderi hatası:", err);
        toast.error("Gönderi paylaşılırken hata oluştu.");
      } finally {
        setYükleniyor(false);
      }
    }
  };

  const handleDosyaSec = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleMediaKaldir = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setResimUretildiMi(false);
  };

  const sihirbaziSec = () => {
    if (sihirbazSeciliMi === false) {
      document
        .getElementById("resimOlusturmaSihirbaziId")
        .classList.add("resimOlusturmaSihirbaziSecildi");
      setSihirbazSeciliMi(true);
    } else if (sihirbazSeciliMi === true) {
      document
        .getElementById("resimOlusturmaSihirbaziId")
        .classList.remove("resimOlusturmaSihirbaziSecildi");
      setSihirbazSeciliMi(false);
    }
  };

  const resimUretmePromptGonder = async () => {
    console.log("Resim üretme metotuna girildi.");
    setYükleniyor(true);
    const linkAdresi = await resimiGetir(prompt);
    setMediaPreview(linkAdresi);
    setSihirbazSeciliMi(true);
    sihirbaziSec();
    setPrompt("");
    setResimUretildiMi(true);
    setYükleniyor(false);
  };

  return (
    <div className="gonderiPaylasContainer">
      <ToastContainer />

      <div className="gonderiFormu">
        <textarea
          className="gonderiInput"
          placeholder={
            sihirbazSeciliMi
              ? "Resim üretmek için prompt girin..."
              : "Paylaşım yap..."
          }
          value={sihirbazSeciliMi ? prompt : icerik}
          onChange={
            sihirbazSeciliMi
              ? (e) => setPrompt(e.target.value)
              : (e) => setIcerik(e.target.value)
          }
          rows={3}
        ></textarea>
        {!yükleniyor ? (
          mediaPreview && (
            <div className="mediaPreviewContainer">
              <button className="mediaKapat" onClick={handleMediaKaldir}>
                ✕
              </button>
              {mediaFile?.type.startsWith("video") ? (
                <video controls className="mediaPreview">
                  <source src={mediaPreview} />
                </video>
              ) : (
                <img
                  src={mediaPreview}
                  alt="preview"
                  className="mediaPreview"
                />
              )}
            </div>
          )
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ClipLoader size={100} color="#4a90e2" />
          </div>
        )}

        <div className="gonderiAltBar">
          <div className="ikonlar">
            <div>
              <label htmlFor="dosyaInput">
                <MdOutlinePermMedia size={22} />
              </label>
              <input
                type="file"
                id="dosyaInput"
                style={{ display: "none" }}
                accept="image/*,video/*"
                onChange={handleDosyaSec}
              />
            </div>
            <div
              id="resimOlusturmaSihirbaziId"
              className="resimOlusturmaSihirbazi"
              onClick={sihirbaziSec}
            >
              <AutoAwesomeOutlinedIcon />
            </div>
          </div>
          <button
            className="gonderButonu"
            onClick={sihirbazSeciliMi ? resimUretmePromptGonder : handleGonder}
            disabled={
              (!sihirbazSeciliMi && !icerik.trim() && !mediaFile) || yükleniyor
            }
          >
            <FiSend />{" "}
            {sihirbazSeciliMi
              ? "Resim Al"
              : yükleniyor
              ? "Paylaşılıyor..."
              : "Paylaş"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GonderiPaylas;
