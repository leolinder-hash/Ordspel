import { describe, it, expect } from "@jest/globals";
import { getFeedback } from "./getFeedback.js";

describe("getFeedback", () => {
  it("returns correct for matching letters", () => {
    expect(getFeedback("BRUS", "BRUS")).toEqual([
      { letter: "b", result: "correct" },
      { letter: "r", result: "correct" },
      { letter: "u", result: "correct" },
      { letter: "s", result: "correct" }
    ])
  })
});

