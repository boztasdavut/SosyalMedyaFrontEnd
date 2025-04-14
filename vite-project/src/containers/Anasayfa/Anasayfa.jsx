import React, { useEffect, useState, useRef } from "react";
import "./Anasayfa.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import { anasayfa } from "../../services/Anasayfa";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { gonderiBegen } from "../../services/GonderiBegen";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir";
import Mesajlasma from "../Mesajlasma/Mesajlasma";

function Anasayfa() {
  const [takipEdilenlerinGonderiler, setTakipEdilenlerinGonderileri] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const anasayfaApiIstegi = async () => {
      try {
        const gelenVeri = await anasayfa();
        setTakipEdilenlerinGonderileri(gelenVeri);
      } catch (error) {
        if (error.message.includes("401")) {
          navigate("/girisYap");
        }
      } finally {
        setIsLoading(false);
      }
    };

    anasayfaApiIstegi();
  }, []);

  const birGonderiyiBegen = async (gonderiId) => {
    const gonderi = takipEdilenlerinGonderiler.find(
      (item) => item.gonderiId === gonderiId
    );

    if (gonderi.begenildiMi === false) {
      const gelenVeri = await gonderiBegen(gonderiId);
      if (gelenVeri === "Beğeni eklendi!") {
        setTakipEdilenlerinGonderileri((prevGonderiler) =>
          prevGonderiler.map((gonderi) =>
            gonderi.gonderiId === gonderiId
              ? {
                  ...gonderi,
                  begenildiMi: true,
                  begeniSayisi: gonderi.begeniSayisi + 1,
                }
              : gonderi
          )
        );
      }
    } else {
      await begeniKaldir(gonderiId);
      setTakipEdilenlerinGonderileri((prevGonderiler) =>
        prevGonderiler.map((gonderi) =>
          gonderi.gonderiId === gonderiId
            ? {
                ...gonderi,
                begenildiMi: false,
                begeniSayisi: gonderi.begeniSayisi - 1,
              }
            : gonderi
        )
      );
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <RingLoader color="#3498db" loading={true} size={50} />
      </div>
    );
  }

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

      <div>
        {takipEdilenlerinGonderiler.map((gonderi) => (
          <div key={gonderi.gonderiId} className="gonderCardDiv">
            <div className="profilResmiVeTakmaAdDiv">
              <div>Profil Resmi</div>
              <div>@{gonderi.takipEdilenKullaniciTakmaAd}</div>
            </div>
            <div className="gonderiIcerigi">{gonderi.gonderiIcerigi}</div>
            <div className="gonderiAksiyonlariDiv">
              <div
                onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                className="begenmeButonu"
              >
                {gonderi.begenildiMi ? (
                  <IoIosHeart size={30} color="red" />
                ) : (
                  <IoIosHeartEmpty size={30} />
                )}
                <span>{gonderi.begeniSayisi}</span>
              </div>
              <div className="yorumButonu">
                <GoComment size={25} />
              </div>
              <div className="gondermeButonu">
                <BsSend size={25} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Mesajlasma />
    </div>
  );
}

export default Anasayfa;
