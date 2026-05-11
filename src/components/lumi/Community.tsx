import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lock, Send, Sparkles, Trophy } from "lucide-react";
import type {
  BoardPost,
  Companion,
  CompanionType,
  JournalEntry,
} from "@/lib/lumi/types";
import { SKILLS } from "@/lib/lumi/analyze";
import { PetAvatar } from "./PetAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Props {
  companion: Companion;
  entries: JournalEntry[];
  myBoardPosts: BoardPost[];
  onPost: (post: BoardPost) => void;
}

interface Member {
  id: string;
  name: string;
  type: CompanionType;
  bySkill: Record<string, number>; // entries per skill
  isMe?: boolean;
}

const seedMembers: Member[] = [
  {
    id: "yuki",
    name: "Yuki",
    type: "cat",
    bySkill: {
      "comment-hunter": 12,
      "emotion-catcher": 9,
      "commercial-instinct": 8,
      "trend-radar": 9,
    },
  },
  {
    id: "mochi",
    name: "Mochi",
    type: "dog",
    bySkill: {
      "comment-hunter": 4,
      "emotion-catcher": 3,
      "commercial-instinct": 18,
      "trend-radar": 2,
    },
  },
  {
    id: "boxy",
    name: "Boxy",
    type: "box",
    bySkill: {
      "comment-hunter": 11,
      "emotion-catcher": 6,
      "commercial-instinct": 1,
      "trend-radar": 4,
    },
  },
  {
    id: "fizz",
    name: "Fizz",
    type: "soda",
    bySkill: {
      "comment-hunter": 2,
      "emotion-catcher": 14,
      "commercial-instinct": 3,
      "trend-radar": 1,
    },
  },
  {
    id: "pumpkin",
    name: "Pumpkin",
    type: "cat",
    bySkill: {
      "comment-hunter": 1,
      "emotion-catcher": 1,
      "commercial-instinct": 0,
      "trend-radar": 16,
    },
  },
];

const seedBoardPosts: Record<string, BoardPost[]> = {
  "comment-hunter": [
    {
      id: "p1",
      skillId: "comment-hunter",
      author: "Yuki",
      authorType: "cat",
      createdAt: Date.now() - 1000 * 60 * 32,
      text: "Notes ending with 'tell me what I missed' are pulling 3x replies this week.",
      replies: 12,
    },
    {
      id: "p2",
      skillId: "comment-hunter",
      author: "Boxy",
      authorType: "box",
      createdAt: Date.now() - 1000 * 60 * 60 * 4,
      text: "Stop using questions in titles. Move them to the last line of body copy.",
      replies: 7,
    },
  ],
  "emotion-catcher": [
    {
      id: "p3",
      skillId: "emotion-catcher",
      author: "Fizz",
      authorType: "soda",
      createdAt: Date.now() - 1000 * 60 * 90,
      text: "The 'I almost gave up' opener is having a moment in fitness notes.",
      replies: 9,
    },
    {
      id: "p4",
      skillId: "emotion-catcher",
      author: "Yuki",
      authorType: "cat",
      createdAt: Date.now() - 1000 * 60 * 60 * 7,
      text: "Vulnerability without resolution is what's actually saving — not motivation.",
      replies: 14,
    },
  ],
  "commercial-instinct": [
    {
      id: "p5",
      skillId: "commercial-instinct",
      author: "Mochi",
      authorType: "dog",
      createdAt: Date.now() - 1000 * 60 * 45,
      text: "Beauty notes with a 'don't buy this' framing convert better than tutorials right now.",
      replies: 18,
    },
    {
      id: "p6",
      skillId: "commercial-instinct",
      author: "Mochi",
      authorType: "dog",
      createdAt: Date.now() - 1000 * 60 * 60 * 11,
      text: "Watching budget-aesthetic creators — that cluster is being primed for brand seeding.",
      replies: 6,
    },
  ],
  "trend-radar": [
    {
      id: "p7",
      skillId: "trend-radar",
      author: "Pumpkin",
      authorType: "cat",
      createdAt: Date.now() - 1000 * 60 * 20,
      text: "Niche citywalk is fragmenting into neighborhood-level micro-trends. Hannam-dong is one.",
      replies: 11,
    },
    {
      id: "p8",
      skillId: "trend-radar",
      author: "Pumpkin",
      authorType: "cat",
      createdAt: Date.now() - 1000 * 60 * 60 * 3,
      text: "Anti-haul is bleeding from beauty into home and food. Worth tracking next week.",
      replies: 5,
    },
  ],
};

