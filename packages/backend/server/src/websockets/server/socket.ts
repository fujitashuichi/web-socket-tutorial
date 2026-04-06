import type { WebSocketServer } from "ws";
import { tryConnect } from "./tryConnect.js";
import { WsLifeCycles } from "../client/lifeCycle.js";


export class WsService {
  private socket: WebSocketServer | null;
  private readonly port: number;

  constructor(port: number) {
    this.socket = null;
    this.port = port;
  }


  start = async () => {
    const result = await this.connect();

    if (result.success && this.socket) {
      const lifeCycles = new WsLifeCycles(this.socket);
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
