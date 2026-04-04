# web-socket-tutorial
WebSocketの使い方を知るための学習

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

**2026/04/03**
* ws.on の基本的な使い方を学習
* 双方向接続の確立とUI表示
