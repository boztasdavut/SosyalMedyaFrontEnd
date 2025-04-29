export const anasayfa = async () => {
  try {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch("https://bitirmeproje.xyz/home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("JWT dogrulama basarisiz");
      console.log(errorText);
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
