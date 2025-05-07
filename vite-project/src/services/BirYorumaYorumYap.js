export const birYorumaYorumYap = async (yorumId, yorumIcerigiJson) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      `https://bitirmeproje.xyz/api/yorum/${yorumId}/yanit-ekle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(yorumIcerigiJson),
      }
    );
    if (!response.ok) {
      const errorText = response.text();
      console.log("JWT dogrulama basarisiz");
      console.log(errorText);
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    return response.text();
  } catch (err) {
    console.log("Bir hata meydana geldi= ", err);
    throw err;
  }
};
