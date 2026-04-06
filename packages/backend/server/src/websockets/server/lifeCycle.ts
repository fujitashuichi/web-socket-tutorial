import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import type { WsResponse } from "@app/shared";
import { randomGreeting } from "../../utils/randomGreeting.js";
import { WsClientEvents } from "../client/ws.client.js";


export class Socket {
  private socket: WebSocketServer;

  constructor(socket: WebSocketServer) {
    this.socket = socket;
  }


  wsEvents = (ws: WebSocket) => {
    return new WsClientEvents(ws);
  }


  private messageHandler = (socket: WebSocketServer, message: WsResponse): void => {
    socket.on("connection", (ws) => {
      ws.on("message", this.wsEvents(ws).onmessage(message));
    });
  };


  onMessage = async () => {
    const socket = this.socket;

    const message: WsResponse = {
      ok: true,
      status: 1000,
      data: randomGreeting()
    }
    this.messageHandler(socket, message);
  }
}
