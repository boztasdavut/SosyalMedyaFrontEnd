export const ikiKullaniciArasindakiMesajlar = async (karsiTarafId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const apiUrl = `https://bitirmeproje.xyz/api/mesaj/sohbet/${karsiTarafId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    throw new Error(`Bir hata meydana geldi= ${err}`);
  }
};
