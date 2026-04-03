import { useEffect, useRef, useState } from "react";


type ConnectionStatus =
  | "connecting" | "closed" | "opened" | "error"


export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>("closed");
  const [data, setData] = useState(null);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(url);
    (() => setStatus("connecting"))();

    socket.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    socket.current.onopen = () => setStatus("opened");
    socket.current.onclose = () => setStatus("closed");
    socket.current.onerror = () => {
      setStatus("error");
    }

    return () => {
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
