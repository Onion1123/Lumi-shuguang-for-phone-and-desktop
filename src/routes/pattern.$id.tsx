import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Layers, ScanLine, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLumi } from "@/lib/lumi/store";
import { getPattern } from "@/lib/lumi/patterns";
import { getLens, SKILLS } from "@/lib/lumi/analyze";
import { getCopy } from "@/lib/lumi/copy";

export const Route = createFileRoute("/pattern/$id")({
  head: () => ({
    meta: [{ title: "Pattern detail — Lumi" }],
  }),
  component: PatternDetail,
});

function PatternDetail() {
  const { id } = useParams({ from: "/pattern/$id" });
  const { entries, companion } = useLumi();
  const pattern = getPattern(id);
  const copy = getCopy(companion?.style);

  if (!pattern) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
        <p className="mt-6 text-sm text-muted-foreground">Pattern not found.</p>
      </div>
    );
  }

  const lens = getLens(pattern.lensId);
  const relatedEntries = entries.filter((e) => e.analysis.lens === pattern.lensId);

  return (
    <div className="mx-auto min-h-[100dvh] max-w-2xl px-6 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to log
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative mt-4 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-warm p-6 shadow-soft"
      >
        <div className="pointer-events-none absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Layers className="size-4" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Pattern surfaced
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/80 px-2 py-0.5 text-[10px] font-medium text-foreground/75">
            <ScanLine className="size-2.5" />
            {copy.lensLabel[lens.id]}
          </span>
        </div>
        <h1 className="mt-3 font-display text-2xl leading-tight text-foreground">
          {pattern.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          {pattern.summary}
        </p>
        <div className="mt-4 border-t border-border/60 pt-3 text-[10.5px] uppercase tracking-wider text-muted-foreground">
          Built from {pattern.count} observations
        </div>
      </motion.article>

      <section className="mt-8">
        <h2 className="font-display text-lg">Source observations</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Evidence that surfaced this pattern.
        </p>
        <ul className="space-y-2">
          {pattern.evidence.map((e, i) => (
            <li
              key={i}
              className="rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <blockquote className="border-l-2 border-primary/60 pl-3 font-display text-[15px] leading-snug text-foreground">
                "{e}"
              </blockquote>
            </li>
          ))}
        </ul>
      </section>

      {relatedEntries.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg">Your related entries</h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Notes you logged under the {copy.lensLabel[lens.id]} lens.
          </p>
          <ul className="space-y-2">
            {relatedEntries.map((e) => {
              const skill = SKILLS.find((s) => s.id === e.analysis.contributedSkillId);
              const snippet = e.title || e.content?.slice(0, 70) || e.link || "Untitled";
              return (
                <li
                  key={e.id}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    {skill && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                        <Sparkles className="size-2.5" />
                        {skill.name}
                      </span>
                    )}
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <blockquote className="mt-2 border-l-2 border-primary/60 pl-3 font-display text-[14px] leading-snug text-foreground">
                    "{e.observation}"
                  </blockquote>
                  <div className="mt-2 line-clamp-1 border-t border-dashed border-border pt-2 text-[10.5px] text-muted-foreground/80">
                    <span className="uppercase tracking-wider">Source · </span>
                    {snippet}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
