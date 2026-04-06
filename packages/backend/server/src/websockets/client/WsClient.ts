import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { WsClientEvents } from "../client/wsClientEvents.js";


export class WsClient {
  private socket: WebSocketServer;

  constructor(socket: WebSocketServer) {
    this.socket = socket;
  }


  wsEvents = (ws: WebSocket) => {
    return new WsClientEvents(ws);
  }


  private listen = (socket: WebSocketServer): void => {
    socket.on("connection", (ws) => {
      ws.on("open", this.wsEvents(ws).onopen);
      ws.on("message", this.wsEvents(ws).onmessage);
      ws.on("close", this.wsEvents(ws).onclose);
      ws.on("error", this.wsEvents(ws).onerror);
    });
  };
}
