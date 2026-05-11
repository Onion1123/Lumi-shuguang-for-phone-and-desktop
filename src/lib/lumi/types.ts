export type CompanionType = "cat" | "dog" | "box" | "soda";

export interface Companion {
  type: CompanionType;
  name: string;
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

export type ViewKey = "workspace" | "journal" | "community";
