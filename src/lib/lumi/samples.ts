export interface SamplePost {
  link: string;
  title: string;
  content: string;
}

export const samplePosts: SamplePost[] = [
  {
    link: "xhs.link/note/8821a-coffee-ritual",
    title: "我的早八续命咖啡仪式 ☕️ 一周不重样",
    content:
      "上班第三年终于学会对自己好一点。每天早上花十分钟做一杯手冲，从磨豆开始整个房间都是香的。本周尝试了埃塞俄比亚耶加雪菲、肯尼亚AA、还有一支日晒花魁，分享给同样需要被治愈的姐妹们～附上我的器具清单和水温表，新手也能复刻🤍",
  },
  {
    link: "xhs.link/note/77a2-seoul-citywalk",
    title: "首尔 Citywalk｜在汉南洞慢慢走完一个下午",
    content:
      "不打卡热门景点的旅行才是真正的放松。汉南洞的小巷藏着太多惊喜：独立香水店、买手买手店、还有可以坐一下午的咖啡馆。今天走了快两万步，吃了三家小店，路线图放评论区～强烈推荐周中来，人少又出片。",
  },
  {
    link: "xhs.link/note/91c8-skincare-truth",
    title: "敏感肌一年踩雷复盘｜这些大牌真的别买",
    content:
      "作为一个被广告骗过无数次的混敏皮，今年痛定思痛把所有用过的产品做了表格。不是黑某品牌，是想说成分比品牌重要。重点提醒：含香精+酒精的'网红'乳液真的别碰。后面也会出一篇平价好用清单，记得关注哦～",
  },
  {
    link: "xhs.link/note/55be-wfh-setup",
    title: "999元打造的居家办公角，真的不输宜家",
    content:
      "租房党表示不想砸钱搞装修，但又想要好看的工位。在闲鱼淘了个原木桌板，宜家的桌腿，加一盏暖光小灯，整体下来不到一千。摆上一束尤加利和一杯燕麦拿铁，氛围感直接拉满。详细清单见图9～",
  },
  {
    link: "xhs.link/note/40df-baking-fail",
    title: "第一次做巴斯克｜翻车现场也很可爱",
    content:
      "看了二十个教程信誓旦旦下厨房，结果烤出来像一块焦糖色火山。但是！意外地超级好吃，外焦内嫩，奶香爆炸。失败原因总结放在最后，下次一定成功。烘焙真的是治愈系副业，推荐每个上班族都试试。",
  },
  {
    link: "xhs.link/note/12fa-running-diary",
    title: "30岁开始跑步｜从500米到10公里的100天",
    content:
      "起因是体检报告吓到了我。第一天连小区两圈都跑不下来，喘得像快不行了。坚持每周三次，配速从7'30慢慢到5'50，最大的变化不是体重，是睡眠和情绪。运动真的是最便宜的抗抑郁药。",
  },
];

export function pickRandomSample(): SamplePost {
  return samplePosts[Math.floor(Math.random() * samplePosts.length)];
}
