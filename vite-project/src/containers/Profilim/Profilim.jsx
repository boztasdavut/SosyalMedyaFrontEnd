import React, { useEffect, useState } from "react";
import "./Profilim.css";
import SolMenu from "../SolMenu/SolMenu";
import ProfilimGonderiler from "../ProfilimGonderiler/ProfilimGonderiler.jsx";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";
import ProfilimPageHeader from "../ProfilimPageHeader/ProfilimPageHeader.jsx";
function Profilim() {
  const[gonderiSayisi, setGonderiSayisi] = useState(null);
  return (
    <div>
      <SolMenu />
      <ProfilimPageHeader gonderiSayisi={gonderiSayisi} />
      <ProfilimGonderiler setGonderiSayisi={setGonderiSayisi} />
      <Mesajlasma />
    </div>
  );
}

export default Profilim;
