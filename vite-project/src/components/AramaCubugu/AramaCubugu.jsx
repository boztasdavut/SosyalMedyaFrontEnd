import React, { useState, useCallback } from "react";
import "./AramaCubugu.css";
import { CiSearch } from "react-icons/ci";
import { aramaSonucuGetir } from "../../services/AramaYap.js";
import { debounce } from "lodash";
import AramaSonuclariGoster from "../../containers/AramaSonuclari/AramaSonuclariGoster";
import { jwtDecode } from "../../services/JwtDecode.js";
export default function AramaCubugu() {
  const [query, setQuery] = useState("");
  const [aramaSonuclari, setAramaSonuclari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (q) => {
      if (!q.trim()) {
        setAramaSonuclari([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const results = await aramaSonucuGetir(q);
      let list = Array.isArray(results) ? results : results?.data || [];
      const kullanici_id = await jwtDecode();
      list = list.filter((kullanici) => kullanici.kullaniciId !== kullanici_id);
      console.log("Arama cubugu query sonucu= ", list);
      console.log("Arama cubugu mevcut kullanici id= ", kullanici_id);

      setAramaSonuclari(list);
      setIsLoading(false);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    debouncedSearch(q);
  };

  return (
    <div>
      <div className="aramaCubunuAnaDiv">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Kullanıcı ara..."
          className="aramaCubuguInput"
        />
        <CiSearch className="searchIcon" />
      </div>

      <AramaSonuclariGoster
        query={query}
        aramaSonuclari={aramaSonuclari}
        isLoading={isLoading}
      />
    </div>
  );
}
