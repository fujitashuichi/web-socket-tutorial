import type { UUID } from "crypto";
import type { SetStateAction } from "react";
import type React from "react";
import type { MessageEvent, WebSocket } from "ws";
import type { ConnectionStatus } from "./types";
import { WsPayloadSchema } from "@app/shared";


type SetStatus = React.Dispatch<SetStateAction<ConnectionStatus>>;
type SetData = React.Dispatch<SetStateAction<string | null>>;

export class WsEvents {
  socket: WebSocket;
  socketId: UUID;
  canceled: boolean = false;
  setStatus: SetStatus
  setData: SetData;

  constructor(socket: WebSocket, socketId: UUID, setStatus: SetStatus, setData: SetData) {
    this.socket = socket;
    this.socketId = socketId;
    this.setStatus = setStatus;
    this.setData = setData;
  }


  onmessage = (event: MessageEvent) => {
    if (this.canceled) return;

    const data = event.data;

    const parsed = WsPayloadSchema.safeParse(data);
    if (!parsed.success) {
      return console.error("InvalidPayload");
    }

    const validated = parsed.data;


    if (validated.header.type !== "CHAT") {
      return console.error("Required CHAT message but received", validated.header.type);
    }


    if (!validated.body.ok) {
      return console.error("WebSocketError:", validated.body.status);
    }

    if (typeof validated.body.data !== "string") return console.error("InvalidData");
    this.setData(validated.body.data);
  };

  onopen =  () => {
    if (this.canceled) return;

    console.info("connection opened\n current WebSocket", this.socketId);
    this.setStatus("opened")
  }

  onclose = () => {
    if (this.canceled) return;

    console.info("connection closed -  current WebSocket:", this.socketId);
    this.setStatus("closed")
  }
  onerror = () => {
    if (this.canceled) return;

    console.log("onerror - current WebSocket:", this.socketId);
    this.setStatus("error");
  }


  cancelEvents = () => {
    if (this.canceled) return;

    this.canceled = true;
    console.log("WebSocket events canceled:", this.socketId);

    this.socket.close();
    console.log("WebSocket closed:", this.socketId);
  }
}
