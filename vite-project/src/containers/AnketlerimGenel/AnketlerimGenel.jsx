import React, { useState } from "react";
import "./AnketlerimGenel.css";
import SolMenu from "../SolMenu/SolMenu";
import Mesajlasma from "../Mesajlasma/Mesajlasma";
import clsx from "clsx";
import AnketOlustur from "../../components/AnketOlustur/AnketOlustur";

function AnketlerimGenel() {
  const [seciliAlan, setSeciliAlan] = useState(1);

  return (
    <div className="anketlerimDiv">
      <SolMenu />
      <Mesajlasma />
      <div className="anketlerimGenelDiv">
        <div className="anketlerimUstMenuAnaDiv">
          <div
            onClick={() => setSeciliAlan(1)}
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
            onClick={() => setSeciliAlan(2)}
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
            onClick={() => setSeciliAlan(3)}
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

      {seciliAlan === 1 && <div>Anket keşfet bölümü açıldı.</div>}
      {seciliAlan === 2 && (
        <div>
          <AnketOlustur />
        </div>
      )}
      {seciliAlan === 3 && <div>Olusturduğum anketler bölümü açıldı.</div>}
    </div>
  );
}

export default AnketlerimGenel;
