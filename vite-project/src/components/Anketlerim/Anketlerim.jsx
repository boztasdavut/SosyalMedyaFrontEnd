import React, { useEffect, useState } from "react";
import "./Anketlerim.css";
import { anketlerimiGetir } from "../../services/AnketlerimServis.js";
import { ClipLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import AnketlerimGenel from "../../containers/AnketlerimGenel/AnketlerimGenel.jsx";
import AnketSilmeOnayModal from "../AnketSilmeOnayModal/AnketSilmeOnayModal.jsx";

function Anketlerim() {
  const [kullanicininTumAnketleri, setKullanicininTumAnketleri] =
    useState(null);
  const [filtreBilgisi, setFiltreBilgisi] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [silinecekAnketBilgisi, setSilinecekAnketBilgisi] = useState(null);
  /*useEffect(() => {
    const tumAnketleriminBilgisi = async () => {
      const gelenVeri = await anketlerimiGetir();
      setKullanicininTumAnketleri(gelenVeri);
      console.log("Anketlerim bilgisi= ", gelenVeri);
    };

    tumAnketleriminBilgisi();
  }, []);*/

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

  /*
    
    useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filtre = queryParams.get("anketId");
    console.log(typeof filtre, " degeri: ", filtre);
    setFiltreBilgisi(filtre);
  }, [location.search]);
    */

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filtre = queryParams.get("anketId");
    setFiltreBilgisi(filtre);

    const tumAnketleriminBilgisi = async () => {
      setLoading(true); // veri gelirken loading göstermek için
      const gelenVeri = await anketlerimiGetir();
      console.log("Anketlerim sayfasi anketler= ", gelenVeri);
      setKullanicininTumAnketleri(gelenVeri);
      setLoading(false);
    };

    tumAnketleriminBilgisi();
  }, [location.search]);

  const anketSilmeOnaylama = (anketId) => {
    setModalIsOpen(true);
    setSilinecekAnketBilgisi(anketId);
  };

  const getToplamCevapSayisiByAnketId = (anketId) => {
    if (!kullanicininTumAnketleri) return 0; // Veriler daha yüklenmemiş olabilir

    const anket = kullanicininTumAnketleri.find((a) => a.anketId === anketId);
    if (!anket) return 0;

    return anket.secenekler.reduce(
      (toplam, secenek) => toplam + secenek.secenekCevapSayisi,
      0
    );
  };

  const yuzdelikHesapla = (secenekCevapSayisi, anketId) => {
    const toplamCevapSayisi = getToplamCevapSayisiByAnketId(anketId);
    if (toplamCevapSayisi === 0) {
      return 0;
    } else {
      return ((secenekCevapSayisi / toplamCevapSayisi) * 100).toFixed(2);
    }
  };

  return (
    <div className="anketlerimAnaDiv">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClipLoader size={100} color="#4a90e2" />
        </div>
      ) : (
        <div>
          {modalIsOpen && (
            <AnketSilmeOnayModal
              modalControl={setModalIsOpen}
              anketId={silinecekAnketBilgisi}
            />
          )}

          <AnketlerimGenel seciliAlan={3} />
          <div className="tumAnketSorularDiv">
            {kullanicininTumAnketleri.length > 0 ? (
              kullanicininTumAnketleri.map((element, index) =>
                element.anketId.toString() === filtreBilgisi ||
                filtreBilgisi === "all" ? (
                  <div key={element.anketId} className="anketCardYapisi">
                    <div>
                      <div
                        onClick={() => anketIcerigineGit(element.anketId)}
                        className="anketCardAnketSorusu"
                      >
                        {index + 1}) {element.anketSorusu}
                      </div>
                    </div>
                    {element.secenekler.map((e, secenekIndex) => (
                      <div
                        key={secenekIndex}
                        className="anketlerimSeceneklerDiv"
                      >
                        <div>{e.secenekMetni}</div>
                        <div>
                          %
                          {yuzdelikHesapla(
                            e.secenekCevapSayisi,
                            element.anketId
                          )}
                        </div>
                      </div>
                    ))}
                    {element.anketId.toString() === filtreBilgisi && (
                      <div className="soruCardFooterAnaDiv">
                        <div
                          onClick={() => anketSilmeOnaylama(element.anketId)}
                          className="anketiSilDiv"
                        >
                          Anketi Sil
                        </div>
                      </div>
                    )}
                  </div>
                ) : null
              )
            ) : (
              <div className="anketlerimSayfasiBosDiv">Anket bulunamadı</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Anketlerim;
