import React, { useEffect, useState } from "react";
import "./Anketlerim.css";
import { anketlerimiGetir } from "../../services/AnketlerimServis.js";
import { ClipLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import AnketlerimGenel from "../../containers/AnketlerimGenel/AnketlerimGenel.jsx";
import AnketSilmeEminMisin from "../AnketSilmeEminMisin/AnketSilmeEminMisin.jsx";

function Anketlerim() {
  const [kullanicininTumAnketleri, setKullanicininTumAnketleri] =
    useState(null);
  const [filtreBilgisi, setFiltreBilgisi] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const tumAnketleriminBilgisi = async () => {
      const gelenVeri = await anketlerimiGetir();
      setKullanicininTumAnketleri(gelenVeri);
      console.log("Anketlerim bilgisi= ", gelenVeri);
    };

    tumAnketleriminBilgisi();
  }, []);

  useEffect(() => {
    if (kullanicininTumAnketleri !== null) {
      setLoading(false);
    }
  }, [kullanicininTumAnketleri]);

  const anketIcerigineGit = (anketId) => {
    const path = location.pathname;
    const stringAnketId = anketId.toString();
    console.log("Path Adresi = ", path);
    navigate(`${path}?anketId=${stringAnketId}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filtre = queryParams.get("anketId");
    console.log(typeof filtre, " degeri: ", filtre);
    setFiltreBilgisi(filtre);
  }, [location.search]);

  const anketSilmeButonu = (e) => {
    // burada modal alt yapısı entegre edilecek.
    e.stopPropagation();
    return <AnketSilmeEminMisin />;
  };

  return (
    <div className="anketlerimAnaDiv">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Bu, ekranın tamamında ortalanmasını sağlar
          }}
        >
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div>
          <AnketlerimGenel seciliAlan={3} />
          <div className="tumAnketSorularDiv">
            {kullanicininTumAnketleri.map(
              (element, index) =>
                (element.anketId.toString() === filtreBilgisi ||
                  filtreBilgisi === "all") && (
                  <div key={element.anketId} className="anketCardYapisi">
                    <div>
                      <div
                        onClick={() => anketIcerigineGit(element.anketId)}
                        className="anketCardAnketSorusu"
                      >
                        {index + 1} ) {element.anketSorusu}
                      </div>
                    </div>
                    {element.secenekler.map((e, secenekIndex) => (
                      <div
                        key={secenekIndex}
                        className="anketlerimSeceneklerDiv"
                      >
                        {e.secenekMetni}
                      </div>
                    ))}
                    <div className="soruCardFooterAnaDiv">
                      <div className="istatistikleriGorButonu">
                        İstatistikleri Gör
                      </div>
                      <div
                        onClick={(e) => anketSilmeButonu(e)}
                        className="anketiSilDiv"
                      >
                        Anketi Sil
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Anketlerim;
