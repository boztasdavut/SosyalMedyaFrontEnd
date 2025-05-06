export const belirliBirGonderiyiGetir = async (gonderiId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      `https://bitirmeproje.xyz/api/gonderi/aranan-gonderi/${gonderiId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    console.log("JWT dogrulama basarili.");
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
