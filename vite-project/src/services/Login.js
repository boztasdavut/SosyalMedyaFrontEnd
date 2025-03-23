export const login = async(kullaniciData)=>{
    try{
        const response = await fetch("http://localhost:8080/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",
            body: JSON.stringify(kullaniciData)
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
        throw err;
    }
}

