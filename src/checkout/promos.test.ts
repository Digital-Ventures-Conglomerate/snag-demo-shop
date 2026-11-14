import { describe, expect, it } from "vitest";
import { findPromo } from "./promos";

describe("findPromo", () => {
  it("finds a code case-insensitively", () => {
    expect(findPromo(" launch10 ")).toEqual({ code: "LAUNCH10", percentOff: 10 });
  });

  it("returns null for an unknown code", () => {
    expect(findPromo("NOPE")).toBeNull();
  });
});
