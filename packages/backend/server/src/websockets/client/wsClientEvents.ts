import type { WsCloseEventCodes, WsResponse } from "@app/shared";
import type { WebSocket } from "ws";
import { appConsole, randomGreeting } from "../../utils/index.js";


export class WsClientEvents {
  private readonly ws: WebSocket;
  constructor(ws: WebSocket) {
    this.ws = ws;
  }


  onmessage = (data: any, isBinary: boolean) => {
    if (isBinary) {
      const message = this.createSuccessMessage("InvalidData");
      return this.ws.send(JSON.stringify(message));
    }

    try {
      const jsonString = data.toString();
      const payload = JSON.parse(jsonString);
      console.log("message:", payload);

      const message = this.createSuccessMessage(randomGreeting());
      this.ws.send(JSON.stringify(message));
    } catch (e) {
      console.error(e);
      const message = this.createFailureMessage(1003, "InvalidData");
      this.ws.send(JSON.stringify(message));
    };
  }

  onclose = () => {
    try {
      appConsole.log("SERVER", "Disconnected successfully");
    } catch(e) {
      console.error(e);
    }
  }

  onerror = (err: any) => {
    try {
      console.error(err);
      const message = this.createFailureMessage(1011, "InternalServerError")
      this.ws.send(JSON.stringify(message));
    } catch(e) {
      console.error(e)
      const message = this.createFailureMessage(1011, "InternalServerError");
      this.ws.send(JSON.stringify(message));
    }
  }


  private createSuccessMessage = (data: any): WsResponse => {
    return {
      ok: true,
      status: 1000,
      data
    }
  }

  private createFailureMessage = (status: WsCloseEventCodes["failure"], message?: string): WsResponse => {
    if (message) {
      return {
        ok: false,
        status,
        message
      }
    }
    return {
      ok: false,
      status
    }
  }
}
