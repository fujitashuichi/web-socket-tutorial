## useRef 内のメソッドが遅れて発火する可能性
* StrictMode などで即座に再レンダーする際に、イベントハンドラーが残留する可能性がある
* close処理には多少なりとも時間がかかり、WebSocket の時間は state の知るところではない
* そのため、WebSocket のイベントハンドラは残留する
* 回避方法は、React側が管理できる状態に置くこと


### 問題のコード
```ts
useEffect(() => {
  socket.current = new WebSocket(url);
  setStatus("connecting");

  ......

  socket.current.onmessage = (event) => {
    // 新しいレンダリング開始後に遅れて発火する可能性がある
    setData(JSON.parse(event.data));
  };

  socket.current.onopen = () => setStatus("opened");
  ......
}, [url]);
```

---
イベント残留を回避するには、クリーンアップ後に発火できなくするのが分かりやすい
### 正しいコード
```ts
useEffect(() => {
  socket.current = new WebSocket(url);

  // ====== イベントキャンセルのため ======
  let canceled = false;
  // ====================================

  ......

  socket.current.onmessage = (event) => {
    // ==== キャンセルされていればそもそも発火しない ====
    if (!canceled) setData(JSON.parse(event.data));
    // ===============================================
  };

  ......

  return () => {
    // ==== クリーンアップ時にイベントをキャンセルする ====
    canceled = true;
    // =================================================
    if (socket.current) socket.current.close();
  };
}, [url]);
```
