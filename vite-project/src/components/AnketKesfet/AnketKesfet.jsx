import React from "react";
import "./AnketKesfet.css";
import AnketlerimGenel from "../../containers/AnketlerimGenel/AnketlerimGenel";

function AnketKesfet() {
  return (
    <div className="anketKesfetDiv">
      <AnketlerimGenel seciliAlan={1} />
      Anket kesfet
    </div>
  );
}

export default AnketKesfet;
