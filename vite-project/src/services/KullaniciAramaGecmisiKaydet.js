export const aramaGecmisiKaydet = async (aramaGecmisi) => {
  try {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch("https://bitirmeproje.xyz/api/arama/yeni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(aramaGecmisi),
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
