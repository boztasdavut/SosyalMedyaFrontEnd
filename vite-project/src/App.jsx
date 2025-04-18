import "./App.css";
import Anasayfa from "./containers/Anasayfa/Anasayfa";
import GirisYap from "./containers/GirisYapEkranı/GirisYap";
import KayitOl from "./containers/KayıtOlmaEkranı/KayitOl";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profilim from "./containers/Profilim/Profilim";
import MailOnay from "./containers/MailOnay/MailOnay.jsx";
import SolMenu from "./containers/SolMenu/SolMenu.jsx";
import AramaGecmisi from "./containers/AramaGecmisi/AramaGecmisi.jsx";
import GonderiPaylas from "./components/GonderiPaylas/GonderiPaylas.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/kayitOl" element={<KayitOl />} />
          <Route path="/girisYap" element={<GirisYap />} />
          <Route path="/anasayfa" element={<Anasayfa />} />
          <Route path="/profilim" element={<Profilim />} />
          <Route path="/mailOnay" element={<MailOnay />} />
          <Route path="/arama" element={<AramaGecmisi />} />
          <Route path="/gonderiPaylas" element={<GonderiPaylas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
