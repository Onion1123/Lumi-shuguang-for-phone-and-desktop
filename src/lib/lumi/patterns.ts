import type { LensId } from "./types";

export interface Pattern {
  id: string;
  lensId: LensId;
  title: string;
  summary: string;
  evidence: string[];
  count: number;
}

export const PATTERNS: Pattern[] = [
  {
    id: "comments-business",
    lensId: "comment-signals",
    title: "正文无害，评论区在做生意",
    summary:
      "最近 4 条观察里，你反复注意到：正文看起来像普通分享，但真正的转化动作开始转移到评论区完成。",
    evidence: [
      "博主正文没带货，但前排评论已经在问链接。",
      "内容本身很克制，商业意图主要藏在评论互动里。",
      "评论区出现了重复的「求同款」话术，像是在引导他人提问。",
      "高赞回复里集中出现品牌词，正文却完全不提。",
    ],
    count: 4,
  },
  {
    id: "restrained-seeding",
    lensId: "commercial-traces",
    title: "克制型种草正在跑赢硬广",
    summary:
      "5 位观察者本周记录到：高赞内容用「不种草」开场反而提升了转化点击。",
    evidence: [
      "开头先劝退某类购买，反而让后半段推荐显得更可信。",
      "标题里出现「这次真的不是广告」类词，互动反而更高。",
      "评论区主动复述博主的「劝退」话术，形成二次传播。",
    ],
    count: 5,
  },
  {
    id: "neighborhood-citywalk",
    lensId: "trend-shift",
    title: "城市漫步在向街区级颗粒度下沉",
    summary:
      "趋势雷达板块里，3 位观察者独立提到「街区名」开始替代「城市名」成为搜索锚点。",
    evidence: [
      "首图标题从「上海 citywalk」变成「愚园路一日」。",
      "出现以小红书地标命名的非官方街区标签。",
      "高互动笔记开始锁定 1-2 个街区而非整座城市。",
    ],
    count: 3,
  },
];

export function getPattern(id: string): Pattern | undefined {
  return PATTERNS.find((p) => p.id === id);
}
