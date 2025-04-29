export const ePostaGuncelle = async (degisimBilgileri) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/user/eposta-degistir",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(degisimBilgileri),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    const responseData = await response.text();
    return responseData;
  } catch (err) {
    throw err;
  }
};
