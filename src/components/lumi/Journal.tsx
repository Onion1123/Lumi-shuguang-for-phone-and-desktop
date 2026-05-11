import { motion } from "framer-motion";
import type { Companion, JournalEntry } from "@/lib/lumi/types";
import { SKILLS, xpFor } from "@/lib/lumi/analyze";
import { PetAvatar } from "./PetAvatar";
import { Sparkles, NotebookText } from "lucide-react";

interface Props {
  companion: Companion;
  entries: JournalEntry[];
}

export function Journal({ companion, entries }: Props) {
  const { level, xpInLevel, xpToNext, xp } = xpFor(entries.length);
  const pct = Math.min(100, (xpInLevel / xpToNext) * 100);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <PetAvatar type={companion.type} size={64} />
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Your companion
              </div>
              <div className="font-display text-2xl">{companion.name}</div>
              <div className="text-sm text-muted-foreground">
                Level {level} · {xp} XP · {entries.length} observations saved
              </div>
            </div>
          </div>
          <div className="w-full max-w-xs">
            <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
              <span>Toward next level</span>
              <span>
                {xpInLevel}/{xpToNext}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-primary"
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => {
            const unlocked = entries.length >= s.threshold;
            return (
              <div
                key={s.id}
                className={
                  "rounded-2xl border p-4 transition-all " +
                  (unlocked
                    ? "border-primary/30 bg-gradient-warm shadow-soft"
                    : "border-dashed border-border bg-surface/40 opacity-70")
                }
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="size-3.5 text-primary" />
                  {s.name}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground">
                  {s.desc}
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {unlocked
                    ? "Unlocked"
                    : `Unlocks at ${s.threshold} observations`}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl">Observation timeline</h2>
          <span className="text-xs text-muted-foreground">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/60 p-12 text-center">
            <NotebookText className="size-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              Your saved observations will appear here as a quiet timeline.
            </p>
          </div>
        ) : (
          <ol className="space-y-3">
            {entries.map((e, i) => (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">
                    {e.title || e.link || "Untitled note"}
                  </div>
                  <div className="shrink-0 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {formatDate(e.createdAt)}
                  </div>
                </div>
                <div className="mt-2 rounded-xl border border-dashed border-border bg-surface px-3 py-2 text-xs italic text-muted-foreground">
                  "{e.observation}"
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  {e.analysis.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Tag>{e.analysis.contentType}</Tag>
                  <Tag>{e.analysis.observationAngle}</Tag>
                  {e.analysis.insightTags.map((t) => (
                    <Tag key={t} muted>
                      # {t}
                    </Tag>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function Tag({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={
        "rounded-full px-2.5 py-0.5 text-[11px] " +
        (muted
          ? "bg-secondary text-secondary-foreground"
          : "bg-accent/50 text-accent-foreground")
      }
    >
      {children}
    </span>
  );
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
