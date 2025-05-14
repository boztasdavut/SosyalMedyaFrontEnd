import React, { useState } from "react";
import "./AnketOlustur.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
function AnketOlustur() {
  const [secenekSayisi, setSecenekSayisi] = useState(1);
  const [soruYazisi, setSoruYazisi] = useState("");
  const [seceneklerinBilgisi, setSeceneklerinBilgisi] = useState([""]);
  const [editableList, setEditableList] = useState({});

  const secenekGirisiYapildi = (secenekGirisi) => {
    setSeceneklerinBilgisi([...seceneklerinBilgisi, secenekGirisi]);
    setEditableList({ ...editableList, [secenekGirisi]: true });
  };

  const consoldaGoster = () => {};

  const birSecenegiSil = (value) => {
    seceneklerinBilgisi((prevItem) => prevItem.filter((_, i) => i !== value));
  };

  const yeniBirSecenekEkle = () => {
    setSeceneklerinBilgisi([...seceneklerinBilgisi, ""]);
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
              disabled={editableList.veri}
              className="secenekGirmeInput"
              type="text"
            />
            <div className="birSecenegiOnaylamaDiv">
              <CheckOutlinedIcon onClick={secenekGirisiYapildi} />
            </div>
            <div className="birSecenegiSilmeDiv">
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        ))}
      </div>
      <div onClick={yeniBirSecenekEkle} className="yeniSecenekEkleDiv">
        Yeni Seçenek Ekle
      </div>
      <div className="anketiKaydetDiv">Anketi Kaydet</div>
    </div>
  );
}

export default AnketOlustur;
