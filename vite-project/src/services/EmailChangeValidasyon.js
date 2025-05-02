export const emailChangeValidasyon = async (mailValidasyonJson) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      "https://bitirmeproje.xyz/api/user/validation/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(mailValidasyonJson),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata: ${response.status} - ${errorText}`);
    }
    return await response.text();
  } catch (err) {
    console.log("Bir hata meydana geldi= ", err);
    throw err;
  }
};
