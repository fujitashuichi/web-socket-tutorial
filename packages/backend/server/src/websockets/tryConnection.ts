import type { WsResponse } from "@app/shared";
import type { WebSocketServer } from "ws";

export const wssConnection = async (getSocket: () => WebSocketServer | null, maxRetry: number) => {
  let errorCount = 0;


  while (errorCount < maxRetry) {
    const socket = getSocket();

    if (socket !== null) {
      socket.on("connection", (ws) => {
        const message: WsResponse = {
          ok: true,
          status: 1000,
          data: "Hi Client!"
        };
        ws.send(JSON.stringify(message));
      });
      return;
    }


    console.info("trying connection: No WebSockets");
    errorCount++;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.error("Max retries reached. Could not initialize WSS connection.");
}
