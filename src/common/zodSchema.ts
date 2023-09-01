import { z } from "zod";

export const paginatedInputSchema = z.object({
  cursor: z.string().nullish(),
});

export const offsetPaginationInputSchema = z.object({
  skip: z.number().default(0),
  take: z.number().default(10),
});

export type PaginatedInput = z.infer<typeof paginatedInputSchema>;

export type OffsetPaginatedInput = z.infer<typeof offsetPaginationInputSchema>;
