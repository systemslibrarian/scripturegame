export type SkillLevel = "beginner" | "intermediate" | "expert";

export type ThemeOption = {
  id: string;
  label: string;
  description: string;
  prompt: string;
  verseThemeIds?: string[];
};

export type Verse = {
  id: string;
  reference: string;
  translation: string;
  parts: string[];
  answers: string[];
  decoys: string[];
  themeId: string;
  themeLabel: string;
  devotional: string;
  applicationPrompt: string;
  difficulty?: SkillLevel;
  isDailyFeatured?: boolean;
};

export type AttemptInput = {
  userId: string;
  verseId: string;
  correctCount: number;
  totalBlanks: number;
  attemptIndex: number;
  elapsedMs: number;
  skillLevel?: SkillLevel;
};

export type ReflectionInput = {
  verseId: string;
  categoryId: string;
  responseText: string;
};

export type ReflectionRow = {
  id: number;
  user_id: string;
  verse_id: string;
  category_id: string;
  response_text: string;
  created_at: string;
};

export type ScoreRow = {
  user_id: string;
  display_name: string;
  total_points: number;
  best_session: number;
};
