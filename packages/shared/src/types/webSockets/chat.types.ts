import z from "zod";
import { WsCloseEventCodesSchema } from "./protocol.js";


export const WsChatBodySchema = z.object({
  ok: z.literal(false),
  status: WsCloseEventCodesSchema.shape.failure,
  message: z.string().optional()
}).or(z.object({
  ok: z.literal(true),
  status: WsCloseEventCodesSchema.shape.success,
  data: z.unknown()
}));
export type WsChatBody = z.infer<typeof WsChatBodySchema>;
