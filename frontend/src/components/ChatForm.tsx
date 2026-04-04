import React, { useEffect, useState } from 'react'
import { useWebSocket } from '../api/useWebSocket';
import { ChatFormDataSchema } from '../types/form';


export function ChatForm() {
  const [ready, setReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const socket = useWebSocket("ws://localhost:3000");
  const { status, data, sendMessage } = socket;

  useEffect(() => {
    const setReadyTrue = () => setReady(true);
    const setReadyFalse = () => setReady(false);

    if (status === "opened") setReadyTrue();
    else setReadyFalse();
  }, [status]);


  const send = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = ChatFormDataSchema.safeParse(message);
    if (!parsed.success) {
      setReady(false);
      alert("メッセージが不正です");
      return;
    }

    sendMessage(parsed.data);
  }


  return (<>
    {!ready &&
      <h1>Now Loading...</h1>
    }
    {ready &&
      <>
        <h1>Connection OK</h1>
        <p>{data}</p>

        <form onSubmit={send}>
          <input name="message" type="text" maxLength={30} minLength={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力"
          />
          <button type="submit">
            送信
          </button>
        </form>
      </>
    }
  </>)
}
