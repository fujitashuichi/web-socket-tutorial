import { useEffect, useRef, useState } from "react";


type ConnectionStatus =
  | "connecting" | "closed" | "opened" | "error"


export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>("closed");
  const [data, setData] = useState<string | null>(null);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socket.current = ws;

    const id = crypto.randomUUID();
    console.log("current WebSocket:", id);

    let canceled = false;

    const setToConnecting = () => setStatus("connecting");
    setToConnecting();

    socket.current.onmessage = (event) => {
      console.log("onmessage - current WebSocket:", id);
      const resData = JSON.parse(event.data);

      if (!canceled) {
        console.log("response:", resData);
        setData(resData)
      };
    };

    socket.current.onopen =  () => {
      if (!canceled) {
        console.log("onopen - current WebSocket:", id);
        setStatus("opened")
      };
    }
    socket.current.onclose = () => {
      if (!canceled) {
        console.log("onclose -  current WebSocket:", id);
        setStatus("closed")
      };
    }
    socket.current.onerror = () => {
      if (!canceled) {
        console.log("onerror - current WebSocket:", id);
        setStatus("error");
      }
    }

    return () => {
      canceled = true;
      if (socket.current) socket.current.close();
      console.log("WebSocket closed:", id);
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (!socket.current) {
      console.error("WebSocket undefined");
      return;
    };
    if (socket.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not opened");
      return;
    };

    socket.current.send(JSON.stringify(message));
  };

  return {
    status,
    data,
    sendMessage
  };
};
