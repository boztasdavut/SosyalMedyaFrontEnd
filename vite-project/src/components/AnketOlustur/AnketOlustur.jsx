import React, { useState } from "react";
import "./AnketOlustur.css";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
function AnketOlustur() {
  const [secenekSayisi, setSecenekSayisi] = useState(1);
  const [soruYazisi, setSoruYazisi] = useState("");
  const [seceneklerinBilgisi, setSeceneklerinBilgisi] = useState({});

  const secenekInputChange = (event, index) => {
    const gelenVeri = event.target.value;
    setSeceneklerinBilgisi((prevSecenekler) => ({
      ...prevSecenekler, // Copy previous values
      [index]: gelenVeri, // Update the value for the specific index
    }));
  };

  const consoldaGoster = () => {
    console.log(seceneklerinBilgisi);
  };

  return (
    <div>
      <div>
        <textarea
          value={soruYazisi}
          onChange={(e) => setSoruYazisi(e.target.value)}
        />
      </div>
      <div className="anketSecenekleriAnaDiv">
        {Array.from({ length: secenekSayisi }).map((veri, index) => (
          <div key={index}>
            <input type="text" onChange={(e) => secenekInputChange(e, index)} />
          </div>
        ))}
      </div>
      <div onClick={() => setSecenekSayisi(secenekSayisi + 1)}>
        Yeni Seçenek Ekle
      </div>
      <div onClick={consoldaGoster}>Anketi Kaydet</div>
    </div>
  );
}

export default AnketOlustur;
