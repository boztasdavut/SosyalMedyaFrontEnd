import React, { useState } from "react";
import "./AnketOlustur.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

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

  const anketTotalVeriKaydetmeyeHazir = () => {
    const totalAnketVerisi = {
      soruYazisi: soruYazisi,
      soruSecenekleri: seceneklerinBilgisi,
    };

    console.log("Gönderilecek veri= ", totalAnketVerisi);
  };

  return (
    <div className="anketOlusturAnaDiv">
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
        {seceneklerinBilgisi.map((veri, index) => (
          <div key={index} className="secenekGirmeDiv">
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
