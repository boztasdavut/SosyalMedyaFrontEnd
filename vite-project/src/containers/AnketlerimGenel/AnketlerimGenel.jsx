import React, { useState } from "react";
import "./AnketlerimGenel.css";
import SolMenu from "../SolMenu/SolMenu";
import Mesajlasma from "../Mesajlasma/Mesajlasma";
import clsx from "clsx";
import AnketOlustur from "../../components/AnketOlustur/AnketOlustur";
import Anketlerim from "../../components/Anketlerim/Anketlerim";
import { useNavigate } from "react-router-dom";

function AnketlerimGenel({ seciliAlan = 0 }) {
  const navigate = useNavigate();

  const anketlerimSecenegi = () => {
    navigate(`/anketlerim/anketlerimiGor?anketId=all`);
  };

  const anketOlusturSecenegi = () => {
    navigate(`/anketlerim/anketOlustur`);
  };

  const anketOnerileriSecenegi = () => {
    navigate(`/anketlerim/anketOnerileri`);
  };

  return (
    <div className="anketlerimDiv">
      <SolMenu />
      <Mesajlasma />
      <div className="anketlerimGenelDiv">
        <div className="anketlerimUstMenuAnaDiv">
          <div
            onClick={anketOnerileriSecenegi}
            className={clsx(
              "anketlerimUstMenu",
              seciliAlan === 1
                ? "anketlerimSeciliUstMenuBackgroundColor"
                : "anketlerimSecisizUstMenuBackgroundColor"
            )}
          >
            Anket Keşfet
          </div>
          <div
            onClick={anketOlusturSecenegi}
            className={clsx(
              "anketlerimUstMenu",
              seciliAlan === 2
                ? "anketlerimSeciliUstMenuBackgroundColor"
                : "anketlerimSecisizUstMenuBackgroundColor"
            )}
          >
            Anket Oluştur
          </div>
          <div
            onClick={anketlerimSecenegi}
            className={clsx(
              "anketlerimUstMenu",
              seciliAlan === 3
                ? "anketlerimSeciliUstMenuBackgroundColor"
                : "anketlerimSecisizUstMenuBackgroundColor"
            )}
          >
            Anketlerim
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnketlerimGenel;
