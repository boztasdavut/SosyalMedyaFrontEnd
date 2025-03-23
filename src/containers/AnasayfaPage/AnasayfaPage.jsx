import React, { useEffect, useState } from 'react'
import SabitSolMenu from '../SabitSolMenu/SabitSolMenu'
import GonderiFrame from '../../components/GonderiFrame/GonderiFrame'
import { anasayfa } from '../../services/Anasayfa';
import "./AnasayfaPage.css";
import Message from '../../components/Message/Message';
import { totalBegeniApi } from '../../services/GonderiTotalBegeniSayisi';
function AnasayfaPage() {
    const[gelenVeriler, setGelenVeriler] = useState([]);
    const[totalBegeniler, setTotalBegeniler] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const veriler = await anasayfa();
            setGelenVeriler(veriler);
        }
        const fetchBegeniSayisi = async()=>{
          const begeniSayisi = await totalBegeniApi();
          setTotalBegeniler(begeniSayisi);
        }
        fetchData();
        fetchBegeniSayisi();

    },[])
  return (
    <div className='anasayfaPageAnaDiv'>
      <SabitSolMenu />
      <GonderiFrame veriler={gelenVeriler} totalBegeniSayisi={totalBegeniler} />
      <Message /> 
    </div>
  )
}

export default AnasayfaPage
