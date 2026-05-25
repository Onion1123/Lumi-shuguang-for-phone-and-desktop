import type { JournalEntry, LensId } from "./types";
import { getLens } from "./analyze";

export interface Pattern {
  id: string;
  lensId: LensId;
  title: string;
  summary: string;
  evidence: string[];
  count: number;
  isPreset?: boolean;
}

// Threshold for auto-generating a pattern card from user entries in the same lens.
export const PATTERN_THRESHOLD = 3;

// Fixed preset pattern card. Always visible in 广场.
export const PRESET_PATTERNS: Pattern[] = [
  {
    id: "restrained-seeding",
    lensId: "commercial-traces",
    title: "克制型种草正在跑赢硬广",
    summary:
      "5 位观察者本周记录到：高赞内容用「不种草」开场反而提升了转化点击。",
    evidence: [
      "开头先劝退某类购买，反而让后半段推荐显得更可信。",
      "标题里出现「这次真的不是广告」类词，互动反而更高。",
    ],
    count: 5,
    isPreset: true,
  },
];

function pickKeywords(observation: string): string {
  // crude keyword extraction: take the first meaningful clause
  const cleaned = observation.replace(/\s+/g, "").trim();
  if (cleaned.length <= 16) return cleaned;
  // try to split by Chinese punctuation
  const parts = observation.split(/[，。；！？,;.!?]/).filter(Boolean);
  const first = parts[0]?.trim() ?? observation;
  return first.length > 22 ? first.slice(0, 22) + "…" : first;
}

export function getDynamicPatterns(entries: JournalEntry[]): Pattern[] {
  const byLens = new Map<LensId, JournalEntry[]>();
  for (const e of entries) {
    const arr = byLens.get(e.analysis.lens) ?? [];
    arr.push(e);
    byLens.set(e.analysis.lens, arr);
  }

  const out: Pattern[] = [];
  for (const [lensId, list] of byLens) {
    if (list.length < PATTERN_THRESHOLD) continue;
    const lens = getLens(lensId);
    // newest first — entries are typically prepended already
    const sorted = [...list].sort((a, b) => b.createdAt - a.createdAt);
    const keywords = sorted
      .slice(0, 3)
      .map((e) => pickKeywords(e.observation))
      .filter(Boolean);
    const title = `${lens.short}下反复出现的判断：${keywords[0] ?? lens.short}`;
    const summary = `你在「${lens.short}」视角下累计记录了 ${list.length} 条观察，Lumi 把其中反复出现的信号提炼成了这条规律。`;
    const evidence = sorted.slice(0, 4).map((e) => e.observation);
    out.push({
      id: `dynamic-${lensId}`,
      lensId,
      title,
      summary,
      evidence,
      count: list.length,
    });
  }
  return out;
}

export function getAllPatterns(entries: JournalEntry[]): Pattern[] {
  return [...PRESET_PATTERNS, ...getDynamicPatterns(entries)];
}

export function getPattern(
  id: string,
  entries: JournalEntry[] = [],
): Pattern | undefined {
  return getAllPatterns(entries).find((p) => p.id === id);
}

// Map: lensId -> dynamic pattern id, when entry has been "contributed" to a pattern.
export function getContributionMap(
  entries: JournalEntry[],
): Map<LensId, string> {
  const map = new Map<LensId, string>();
  for (const p of getDynamicPatterns(entries)) {
    map.set(p.lensId, p.id);
  }
  return map;
}
