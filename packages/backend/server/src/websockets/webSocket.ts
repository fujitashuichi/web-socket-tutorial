import { WebSocketServer } from "ws";
import { tryConnect } from "./tryConnect.js";

export class Socket {
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
    tryConnect(this.port, 3, setSocket);
  };


  onMessage = () => {
    this.onMessage();
  }
}
