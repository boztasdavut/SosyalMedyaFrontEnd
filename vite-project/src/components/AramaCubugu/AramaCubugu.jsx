import React, { useCallback, useEffect, useState } from "react";
import "./AramaCubugu.css";
import { CiSearch } from "react-icons/ci";
import { aramaSonucuGetir } from "../../services/AramaYap.js";
import { debounce } from "lodash";

function AramaCubugu({ aramaSonuclari, setAramaSonuclari }) {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e);
    debouncedSearch(e);
  };

  useEffect(() => {
    console.log("query= ", query);
  }, [query]);

  useEffect(() => {
    console.log("arama sonuclari=", aramaSonuclari);
  }, [aramaSonuclari]);

  const searchUser = async (q) => {
    const aramaSonuclari = await aramaSonucuGetir(q);
    setAramaSonuclari(aramaSonuclari);
  };
  const debouncedSearch = useCallback(
    debounce((q) => {
      searchUser(q);
    }, 300),
    [] // sadece bir kere oluşturulsun
  );

  return (
    <div className="aramaCubunuAnaDiv">
      <div>
        <input
          onChange={(e) => handleQueryChange(e.target.value)}
          value={query}
          className="aramaCubuguInput"
          type="text"
        />
      </div>
      <div className="searchIcon">
        <CiSearch />
      </div>
    </div>
  );
}

export default AramaCubugu;
