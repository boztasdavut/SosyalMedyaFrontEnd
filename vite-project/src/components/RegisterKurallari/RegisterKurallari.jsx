import React, { useState } from "react";
import "./RegisterKurallari.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

function RegisterKurallari() {
  const [modalAcik, setModalAcik] = useState(false);

  return (
    <div className="registerKurallariAnaDiv">
      <IoInformationCircleOutline size={10} />

      <button className="kural-buton" onClick={() => setModalAcik(true)}>
        Kayıt Kuralları
      </button>

      {modalAcik && (
        <div className="modal-overlay" onClick={() => setModalAcik(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Kayıt Olma Kuralları</h2>
            <ul>
              <li><FaRegCheckCircle /> Geçerli bir e-posta adresi girilmelidir.</li>
              <li><FaRegCheckCircle /> Takma ad en az 5 karakterden oluşmalı ve özel karakter içermemelidir.</li>
              <li><FaRegCheckCircle /> Şifre en az 6 karakter olmalı ve en az 1 rakam ve 1 adet özel karakter içermelidir.</li>
              <li><FaRegCheckCircle /> Kayıt olmak için 18 yaşından büyük olmalısınız.</li>
              <li><FaRegCheckCircle /> Telefon numarası geçerli bir formatta olmalıdır.</li>
            </ul>
            <button className="kapat-buton" onClick={() => setModalAcik(false)}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterKurallari;
