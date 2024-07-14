import { describe, expect, it } from "vitest";
import search from "../services/search";

describe(
  "search",
  () => {
    it("returns 10 results", async () => {
      const params = new URLSearchParams("search=&page=1");
      const result = await search(params);
      expect(result.results).toHaveLength(10);
    });
  },
  { timeout: 20000 },
);
