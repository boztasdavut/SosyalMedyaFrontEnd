export const jwtDecode = async () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    throw new Error("Token Bulunamadi.");
  }
  const parts = jwt.split(".");
  if (parts.length !== 3) {
    throw new Error("Geçersiz JWT Formati");
  }

  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload.userId ?? null;
    console.log("Kullanici id bilgisi= ", payload.userId);
  } catch (err) {
    console.log("JWT çözümleme hatası= ", err);
    return null;
  }
};
