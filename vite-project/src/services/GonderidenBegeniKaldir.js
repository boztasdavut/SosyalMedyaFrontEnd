export const begeniKaldir = async(gonderi_id)=>{
    try {
        const response = await fetch(
          `https://bitirmeproje.xyz/api/gonderiBegeni/${gonderi_id}/begeni-kaldir`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
        }
        const responseData = await response.text();
        return responseData;
      } catch (err) {
        console.error("İstek hatası:", err);
      }
}