import React, { useState } from "react";
import "./GonderiPaylas.css";
import { FiSend } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";
import { gonderiPaylas } from "../../services/GonderiPaylas";

function GonderiPaylas() {
  const [icerik, setIcerik] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [yükleniyor, setYükleniyor] = useState(false);

  const handleGonder = async () => {
    if (!icerik.trim()) return;

    try {
      setYükleniyor(true);
      await gonderiPaylas(icerik); // sadece text gönderimi
      setIcerik("");
      setMediaFile(null);
      setMediaPreview(null);
    } catch (err) {
      console.error("Gönderi hatası:", err);
    } finally {
      setYükleniyor(false);
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
  };

  return (
    <div className="gonderiPaylasContainer">
      <div className="gonderiFormu">
        <textarea
          className="gonderiInput"
          placeholder="Paylaşım yap..."
          value={icerik}
          onChange={(e) => setIcerik(e.target.value)}
          rows={3}
        ></textarea>

        {mediaPreview && (
          <div className="mediaPreviewContainer">
            <button className="mediaKapat" onClick={handleMediaKaldir}>
              ✕
            </button>
            {mediaFile?.type.startsWith("video") ? (
              <video controls className="mediaPreview">
                <source src={mediaPreview} />
              </video>
            ) : (
              <img src={mediaPreview} alt="preview" className="mediaPreview" />
            )}
          </div>
        )}

        <div className="gonderiAltBar">
          <div className="ikonlar">
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
          <button
            className="gonderButonu"
            onClick={handleGonder}
            disabled={!icerik.trim() || yükleniyor}
          >
            <FiSend /> {yükleniyor ? "Paylaşılıyor..." : "Paylaş"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GonderiPaylas;
