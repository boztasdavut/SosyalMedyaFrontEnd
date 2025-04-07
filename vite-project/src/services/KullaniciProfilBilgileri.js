export const kullaniciProfilBilgileri = async () => {
    try {
        const response = await fetch("https://bitirmeproje.xyz/api/user/me", {
            method: "GET",
            credentials: "include", // ✅ Doğru Kullanım
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Hata mesajı: ${response.status} - ${JSON.stringify(errorText)}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (err) {
        console.error("İstek hatası:", err);
    }
};
