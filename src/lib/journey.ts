import { normalizeWord } from "@/lib/game";
import type { SkillLevel, ThemeOption, TranslationKey, Verse, VerseTranslation } from "@/types/domain";

/** Return the parts/answers/decoys for a given translation key. Falls back to NIV. */
export function getVerseTranslation(verse: Verse, key: TranslationKey): VerseTranslation {
  if (key === "kjv" && verse.kjv) {
    return verse.kjv;
  }
  return { parts: verse.parts, answers: verse.answers, decoys: verse.decoys };
}

export const HEART_CHECK_OPTIONS: ThemeOption[] = [
  {
    id: "anxiety",
    label: "Anxiety",
    description: "You are carrying something heavy. Let God meet you in the tension between worry and trust.",
    prompt: "What are you gripping that God is asking you to release into His hands?",
  },
  {
    id: "fear",
    label: "Fear",
    description: "Something feels uncertain or threatening. Bring it into the presence of the God who is not shaken.",
    prompt: "What fear shrinks when you stand it next to the character of God?",
  },
  {
    id: "anger",
    label: "Anger",
    description: "Something in you needs to surrender control, extend forgiveness, or confess what is underneath.",
    prompt: "What anger are you holding that is really about control, hurt, or unforgiveness?",
    verseThemeIds: ["anger"],
  },
  {
    id: "doubt",
    label: "Doubt",
    description: "Your faith feels thin. Come with honest questions and let truth meet you where you actually are.",
    prompt: "Where is your belief struggling, and can you bring that struggle to God without cleaning it up first?",
  },
  {
    id: "temptation",
    label: "Temptation",
    description: "You know the pull. Name it honestly and let Scripture remind you of the way out.",
    prompt: "What temptation keeps returning, and what would confession and a clean path look like today?",
  },
  {
    id: "waiting",
    label: "Waiting",
    description: "The answer has not come. Sit with truth that holds when the timeline is out of your hands.",
    prompt: "What are you waiting for, and where is God asking you to trust without seeing the end?",
  },
  {
    id: "guidance",
    label: "Guidance",
    description: "You need direction. Surrender the demand for the whole map and take the next faithful step.",
    prompt: "What decision needs surrender before it needs a solution?",
  },
  {
    id: "hope",
    label: "Hope",
    description: "Your reserves are low. Come back to what God has promised and let it carry more weight than what you see.",
    prompt: "What promise from God do you need to stake your life on today, even though you cannot see it?",
  },
  {
    id: "peace",
    label: "Peace",
    description: "Your mind will not stop. Let God post a guard over the noise and give you rest you cannot explain.",
    prompt: "What is stealing your peace, and are you ready to let God stand between you and it?",
  },
  {
    id: "rest",
    label: "Rest",
    description: "You are running on empty. Stop striving and receive what Christ is offering you right now.",
    prompt: "What are you still carrying that Christ already carried for you?",
  },
];

export const PRACTICE_LEVELS: Array<{
  id: SkillLevel;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    id: "beginner",
    label: "Gentle practice",
    shortLabel: "Gentle",
    description: "About one third of the words are hidden so you can settle into the passage.",
  },
  {
    id: "intermediate",
    label: "Steady practice",
    shortLabel: "Steady",
    description: "About two thirds of the words are hidden for a fuller memorization pass.",
  },
  {
    id: "expert",
    label: "Deep practice",
    shortLabel: "Deep",
    description: "Every practice word is hidden so the verse must be rebuilt in full.",
  },
];

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function chooseDeterministic<T>(items: T[], seed: string): T | undefined {
  if (items.length === 0) return undefined;
  const index = hashString(seed) % items.length;
  return items[index];
}

export function getThemeOption(themeId: string | null | undefined): ThemeOption | undefined {
  if (!themeId) return undefined;
  return HEART_CHECK_OPTIONS.find((option) => option.id === themeId);
}

export function getPracticeLevelMeta(skillLevel: SkillLevel) {
  return PRACTICE_LEVELS.find((option) => option.id === skillLevel) ?? PRACTICE_LEVELS[1];
}

export function getBlankCountForSkillLevel(skillLevel: SkillLevel, totalAnswers: number): number {
  if (totalAnswers <= 0) return 0;

  switch (skillLevel) {
    case "beginner":
      return Math.max(1, Math.ceil(totalAnswers * 0.33));
    case "intermediate":
      return Math.max(1, Math.ceil(totalAnswers * 0.67));
    case "expert":
      return totalAnswers;
  }
}

export function getBlankIndicesForSkillLevel(verseId: string, skillLevel: SkillLevel, totalAnswers: number): number[] {
  const desiredCount = getBlankCountForSkillLevel(skillLevel, totalAnswers);
  const allIndices = Array.from({ length: totalAnswers }, (_, index) => index);

  if (desiredCount >= allIndices.length) {
    return allIndices;
  }

  return allIndices
    .map((index) => ({ index, score: hashString(`${verseId}:${skillLevel}:${index}`) }))
    .sort((left, right) => left.score - right.score)
    .slice(0, desiredCount)
    .map((item) => item.index)
    .sort((left, right) => left - right);
}

export function buildPracticeSet(verse: Verse, skillLevel: SkillLevel, translationKey: TranslationKey = "niv") {
  const t = getVerseTranslation(verse, translationKey);
  const blankIndices = getBlankIndicesForSkillLevel(verse.id, skillLevel, t.answers.length);
  const blankIndexLookup = new Map<number, number>();

  blankIndices.forEach((answerIndex, slotIndex) => {
    blankIndexLookup.set(answerIndex, slotIndex);
  });

  return {
    blankIndices,
    blankIndexLookup,
    practiceAnswers: blankIndices.map((answerIndex) => normalizeWord(t.answers[answerIndex])),
  };
}

export function buildFullVerseText(verse: Verse, translationKey: TranslationKey = "niv"): string {
  const t = getVerseTranslation(verse, translationKey);
  return t.parts.reduce((text, part, index) => {
    const answer = index < t.answers.length ? `${t.answers[index]}` : "";
    return `${text}${part}${answer}`;
  }, "");
}

export function getTodayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function pickDailyFeaturedVerse(verses: Verse[], date = new Date()): Verse | undefined {
  const featured = verses.filter((verse) => verse.isDailyFeatured);
  const source = featured.length > 0 ? featured : verses;
  return chooseDeterministic(source, `featured:${getTodayKey(date)}`);
}

export function pickJourneyVerse(verses: Verse[], categoryId: string | null, date = new Date()): Verse | undefined {
  if (verses.length === 0) return undefined;

  const selectedTheme = getThemeOption(categoryId);
  const matchIds = selectedTheme?.verseThemeIds ?? (categoryId ? [categoryId] : []);
  const matches = matchIds.length > 0 ? verses.filter((verse) => matchIds.includes(verse.themeId)) : [];

  if (matches.length > 0) {
    return chooseDeterministic(matches, `${categoryId}:${getTodayKey(date)}`);
  }

  return pickDailyFeaturedVerse(verses, date) ?? verses[0];
}