export function Community({ companion, entries, myBoardPosts, onPost }: Props) {
  const [openBoard, setOpenBoard] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const me: Member = useMemo(() => {
    const bySkill: Record<string, number> = {
      "comment-hunter": 0,
      "emotion-catcher": 0,
      "commercial-instinct": 0,
      "trend-radar": 0,
    };
    for (const e of entries) {
      const id = e.analysis.contributedSkillId;
      bySkill[id] = (bySkill[id] ?? 0) + 1;
    }
    return {
      id: "me",
      name: companion.name,
      type: companion.type,
      bySkill,
      isMe: true,
    };
  }, [companion, entries]);

  const allMembers = useMemo(() => [...seedMembers, me], [me]);

  // Featured: most total skills unlocked, and top single-skill mastery
  const totalSkillsOf = (m: Member) =>
    SKILLS.filter((s) => (m.bySkill[s.id] ?? 0) >= s.threshold).length;
  const topMasteryOf = (m: Member) =>
    Math.max(...Object.values(m.bySkill), 0);

  const topAllSkills = [...allMembers].sort(
    (a, b) =>
      totalSkillsOf(b) - totalSkillsOf(a) || topMasteryOf(b) - topMasteryOf(a),
  )[0];
  const topSingleSkill = [...allMembers]
    .filter((m) => m.id !== topAllSkills.id)
    .sort((a, b) => topMasteryOf(b) - topMasteryOf(a))[0];

  const myUnlocked = new Set(
    SKILLS.filter((s) => entries.length >= s.threshold).map((s) => s.id),
  );

  if (openBoard) {
    const skill = SKILLS.find((s) => s.id === openBoard)!;
    const posts = [
      ...myBoardPosts.filter((p) => p.skillId === openBoard),
      ...(seedBoardPosts[openBoard] ?? []),
    ].sort((a, b) => b.createdAt - a.createdAt);

    return (
      <div className="flex h-full flex-col">
        <button
          onClick={() => {
            setOpenBoard(null);
            setDraft("");
          }}
          className="mb-3 inline-flex items-center gap-1.5 self-start text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to community
        </button>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <div className="font-display text-lg leading-none">
              {skill.name}
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{skill.desc}</p>
        </div>

        <ol className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
          {posts.map((p) => (
            <li
              key={p.id}
              className={cn(
                "rounded-2xl border border-border p-3",
                p.isMe ? "bg-gradient-warm" : "bg-card",
              )}
            >
              <div className="flex items-center gap-2">
                <PetAvatar type={p.authorType} size={24} />
                <span className="text-xs font-semibold">{p.author}</span>
                {p.isMe && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-medium text-primary">
                    you
                  </span>
                )}
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                  {formatRelative(p.createdAt)} · {p.replies} replies
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-snug text-foreground/85">
                {p.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-3 rounded-2xl border border-border bg-card p-2 shadow-soft">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Share a quick read with the ${skill.name} board…`}
            rows={2}
            className="resize-none rounded-xl border-0 bg-transparent text-sm focus-visible:ring-0"
          />
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-[10px] text-muted-foreground">
              Posting as {companion.name}
            </span>
            <Button
              size="sm"
              disabled={!draft.trim()}
              onClick={() => {
                onPost({
                  id: crypto.randomUUID(),
                  skillId: openBoard,
                  author: companion.name,
                  authorType: companion.type,
                  isMe: true,
                  createdAt: Date.now(),
                  text: draft.trim(),
                  replies: 0,
                });
                setDraft("");
              }}
              className="h-8 gap-1.5 rounded-full bg-gradient-primary px-3 text-xs"
            >
              <Send className="size-3" /> Post
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl">Community</h2>
          <p className="text-xs text-muted-foreground">
            Observers, ranked by sharpness
          </p>
        </div>
      </div>

      {/* Featured leaderboard */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="mb-3 flex items-center gap-1.5">
          <Trophy className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            This week's featured
          </span>
        </div>
        <ul className="space-y-2">
          <FeaturedRow
            label="Most skills"
            member={topAllSkills}
            metric={`${totalSkillsOf(topAllSkills)} / ${SKILLS.length} skills`}
          />
          <FeaturedRow
            label="You"
            member={me}
            metric={`${totalSkillsOf(me)} / ${SKILLS.length} skills · ${entries.length} notes`}
            highlight
          />
          <FeaturedRow
            label="Top mastery"
            member={topSingleSkill}
            metric={`${topMasteryOf(topSingleSkill)} notes in one skill`}
          />
        </ul>
      </div>

      {/* Skill boards */}
      <div className="mt-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Skill boards
          </span>
          <span className="text-[10px] text-muted-foreground">
            {myUnlocked.size}/{SKILLS.length} unlocked
          </span>
        </div>
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {SKILLS.map((s) => {
              const unlocked = myUnlocked.has(s.id);
              const memberCount =
                seedMembers.filter((m) => (m.bySkill[s.id] ?? 0) >= s.threshold)
                  .length + (unlocked ? 1 : 0);
              const recent =
                myBoardPosts.find((p) => p.skillId === s.id) ??
                seedBoardPosts[s.id]?.[0];
              return (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && setOpenBoard(s.id)}
                    className={cn(
                      "group flex w-full flex-col gap-1.5 rounded-2xl border p-3 text-left transition-all",
                      unlocked
                        ? "border-border bg-card hover:border-primary/40 hover:shadow-soft"
                        : "cursor-not-allowed border-dashed border-border bg-surface/40 opacity-70",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {unlocked ? (
                        <Sparkles className="size-3.5 text-primary" />
                      ) : (
                        <Lock className="size-3.5 text-muted-foreground" />
                      )}
                      <span className="text-sm font-semibold">{s.name}</span>
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                        {unlocked
                          ? `${memberCount} members`
                          : `unlocks @ ${s.threshold}`}
                      </span>
                    </div>
                    {recent && (
                      <p className="line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">
                        {unlocked
                          ? `"${recent.text}"`
                          : "Unlock this skill to read what members are sharing."}
                      </p>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function FeaturedRow({
  label,
  member,
  metric,
  highlight,
}: {
  label: string;
  member: Member;
  metric: string;
  highlight?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border p-2.5",
        highlight
          ? "border-primary/40 bg-gradient-warm"
          : "border-border bg-surface/50",
      )}
    >
      <PetAvatar type={member.type} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="truncate text-sm font-semibold">{member.name}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
        <div className="truncate text-[11px] text-muted-foreground">
          {metric}
        </div>
      </div>
    </li>
  );
}

function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
