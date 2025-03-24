export const logout = async() =>{
    try{
        const response = await fetch("http://localhost:8080/api/auth/logout",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",
        })
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Hata mesajı: ${response.status} - ${errorText}`);
        }
        else{
            const responseData = await response.text();
            return responseData;
        }
        
    }
    
    catch(err){
        console.error("İstek hatası:", err);
        throw err;
    }
}