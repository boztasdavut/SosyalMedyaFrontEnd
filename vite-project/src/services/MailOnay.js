export const mailOnay = async (email, otp) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/verify-otp?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Hata: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OTP doğrulama hatası:", error);
    return null;
  }
};
