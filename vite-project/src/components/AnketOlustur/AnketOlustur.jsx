import React, { useState } from "react";
import "./AnketOlustur.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { anketiKaydet } from "../../services/AnketKaydet.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Anketlerim from "../Anketlerim/Anketlerim.jsx";
import AnketlerimGenel from "../../containers/AnketlerimGenel/AnketlerimGenel.jsx";

function AnketOlustur() {
  const [soruYazisi, setSoruYazisi] = useState("");
  const [seceneklerinBilgisi, setSeceneklerinBilgisi] = useState([""]);

  const secenekGirisiYapildi = (index, value) => {
    const yeniSecenekler = [...seceneklerinBilgisi];
    yeniSecenekler[index] = value;
    setSeceneklerinBilgisi(yeniSecenekler);
  };

  const birSecenegiSil = (index) => {
    setSeceneklerinBilgisi((prev) => prev.filter((_, i) => i !== index));
  };

  const yeniBirSecenekEkle = () => {
    setSeceneklerinBilgisi([...seceneklerinBilgisi, ""]);
  };

  const anketTotalVeriKaydetmeyeHazir = async () => {
    const totalAnketVerisi = {
      soruYazisi: soruYazisi,
      soruSecenekleri: seceneklerinBilgisi,
    };

    try {
      const gelenCevap = await anketiKaydet(totalAnketVerisi);
      toast.success("Anket Başarıyla Kaydedildi.");
      setSoruYazisi("");
      setSeceneklerinBilgisi([""]);
    } catch (err) {
      toast.error("Anket oluşturulurken bir hata meydana geldi.");
      console.log("Bir hata meydana geldi= ", err);
    }
  };

  return (
    <div className="anketOlusturAnaDiv">
      <AnketlerimGenel seciliAlan={2} />
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>Soru</h3>
      <div className="soruGirisAlaniDiv">
        <input
          className="soruGirisAlaniInput"
          type="text"
          value={soruYazisi}
          onChange={(e) => setSoruYazisi(e.target.value)}
        />
      </div>
      <h4>Seçenekler</h4>
      <div className="anketSecenekleriAnaDiv">
        {seceneklerinBilgisi?.map((veri, index) => (
          <div key={index} className="secenekGirmeDiv">
            <div className="secenekNumarasi">
              <span style={{ fontSize: "20px" }}>{index + 1})</span>
            </div>

            <input
              value={veri}
              className="secenekGirmeInput"
              onChange={(e) => secenekGirisiYapildi(index, e.target.value)}
            />
            <div
              onClick={() => birSecenegiSil(index)}
              className="birSecenegiSilmeDiv"
            >
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        ))}
      </div>
      <div onClick={yeniBirSecenekEkle} className="yeniSecenekEkleDiv">
        Yeni Seçenek Ekle
      </div>
      <div className="anketiKaydetDiv" onClick={anketTotalVeriKaydetmeyeHazir}>
        Anketi Kaydet
      </div>
    </div>
  );
}

export default AnketOlustur;
