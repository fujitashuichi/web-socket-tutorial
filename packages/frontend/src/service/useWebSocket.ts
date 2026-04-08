import { useEffect, useRef, useState } from "react";
import type { ConnectionStatus } from "./types";
import { WsEvents } from "./WsEvents";
import { validateAndSendMessage } from "./sendMessage";


export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>("closed");
  const [data, setData] = useState<string | null>(null);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(url);
    const id = crypto.randomUUID();
    const wsEvents = new WsEvents(socket.current, id, setStatus, setData);

    const setToConnecting = () => setStatus("connecting");
    setToConnecting();

    socket.current.onmessage = wsEvents.onmessage;
    socket.current.onopen =  wsEvents.onopen;
    socket.current.onclose = wsEvents.onclose;
    socket.current.onerror = wsEvents.onerror;

    return wsEvents.cancelEvents;
  }, [url]);


  const sendMessage = (message: string) => {
    if (!socket.current) {
      setStatus("connecting")
      return;
    };
    if (socket.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not opened");
      return;
    };

    validateAndSendMessage(socket.current, message);
  };


  return {
    status,
    data,
    sendMessage
  };
};
