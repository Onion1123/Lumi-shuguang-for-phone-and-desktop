import { motion } from "framer-motion";
import type { Companion } from "@/lib/lumi/types";
import { PetAvatar } from "./PetAvatar";
import { Trophy, MessageCircle } from "lucide-react";

interface Props {
  companion: Companion;
  myCount: number;
}

const seed = [
  { name: "Yuki", type: "cat", count: 38, blurb: "Living for slow-living tags this week." },
  { name: "Mochi", type: "dog", count: 27, blurb: "Caught a micro-trend in skincare reviews." },
  { name: "Boxy", type: "box", count: 22, blurb: "Quiet observer. Sharpest comment-bait radar." },
  { name: "Fizz", type: "soda", count: 19, blurb: "Loves anything with a budget-aesthetic angle." },
  { name: "Pumpkin", type: "cat", count: 14, blurb: "First to flag emotional-resonance posts." },
] as const;

const chats = [
  { who: "Yuki", text: "Anyone else seeing a 'anti-haul' wave on the food side?" },
  { who: "Mochi", text: "+1. Captions are starting with 'I almost bought…' a lot." },
  { who: "Boxy", text: "Saved 3 of those today. Tagged them as anti-mainstream." },
  { who: "Fizz", text: "Going to test a budget-aesthetic angle on my own draft." },
];

export function Community({ companion, myCount }: Props) {
  const list = [
    ...seed.map((s) => ({ ...s, isMe: false })),
    {
      name: companion.name,
      type: companion.type,
      count: myCount,
      blurb: "That's you — every observation moves your rank.",
      isMe: true,
    },
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="mb-4 flex items-center gap-2">
          <Trophy className="size-4 text-primary" />
          <h2 className="font-display text-xl">This week's observers</h2>
        </div>
        <ol className="space-y-2">
          {list.map((p, i) => (
            <li
              key={p.name + i}
              className={
                "flex items-center gap-3 rounded-2xl border p-3 " +
                (p.isMe
                  ? "border-primary/40 bg-gradient-warm"
                  : "border-border bg-surface/50")
              }
            >
              <div className="w-6 text-center text-sm font-semibold text-muted-foreground">
                {i + 1}
              </div>
              <PetAvatar type={p.type} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="truncate text-sm font-semibold">
                    {p.name}
                  </span>
                  {p.isMe && (
                    <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      you
                    </span>
                  )}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {p.blurb}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold tabular-nums">
                  {p.count}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  notes
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="size-4 text-primary" />
          <h2 className="font-display text-xl">Lounge</h2>
        </div>
        <ul className="flex-1 space-y-3">
          {chats.map((c, i) => (
            <li key={i} className="flex items-start gap-3">
              <PetAvatar
                type={
                  (seed.find((s) => s.name === c.who)?.type ?? "cat") as
                  | "cat" | "dog" | "box" | "soda"
                }
                size={28}
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold">{c.who}</div>
                <div className="rounded-2xl rounded-tl-sm bg-surface-soft px-3 py-2 text-sm text-foreground/85">
                  {c.text}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface/60 px-3 py-2 text-center text-xs text-muted-foreground">
          Lounge is read-only in this preview.
        </div>
      </motion.section>
    </div>
  );
}
