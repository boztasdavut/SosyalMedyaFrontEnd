import React, { useEffect } from 'react'
import "./MailOnay.css";
import {register} from "../../services/Register";

function MailOnay(kullaniciBilgileri) {
    useEffect(()=>{
        console.log("Debugging",kullaniciBilgileri);
        const donenVeri = register(kullaniciBilgileri);
    },[])


  return (
    <div className='validasyonKoduAnaDiv'>
      <div className='baslikVeKutucuklarDiv'>
        <h1 className='validasyonBaslik'>E-Posta Adresinize Gelen Kodu Giriniz</h1>
        <div className='validasyonKutucuguAnaDiv'>
          <div className='validasyonKutucugu'>
            <input className='inputKutucuk' type="text" maxLength={1} />
          </div>
          <div className='validasyonKutucugu'>
            <input className='inputKutucuk' type="text" maxLength={1} />
          </div>
          <div className='validasyonKutucugu'>
            <input className='inputKutucuk' type="text" maxLength={1} />
          </div>
          <div className='validasyonKutucugu'>
            <input className='inputKutucuk' type="text" maxLength={1} />
          </div>
          <div className='validasyonKutucugu'>
            <input className='inputKutucuk' type="text" maxLength={1} />
          </div>
          <div className='validasyonKutucugu'>
            <input className='inputKutucuk' type="text" maxLength={1} />
          </div>
        </div>
        <div>
          <button className='validasyonOnayButton'>Onayla</button>
        </div>
      </div>
      
    </div>
  )
}

export default MailOnay
