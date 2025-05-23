import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [karsiTarafIdBilgisi, setKarsiTarafIdBilgisi] = useState("");
  const [karsiTarafAdi, setKarsiTarafAdi] = useState("");
  const [profilResmi, setProfilResmi] = useState("");
  const [icMesajAcikMi, setIcMesajAcikMi] = useState(false);
  const [icMesajlasmaLoading, setIcMesajlasmaLoading] = useState(false);
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        karsiTarafIdBilgisi,
        setKarsiTarafIdBilgisi,
        karsiTarafAdi,
        setKarsiTarafAdi,
        profilResmi,
        setProfilResmi,
        icMesajAcikMi,
        setIcMesajAcikMi,
        icMesajlasmaLoading,
        setIcMesajlasmaLoading,
        mesajlasmaKutusuAcikMi,
        setMesajlasmaKutusuAcikMi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
