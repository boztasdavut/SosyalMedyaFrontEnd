export const kullanicininTumGonderileri = async () => {
  try {
    const response = await fetch(
      "https://bitirmeproje.xyz/api/gonderi/kullanici/gonderiler",
      {
        method: "GET",

        credentials: "include",
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
  }
};
