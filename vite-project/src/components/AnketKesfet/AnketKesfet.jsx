import React, { useEffect, useState } from "react";
import "./AnketKesfet.css";
import AnketlerimGenel from "../../containers/AnketlerimGenel/AnketlerimGenel";
import { anketOneri } from "../../services/AnketOneri.js";
import { ClipLoader } from "react-spinners";
import { anketeCevapVer } from "../../services/AnketeCevapVer.js";
function AnketKesfet() {
  const [anketOnerilerim, setAnketOnerilerim] = useState(null);
  const [anketKesfetLoading, setAnketKesfetLoading] = useState(true);
  useEffect(() => {
    const anketVerileriniAl = async () => {
      try {
        const anketVerileri = await anketOneri();

        setAnketOnerilerim(anketVerileri);
        console.log("anket onerilerim= ", anketVerileri);
      } catch (err) {
        console.log("Bir hata meydana geldi= ", err);
      }
    };
    anketVerileriniAl();
  }, []);

  useEffect(() => {
    if (anketOnerilerim !== null) {
      setAnketKesfetLoading(false);
    }
  }, [anketOnerilerim]);

  const handleSecim = async (e, anketId) => {
    const secenekId = parseInt(e.target.value); // String gelirse integer'a çevir
    console.log("Anket id= ", anketId);
    console.log("Seçenek id= ", secenekId);

    try {
      const gelenVeri = await anketeCevapVer(anketId, secenekId);

      // Güncelleme işlemi:
      setAnketOnerilerim((prev) =>
        prev.map((anket) => {
          if (anket.anketId === anketId) {
            return {
              ...anket,
              kullaniciCevapVarMi: true,
              secenekler: anket.secenekler.map((secenek) =>
                secenek.seceneklerId === secenekId
                  ? {
                      ...secenek,
                      secenekCevapSayisi: secenek.secenekCevapSayisi + 1,
                    }
                  : secenek
              ),
            };
          }
          return anket;
        })
      );
    } catch (err) {
      console.log("Ankete cevap vermede bir hata meydana geldi= ", err);
    }
  };

  const getToplamCevapSayisiByAnketId = (anketId) => {
    if (!anketOnerilerim) return 0; // Veriler daha yüklenmemiş olabilir

    const anket = anketOnerilerim.find((a) => a.anketId === anketId);
    if (!anket) return 0;

    return anket.secenekler.reduce(
      (toplam, secenek) => toplam + secenek.secenekCevapSayisi,
      0
    );
  };

  return (
    <div className="anketKesfetDiv">
      {anketKesfetLoading ? (
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
        <>
          <AnketlerimGenel seciliAlan={1} />
          {anketOnerilerim.length > 0 ? (
            anketOnerilerim.map((oneriAnket, index) => (
              <div className="anketCardYapisi" key={index}>
                <div>
                  <div className="anketCardAnketSorusu">
                    {index + 1}) {oneriAnket.anketSorusu}
                  </div>
                </div>
                {oneriAnket.secenekler.map((secenek, i) =>
                  oneriAnket.kullaniciCevapVarMi ? (
                    <div className="anketlerimSeceneklerDiv" key={i}>
                      <div>{secenek.secenekMetni}</div>
                      <div>
                        %
                        {(
                          (secenek.secenekCevapSayisi /
                            getToplamCevapSayisiByAnketId(oneriAnket.anketId)) *
                          100
                        ).toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`anketSecimi_${oneriAnket.anketId}`} // Aynı anketteki radio'lar gruplansın
                          value={secenek.seceneklerId}
                          onChange={(e) => handleSecim(e, oneriAnket.anketId)}
                        />
                        {secenek.secenekMetni}
                      </label>
                    </div>
                  )
                )}
              </div>
            ))
          ) : (
            <div>Herhangi bir anket bulunmamıştır.</div>
          )}
        </>
      )}
    </div>
  );
}

export default AnketKesfet;
