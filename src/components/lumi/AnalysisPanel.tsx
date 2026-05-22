import { motion } from "framer-motion";
import type { Analysis } from "@/lib/lumi/types";
import { Sparkles, ScanLine } from "lucide-react";
import { getLens, SKILLS, XP_PER_ENTRY } from "@/lib/lumi/analyze";

interface Props {
  loading?: boolean;
  loadingStage?: string;
  analysis?: Analysis | null;
  observation?: string;
}

export function AnalysisPanel({
  loading,
  loadingStage,
  analysis,
  observation,
}: Props) {
  if (loading) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/60 p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          className="mb-4 grid size-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow"
        >
          <Sparkles className="size-5" />
        </motion.div>
        <div className="font-display text-lg">Lumi is structuring…</div>
        <motion.div
          key={loadingStage}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          {loadingStage}
        </motion.div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/60 p-8 text-center">
        <div className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <Sparkles className="size-5" />
        </div>
        <h3 className="mt-4 font-display text-xl">
          Your structured read appears here
        </h3>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Pick a lens, write one honest sentence. Lumi organizes — it doesn't
          replace — your judgment.
        </p>
      </div>
    );
  }

  const lens = getLens(analysis.lens);
  const skill = SKILLS.find((s) => s.id === analysis.contributedSkillId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="size-3" /> Structured read
        </div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Just now
        </div>
      </div>

      {/* 1. Post summary */}
      <Section index={1} label="Post summary">
        <p className="text-sm leading-relaxed text-foreground/85">
          {analysis.postBreakdown}
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
          <span className="uppercase tracking-wider">Content type</span>
          <span className="font-medium text-foreground">
            · {analysis.contentType}
          </span>
        </div>
      </Section>

      {/* 2. Selected observation lens */}
      <Section index={2} label="Selected lens">
        <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
            <ScanLine className="size-3.5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {lens.label}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {lens.short}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{lens.hint}</p>
          </div>
        </div>
      </Section>

      {/* 3. Structured judgment */}
      <Section index={3} label="Structured judgment">
        <p className="text-[11.5px] italic text-muted-foreground">
          Based on your one-sentence observation, Lumi organized the signal
          into a reusable judgment.
        </p>
        {observation && (
          <div className="mt-2 rounded-xl border-l-2 border-primary/60 bg-surface px-3 py-2 text-sm font-medium text-foreground/90">
            "{observation}"
          </div>
        )}
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          {analysis.summary}
        </p>
      </Section>

      {/* 4. Insight tags */}
      <Section index={4} label="Insight tags">
        <div className="flex flex-wrap gap-2">
          {analysis.insightTags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-accent/40 px-3 py-1 text-xs font-medium text-accent-foreground"
            >
              # {t}
            </span>
          ))}
        </div>
      </Section>

      {/* 5. Skill XP gained */}
      <Section index={5} label="Skill XP gained">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Contributed to
            </div>
            <div className="mt-0.5 text-sm font-semibold text-foreground">
              {skill?.name ?? "—"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-xl text-primary">
              +{XP_PER_ENTRY} XP
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              filed to observation log
            </div>
          </div>
        </div>
      </Section>
    </motion.div>
  );
}

function Section({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="grid size-4 place-items-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">
          {index}
        </span>
        {label}
      </div>
      {children}
    </div>
  );
}
