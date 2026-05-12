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
    },
  },
];

export function pickRandomSample(): SamplePost {
  return samplePosts[Math.floor(Math.random() * samplePosts.length)];
}
