import { scoreAttempt } from "@/lib/game";

export type AttemptValidationInput = {
  reportedCorrectCount: number;
  reportedTotalBlanks: number;
  expectedTotalBlanks: number;
  attemptIndex: number;
  elapsedMs: number;
};

export function validateAndScoreAttempt(input: AttemptValidationInput): {
  correctCount: number;
  totalBlanks: number;
  points: number;
} {
  if (input.reportedTotalBlanks !== input.expectedTotalBlanks) {
    throw new Error("Mismatched blank count.");
  }

  if (input.attemptIndex < 1 || input.attemptIndex > 20) {
    throw new Error("Invalid attempt index.");
  }

  if (input.elapsedMs < 0 || input.elapsedMs > 1000 * 60 * 30) {
    throw new Error("Invalid elapsed time.");
  }

  const correctCount = Math.max(0, Math.min(input.reportedCorrectCount, input.expectedTotalBlanks));
  const totalBlanks = input.expectedTotalBlanks;
  const points = scoreAttempt(correctCount, totalBlanks, input.attemptIndex);

  return { correctCount, totalBlanks, points };
}
