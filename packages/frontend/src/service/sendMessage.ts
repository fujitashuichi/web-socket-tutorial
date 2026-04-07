import WebSocket from "ws";


type Result = { ok: boolean };

export const validateAndSendMessage = (socket: WebSocket, message: string): Result => {
  if (typeof message !== "string") {
    console.error("InvalidDataType");
    return { ok: false };
  }

  socket.send(JSON.stringify(message));
  return { ok: true };
}
