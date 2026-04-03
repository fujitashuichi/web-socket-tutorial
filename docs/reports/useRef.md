## WebSocket に対する useRef の必要性

* ### 今までの学習 (fetch)
  * これまで使ってきた http/fetch の通信ではuseStateを用いていた
  * fetch はリクエストが必須であるため、いつデータが来てほしいかが明確であった
  * その特徴により、突然変化するデータは理論的に存在せず、useStateのみで十分であった

* ### 今回の学習 (WebSocket)
  * WebSocket はイベント駆動であり、コード上でリクエスト送信を挟まない
  * fetch とは異なり、接続・通信・切断・エラーなどがイベントとして変化する
  * そのため、突然変化するデータが論理的に存在し、これをstate管理することは余分な再レンダーなどをもたらす


## 時間軸と境界
* ### WebSocket はPush型
  * WebSocket は電話のように、「レンダーサイクルに関わらず、永続的に接続する」
  * バックでは絶えず情報が流動し、WebSocketの実態は単なる値とは見なし難い
  * いつでも情報をやり取りしたい。これは電話的な概念
  * まとめると、連続的な時間の中で変化する考え

* ### fetch はPull型
  * fetch は自販機のように、「レンダーサイクルに合わせて、思った通りのタイミングで情報を得る」
  * バックでは単純関数的な処理をし、データを受け取ればそれで終わり
  * 決まったタイミングでまとまった情報を得たい。これは伝言やメールに近い
  * まとめると、断続的な時間の中で変化する考え


## useRef による境界の保持
* useRef はデータを保持しつつも変化に対してレンダーはしない。
* useRef 内では意味のある状態だけに対してアプリのStateを変更する
* 遷移途中の**曖昧な状態に意味を持たせない**ように制御でき、WebSocketの動作をレンダーに影響させない

※ ここでの「曖昧な状態」とは、「接続が完了するまでのバッファリング」 や 「瞬断時の不安定な状態」 を指している


## useRef と useState の仕組み的な違い
根本的にはこれだけの違いである
* メモリ保持の仕組みは同じ。寿命も同じ
* state はレンダリング評価されるが ref はされない

## 実装
```ts
type ConnectionStatus =
  | "connecting" | "closed" | "opened" | "error"


export const useWebSocket = (url: string) => {
  // レンダリングに影響させたい情報
  const [status, setStatus] = useState<ConnectionStatus>("closed");
  const [data, setData] = useState(null);

  // 直接レンダリングに影響させたくない情報
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // ref を変化させてもレンダリングは発火しない
    socket.current = new WebSocket(url);
    // state を変化させるとレンダリングが発火する
    setStatus("connecting");

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

```
