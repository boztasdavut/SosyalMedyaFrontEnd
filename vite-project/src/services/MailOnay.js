export const mailOnay = async (email, otp) => {
  console.log("Email= " + email);
  console.log("Otp= " + otp);
  console.log("OTP type= " + typeof otp);
  try {
    const response = await fetch(
      `https://bitirmeproje.xyz/api/auth/verify-otp?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Response ok degil: ${response.status}`);
    }

    const data = response.status;
    return data;
  } catch (error) {
    console.error("OTP doğrulama hatası:", error);
    throw new Error(`Response ok degil:`);
  }
};
