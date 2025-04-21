export const aramaSonucuGetir = async (query) => {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    console.warn("JWT bulunamadı.");
    return [];
  }

  try {
    const response = await fetch(
      `https://bitirmeproje.xyz/api/user/arama?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("İstek hatası:", err);
    return [];
  }
};
