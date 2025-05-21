export const sifremiUnuttumMailValid = async (email) => {
  try {
    console.log("Metota gelen mail= ", email);
    console.log(
      `https://bitirmeproje.xyz/api/user/sifre-sifirla?email=${email}`
    );
    const response = await fetch(
      `https://bitirmeproje.xyz/api/user/sifre-sifirla?email=${email}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata: ${response.status} - ${errorText}`);
    }
    return await response.text();
  } catch (err) {
    console.error("İstek hatası:", err);
    throw err;
  }
};
