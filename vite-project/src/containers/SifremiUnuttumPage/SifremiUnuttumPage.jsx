import React from 'react'
import "./SifremiUnuttumPage.css";

function SifremiUnuttum() {
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

export default SifremiUnuttum
