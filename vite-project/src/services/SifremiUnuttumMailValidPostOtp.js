export const sifremiUnuttumMailValidPostOtp = async (email, otp) => {
  try {
    const response = await fetch(
      `https://bitirmeproje.xyz/api/user/sifre-dogrula?email=${email}&otp=${otp}`,
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
