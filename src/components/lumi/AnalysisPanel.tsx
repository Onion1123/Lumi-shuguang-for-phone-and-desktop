import { motion } from "framer-motion";
import type { Analysis } from "@/lib/lumi/types";
import { Sparkles } from "lucide-react";

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
        <div className="font-display text-lg">Lumi is reading…</div>
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
        <h3 className="mt-4 font-display text-xl">Your analysis appears here</h3>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Drop in a post and your one-sentence read. Lumi reads the post first,
          then layers in your judgment.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="size-3" /> Lumi analysis
        </div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Generated · just now
        </div>
      </div>

      <Section label="Post breakdown">
        <p className="text-sm leading-relaxed text-foreground/85">
          {analysis.postBreakdown}
        </p>
      </Section>

      <div className="grid gap-3 sm:grid-cols-2">
        <MiniCard label="Content type" value={analysis.contentType} />
        <MiniCard label="Observation angle" value={analysis.observationAngle} />
      </div>

      <Section label="Combined summary">
        <p className="text-sm leading-relaxed text-foreground/85">
          {analysis.summary}
        </p>
        {observation && (
          <div className="mt-3 rounded-xl border border-dashed border-border bg-surface px-3 py-2 text-xs italic text-muted-foreground">
            Your read: "{observation}"
          </div>
        )}
      </Section>

      <Section label="Insight tags">
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
    </motion.div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
