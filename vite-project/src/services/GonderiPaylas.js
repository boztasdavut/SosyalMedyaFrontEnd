export const gonderiPaylas = async (icerik) => {
    const jwt = localStorage.getItem("jwt");
  
    const response = await fetch("https://bitirmeproje.xyz/api/gonderi/ekle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ gonderiIcerigi: icerik }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata: ${response.status} - ${errorText}`);
    }
  
    return await response.text();
  };
  