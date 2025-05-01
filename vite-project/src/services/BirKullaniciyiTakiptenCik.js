export const birKullaniciyiTakiptenCik = async (takipEdilenId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      `https://bitirmeproje.xyz/api/follows/takibi-bırakma?takipEdilenId=${takipEdilenId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }
    const responseData = await response.text();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
  }
};
