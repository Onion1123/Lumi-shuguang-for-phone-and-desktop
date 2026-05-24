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
      "comment-signals": "评论区信号",
      "emotional-resonance": "情绪共鸣",
      "commercial-traces": "商业化痕迹",
      "trend-shift": "趋势变化",
      "risk-boundary": "风险边界",
    },
    lensHint: {
      "comment-signals": "看评论区到底在透露什么。",
      "emotional-resonance": "追一下笔记背后的情绪暗流。",
      "commercial-traces": "识别表面之下的转化逻辑。",
      "trend-shift": "在大家都察觉之前抓到苗头。",
      "risk-boundary": "留意内容是不是在擦风险的边。",
    },
    workspaceSubtitle: "贴一篇内容，选一个视角，写下一句你真实的判断。",
    analysisHeaderChip: "结构化解读",
    analysisEmptyTitle: "结构化解读会出现在这里",
    analysisEmptyBody:
      "选一个视角，写下一句真实的观察。Lumi 只是帮你整理判断，不会替你判断。",
    loadingTitle: "Lumi 正在整理…",
    loadingStages: [
      "正在阅读这篇内容…",
      "用你选的视角逐句对照…",
      "把你的一句话观察结构化…",
      "提炼洞察标签…",
    ],
    structuredJudgmentHelper:
      "基于你的一句话观察，Lumi 把信号整理成可以复用的判断。",
    xpFooter: "已归档到观察日志",
    journalTitle: "观察日志",
    journalSubtitle: "按视角整理的判断记录",
    journalEmpty:
      "你归档的观察会出现在这里 —— 最新的在最上方，每条都按你用的视角自动打标签。",
    petBubbles: [
      "已归档。",
      "已加入记录。",
      "规律已保存。",
      "+1 更锋利了。",
    ],
    skillUnlockedPrefix: "技能解锁",
  },
  warm: {
    lensLabel: {
      "comment-signals": "评论区有点不对劲",
      "emotional-resonance": "这戳到情绪了",
      "commercial-traces": "感觉是软广",
      "trend-shift": "我反复看到这个套路",
      "risk-boundary": "感觉有点踩线",
    },
    lensHint: {
      "comment-signals": "我们一起看看评论区到底在搞什么。",
      "emotional-resonance": "有什么东西轻轻拉了你一下 —— 我们把它说出来。",
      "commercial-traces": "看着挺正常，但好像在悄悄卖东西。",
      "trend-shift": "你已经不是第一次看到这个形状了，对吧？",
      "risk-boundary": "小心一点 —— 这里有条线被踩了。",
    },
    workspaceSubtitle:
      "随手丢一篇内容进来，挑一种感觉，写一句心里话。",
    analysisHeaderChip: "我听到的是这样",
    analysisEmptyTitle: "我会在这里帮你把想法理一理",
    analysisEmptyBody:
      "挑一种感觉，写一句心里话。我会帮你把你已经感觉到的东西，落成文字。",
    loadingTitle: "稍等，我陪你一起读…",
    loadingStages: [
      "陪你一起读一遍这篇内容…",
      "试试你挑的那种感觉…",
      "把你的直觉落成文字…",
      "顺手贴几个标签…",
    ],
    structuredJudgmentHelper:
      "把你的一句话感想，温柔地整理成可以回头再看的判断。",
    xpFooter: "已悄悄收进日志",
    journalTitle: "我的观察日志",
    journalSubtitle: "那些被你注意到的小事，都在这里",
    journalEmpty:
      "你注意到的事会慢慢汇集在这里 —— 最新的在最上方，保留你说话的语气。",
    petBubbles: [
      "收到，已收好。",
      "悄悄收起来了 ♡",
      "我也注意到了。",
      "我们一起变敏锐了。",
    ],
    skillUnlockedPrefix: "看，我们解锁了",
  },
};

export function getCopy(style: ToneStyle | undefined): ToneCopy {
  return COPY[style ?? "professional"];
}

export function lensLabel(id: LensId, style: ToneStyle | undefined): string {
  return getCopy(style).lensLabel[id];
}
