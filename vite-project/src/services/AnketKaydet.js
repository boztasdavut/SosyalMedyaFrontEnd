export const anketiKaydet = async (anketObjesi) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("https://bitirmeproje.xyz/api/anketler/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(anketObjesi),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("JWT dogrulama basarisiz");
      console.log(errorText);
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    const responseData = await response.json();
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
