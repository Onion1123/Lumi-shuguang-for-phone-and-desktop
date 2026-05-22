import { motion } from "framer-motion";
import type { JournalEntry } from "@/lib/lumi/types";
import { SKILLS, getLens } from "@/lib/lumi/analyze";
import { NotebookText, Sparkles, ScanLine } from "lucide-react";
import { PatternCard } from "./PatternCard";

export function Journal({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl">Observation Log</h2>
          <p className="text-xs text-muted-foreground">
            A record of judgment, lens by lens
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <NotebookText className="size-7 text-muted-foreground" />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Your filed observations will land here — newest first, each one
            tagged by the lens you used.
          </p>
        </div>
      ) : (
        <ol className="space-y-3">
          {entries.map((e, i) => {
            const skill = SKILLS.find(
              (s) => s.id === e.analysis.contributedSkillId,
            );
            const lens = getLens(e.analysis.lens);
            const snippet =
              e.title || e.content?.slice(0, 70) || e.link || "Untitled note";
            const tags = e.analysis.insightTags.slice(0, 2);
            return (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                {/* 1. Lens + 2. Skill contributed (top meta row) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    <ScanLine className="size-2.5" />
                    {lens.label}
                  </span>
                  {skill && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                      <Sparkles className="size-2.5" />
                      {skill.name}
                    </span>
                  )}
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                    {formatRelative(e.createdAt)}
                  </span>
                </div>

                {/* 3. User observation — the hero */}
                <blockquote className="mt-3 border-l-2 border-primary/60 pl-3 font-display text-[15px] leading-snug text-foreground">
                  "{e.observation}"
                </blockquote>

                {/* 4. AI tags */}
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground/70"
                      >
                        # {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* 5. Original post (secondary, evidence) */}
                <div className="mt-3 line-clamp-1 border-t border-dashed border-border pt-2 text-[10.5px] text-muted-foreground/80">
                  <span className="uppercase tracking-wider">Source · </span>
                  {snippet}
                </div>
              </motion.li>
            );
          })}
        </ol>
      )}
    </div>
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
  if (d < 7) return `${d}d`;
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
