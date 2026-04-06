import type { WsCloseEventCodes, WsResponse } from "@app/shared";
import type { WebSocket } from "ws";


export class WsClientEvents {
  private readonly ws: WebSocket;
  constructor(ws: WebSocket) {
    this.ws = ws;
  }


  onopen = () => {
    try {
      const message = {}
    }
  }

  onmessage = (message: WsResponse) => {
    return (data: any, isBinary: boolean) => {
      if (isBinary) {
        const message = this.createSuccessMessage("InvalidData");
        return this.ws.send(JSON.stringify(message));
      }

      try {
        const jsonString = data.toString();
        const payload = JSON.parse(jsonString);
        console.log("message:", payload);

        this.ws.send(JSON.stringify(message));
      } catch (e) {
        const message = this.createFailureMessage("InvalidData", 1003);
        this.ws.send(JSON.stringify(message));
      };
    }
  }


  private createSuccessMessage = (data: any): WsResponse => {
    return {
      ok: true,
      status: 1000,
      data
    }
  }

  private createFailureMessage = (data: any, status: WsCloseEventCodes["failure"], ): WsResponse => {
    return {
      ok: false,
      status
    }
  }
}
