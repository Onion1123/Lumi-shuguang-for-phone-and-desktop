import { motion } from "framer-motion";
import type { JournalEntry } from "@/lib/lumi/types";
import { SKILLS } from "@/lib/lumi/analyze";
import { NotebookText, Sparkles } from "lucide-react";

export function Journal({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl">Journal</h2>
          <p className="text-xs text-muted-foreground">
            Your observation timeline
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {entries.length} {entries.length === 1 ? "note" : "notes"}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <NotebookText className="size-7 text-muted-foreground" />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Your saved observations will land here as a quiet timeline,
            newest first.
          </p>
        </div>
      ) : (
        <ol className="space-y-3">
          {entries.map((e, i) => {
            const skill = SKILLS.find(
              (s) => s.id === e.analysis.contributedSkillId,
            );
            const headline =
              e.title ||
              e.content?.slice(0, 80) ||
              e.link ||
              "Untitled note";
            const tags = e.analysis.insightTags.slice(0, 2);
            return (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="line-clamp-1 text-sm font-semibold">
                    {headline}
                  </div>
                  <div className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {formatRelative(e.createdAt)}
                  </div>
                </div>

                <div className="mt-2 line-clamp-2 rounded-lg border border-dashed border-border bg-surface px-2.5 py-1.5 text-[11.5px] italic leading-snug text-muted-foreground">
                  "{e.observation}"
                </div>

                <div className="mt-2.5 text-[11px] text-foreground/75">
                  <span className="text-muted-foreground">Angle · </span>
                  {e.analysis.observationAngle}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-accent/40 px-2 py-0.5 text-[10px] font-medium text-accent-foreground"
                    >
                      # {t}
                    </span>
                  ))}
                  {skill && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <Sparkles className="size-2.5" />
                      {skill.name}
                    </span>
                  )}
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
