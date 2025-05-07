export const birYorumdanBegeniKaldir = (yorumId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = fetch(
      `https://bitirmeproje.xyz/api/yorumBegeniler/${yorumId}/begeni-kaldir`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
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
  }
};
