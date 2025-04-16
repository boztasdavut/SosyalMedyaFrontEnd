import React, { useEffect, useState } from "react";
import "./Profilim.css";
import SolMenu from "../SolMenu/SolMenu";
import ProfilimGonderiler from "../ProfilimGonderiler/ProfilimGonderiler.jsx";
import Mesajlasma from "../Mesajlasma/Mesajlasma.jsx";
import ProfilimPageHeader from "../ProfilimPageHeader/ProfilimPageHeader.jsx";
function Profilim() {
  return (
    <div>
      <SolMenu />
      <ProfilimPageHeader />
      <ProfilimGonderiler />
      <Mesajlasma />
    </div>
  );
}

export default Profilim;
