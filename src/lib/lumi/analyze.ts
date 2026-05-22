import type { Analysis, LensId } from "./types";

export interface Lens {
  id: LensId;
  label: string;
  short: string;
  skillId: string;
  hint: string;
}

export const LENSES: Lens[] = [
  {
    id: "comment-signals",
    label: "Comment signals",
    short: "评论区信号",
    skillId: "comment-hunter",
    hint: "Reading what the comment section reveals.",
  },
  {
    id: "emotional-resonance",
    label: "Emotional resonance",
    short: "情绪共鸣",
    skillId: "emotion-catcher",
    hint: "Tracing the emotional undertone behind the post.",
  },
  {
    id: "commercial-traces",
    label: "Commercial traces",
    short: "商业化痕迹",
    skillId: "commercial-instinct",
    hint: "Spotting the conversion logic under the surface.",
  },
  {
    id: "trend-shift",
    label: "Trend shift",
    short: "趋势变化",
    skillId: "trend-radar",
    hint: "Catching a pattern before it becomes obvious.",
  },
  {
    id: "risk-boundary",
    label: "Risk boundary",
    short: "风险边界",
    skillId: "risk-sentinel",
    hint: "Noticing where content brushes against a risk line.",
  },
];

export function getLens(id: LensId): Lens {
  return LENSES.find((l) => l.id === id) ?? LENSES[0];
}

const contentTypes = [
  "Lifestyle ritual",
  "City exploration",
  "Product review · deep dive",
  "Home & space",
  "Cooking diary",
  "Self-improvement journey",
  "Beauty & skincare",
  "Travel itinerary",
];

const angles = [
  "Emotional resonance over utility",
  "Anti-consumerist undertone",
  "Aesthetic-driven storytelling",
  "Trust-building via vulnerability",
  "Practical takeaway with personal voice",
  "Niche taste signaling",
  "Community-first sharing",
];

const tagBank = [
  "Slow living",
  "Female-coded ritual",
  "Budget aesthetic",
  "Healing content",
  "Anti-mainstream",
  "Long-tail SEO friendly",
  "High save-rate hook",
  "Comment-bait ending",
  "Trust signal: vulnerability",
  "Visual-first format",
  "Niche community appeal",
  "Repeatable template",
];

function pick<T>(arr: T[], n = 1): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export interface AnalyzeInput {
  link?: string;
  title?: string;
  content?: string;
  observation: string;
  lens: LensId;
}

export function mockAnalyze(input: AnalyzeInput): Analysis {
  const seed = hashSeed(
    (input.link ?? "") +
      (input.title ?? "") +
      (input.content ?? "") +
      input.observation,
  );
  const ct = contentTypes[seed % contentTypes.length];
  const lens = getLens(input.lens);
  const angle = lens.label;
  const tags = pick(tagBank, 3).slice(0, 3);

  const titleHint = input.title?.trim() || input.link?.trim() || "the post";
  const contentHint = input.content?.trim().slice(0, 60) || "";

  const postBreakdown = input.content
    ? `A first-person ${ct.toLowerCase()} built around "${truncate(titleHint, 28)}". The author leans on small concrete details (${contentHint ? truncate(contentHint, 40) + "…" : "step-by-step moments"}) to create intimacy rather than authority.`
    : input.title
      ? `From the title alone, "${truncate(titleHint, 36)}" reads as a ${ct.toLowerCase()} — conversational and curiosity-driven.`
      : `Limited post context provided. Likely sits in the ${ct.toLowerCase()} cluster.`;

  const summary = `Through the ${lens.label.toLowerCase()} lens, your read — "${truncate(input.observation, 50)}" — points to a reusable pattern: ${tags[0]?.toLowerCase() || "personal voice"}.`;

  return {
    summary,
    contentType: ct,
    observationAngle: angle,
    insightTags: tags,
    postBreakdown,
    contributedSkillId: lens.skillId,
    lens: input.lens,
  };
}

function truncate(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n).trim() + "…";
}

export const SKILLS = [
  {
    id: "comment-hunter",
    name: "Comment Hunter",
    desc: "You consistently spot what makes audiences want to reply.",
    threshold: 2,
  },
  {
    id: "emotion-catcher",
    name: "Emotion Catcher",
    desc: "You read the emotional undertone behind everyday posts.",
    threshold: 4,
  },
  {
    id: "commercial-instinct",
    name: "Commercial Instinct",
    desc: "You sense conversion potential before metrics show it.",
    threshold: 7,
  },
  {
    id: "trend-radar",
    name: "Trend Radar",
    desc: "You catch micro-trends earlier than the feed surfaces them.",
    threshold: 11,
  },
  {
    id: "risk-sentinel",
    name: "Risk Sentinel",
    desc: "You notice where content brushes against a risk line.",
    threshold: 14,
  },
];

export const XP_PER_ENTRY = 18;

export function xpFor(entries: number) {
  // each entry = 18 xp; level every 60
  const xp = entries * 18;
  const level = Math.floor(xp / 60) + 1;
  const xpInLevel = xp % 60;
  return { xp, level, xpInLevel, xpToNext: 60 };
}

export function unlockedFromCount(count: number): string[] {
  return SKILLS.filter((s) => count >= s.threshold).map((s) => s.id);
}
