import React from 'react'
import "./HesapOlusturYonlendir.css";
import { Link } from 'react-router-dom';

function HesapOlusturYonlendir() {
  return (
    <div className='hesapOlusturYonlendirAnaDiv'>
      <Link id='hesapOlusturYonlendir' to="/">Eğer hesabınız yoksa, hemen aramıza katılın!</Link>
    </div>
  )
}

export default HesapOlusturYonlendir
