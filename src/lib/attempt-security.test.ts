import { describe, expect, it } from "vitest";

import { validateAndScoreAttempt } from "@/lib/attempt-security";

describe("validateAndScoreAttempt", () => {
  it("throws when reported blank count does not match verse definition", () => {
    expect(() =>
      validateAndScoreAttempt({
        reportedCorrectCount: 2,
        reportedTotalBlanks: 3,
        expectedTotalBlanks: 4,
        attemptIndex: 1,
        elapsedMs: 5000,
      }),
    ).toThrow("Mismatched blank count");
  });

  it("clamps impossible correct counts", () => {
    const result = validateAndScoreAttempt({
      reportedCorrectCount: 99,
      reportedTotalBlanks: 4,
      expectedTotalBlanks: 4,
      attemptIndex: 1,
      elapsedMs: 5000,
    });

    expect(result.correctCount).toBe(4);
    expect(result.points).toBe(10);
  });

  it("rejects impossible attempt index values", () => {
    expect(() =>
      validateAndScoreAttempt({
        reportedCorrectCount: 1,
        reportedTotalBlanks: 2,
        expectedTotalBlanks: 2,
        attemptIndex: 0,
        elapsedMs: 1500,
      }),
    ).toThrow("Invalid attempt index");
  });

  it("rejects absurd elapsed durations", () => {
    expect(() =>
      validateAndScoreAttempt({
        reportedCorrectCount: 1,
        reportedTotalBlanks: 2,
        expectedTotalBlanks: 2,
        attemptIndex: 1,
        elapsedMs: 1000 * 60 * 31,
      }),
    ).toThrow("Invalid elapsed time");
  });
});