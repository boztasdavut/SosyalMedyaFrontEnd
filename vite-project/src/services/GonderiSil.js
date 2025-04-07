export const belirtilenGonderiyiSil = async(gonderiId) =>{
    try{
        const response = await fetch(`https://bitirmeproje.xyz/api/gonderi/sil/${gonderiId}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",
        })
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
        }
        const responseData = await response.text();
        return responseData;
    }
    catch(err){
        console.error("İstek hatası:", err);
    }
}