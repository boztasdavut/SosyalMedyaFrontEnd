import React, { useEffect, useState } from "react";
import "./AnasayfaGonderiler.css";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { gonderiBegen } from "../../services/GonderiBegen";
import { begeniKaldir } from "../../services/GonderidenBegeniKaldir";

function AnasayfaGonderiler({
  takipEdilenlerinTumGonderileri,
  setTakipEdilenlerinGonderileri,
}) {
  const birGonderiyiBegen = async (gonderiId) => {
    const gonderi = takipEdilenlerinTumGonderileri.find(
      (g) => g.gonderiId === gonderiId
    );

    if (!gonderi) return;

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

  return (
    <div>
      <div>
        {takipEdilenlerinTumGonderileri.map((gonderi) => (
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
    </div>
  );
}

export default AnasayfaGonderiler;
