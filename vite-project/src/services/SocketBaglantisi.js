import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connect(onMessageReceived) {
  const jwt = localStorage.getItem("jwt");
  const socket = new WebSocket(`wss://bitirmeproje.xyz/ws?token=${jwt}`);
 // ✅ token query parametresinde

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {}, // Header gerek yok, çünkü query'de token var
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("🔗 STOMP WebSocket bağlantısı kuruldu.");

      // 👂 Kullanıcıya özel mesaj kuyruğu
      stompClient.subscribe("/user/queue/mesajlar", (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    },
    onStompError: (frame) => {
      console.error("STOMP hatası:", frame);
    },
    onWebSocketClose: () => {
      console.log("❌ WebSocket bağlantısı kapatıldı.");
    }
  });

  stompClient.activate();
}

export function disconnect() {
  if (stompClient) {
    stompClient.deactivate();
    console.log("❌ STOMP bağlantısı kapatıldı.");
  }
}

export function sendMessage(destination, body) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}
