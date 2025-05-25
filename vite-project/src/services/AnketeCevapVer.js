export const anketeCevapVer = async(anketId, secenekId)=>{
    try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(`https://bitirmeproje.xyz/api/cevaplar/save/${anketId}/${secenekId}`, {
      method: "POST",
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
    const responseData = await response.text();
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
}