import { WebSocketServer } from "ws";
import { appConsole } from "./utils/index.js";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  appConsole.log("SERVER", "Now connecting to client...");
});

appConsole.log("SERVER", "Server running...")
