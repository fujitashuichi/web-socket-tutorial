import { WebSocketServer } from "ws";
import { appConsole, randomGreeting } from "./utils/index.js";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  appConsole.log("SERVER", "Now connecting to client...");

  ws.send("send me text");

  ws.on("close", () => {
    appConsole.log("SERVER", "Connection closed.");
  });

  ws.on("error", (err) => {
    appConsole.log("SERVER", `Connection Error: ${err}`);
  });

  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      return ws.send("send me text!!");
    }

    try {
      const jsonString = data.toString();
      const payload = JSON.parse(jsonString);
      console.log("message:", payload);

      ws.send(JSON.stringify(randomGreeting()));
    } catch (e) {
      ws.send("Invalid JSON format.");
    };
  });
});

appConsole.log("SERVER", "Server running...")
