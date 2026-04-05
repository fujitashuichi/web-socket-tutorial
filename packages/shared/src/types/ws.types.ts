type WsProtocolErrorNames =
  | "UnsupportedData" | "ProtocolError" | "PolicyViolation" | "InternalServerError"

export type WsResponse =
  | {
    ok: false,
    status: number,
    errorName: WsProtocolErrorNames
  }
  | {
    ok: true,
    status: number,
    data: unknown
  };
