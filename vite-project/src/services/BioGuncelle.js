export const bioGuncelle = async (veri) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/user/kullanici-bilgi-yenile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ kullaniciBio: veri }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata: ${response.status} - ${errorText}`);
    }
    return await response.text();
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
