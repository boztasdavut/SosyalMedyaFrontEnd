import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnasayfaPage from "./containers/AnasayfaPage/AnasayfaPage";
import Message from "./components/Message/Message";
import "./App.css";

function App() {
  
  


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/anasayfa" element={<AnasayfaPage />} />  
        </Routes>
      </BrowserRouter>

      
    </>
  )
}

export default App
