import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connect(onMessageReceived) {
  console.log("Connection acildi");
  stompClient = new Client({
    webSocketFactory: () =>
      new WebSocket(
        `wss://bitirmeproje.xyz/ws?token=${localStorage.getItem("jwt")}`
      ),
    connectHeaders: {}, // Token zaten query'de
    debug: (str) => console.log(str),
    reconnectDelay: 3000,
    heartbeatIncoming: 5000,
    heartbeatOutgoing: 5000, // daha sık sinyal yollasın
    onConnect: () => {
      console.log("🔗 STOMP WebSocket bağlantısı kuruldu.");

      stompClient.subscribe("/user/queue/mesajlar", (message) => {
        const body = JSON.parse(message.body);
        console.log("Socket içindeki body verisi= ", body);
        onMessageReceived(body);
      });
    },
    onStompError: (frame) => {
      console.error("❌ STOMP hatası:", frame.headers["message"], frame.body);
    },
    onWebSocketClose: (event) => {
      console.log(
        "❌ WebSocket kapatıldı. Kod:",
        event.code,
        "Sebep:",
        event.reason,
        "Clean:",
        event.wasClean
      );

      // yeniden bağlanmayı stompClient kendisi yapacak çünkü reconnectDelay var
    },
  });

  stompClient.activate();
}

export async function disconnect() {
  if (stompClient) {
    await stompClient.deactivate();
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
