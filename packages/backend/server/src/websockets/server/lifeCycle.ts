import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import type { WsResponse } from "@app/shared";
import { WsClientEvents } from "../client/wsClientEvents.js";


export class WsLifeCycles {
  private socket: WebSocketServer;

  constructor(socket: WebSocketServer) {
    this.socket = socket;
  }


  wsEvents = (ws: WebSocket) => {
    return new WsClientEvents(ws);
  }


  private listen = (socket: WebSocketServer): void => {
    socket.on("connection", (ws) => {
      ws.on("message", this.wsEvents(ws).messageEvent);
    });
  };
}
