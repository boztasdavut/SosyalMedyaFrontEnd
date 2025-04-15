import React from "react";
import "./SolMenu.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SolMenu() {
  const navigate = useNavigate();
  const profilYonlendir = () => {
    navigate("/profilim");
  };
  const anasayfaYonlendir = () => {
    navigate("/anasayfa");
  };
  return (
    <div>
      <div className="solMenu">
        <div onClick={anasayfaYonlendir}>
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
        <div onClick={profilYonlendir}>
          <FaRegCircle size={50} />
        </div>
      </div>
    </div>
  );
}

export default SolMenu;
