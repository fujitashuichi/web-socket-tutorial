import { z } from "zod";
import { WsChatBodySchema } from "./chat.types.js";


export const WsResponseSchema = z.object({
  header: {
    type: z.literal("CHAT"),
    date: z.date().default(new Date())
  },
  body: WsChatBodySchema
});
export type WsResponse = z.infer<typeof WsResponseSchema>;
