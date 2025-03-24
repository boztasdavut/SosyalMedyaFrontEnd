import React from 'react'
import "./SifremiUnuttum.css";
import { Link } from 'react-router-dom';

function SifremiUnuttum() {
  return (
    <div>
      <div className='sifremiUnuttumAnaDiv'>
        <Link id='sifremiUnuttumYonlendir' to="/sifremiUnuttum">Şifreni mi unuttun?</Link>
      </div>
    </div>
  )
}

export default SifremiUnuttum
