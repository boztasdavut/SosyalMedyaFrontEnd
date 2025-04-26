export const gonderiPaylas = async (icerik, mediaFile) => {
  // video için  => VIDEO
  // resim için => FOTO
  // sadece yazı için => YAZI
  const jwt = localStorage.getItem("jwt");
  const formData = new FormData();
  formData.append("gonderiIcerigi", icerik);
  formData.append("gonderiMedyaUrl", mediaFile);
  console.log("Servis media= ", mediaFile);
  console.log("sadece dosya ismi servis media= ", mediaFile.name);

  if (
    mediaFile.name.endsWith(".jpg") ||
    mediaFile.name.endsWith(".png") ||
    mediaFile.name.endsWith(".jpeg")
  ) {
    formData.append("gonderiMedyaTuru", "FOTO");
  } else if (mediaFile.name.endsWith(".mp4")) {
    formData.append("gonderiMedyaTuru", "VIDEO");
  } else {
    formData.append("gonderiMedyaTuru", "YAZI");
  }

  const response = await fetch("https://bitirmeproje.xyz/api/gonderi/ekle", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hata: ${response.status} - ${errorText}`);
  }

  return await response.text();
};
