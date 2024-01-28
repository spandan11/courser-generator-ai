import * as z from "zod";

export const createChapterSchema = z.object({
  title: z.string().min(1).max(100),
  units: z.array(z.string()),
});
