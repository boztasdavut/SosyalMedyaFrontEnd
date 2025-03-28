export const mailOnay = async (email, otp) => {
  console.log("Email= " + email);
  console.log("Otp= " + otp);
  console.log("OTP type= " + typeof otp);
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/verify-otp?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Hata: ${response.status}`);
    }

    const data = await response.status;
    return data;
  } catch (error) {
    console.error("OTP doğrulama hatası:", error);
    return null;
  }
};
