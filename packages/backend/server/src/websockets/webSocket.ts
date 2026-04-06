import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { tryConnect } from "./tryConnect.js";
import type { WsResponse } from "@app/shared";
import { randomGreeting } from "../utils/randomGreeting.js";
import { WsClientEvents } from "./wsClient.js";

export class Socket {
  private socket: WebSocketServer | null;
  private readonly port: number;

  constructor(port: number) {
    this.socket = null;
    this.port = port;
  }


  wsEvents = (ws: WebSocket) => {
    return new WsClientEvents(ws);
  }

  connect = async () => {
    const setSocket = (wss: WebSocketServer) => {
      this.socket = wss
    };
    await tryConnect(this.port, 3, setSocket);
  };


  onMessage = async () => {
    if (!this.socket) return await this.connect();

    const message: WsResponse = {
      ok: true,
      status: 1000,
      data: randomGreeting()
    }
    this.socket.on("connection", (ws) => {
      ws.on("message", this.wsEvents(ws).onmessage(message));
    })
  }
}
