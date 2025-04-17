export const kullanicininTumGonderileriniGetir = async () => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/gonderi/kullanici/gonderiler",
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
      console.log("ErrorText");
      console.log(response.status);
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    console.log("JWT dogrulama basarili.");
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    console.log("İstek hatasi: ", e);
    throw e;
  }
};
