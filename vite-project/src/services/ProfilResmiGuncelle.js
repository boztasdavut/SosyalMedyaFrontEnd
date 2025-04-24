export const profilResmiGuncelle = async (formData) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/user/profil-resmi-degistir",
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }

    const responseData = (await response).text();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
