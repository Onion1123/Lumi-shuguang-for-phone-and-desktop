import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Layers, NotebookText, ScanLine, Sparkles } from "lucide-react";
import type { CompanionStyle, JournalEntry } from "@/lib/lumi/types";
import { getLens, SKILLS } from "@/lib/lumi/analyze";
import { getCopy } from "@/lib/lumi/copy";
import { getContributionMap } from "@/lib/lumi/patterns";

export function Journal({
  entries,
  style,
}: {
  entries: JournalEntry[];
  style?: CompanionStyle;
}) {
  const copy = getCopy(style);
  const contributions = getContributionMap(entries);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl">{copy.journalTitle}</h2>
          <p className="text-xs text-muted-foreground">
            按时间排列的真实观察记录
          </p>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {entries.length} 条记录
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <NotebookText className="size-7 text-muted-foreground" />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {copy.journalEmpty}
          </p>
        </div>
      ) : (
        <motion.ol layout className="space-y-3">
          {entries.map((e) => {
            const lens = getLens(e.analysis.lens);
            const skill = SKILLS.find(
              (s) => s.id === e.analysis.contributedSkillId,
            );
            const patternId = contributions.get(e.analysis.lens);
            return (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/80 px-2 py-0.5 text-[10px] font-medium text-foreground/75">
                    <ScanLine className="size-2.5" />
                    {copy.lensLabel[lens.id]}
                  </span>
                  {skill && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                      <Sparkles className="size-2.5" />
                      {skill.name}
                    </span>
                  )}
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                    {formatTimestamp(e.createdAt)}
                  </span>
                </div>

                <blockquote className="mt-2.5 border-l-2 border-primary/60 pl-3 font-display text-[15px] leading-snug text-foreground">
                  "{e.observation}"
                </blockquote>

                <p className="mt-2.5 text-[12.5px] leading-relaxed text-foreground/75">
                  {e.analysis.postBreakdown}
                </p>

                {(e.title || e.link) && (
                  <div className="mt-2.5 line-clamp-1 border-t border-dashed border-border pt-2 text-[10.5px] text-muted-foreground/80">
                    <span className="uppercase tracking-wider">来源 · </span>
                    {e.title || e.link}
                  </div>
                )}

                {patternId && (
                  <div className="mt-3 flex justify-end">
                    <Link
                      to="/pattern/$id"
                      params={{ id: patternId }}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10.5px] font-semibold text-primary hover:bg-primary/15"
                    >
                      <Layers className="size-3" />
                      已贡献至模式卡
                    </Link>
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      )}
    </div>
  );
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  if (sameDay) return `今天 ${hh}:${mm}`;
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  return `${mo}/${day} ${hh}:${mm}`;
}
