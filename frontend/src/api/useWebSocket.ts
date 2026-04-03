import { useEffect, useRef, useState } from "react";


type ConnectionStatus =
  | "connecting" | "closed" | "opened" | "error"


export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>("closed");
  const [data, setData] = useState(null);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socket.current = ws;

    let canceled = false;

    const setToConnecting = () => setStatus("connecting");
    setToConnecting();

    socket.current.onmessage = (event) => {
      if (!canceled) setData(JSON.parse(event.data));
    };

    socket.current.onopen =  () => {
      if (!canceled) setStatus("opened");
    }
    socket.current.onclose = () => {
      if (!canceled) setStatus("closed");
    }
    socket.current.onerror = () => {
      if (!canceled) setStatus("error");
    }

    return () => {
      canceled = true;
      if (socket.current) socket.current.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (!socket.current) {
      return
    };
    if (socket.current.readyState !== WebSocket.OPEN) {
      return
    };

    socket.current.send(JSON.stringify(message));
  };

  return { status, data, sendMessage };
};
