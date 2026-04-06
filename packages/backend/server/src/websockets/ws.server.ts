import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { tryConnect } from "./tryConnect.js";
import type { WsResponse } from "@app/shared";
import { randomGreeting } from "../utils/randomGreeting.js";
import { WsClientEvents } from "./ws.client.js";

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
    return await tryConnect(this.port, 3, setSocket);
  };

  // 切断時の再試行処理
  private ensureConnected = async (): Promise<WsResponse> => {
    if (this.socket) {
      return { ok: true, status: 1000, data: undefined };
    }

    const result = await this.connect();
    if (!result.success) {
      return {
        ok: false,
        status: 1011,
        errorName: "InternalServerError"
      }
    };
    return {
      ok: true,
      status: 1000,
      data: result.message
    }
  };


  private messageHandler = (socket: WebSocketServer, message: WsResponse): void => {
    socket.on("connection", (ws) => {
      ws.on("message", this.wsEvents(ws).onmessage(message));
    });
  };


  onMessage = async () => {
    const socket = this.socket;

    if (!socket) {
      return this.ensureConnected();
    }

    const message: WsResponse = {
      ok: true,
      status: 1000,
      data: randomGreeting()
    }
    this.messageHandler(socket, message);
  }
}
