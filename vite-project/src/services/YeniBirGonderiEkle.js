export const kullaniciYeniGonderiEkle = async (gonderiBilgileri) => {
  try {
    const response = await fetch("https://bitirmeproje.xyz/api/gonderi/ekle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(gonderiBilgileri),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    const responseData = await response.text();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
  }
};
