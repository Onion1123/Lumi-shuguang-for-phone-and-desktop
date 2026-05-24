import { motion } from "framer-motion";
import type { CompanionStyle, JournalEntry } from "@/lib/lumi/types";
import { getLens } from "@/lib/lumi/analyze";
import { getCopy } from "@/lib/lumi/copy";
import { PATTERNS } from "@/lib/lumi/patterns";
import { PatternCard } from "./PatternCard";
import { NotebookText } from "lucide-react";

export function Journal({
  entries,
  style,
}: {
  entries: JournalEntry[];
  style?: CompanionStyle;
}) {
  const copy = getCopy(style);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl">{copy.journalTitle}</h2>
          <p className="text-xs text-muted-foreground">
            Patterns surfaced from your observations
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {PATTERNS.length} patterns
        </span>
      </div>

      {PATTERNS.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <NotebookText className="size-7 text-muted-foreground" />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {copy.journalEmpty}
          </p>
        </div>
      ) : (
        <motion.ol layout className="space-y-3">
          {PATTERNS.map((p, i) => {
            const lens = getLens(p.lensId);
            return (
              <li key={p.id}>
                <PatternCard
                  id={p.id}
                  label={i === 0 ? "Pattern surfaced" : "Pattern surfaced"}
                  lensLabel={copy.lensLabel[lens.id]}
                  title={p.title}
                  summary={p.summary}
                  evidence={p.evidence}
                  count={p.count}
                  ctaLabel="View related records"
                  variant={i === 0 ? "featured" : "featured"}
                />
              </li>
            );
          })}
        </motion.ol>
      )}

      {entries.length > 0 && (
        <p className="mt-4 text-[10.5px] text-muted-foreground/70">
          {entries.length} individual {entries.length === 1 ? "observation" : "observations"} feed into these patterns.
        </p>
      )}
    </div>
  );
}
