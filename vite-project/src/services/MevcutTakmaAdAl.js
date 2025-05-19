export const jwtTakmaAdAl = () => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("Token bulunamadi");
      return null;
    }
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.takmaAd;
  } catch (e) {
    console.log("JWT decode hatasi:", e);
    return null;
  }
};
