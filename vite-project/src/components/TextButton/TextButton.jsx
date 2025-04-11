import React from "react";
import "./TextButton.css";

function TextButton({ butonAdi, label, onClickMethod }) {
  return (
    <div className="textButtonAnaDiv">
      <label htmlFor="">
        <span>{label}</span>
        <button onClick={onClickMethod} className="textButtonArea">{butonAdi}</button>
      </label>
    </div>
  );
}

export default TextButton;
