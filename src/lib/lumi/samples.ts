import type { Analysis } from "./types";

export interface SamplePost {
  link: string;
  title: string;
  content: string;
  observation: string;
  analysis: Analysis;
}

export const samplePosts: SamplePost[] = [
  {
    link: "xhs.link/note/sample-01-campus-exit",
    title: "经验贴｜大厂校招一年跑路指南",
    content:
      "当年组内一起校招入职的6人基本都跑路了。年终奖正常绩效，薪资涨了15%但被应届生倒挂，升职要看老板关系。最后拿了涨薪40%的包跳走了，社招面试比校招舒服，直接问你能做什么。",
    observation: "情绪共鸣是这类内容的真正引擎，薪资倒挂只是导火索",
    analysis: {
      summary:
        "作者以校招一年为节点离职，揭示大厂薪资倒挂、晋升内卷的结构性矛盾，以成功跳槽收尾。",
      contentType: "职场经验分享",
      observationAngle: "情绪共鸣驱动",
      insightTags: ["倒挂焦虑", "反常识结论", "职场集体情绪出口"],
      postBreakdown:
        "标题以\"跑路指南\"制造圈层感，正文用具体数字（6人、15%、40%）建立可信度，结尾的跳槽成功为同类读者提供情绪出口——典型的高保存率职场叙事。",
      contributedSkillId: "emotion-catcher",
      lens: "emotional-resonance",
    },
  },
  {
    link: "xhs.link/note/sample-02-soe-odyssey",
    title: "在国企，也有职场奥德赛时期…",
    content:
      "明明只想写代码，却被毫无预警的会议撕碎时间。用安克AI录音豆做会议记录，主要将注意力集中在分析客户需求上。ps：真心安利，最近以旧换新活动，至高补贴70元。",
    observation: "正文靠情绪共鸣建立信任，结尾的促销才是真正目的",
    analysis: {
      summary:
        "以职场困境情绪钩子切入，后半段无缝转入产品种草，结尾附促销完成转化。",
      contentType: "职场效率种草",
      observationAngle: "商业化转化路径",
      insightTags: ["情绪钩子引流", "软广结构", "品牌植入节奏"],
      postBreakdown:
        "前半段调动\"会议碎片化\"的普遍痛点建立共情，中段引入产品作为解决方案，结尾促销信息显形——三段式软广模板，植入节奏控制得很克制。",
      contributedSkillId: "commercial-instinct",
      lens: "commercial-traces",
    },
  },
  {
    link: "xhs.link/note/sample-03-探店争议",
    title: "探店博主真的好浪费食物啊",
    content:
      "在天水麻辣烫店偶遇探店博主，出锅到走仅仅用了十几分钟，不停拍摄后把食物放在那就走了，基本没动，点了满满一大盆不吃真的好浪费啊！",
    observation: "评论区的争论比正文本身更有内容，流量逻辑和道德标准在这里正面碰撞",
    analysis: {
      summary:
        "正文是旁观者视角的探店批评，评论区多方介入：探店博主自辩、普通用户道德谴责，流量逻辑与真实体验的矛盾充分展开。",
      contentType: "探店争议记录",
      observationAngle: "评论区信号",
      insightTags: ["正文引爆评论区", "流量逻辑暴露", "道德议题高赞"],
      postBreakdown:
        "正文短小但提供了完整冲突场景：浪费食物 + 探店身份。这种\"道德议题 + 行业揭露\"的组合天然引发评论区站队，正文只是火种，真正的内容生产发生在评论区。",
      contributedSkillId: "comment-hunter",
      lens: "comment-signals",
    },
  },
  {
    link: "xhs.link/note/sample-04-iq-tax",
    title: "那些年交过的智商税",
    content:
      "某一年风是刷酸，买了The Ordinary两个产品，好几年了都没用掉。涂哪都跟针扎一样，建立耐受涂了好多次依然如此，心理都有阴影了。评论区：有人空瓶3瓶说真心喜欢，品牌官号也直接入场引导购买渠道。",
    observation: "用户体验分化得很厉害，品牌选择在这时候入场评论区是一步很聪明的棋",
    analysis: {
      summary:
        "踩坑分享引发评论区用户分化，皮肤耐受差的人共鸣，皮肤好的人反驳，品牌官号适时引导购买。",
      contentType: "护肤踩坑分享",
      observationAngle: "用户分层与品牌介入",
      insightTags: ["用户体验分化", "品牌官号入场时机", "真实口碑vs种草"],
      postBreakdown:
        "负向体验帖往往激发\"反驳型评论\"，恰好把品牌从单向种草拉回真实使用场景。品牌官号选择在分化最激烈时介入，把争议转化为渠道引导，是一次高级别舆情操作。",
      contributedSkillId: "commercial-instinct",
      lens: "commercial-traces",
    },
  },
  {
    link: "xhs.link/note/sample-05-25-grad-exit",
    title: "25届大厂校招生跑路指南",
    content:
      "其实已经是大厂三年的老油条了。当年组内校招入职6人基本都跑路了。公司营收不好，这条路好像没什么希望。实际跳槽时发现大厂垂直业务背景有帮助，这一年里确实学到了东西。",
    observation: "\"跑路\"成为一种集体叙事，大厂校招吸引力的结构性下降已经是趋势了",
    analysis: {
      summary:
        "以\"跑路指南\"吸引同类群体，揭示大厂校招生高度流动现象，暗示大厂对应届生吸引力结构性下降。",
      contentType: "职场趋势观察",
      observationAngle: "趋势雷达",
      insightTags: ["应届生流动加速", "大厂光环减弱", "标题党引发共鸣"],
      postBreakdown:
        "同一作者以\"跑路指南\"为模板二次创作，说明该叙事已成为可复用的内容范式。标题中的\"25届\"将话题与新一届校招挂钩，把个人经验扩展为行业趋势观察。",
      contributedSkillId: "trend-radar",
      lens: "trend-shift",
    },
  },
  {
    link: "xhs.link/note/sample-06-bilibili-no-ai",
    title: "很难想象，b站是一个纯无AI的公司？",
    content:
      "刷到一个讨论：b站作为国内主流内容平台，几乎没有自研AI产品，也很少把AI能力嵌进创作工具里。评论区瞬间炸出来一堆人补充——有人列出b站AI相关岗位的招聘情况，有人贴出友商的AI功能对比，还有人从up主侧吐槽剪辑工具落后。正文只抛了一个问题，评论区帮它写完了答案。",
    observation: "评论区的真实声音比正文更有信息量，用户自己补出了B站AI生态的完整判断。",
    analysis: {
      summary:
        "正文只抛出一个争议性问题，真正的内容价值由评论区用户的自发补充完成，形成「正文提问、评论区答题」的结构。",
      contentType: "大厂观察 · 行业讨论",
      observationAngle: "评论区信号",
      insightTags: ["正文提问 评论区答题", "争议性钩子", "信息众包"],
      postBreakdown:
        "标题用一个反直觉判断（「纯无AI」）制造认知冲突，正文克制、不下结论，把判断空间让给评论区。这类笔记的核心价值不在正文，而在它能否触发评论区的高质量补充——一旦触发，单条笔记就变成了一个微型行业讨论现场。",
      contributedSkillId: "comment-hunter",
      lens: "comment-signals",
    },
  },
  {
    link: "xhs.link/note/sample-07-ai-blur-roles",
    title: "AI开始抹平互联网公司的岗位边界了",
    content:
      "前几天和做设计的朋友吃饭，她直接在饭桌上掏出手机，用Claude把一个产品想法做成了可点击的MVP，前后不到二十分钟。她原本只是设计师，现在等于一个人就能跑完从想法到demo的全流程。我们这一桌产品、研发、设计都安静了一下。",
    observation: "设计师用Claude做出可交互MVP这件事，让职场边界模糊的焦虑感变成了一种集体共鸣。",
    analysis: {
      summary:
        "用一个具体的饭桌细节呈现结构性变化：AI正在抹平互联网公司里产品、设计、研发之间的岗位边界。",
      contentType: "AI时代职场观察",
      observationAngle: "情绪共鸣",
      insightTags: ["结构性焦虑", "身边叙事", "岗位边界模糊"],
      postBreakdown:
        "作者没有引用数据或行业报告，而是用「饭桌上掏出手机」这种生活化场景承载一个宏观判断。这种「我身边就发生了」的叙事方式比抽象分析更容易被转发，因为它把读者直接放进了同一个饭桌。",
      contributedSkillId: "emotion-catcher",
      lens: "emotional-resonance",
    },
  },
  {
    link: "xhs.link/note/sample-08-ai-tools-roundup",
    title: "盘一下最近在用的AI工具",
    content:
      "整理了一下最近真正在日常用的几个AI工具：GPT Plus 用来写稿和查资料，Claude 用来读长文档，Cursor 写代码，Midjourney 出图。评论区很快歪楼——有人发起拼车买GPT Plus，有人甩出自己的车队群，还有人在问国内支付怎么解决。",
    observation: "评论区在讨论如何拼车买GPT Plus，内容本身成了用户找资源的入口。",
    analysis: {
      summary:
        "正文是一份克制的AI工具测评，评论区却演变成用户自发的资源互换市场，需要关注潜在的账号分发与灰色交易信号。",
      contentType: "AI工具测评",
      observationAngle: "评论区信号",
      insightTags: ["工具测评+资源互换", "评论区灰色交易", "需求自组织"],
      postBreakdown:
        "正文建立了作者「在认真用AI」的专业感，但真正驱动互动的是「这些工具怎么买」的现实门槛。评论区因此从讨论区变成了需求市场。对平台来说，这类笔记的评论区是观察账号分发与灰产链路的重要切口。",
      contributedSkillId: "comment-hunter",
      lens: "comment-signals",
    },
  },
  {
    link: "xhs.link/note/sample-09-feudal-bigtech",
    title: "互联网大厂是一个阶级森严的封建社会",
    content:
      "在大厂待了几年，越来越觉得这里的层级感不输任何传统行业：title决定话语权，汇报线决定生死，跨部门协作要先看对方级别。一条467个赞的高赞评论说「校招进来的几年过得真是简单和幸运」，下面一长串人附和，全是各自的职场创伤现场。",
    observation:
      "评论区467个赞的回复说「校招进来的几年过得真是简单和幸运」，职场创伤叙事在这里找到了最强共鸣点。",
    analysis: {
      summary:
        "标题用极端化比喻吸引点击，正文信息密度较高，但真正决定传播范围的是评论区集中爆发的职场创伤叙事。",
      contentType: "大厂职场观察",
      observationAngle: "情绪共鸣",
      insightTags: ["极端化标题", "高赞评论盖过正文", "职场创伤叙事"],
      postBreakdown:
        "「封建社会」式的标题是为算法和点击设计的，正文提供了一定的真实观察支撑可信度，但读者最终留在评论区——因为高赞回复比正文更精准地说出了他们的处境。观察这类笔记时，高赞评论往往是平台职场情绪最直接的信号源。",
      contributedSkillId: "emotion-catcher",
      lens: "emotional-resonance",
    },
  },
];

export function pickRandomSample(): SamplePost {
  return samplePosts[Math.floor(Math.random() * samplePosts.length)];
}
