# web-socket-tutorial
WebSocketの使い方を知るための学習

## [開発仕様](./docs/requirements/devRequirements.md)

## 学習レポート
### [WebSocket の制御に useRef を使う理由](./docs/reports/useRef.md)
* state での管理が非推奨である理由を考えました
### [クリーンアップ後に重複するイベントハンドラー](./docs/reports/douplicateUseRef.md)
* WebSocket イベントを effect 内で管理する際の落とし穴についてです

## 学習履歴
**2026/04/03**
* 学習方針: 単一サーバーでの単純なデータ送信
* ws の導入方法を学習
* useRefによる流動的な状態の管理を学習 ([上記](#websocket-の制御に-userref-を使う理由))
* キャンセルされていないイベントが次レンダリングに与える影響について学習

**2026/04/04**
* ws.on の基本的な使い方を学習
* 双方向接続の確立とUI表示
* isBinary の意図を学習。バイナリに対してテキスト要求を投げ返すように変更
* npm workspace を設定

**2026/04/05***
* sharedパッケージによる通信データ型の共有

**2026/04/06**
* connectionにおいて、単純な再試行ロジックを学習
* wsのリスナーとクライアントのライフサイクルを理解。これを元に遅延初期化の考えを学習
* server --> listen --> event の構造を学習
* wss.onによる登録の仕組みを学習

**2026/04/07**
* リファクタの完了
* wsのメソッド式と代入式の違いを学習
* 通信の自由度に対してZodが付いていかない問題が発生
* headerによる秩序を用いた解決策を学習
