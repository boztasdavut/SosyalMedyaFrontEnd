import React, { useEffect, useState } from "react";
import "./BaskasininProfiliGonderiler.css";
import { ClipLoader } from "react-spinners";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { BsSend } from "react-icons/bs";

function BaskasininProfiliGonderiler({ baskasininProfiliBilgileri }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [baskasininProfiliBilgileri]);

  return (
    <div>
      {isLoading ? (
        <div className="gonderi-loading">
          <ClipLoader color="#4a90e2" size={40} />
        </div>
      ) : (
        <div>
          {baskasininProfiliBilgileri?.gonderiler?.map((gonderi) => (
            <div key={gonderi.gonderiId} className="gonderi-karti">
              <div className="gonderi-baslik">
                <div className="gonderi-kullanici">
                  <img
                    className="gonderi-profil-resmi"
                    src={baskasininProfiliBilgileri.kullaniciProfilResmi}
                    alt="Profil"
                  />
                  <div className="gonderi-takma-ad">
                    @{gonderi.kullaniciTakmaAd}
                  </div>
                </div>
                <div className="gonderi-menusu">
                  <PiDotsThreeOutlineThin />
                </div>
              </div>
              <div className="gonderi-icerik">{gonderi.gonderiIcerigi}</div>
              <div className="gonderi-aksiyonlar">
                <div
                  onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                  className="gonderi-begen"
                >
                  {gonderi.begenildiMi ? (
                    <IoIosHeart size={30} color="red" />
                  ) : (
                    <IoIosHeartEmpty size={30} />
                  )}
                  <span>{gonderi.begeniSayisi}</span>
                </div>
                <div className="gonderi-yorum">
                  <GoComment size={25} />
                </div>
                <div className="gonderi-paylas">
                  <BsSend size={25} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BaskasininProfiliGonderiler;
