import "./App.css";
import Anasayfa from "./containers/Anasayfa/Anasayfa";
import GirisYap from "./containers/GirisYapEkranı/GirisYap";
import KayitOl from "./containers/KayıtOlmaEkranı/KayitOl";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profilim from "./containers/Profilim/Profilim";
import MailOnay from "./containers/MailOnay/MailOnay.jsx";
import AramaGecmisi from "./containers/AramaGecmisi/AramaGecmisi.jsx";
import GonderiPaylas from "./components/GonderiPaylas/GonderiPaylas.jsx";
import BaskasininProfileGit from "./containers/BaskasininProfileGit/BaskasininProfileGit.jsx";
import ProfilAyarlari from "./containers/ProfilAyarlari/ProfilAyarlari.jsx";
import GonderiIcerigi from "./containers/GonderiIcerigi/GonderiIcerigi.jsx";
import AnketlerimGenel from "./containers/AnketlerimGenel/AnketlerimGenel.jsx";

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
          <Route path="/profil/:takmaAd" element={<BaskasininProfileGit />} />
          <Route path="/ayarlar" element={<ProfilAyarlari />} />
          <Route
            path="/gonderiler/:takmaAd/:gonderiId"
            element={<GonderiIcerigi />}
          />
          <Route path="/anketlerim" element={<AnketlerimGenel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
