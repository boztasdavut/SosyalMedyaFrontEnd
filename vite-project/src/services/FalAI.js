import { fal } from "@fal-ai/client";

fal.config({
  credentials:
    "ce84f693-edca-45b0-a263-13a4ed07c06e:be6981e4785533ebb72f71e5e2d2aa48",
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const resimiGetir = async (girilenPrompt) => {
  try {
    console.log("Resim üretme fonksiyonuna girildi.");

    // 1. Prompt'u gönder ve request ID al
    const { request_id } = await fal.queue.submit(
      "fal-ai/sdxl-controlnet-union",
      {
        input: {
          prompt: girilenPrompt,
          openpose_image_url:
            "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
        },
      }
    );

    console.log("İstek gönderildi. Request ID:", request_id);

    // 2. Status kontrolü: tamamlanana kadar döngüde bekle
    let status = "PENDING";
    while (status !== "COMPLETED") {
      const response = await fal.queue.status("fal-ai/sdxl-controlnet-union", {
        requestId: request_id,
        logs: true,
      });

      status = response.status;
      console.log("Güncel durum:", status);

      if (status === "FAILED") {
        throw new Error("Resim oluşturma işlemi başarısız oldu.");
      }

      if (status !== "COMPLETED") {
        await sleep(2000); // 2 saniye bekle ve tekrar dene
      }
    }

    // 3. Sonuç hazır, şimdi al
    const result = await fal.queue.result("fal-ai/sdxl-controlnet-union", {
      requestId: request_id,
    });

    console.log("Görsel üretildi:", result.data.images[0].url);
    console.log("tip= ", typeof result.data);
    return result.data.images[0].url;
  } catch (err) {
    console.error("Hata oluştu:", err.message);
    throw err;
  }
};
