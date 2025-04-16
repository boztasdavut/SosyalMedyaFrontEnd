import React, { useEffect, useState } from "react";
import "./Anasayfa.css";
import { useNavigate } from "react-router-dom";

import Mesajlasma from "../Mesajlasma/Mesajlasma";
import SolMenu from "../SolMenu/SolMenu";
import AnasayfaGonderiler from "../AnasayfaGonderiler/AnasayfaGonderiler";

function Anasayfa() {
  return (
    <div>
      <SolMenu />
      <AnasayfaGonderiler />
      <Mesajlasma />
    </div>
  );
}

export default Anasayfa;
