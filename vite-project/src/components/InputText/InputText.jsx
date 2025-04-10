import React from "react";
import "./InputText.css";

function InputText({ placeholder, type, inputValue, setInputValue }) {
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input
        className="textInputArea"
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputText;
