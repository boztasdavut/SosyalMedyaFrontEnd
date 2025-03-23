import React, { useEffect, useState } from 'react';
import SolMenuProfil from '../../components/SolMenuProfil/SolMenuProfil';
import SolMenuArama from '../../components/SolMenuArama/SolMenuArama';
import SolMenuAnasayfa from '../../components/SolMenuAnasayfa/SolMenuAnasayfa';
import SolMenuAyarlar from '../../components/SolMenuAyarlar/SolMenuAyarlar';
import "./SabitSolMenu.css";
import {anasayfa} from "../../services/Anasayfa";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

function SabitSolMenu() {
  const[menuDurumu, setMenuDurumu] = useState(false);
  
  const handleMenu = () =>{
    setMenuDurumu(!menuDurumu);
  }

  return (

        menuDurumu ? (
          <div className="sabitSolMenuAnaDiv">
            <div className="sabitSolMenu">
              <SolMenuAnasayfa />
              <SolMenuProfil />
              <SolMenuArama />
              <SolMenuAyarlar />
            </div>
            <div onClick={handleMenu}>
              <MdArrowBackIos  color='white' size={30} />
            </div>
          </div>
        ) : (
          <div className='menuSagArrowAnaDiv' onClick={handleMenu}>
            <div className='menuSagArrowDiv'>
              <MdArrowForwardIos id='menuKapatButonu' color='white' size={30} />
            </div>
          </div>
        )
        
        
      
  );
}

export default SabitSolMenu;
