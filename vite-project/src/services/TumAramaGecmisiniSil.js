export const tumAramaGecmisiniSil = async () => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/arama/tum-aramagecmisi-sil",
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
    const responseData = response.text();
    return responseData;
  } catch (err) {
    console.log("Bir hata meydana geldi= ", err);
  }
};
