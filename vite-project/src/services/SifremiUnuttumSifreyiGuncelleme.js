export const sifremiUnuttumSifreyiGuncelleme = async (email, sifre) => {
  try {
    console.log("Servis e posta adresi=", email);
    console.log("Sifre bilgisi= ", sifre);
    const response = await fetch(
      `https://bitirmeproje.xyz/api/user/yeni-sifre-belirle?email=${email}&yeniSifre=${sifre}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata: ${response.status} - ${errorText}`);
    }
    return await response.text();
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
