import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  category: z.string().min(3).max(20),
  link: z.string().url(),
   /* .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    })  */
  
  pitch: z.string().min(10),
});

export function parseServerActionResponse(response: any) {
  return response;
}