import "./App.css";
import Anasayfa from "./containers/Anasayfa/Anasayfa";
import GirisYap from "./containers/GirisYapEkranı/GirisYap";
import KayitOl from "./containers/KayıtOlmaEkranı/KayitOl";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Profilim from "./containers/Profilim/Profilim";
import MailOnay from "./containers/MailOnay/MailOnay.jsx";
import AramaGecmisi from "./containers/AramaGecmisi/AramaGecmisi.jsx";
import GonderiPaylas from "./components/GonderiPaylas/GonderiPaylas.jsx";
import BaskasininProfileGit from "./containers/BaskasininProfileGit/BaskasininProfileGit.jsx";
import ProfilAyarlari from "./containers/ProfilAyarlari/ProfilAyarlari.jsx";
import GonderiIcerigi from "./containers/GonderiIcerigi/GonderiIcerigi.jsx";
import AnketlerimGenel from "./containers/AnketlerimGenel/AnketlerimGenel.jsx";
import Anketlerim from "./components/Anketlerim/Anketlerim.jsx";
import AnketOlustur from "./components/AnketOlustur/AnketOlustur.jsx";
import AnketKesfet from "./components/AnketKesfet/AnketKesfet.jsx";
import SifremiUnuttum from "./containers/SifremiUnuttum/SifremiUnuttum.jsx";
import { GlobalProvider } from "./GlobalProvider";
import PageNotFound from "./containers/PageNotFound/PageNotFound.jsx";
import Mesajlasma from "./containers/Mesajlasma/Mesajlasma.jsx";
import SolMenu from "./containers/SolMenu/SolMenu.jsx";

function AppContent() {
  const location = useLocation();

  // Görünmesini istemediğin sayfalar burada
  const hideSidebarAndMessages = [
    "/girisYap",
    "/kayitOl",
    "/sifremiUnuttum",
    "/mailOnay",
  ].includes(location.pathname);

  return (
    <>
      {!hideSidebarAndMessages && <Mesajlasma />}
      {!hideSidebarAndMessages && <SolMenu />}
      <Routes>
        <Route path="/" element={<Navigate to="/girisYap" />} />
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
        <Route path="/anketlerim/anketlerimiGor" element={<Anketlerim />} />
        <Route path="/anketlerim/anketOlustur" element={<AnketOlustur />} />
        <Route path="/anketlerim/anketOnerileri" element={<AnketKesfet />} />
        <Route path="/sifremiUnuttum" element={<SifremiUnuttum />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalProvider>
  );
}

export default App;
