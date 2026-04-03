import { useEffect, useRef, useState } from "react";

export const useWebSocket = (url: string) => {
  const [data, setData] = useState(null);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    return () => {
      if (socket.current) socket.current.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socket.current) socket.current.send(JSON.stringify(message));
  };

  return { data, sendMessage };
};
