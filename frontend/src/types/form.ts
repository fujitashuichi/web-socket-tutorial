import { z } from "zod";

export const ChatFormDataSchema = z.string().max(30).min(1);
export type ChatFormData = z.infer<typeof ChatFormDataSchema>;
