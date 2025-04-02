import React, { useEffect, useState } from "react";
import SabitSolMenu from "../SabitSolMenu/SabitSolMenu";
import GonderiFrame from "../../components/GonderiFrame/GonderiFrame";
import { anasayfa } from "../../services/Anasayfa";
import "./AnasayfaPage.css";
import Message from "../../components/Message/Message";
import { gonderiTotalBegeniSayisi } from "../../services/GonderiTotalBegeniSayisi";

function AnasayfaPage() {
  const [gelenVeriler, setGelenVeriler] = useState([]);
  const [totalBegeniler, setTotalBegeniler] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 🔹 Verilerin gelip gelmediğini takip eden state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const veriler = await anasayfa();
        const begeniSayisi = await gonderiTotalBegeniSayisi();

        if (veriler && begeniSayisi) {
          // 🔹 Eğer veriler başarıyla gelmişse state güncellenir
          setGelenVeriler(veriler);
          setTotalBegeniler(begeniSayisi);
          setIsLoading(false); // 🔹 Yüklenme tamamlandı
        }
      } catch (error) {
        console.error("Verileri çekerken hata oluştu:", error);
        setIsLoading(false); // Hata olsa bile yüklenmeyi durdur
      }
    };

    fetchData();
    console.log("Gelen veri= ", gelenVeriler);
  }, []);

  return (
    <div className="anasayfaPageAnaDiv">
      <SabitSolMenu />

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <GonderiFrame
          veriler={gelenVeriler}
          totalBegeniSayisi={totalBegeniler}
        />
      )}

      <Message />
    </div>
  );
}

export default AnasayfaPage;
