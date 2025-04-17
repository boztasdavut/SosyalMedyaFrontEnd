import React from "react";
import "./SolMenu.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function SolMenu() {
  const navigate = useNavigate();
  const profilYonlendir = () => {
    navigate("/profilim");
  };
  const anasayfaYonlendir = () => {
    navigate("/anasayfa");
  };
  const aramaYap = () => {
    navigate("/arama");
  };

  return (
    <div>
      <div className="solMenu">
        <div onClick={anasayfaYonlendir}>
          <GrHomeRounded size={50} />
        </div>
        <div>
          <IoSearchOutline onClick={aramaYap} size={50} />
        </div>
        <div>
          <BiMessageRoundedDetail size={50} />
        </div>
        <div>
          <IoSettingsOutline size={50} />
        </div>
        <div onClick={profilYonlendir}>
          <FaRegCircle size={50} />
        </div>
        <div>
          <CiLogout size={50} />
        </div>
      </div>
    </div>
  );
}

export default SolMenu;
