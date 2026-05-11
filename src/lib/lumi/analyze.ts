import type { Analysis } from "./types";

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
}

export function mockAnalyze(input: AnalyzeInput): Analysis {
  const seed = hashSeed(
    (input.link ?? "") +
      (input.title ?? "") +
      (input.content ?? "") +
      input.observation,
  );
  const ct = contentTypes[seed % contentTypes.length];
  const angle = angles[(seed >> 3) % angles.length];
  const tags = pick(tagBank, 3 + (seed % 1)).slice(0, 3);

  const titleHint = input.title?.trim() || input.link?.trim() || "the post";
  const contentHint = input.content?.trim().slice(0, 60) || "";

  const postBreakdown = input.content
    ? `Reads as a first-person narrative built around "${truncate(titleHint, 28)}". The author leans on small concrete details (${contentHint ? truncate(contentHint, 40) + "…" : "step-by-step rituals"}) to create intimacy rather than authority — a high-trust pattern for Xiaohongshu's algorithm.`
    : input.title
      ? `From the title alone, "${truncate(titleHint, 36)}" signals a ${ct.toLowerCase()} angle. The wording is conversational and curiosity-driven, fitting the platform's save-and-revisit behavior.`
      : `Limited post context provided. Inferring from the linked source, this likely sits in the ${ct.toLowerCase()} cluster.`;

  const summary = `A ${ct.toLowerCase()} note that uses ${angle.toLowerCase()} to land. Combined with your read — "${truncate(input.observation, 50)}" — Lumi sees a clear pattern of ${tags[0]?.toLowerCase() || "personal voice"}.`;

  const contributedSkillId = inferSkill(ct, angle, tags);

  return {
    summary,
    contentType: ct,
    observationAngle: angle,
    insightTags: tags,
    postBreakdown,
    contributedSkillId,
  };
}

function inferSkill(ct: string, angle: string, tags: string[]): string {
  const blob = (ct + " " + angle + " " + tags.join(" ")).toLowerCase();
  if (/comment|save-rate|hook|template/.test(blob)) return "comment-hunter";
  if (/emotion|healing|vulnerab|resonance/.test(blob)) return "emotion-catcher";
  if (/product|review|conversion|commercial|budget/.test(blob))
    return "commercial-instinct";
  if (/trend|niche|micro|aesthetic|anti-/.test(blob)) return "trend-radar";
  return "comment-hunter";
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
];

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
