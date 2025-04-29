export const birKullaniciyaMesajGonder = async (
  mesajIcerigi,
  mesajGonderilenKullaniciId
) => {
  try {
    const jwt = localStorage.getItem("jwt");
    console.log("mesajGondermede gelen JWT= ", jwt);
    console.log("Mesaj icerigi= ", mesajIcerigi);
    console.log(
      "Gonderilen kullanici id bilgisi= ",
      mesajGonderilenKullaniciId
    );
    const response = await fetch("https://bitirmeproje.xyz/api/mesaj/gönder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        mesajIcerigi,
        mesajGonderilenKullaniciId,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.log("Jwt dogrulama basarisiz.");
      console.log(errorText);
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    console.log("JWT Dogrulama basarili");
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log("Bir hata meydana geldi", err);
    throw err;
  }
};
