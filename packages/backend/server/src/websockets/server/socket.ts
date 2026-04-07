import type { WebSocketServer } from "ws";
import { tryConnect } from "./tryConnect.js";
import { WsClient } from "../client/WsClient.js";


export class Socket {
  private socket: WebSocketServer | null;
  private readonly port: number;

  constructor(port: number) {
    this.socket = null;
    this.port = port;
  }


  start = async () => {
    const result = await this.connect();

    if (result.success && this.socket) {
      const lifeCycles = new WsClient(this.socket);
      return { ok: true, data: "Server started" };
    }

    return { ok: false, error: "Failed to connect" };
  };


  connect = async () => {
    const setSocket = (wss: WebSocketServer) => {
      this.socket = wss
    };
    // ↓第2引数は最大試行回数
    return await tryConnect(this.port, 3, setSocket);
  };
}
