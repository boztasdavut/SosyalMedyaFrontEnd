import React, { useEffect, useRef, useState } from "react";
import "./MailOnay.css";
import { register } from "../../services/Register";
import { useLocation } from "react-router-dom";

function MailOnay() {
  const locationState = useLocation();
  const kullaniciBilgileri = locationState.state;

  useEffect(() => {
    console.log("Kullanici Bilgileri", kullaniciBilgileri);
    const donenVeri = register(kullaniciBilgileri);
  }, [kullaniciBilgileri]);

  const inputRefs = useRef([]);
  const [values, setValues] = useState(Array(6).fill(""));

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (!/^\d{1,6}$/.test(pasteData)) return;

    const newValues = pasteData.split("").slice(0, 6);
    setValues(newValues);

    newValues.forEach((val, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = val;
      }
    });

    if (inputRefs.current[newValues.length]) {
      inputRefs.current[newValues.length].focus();
    }
  };

  return (
    <div className="anaDiv">
      <div className="baslikVeKutucuklarDiv">
        <h1 className="validasyonBaslik">
          E-Posta Adresinize Gelen Kodu Giriniz
        </h1>
        <div className="validasyonKutucuguAnaDiv">
          {values.map((val, index) => (
            <div className="validasyonKutucugu" key={index}>
              <input
                className="inputKutucuk"
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={val}
                onChange={(e) => handleInputChange(e, index)}
                onPaste={handlePaste}
              />
            </div>
          ))}
        </div>
        <div>
          <button className="validasyonOnayButton">Onayla</button>
        </div>
      </div>
    </div>
  );
}

export default MailOnay;
