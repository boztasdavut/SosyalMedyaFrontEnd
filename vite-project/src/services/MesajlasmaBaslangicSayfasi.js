export const mesajBaslangicSayfasi = async() =>{
    try{
        const response = await fetch("https://bitirmeproje.xyz/api/mesaj/getAllMessages",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",
        })
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
        }
        
        const responseData = await response.json();
        return responseData;
    }
    
    catch(err){
        console.error("İstek hatası:", err);
    }
}