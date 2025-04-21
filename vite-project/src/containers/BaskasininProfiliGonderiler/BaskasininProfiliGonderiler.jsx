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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <ClipLoader color="#4a90e2" size={40} />
        </div>
      ) : (
        <div>
          {baskasininProfiliBilgileri?.gonderiler?.map((gonderi) => (
            <div key={gonderi.gonderiId} className="gonderCardDiv">
              <div className="profilimProfilResmiVeTakmaAdDiv">
                <div>
                  <div>
                    <img
                      src={baskasininProfiliBilgileri.kullaniciProfilResmi}
                    />
                  </div>
                  <div>@{gonderi.kullaniciTakmaAd}</div>
                </div>
                <div>
                  <PiDotsThreeOutlineThin />
                </div>
              </div>
              <div className="profilimGonderiIcerigi">
                {gonderi.gonderiIcerigi}
              </div>
              <div className="profilimGonderiAksiyonlariDiv">
                <div
                  onClick={() => birGonderiyiBegen(gonderi.gonderiId)}
                  className="profilimBegenmeButonu"
                >
                  {gonderi.begenildiMi ? (
                    <IoIosHeart size={30} color="red" />
                  ) : (
                    <IoIosHeartEmpty size={30} />
                  )}
                  <span>{gonderi.begeniSayisi}</span>
                </div>
                <div className="profilimYorumButonu">
                  <GoComment size={25} />
                </div>
                <div className="profilimGondermeButonu">
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
