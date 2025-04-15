import "./App.css";
import Anasayfa from "./containers/Anasayfa/Anasayfa";
import GirisYap from "./containers/GirisYapEkranı/GirisYap";
import KayitOl from "./containers/KayıtOlmaEkranı/KayitOl";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profilim from "./containers/Profilim/Profilim";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/kayitOl" element={<KayitOl />} />
          <Route path="/girisYap" element={<GirisYap />} />
          <Route path="/anasayfa" element={<Anasayfa />} />
          <Route path="/profilim" element={<Profilim />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
