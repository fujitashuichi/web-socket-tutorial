import { z } from "zod";
import { WsChatBodySchema, WsChatHeaderScheme } from "./chat.types.js";


export const WsPayloadSchema = z.object({
  header: WsChatHeaderScheme,
  body: WsChatBodySchema
});
export type WsPayload = z.infer<typeof WsPayloadSchema>;
