import { WebSocketServer } from "ws";
import { appConsole, randomGreeting } from "./utils/index.js";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  appConsole.log("SERVER", "Now connecting to client...");

  ws.on("open", () => {
    appConsole.log("SERVER", `Connection opened.`)
  })

  ws.on("close", () => {
    appConsole.log("SERVER", "Connection closed.");
  });

  ws.on("error", (err) => {
    appConsole.log("SERVER", `Connection Error: ${err}`);
  });

  ws.on("message", (data, _isBinary) => {
    const json = data.toString();
    console.log("message:", JSON.parse(json));

    ws.send(JSON.stringify(randomGreeting()));
  });
});

appConsole.log("SERVER", "Server running...")
