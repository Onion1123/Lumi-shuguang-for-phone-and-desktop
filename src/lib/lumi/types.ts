export type CompanionType = "cat" | "dog" | "box" | "soda";

export type LensId =
  | "comment-signals"
  | "emotional-resonance"
  | "commercial-traces"
  | "trend-shift"
  | "risk-boundary";

export type CompanionStyle = "professional" | "warm";

export interface Companion {
  type: CompanionType;
  name: string;
  style: CompanionStyle;
  xp: number;
  level: number;
  unlockedSkills: string[];
}

export interface Analysis {
  summary: string;
  contentType: string;
  observationAngle: string;
  insightTags: string[];
  postBreakdown: string;
  contributedSkillId: string;
  lens: LensId;
}

export interface JournalEntry {
  id: string;
  createdAt: number;
  link?: string;
  title?: string;
  content?: string;
  observation: string;
  analysis: Analysis;
}

export interface BoardPost {
  id: string;
  skillId: string;
  author: string;
  authorType: CompanionType;
  isMe?: boolean;
  createdAt: number;
  text: string;
  replies: number;
}

export type ViewKey = "workspace" | "journal" | "community";
