export const login = async (kullaniciData) => {
  try {
    const response = await fetch("https://bitirmeproje.xyz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kullaniciData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    const responseData = await response.text();
    if (responseData) {
      localStorage.setItem("jwt", responseData);
      return responseData;
    } else {
      console.warn("Sunucudan JWT alinmadi");
    }
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
