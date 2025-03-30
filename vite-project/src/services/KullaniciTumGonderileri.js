export const tumGonderiler = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/gonderi/kullanici/gonderiler",
      {
        method: "GET",

        credentials: "include",
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error("İstek hatası:", err);
  }
};
