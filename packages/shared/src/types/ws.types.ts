export type WsCloseEventCodes = {
  failure: 1001 | 1002 | 1003 | 1006 | 1007 | 1008 | 1009 | 1010 | 1011 | 1015,
  success: 1000
}

export type WsResponse =
  | {
    ok: false,
    status: WsCloseEventCodes["failure"]
  }
  | {
    ok: true,
    status: WsCloseEventCodes["success"],
    data: unknown
  };

/*
1000 - Normal Closure (正常終了): リクエスト完了や切断手続きが正常に行われた。
1001 - Going Away (離脱): サーバーのシャットダウンやページ移動など、当事者が去った。
1002 - Protocol Error (プロトコルエラー): 接続が終了した（不正なフレーム受信など）。
1003 - Unsupported Data (非サポートデータ): サーバーがサポートしていない形式（テキストの代わりにバイナリ等）を受信。
1006 - Abnormal Closure (異常終了): クローズフレームを受信せずに通信が切断された（ネットワーク切断、タイムアウト）。
1007 - Invalid Frame Payload Data (データ形式不正): 受信データが形式と一致しない。
1008 - Policy Violation (ポリシー違反): ポリシーに違反するメッセージを受信。
1009 - Message Too Big (メッセージサイズ過大): 受信メッセージが大きすぎて処理不可。
1010 - Mandatory Extension (拡張エラー): クライアントが拡張を期待したが、サーバーが応答しなかった。
1011 - Internal Server Error (サーバー内部エラー): サーバー側で予期せぬエラー発生。
1015 - TLS Handshake Failure (TLS失敗): TLSハンドシェイクが失敗した。
*/
