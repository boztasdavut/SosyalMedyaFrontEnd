import React from "react";
import "./TextButton.css";

function TextButton({ butonAdi, label }) {
  return (
    <div className="textButtonAnaDiv">
      <label htmlFor="">
        <span>{label}</span>
        <button className="textButtonArea">{butonAdi}</button>
      </label>
    </div>
  );
}

export default TextButton;
