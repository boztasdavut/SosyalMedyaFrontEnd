export const birAnketiSil = async (anketId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(
      `https://bitirmeproje.xyz/api/anketler/delete/${anketId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData.message || "Silme işlemi başarısız.");
    }

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
