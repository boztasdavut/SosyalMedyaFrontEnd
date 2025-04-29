import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connect(onMessageReceived, kullaniciTakmaAd) {
  const socket = new SockJs("https://bitirmeproje.xyz/ws"); // Spring WebSocket endpoint
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("🔗 Bağlandı!");

      // 👂 Kullanıcıya özel kuyruk: /user/queue/mesajlar
      stompClient.subscribe("/user/queue/mesajlar", (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body); // yeni mesaj geldiğinde tetiklenir
      });
    },
    onStompError: (frame) => {
      console.error("STOMP error", frame);
    },
  });

  stompClient.activate();
}

export function disconnect() {
  if (stompClient) {
    stompClient.deactivate();
    console.log("❌ Bağlantı kapatıldı.");
  }
}

export function sendMessage(destination, body) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: destination, // örnek: "/app/mesaj-gonder"
      body: JSON.stringify(body),
    });
  }
}
