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
      const events = this.wsEvents(ws);

      ws.on("open", events.onopen);
      ws.on("message", events.onmessage);
      ws.on("close", events.onclose);
      ws.on("error", events.onerror);
    });
  };
}
