import { WebSocketServer } from "ws";
import { wssConnection } from "./tryConnection.js";

export class Socket {
  private socket: WebSocketServer | null;

  constructor() {
    this.socket = null;
  }

  connect = () => {
    this.socket = new WebSocketServer()
    this.onConnection();
  };


  onConnection = async () => {
    await wssConnection(() => this.socket, 3);
  }

  onMessage = () => {
    this
  }
}
