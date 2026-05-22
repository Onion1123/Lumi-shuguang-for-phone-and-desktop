import type { LensId } from "./types";

export type ToneStyle = "professional" | "warm";

interface ToneCopy {
  lensLabel: Record<LensId, string>;
  lensHint: Record<LensId, string>;
  workspaceSubtitle: string;
  analysisHeaderChip: string;
  analysisEmptyTitle: string;
  analysisEmptyBody: string;
  loadingTitle: string;
  loadingStages: string[];
  structuredJudgmentHelper: string;
  xpFooter: string;
  journalTitle: string;
  journalSubtitle: string;
  journalEmpty: string;
  petBubbles: string[];
  skillUnlockedPrefix: string;
}

export const COPY: Record<ToneStyle, ToneCopy> = {
  professional: {
    lensLabel: {
      "comment-signals": "Comment signals",
      "emotional-resonance": "Emotional resonance",
      "commercial-traces": "Commercial traces",
      "trend-shift": "Trend shift",
      "risk-boundary": "Risk boundary",
    },
    lensHint: {
      "comment-signals": "Reading what the comment section reveals.",
      "emotional-resonance": "Tracing the emotional undertone behind the post.",
      "commercial-traces": "Spotting the conversion logic under the surface.",
      "trend-shift": "Catching a pattern before it becomes obvious.",
      "risk-boundary": "Noticing where content brushes against a risk line.",
    },
    workspaceSubtitle: "Drop in a post, pick a lens, write one honest sentence.",
    analysisHeaderChip: "Structured read",
    analysisEmptyTitle: "Your structured read appears here",
    analysisEmptyBody:
      "Pick a lens, write one honest sentence. Lumi organizes — it doesn't replace — your judgment.",
    loadingTitle: "Lumi is structuring…",
    loadingStages: [
      "Reading the post…",
      "Holding your lens up to it…",
      "Structuring your one-sentence read…",
      "Drawing insight tags…",
    ],
    structuredJudgmentHelper:
      "Based on your one-sentence observation, Lumi organized the signal into a reusable judgment.",
    xpFooter: "filed to observation log",
    journalTitle: "Observation Log",
    journalSubtitle: "A record of judgment, lens by lens",
    journalEmpty:
      "Your filed observations will land here — newest first, each one tagged by the lens you used.",
    petBubbles: [
      "Filed.",
      "Logged to record.",
      "Pattern saved.",
      "+1 sharper.",
    ],
    skillUnlockedPrefix: "Skill unlocked",
  },
  warm: {
    lensLabel: {
      "comment-signals": "Something feels off in the comments",
      "emotional-resonance": "This hits an emotional nerve",
      "commercial-traces": "This feels like a soft ad",
      "trend-shift": "I keep seeing this pattern",
      "risk-boundary": "This feels risky",
    },
    lensHint: {
      "comment-signals": "Let's see what the comments are really up to.",
      "emotional-resonance": "Something in here is tugging at you — let's name it.",
      "commercial-traces": "Looks innocent, but maybe it's quietly selling something.",
      "trend-shift": "You've spotted this shape before, haven't you?",
      "risk-boundary": "Careful — there's a line being walked here.",
    },
    workspaceSubtitle:
      "Toss in a post, pick how it feels, jot one honest line.",
    analysisHeaderChip: "Here's what I'm hearing",
    analysisEmptyTitle: "I'll tidy your thought up here",
    analysisEmptyBody:
      "Pick a feeling, write one honest line. I'll help you put words around what you already sensed.",
    loadingTitle: "Hold on, reading along…",
    loadingStages: [
      "Reading the post with you…",
      "Trying on the lens you picked…",
      "Putting words around your hunch…",
      "Sticking on a few tags…",
    ],
    structuredJudgmentHelper:
      "Took your one-line read and gently shaped it into something you can come back to.",
    xpFooter: "tucked into your log",
    journalTitle: "My Observation Log",
    journalSubtitle: "Little reads, kept close",
    journalEmpty:
      "The things you notice will gather here — newest first, in the voice you used.",
    petBubbles: [
      "Got it, kept it safe.",
      "Tucked away ♡",
      "I noticed too.",
      "We're getting sharper.",
    ],
    skillUnlockedPrefix: "Look what we unlocked",
  },
};

export function getCopy(style: ToneStyle | undefined): ToneCopy {
  return COPY[style ?? "professional"];
}

export function lensLabel(id: LensId, style: ToneStyle | undefined): string {
  return getCopy(style).lensLabel[id];
}
