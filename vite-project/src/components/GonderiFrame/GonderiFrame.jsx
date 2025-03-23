import React, { useEffect, useState } from 'react'
import "./GonderiFrame.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiFillLike} from "react-icons/ai";

function GonderiFrame({veriler, totalBegeniSayisi}) {
    
    
  return (
    <div className='gonderiFrameAnaDiv'>
        {
            veriler.map((veri)=>(
                <div key={veri.gonderiId} className='gonderiFrame'>
                    <p id='kullaniciTakmaAdP'>{veri.takipEdilenKullaniciTakmaAd }</p>
                    <p id='gonderilerP'>{veri.gonderiIcerigi}</p>
                    <div className='gonderiIcons'>
                        <div onClick={()=>{console.log(totalBegeniSayisi)}}>
                            {veri.begenildiMi ? <AiFillLike color="red" /> : <AiOutlineLike />}
                            <sub >{totalBegeniSayisi[veri.gonderiId]}</sub>
                        </div>
                        
                        <div>
                            <FaRegComment />
                            <sub>12</sub>
                        </div> 
                    </div>

                </div>
                
            ))
        }
    </div>
  )
}

export default GonderiFrame
