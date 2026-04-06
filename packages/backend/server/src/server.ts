import { WebSocketServer } from "ws";
import { appConsole, randomGreeting } from "./utils/index.js";
import { type WsResponse } from "@app/shared"

const wss = new WebSocketServer({ port: 3000 });

const firstResponse: WsResponse = {
  ok: true,
  status: 1000,
  data: "hi client!"
}

const messageForBinary: WsResponse = {
  ok: false,
  status: 1006,
  errorName: "UnsupportedData"
}

const onmessageResponse = (): WsResponse => {
  return {
    ok: true,
    status: 1000,
    data: randomGreeting()
  }
}


wss.on("connection", (ws) => {
  appConsole.log("SERVER", "Now connecting to client...");

  ws.send(JSON.stringify(firstResponse));

  ws.on("close", () => {
    appConsole.log("SERVER", "Connection closed.");
  });

  ws.on("error", (err) => {
    appConsole.log("SERVER", `Connection Error: ${err}`);
  });

  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      return ws.send(JSON.stringify(messageForBinary));
    }

    try {
      const jsonString = data.toString();
      const payload = JSON.parse(jsonString);
      console.log("message:", payload);

      ws.send(JSON.stringify(onmessageResponse()));
    } catch (e) {
      ws.send(JSON.stringify("Invalid JSON format."));
    };
  });
});

appConsole.log("SERVER", "Server running...")
