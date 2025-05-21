import React, { useEffect, useState } from "react";
import "./SifremiUnuttum.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { sifremiUnuttumMailValid } from "../../services/SifremiUnuttumMailValid.js";
import { sifremiUnuttumMailValidPostOtp } from "../../services/SifremiUnuttumMailValidPostOtp.js";
import { sifremiUnuttumSifreyiGuncelleme } from "../../services/SifremiUnuttumSifreyiGuncelleme.js";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputText from "../../components/InputText/InputText.jsx";
function SifremiUnuttum() {
  const [ePostaAdresi, setEPostaAdresi] = useState("");
  const [yeniSifre, setYeniSifre] = useState("");
  const [yeniSifreTekrar, setYeniSifreTekrar] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [hataMesaj, setHataMesaji] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const otpBilgisiniAl = async () => {
    const baseUrl = location.pathname;
    try {
      const gelenVeri = await sifremiUnuttumMailValid(ePostaAdresi);
      console.log("test");
      toast.success("Başarıyla Giriş Yapıldı", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          navigate(`${baseUrl}?step=2`);
        },
      });
    } catch (err) {
      toast.error("Bir Sorun Meydana Geldi.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const otpBilgisiniStateKaydet = (value, index) => {
    let tempValue = value;
    if (value.length > 1) {
      tempValue = value.charAt(0);
    }
    const tempArray = [...otp];
    tempArray[index] = tempValue;
    setOtp(tempArray);
  };

  const otpTotalBilgisiniAl = async () => {
    const baseUrl = location.pathname;
    const totalOtpTemp = otp.join("");
    if (totalOtpTemp.length === 6) {
      try {
        const gelenVeri = await sifremiUnuttumMailValidPostOtp(
          ePostaAdresi,
          totalOtpTemp
        );
        toast.success("Şifre Oluşturma Sayfasına Yönlendiriliyorsunuz...", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            navigate(`${baseUrl}?step=3`);
          },
        });
      } catch (err) {
        toast.error("Bir Sorun Meydana Geldi.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Eksik kod girişi yaptınız.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const yeniSifreValidasyon = async () => {
    let control = true;
    const baseUrl = location.pathname;

    if (yeniSifre.length < 5 || yeniSifreTekrar.length < 5) {
      toast.error("5 Karakterden Az Şifre Girilemez", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => {
          setYeniSifre("");
          setYeniSifreTekrar("");
        },
      });
      control = false;
    } else {
      if (yeniSifre === yeniSifreTekrar) {
        console.log("Şifreniz= ", yeniSifre);
        console.log("Şifreler aynı");
        try {
          const gelenVeri = await sifremiUnuttumSifreyiGuncelleme(
            ePostaAdresi,
            yeniSifre
          );
          toast.success(
            "Şifre Başarıyla Değiştirildi. Giriş Yap Sayfasına Yönlendiriliyorunuz...",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                navigate(`/girisYap`);
              },
            }
          );
        } catch (err) {
          toast.error("Şifreler Uyumlu Değil.", {
            position: "top-center",
            autoClose: 3000,
            onClose: () => {
              setYeniSifre("");
              setYeniSifreTekrar("");
            },
          });
        }
      } else {
        toast.error("Şifreler Uyumlu Değil.", {
          position: "top-center",
          autoClose: 3000,
          onClose: () => {
            setYeniSifre("");
            setYeniSifreTekrar("");
          },
        });
        control = false;
      }
    }
  };

  const girisYapSayfasinaGit = () => {
    navigate(`/girisYap`);
  };

  if (searchParams.get("step") === "1") {
    return (
      <div className="sifremiUnuttumAnaDiv">
        <ToastContainer />
        <div
          onClick={girisYapSayfasinaGit}
          className="sifremiUnuttumToAnasayfa"
        >
          Giriş Sayfasına Geri Dön
        </div>
        <div className="processAnaDiv">
          <div className="processKutuIlerlendiDiv"></div>
          <div className="processKutuBosDiv"></div>
          <div className="processKutuBosDiv"></div>
        </div>
        <div className="sifremiUnuttumKutucukDiv">
          <div className="sifremiUnuttumAciklama1">
            Adım 1: Sistemde Kayıtlı Olan E-Posta Adresinizi Girin
          </div>
          <div className="epostaInputDiv">
            <input
              id="epostaInputArea"
              type="text"
              placeholder="E-Posta Adresinizi Girin"
              value={ePostaAdresi}
              onChange={(e) => setEPostaAdresi(e.target.value)}
            />
          </div>
          <div className="sifremiUnuttumOtpGondermeDiv">
            <div onClick={otpBilgisiniAl} className="sifremiUnuttumbuttonDiv">
              Kodu Gönder
            </div>
          </div>
        </div>
      </div>
    );
  } else if (searchParams.get("step") === "2") {
    return (
      <div className="sifremiUnuttumAnaDiv">
        <ToastContainer />
        <div
          onClick={girisYapSayfasinaGit}
          className="sifremiUnuttumToAnasayfa"
        >
          Giriş Sayfasına Geri Dön
        </div>
        <div className="processAnaDiv">
          <div className="processKutuIlerlendiDiv"></div>
          <div className="processKutuIlerlendiDiv"></div>
          <div className="processKutuBosDiv"></div>
        </div>
        <div className="sifremiUnuttumKutucukDiv">
          <div className="sifremiUnuttumAciklama1">
            Adım 2: Mail Adresinize Gelen Onay Kodunu Girin
          </div>
          <div className="sifremiUnuttumOtpKutucuguAnaDiv">
            {otp.map((otp, index) => (
              <div key={index} className="sifremiUnuttumOtpKutucuguDiv">
                <input
                  value={otp}
                  onChange={(event) =>
                    otpBilgisiniStateKaydet(event.target.value, index)
                  }
                  className="sifremiUnuttumOtpKutucuInput"
                  type="text"
                />
              </div>
            ))}
          </div>
          <div className="sifremiUnuttumOtpGondermeDiv">
            <div
              onClick={otpTotalBilgisiniAl}
              className="sifremiUnuttumbuttonDiv"
            >
              Kodu Gönder
            </div>
          </div>
        </div>
      </div>
    );
  } else if (searchParams.get("step") === "3") {
    return (
      <div className="sifremiUnuttumAnaDiv">
        <ToastContainer />
        <div
          onClick={girisYapSayfasinaGit}
          className="sifremiUnuttumToAnasayfa"
        >
          Giriş Sayfasına Geri Dön
        </div>
        <div className="processAnaDiv">
          <div className="processKutuIlerlendiDiv"></div>
          <div className="processKutuIlerlendiDiv"></div>
          <div className="processKutuIlerlendiDiv"></div>
        </div>
        <div className="sifremiUnuttumKutucukDiv">
          <div className="sifremiUnuttumAciklama1">
            Adım 3: Yeni Şifrenizi Belirleyin
          </div>
          <div className="yeniSifreAnaDiv">
            <div className="yeniSifreLabel">Yeni Şifrenizi Girin</div>
            <div>
              <input
                value={yeniSifre}
                onChange={(e) => setYeniSifre(e.target.value)}
                id="yeniSifreGirInput"
                type="password"
              />
            </div>
          </div>
          <div className="yeniSifreAnaDiv">
            <div className="yeniSifreLabel">Şifrenizi Tekrar Girin</div>
            <div>
              <input
                value={yeniSifreTekrar}
                onChange={(e) => setYeniSifreTekrar(e.target.value)}
                id="yeniSifreGirInput2"
                type="password"
              />
            </div>
          </div>
          <div className="sifremiUnuttumOtpGondermeDiv">
            <div
              onClick={yeniSifreValidasyon}
              className="sifremiUnuttumbuttonDiv"
            >
              Yeni Şifreyi Oluştur
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SifremiUnuttum;
