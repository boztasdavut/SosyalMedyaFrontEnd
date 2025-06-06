export const kullanicininTumTakipcileriniGetir = async () => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/follows/takipciler",
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
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
  }
};
