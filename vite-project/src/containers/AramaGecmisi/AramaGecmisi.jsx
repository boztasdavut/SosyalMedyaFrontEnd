import React, { useState } from "react";
import "./AramaGecmisi.css";
import SolMenu from "../SolMenu/SolMenu.jsx";
import AramaCubugu from "../../components/AramaCubugu/AramaCubugu.jsx";
import AramaSonuclariGoster from "../AramaSonuclari/AramaSonuclariGoster.jsx";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";

function AramaGecmisi() {
  const [aramaSonuclari, setAramaSonuclari] = useState([]);
  return (
    <div>
      <SolMenu />
      <AramaCubugu
        aramaSonuclari={aramaSonuclari}
        setAramaSonuclari={setAramaSonuclari}
      />
      <AramaSonuclariGoster
        aramaSonuclari={aramaSonuclari}
        setAramaSonuclari={setAramaSonuclari}
      />
      <Mesajlasma />
    </div>
  );
}

export default AramaGecmisi;
