import { describe, expect, it } from "vitest";
import { formatLiveStats } from "./liveStats";

describe("formatLiveStats", () => {
  it("returns null for missing or empty input", () => {
    expect(formatLiveStats(null)).toBeNull();
    expect(formatLiveStats(undefined)).toBeNull();
    expect(formatLiveStats({})).toBeNull();
  });

  it("formats the full line", () => {
    expect(formatLiveStats({ motors: 598, in_stock: 396, vendors: 11 })).toBe(
      "598 motors · 396 in stock now · 11 vendors · updated hourly",
    );
  });

  it("adds thousands separators", () => {
    expect(formatLiveStats({ motors: 1234 })).toBe("1,234 motors · updated hourly");
  });

  it("includes only the fields that are present", () => {
    expect(formatLiveStats({ vendors: 11 })).toBe("11 vendors · updated hourly");
  });

  it("ignores non-number fields from a malformed payload", () => {
    // @ts-expect-error — runtime guard against a bad API response
    expect(formatLiveStats({ motors: "lots" })).toBeNull();
  });
});
