import React, { useState, useEffect, useRef } from 'react';
import { BiSolidMessageAltDetail } from "react-icons/bi";
import "./Message.css";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

function Message() {
  const [modal, setModal] = useState(false);

  const modalOpenAndClose = () => {
    setModal(!modal);
  };


  return modal ? (
    <div className='messageContent'>
      <div className='messageAndArrowOpen'>
        <div>
          <BiSolidMessageAltDetail />
        </div>
        <div>
          Mesajlarım
        </div>
        <div>
          <MdOutlineKeyboardDoubleArrowDown id='mesajKapatOku' onClick={modalOpenAndClose} />
        </div>
      </div>
      <div>
        <p>Mesaj 1</p>
      </div>
      <div>
        <p>Mesaj 2</p>
      </div>
      <div>
        <p>Mesaj 3</p>
      </div>
      
    </div>
    ) : (
    <div className='messageIcon'  onClick={modalOpenAndClose}> 
      <div>
        Mesajlarım
      </div>
      <div>
        <BiSolidMessageAltDetail />
      </div>
      <div>
        <MdOutlineKeyboardDoubleArrowUp />
      </div>
    </div>
  );
}

export default Message;