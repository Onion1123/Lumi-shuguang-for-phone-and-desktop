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
  // Patterns only surface once the user has begun observing. After reset,
  // entries are empty so the log returns to a clean state.
  const patterns = entries.length > 0 ? PATTERNS : [];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl">{copy.journalTitle}</h2>
          <p className="text-xs text-muted-foreground">
            从你的观察里浮现出来的规律
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {patterns.length} 条规律
        </span>
      </div>

      {patterns.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <NotebookText className="size-7 text-muted-foreground" />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {copy.journalEmpty}
          </p>
        </div>
      ) : (
        <motion.ol layout className="space-y-3">
          {patterns.map((p) => {
            const lens = getLens(p.lensId);
            return (
              <li key={p.id}>
                <PatternCard
                  id={p.id}
                  label="发现规律"
                  lensLabel={copy.lensLabel[lens.id]}
                  title={p.title}
                  summary={p.summary}
                  evidence={p.evidence}
                  count={p.count}
                  ctaLabel="查看相关记录 →"
                  variant="featured"
                />
              </li>
            );
          })}
        </motion.ol>
      )}

      {entries.length > 0 && (
        <p className="mt-4 text-[10.5px] text-muted-foreground/70">
          {entries.length} 条独立观察构成了这些规律。
        </p>
      )}
    </div>
  );
}
