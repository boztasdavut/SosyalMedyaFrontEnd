export const birGonderiyeYorumYap = async (yorumBilgisi) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("https://bitirmeproje.xyz/api/yorum/ekle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(yorumBilgisi),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.log("JWT dogrulama basarisiz");
      console.log(errorText);
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    const responseData = await response.text();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
