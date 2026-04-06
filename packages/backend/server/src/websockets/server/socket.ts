import type { WebSocketServer } from "ws";
import { tryConnect } from "./tryConnect.js";


export class WsService {
  private socket: WebSocketServer | null;
  private readonly port: number;

  constructor(port: number) {
    this.socket = null;
    this.port = port;
  }


  connect = async () => {
    const setSocket = (wss: WebSocketServer) => {
      this.socket = wss
    };
    // ↓第2引数は最大試行回数
    return await tryConnect(this.port, 3, setSocket);
  };
}
