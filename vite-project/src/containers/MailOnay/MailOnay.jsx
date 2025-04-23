import React, { useRef, useState } from "react";
import "./MailOnay.css";
import { mailOnay } from "../../services/MailOnay.js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MailOnay() {
  const inputRefs = useRef([]);
  const location = useLocation();
  const [girilenKod, setGirilenKod] = useState("");
  const navigate = useNavigate();

  const updateCodeState = () => {
    const kod = inputRefs.current.map((input) => input.value).join("");
    setGirilenKod(kod);
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // sadece sayı/harf
    if (!/^[0-9a-zA-Z]$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    updateCodeState();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);

    [...pasteData].forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char;
      }
    });

    const next = inputRefs.current[pasteData.length];
    if (next) next.focus();

    updateCodeState();
  };

  const mailOnayHandle = async () => {
    console.log("mail adresi = ", location.state?.ePosta);
    console.log("girilen kod = ", girilenKod);

    if (girilenKod.length === 6) {
      try {
        const gelenVeri = await mailOnay(location.state?.ePosta, girilenKod);
        console.log("Gelen veri = ", gelenVeri);
        navigate("/girisYap");
      } catch (err) {
        console.error("Kod doğrulama hatası:", err);
        toast.error("Yanlış Onay Kodu");
      }
    } else {
      alert("Lütfen 6 haneli kodu giriniz.");
    }
  };

  return (
    <div className="mailOnayAnaDiv">
      <h3>Onay Kodunu Giriniz</h3>
      <div className="kodKutucuklariAnaDiv">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="kodInput"
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div>
        <button onClick={mailOnayHandle} id="mailOnaylamaButonu">
          Onayla
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default MailOnay;
