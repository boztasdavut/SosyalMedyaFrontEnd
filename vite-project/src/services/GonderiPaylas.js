export const gonderiPaylas = async (icerik, mediaFile) => {
  const jwt = localStorage.getItem("jwt");
  const formData = new FormData();

  formData.append("gonderiIcerigi", icerik);

  if (mediaFile) {
    formData.append("gonderiMedyaUrl", mediaFile);

    const ext = mediaFile.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png"].includes(ext)) {
      formData.append("gonderiMedyaTuru", "FOTO");
    } else if (ext === "mp4") {
      formData.append("gonderiMedyaTuru", "VIDEO");
    } else {
      throw new Error("Desteklenmeyen medya türü");
    }
  } else {
    formData.append("gonderiMedyaTuru", "YAZI");
    // mediaFile olmadığı için gonderiMedyaUrl eklenmiyor
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
