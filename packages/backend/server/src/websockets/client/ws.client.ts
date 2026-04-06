import type { WsResponse } from "@app/shared";
import type { WebSocket } from "ws";


export class WsClientEvents {
  private readonly ws: WebSocket;
  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  onmessage = (message: WsResponse) => {
    return (data: any, isBinary: boolean) => {
      if (isBinary) {
        const message: WsResponse = {
          ok: false,
          status: 1006,
          errorName: "UnsupportedData"
        }
        return this.ws.send(JSON.stringify(message));
      }

      try {
        const jsonString = data.toString();
        const payload = JSON.parse(jsonString);
        console.log("message:", payload);

        this.ws.send(JSON.stringify(message));
      } catch (e) {
        const message: WsResponse = {
          ok: false,
          status: 1002,
          errorName: "UnsupportedData"
        }
        this.ws.send(JSON.stringify(message));
      };
    }
  }
}
