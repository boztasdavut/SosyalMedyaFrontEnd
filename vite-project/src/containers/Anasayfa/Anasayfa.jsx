import React, { useState } from "react";
import "./Anasayfa.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

function Anasayfa() {
  const [mesajlasmaKutusuAcikMi, setMesajlasmaKutusuAcikMi] = useState(false);
  const handleClickMesajlasma = () => {
    setMesajlasmaKutusuAcikMi(!mesajlasmaKutusuAcikMi);
  };
  return (
    <div>
      <div className="solMenu">
        <div>
          <GrHomeRounded size={50} />
        </div>
        <div>
          <IoSearchOutline size={50} />
        </div>
        <div>
          <BiMessageRoundedDetail size={50} />
        </div>
        <div>
          <IoSettingsOutline size={50} />
        </div>
        <div>
          <FaRegCircle size={50} />
        </div>
      </div>
      <div className="mesajlasmaAnaDiv">
        {mesajlasmaKutusuAcikMi ? (
          <div onClick={handleClickMesajlasma} className="mesajKutusuAcikDurum">
            <div className="mesajKutusuAcikBaslikVeIcon">
              <div>Mesajlarım</div>
              <div>
                <MdOutlineKeyboardDoubleArrowDown size={50} />
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClickMesajlasma}
            className="mesajKutusuKapaliDurum"
          >
            <div>Mesajlar</div>
            <div>
              <MdOutlineKeyboardDoubleArrowUp size={50} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Anasayfa;
