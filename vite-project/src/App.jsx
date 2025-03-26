import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnasayfaPage from "./containers/AnasayfaPage/AnasayfaPage";
import "./App.css";
import SifremiUnuttum from "./containers/SifremiUnuttumPage/SifremiUnuttumPage";
import MailOnay from "./components/MailOnay/MailOnay";

function App() {
  
  


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/anasayfa" element={<AnasayfaPage />} />
          <Route path="/sifremiUnuttum" element={<SifremiUnuttum />} />
          <Route path="/mailOnay" element={<MailOnay />} />
        </Routes>
      </BrowserRouter>

      
    </>
  )
}

export default App
