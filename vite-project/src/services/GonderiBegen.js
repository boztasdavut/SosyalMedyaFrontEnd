export const gonderiBegen = async (gonderi_id) => {
  try {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch(
      `https://bitirmeproje.xyz/api/gonderiBegeni/${gonderi_id}/begeni`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        credentials: "include",
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
