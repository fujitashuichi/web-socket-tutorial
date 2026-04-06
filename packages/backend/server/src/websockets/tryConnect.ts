import type { WsResponse } from "@app/shared";
import { WebSocketServer } from "ws";


type Result =
  | { success: false }
  | { success: true, message: WsResponse }

export const tryConnect = async (
  port: number,
  maxRetry: number,
  setSocket: (wss: WebSocketServer) => void
): Promise<Result> => {
  let errorCount = 0;


  while (errorCount < maxRetry) {
    const socket = new WebSocketServer({ port });

    if (socket !== null) {
      setSocket(socket);
      socket.on("connection", (ws) => {
        const message: WsResponse = {
          ok: true,
          status: 1000,
          data: "Hi Client!"
        };
        ws.send(JSON.stringify(message));

        return {
          success: true,
          message
        };
      });
    }


    console.info("trying connection: No WebSockets");
    errorCount++;
    await new Promise(resolve => {
      setTimeout(resolve, (2 ** errorCount) * 1000)
    });
  }

  console.error("Max retries reached. Could not initialize WSS connection.");
  return {
    success: false
  }
}
