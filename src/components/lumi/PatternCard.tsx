import { motion } from "framer-motion";
import { ScanLine, ArrowRight, Layers } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface Pattern {
  id?: string;
  label?: string;
  lensLabel: string;
  title: string;
  summary: string;
  evidence: string[];
  count: number;
  ctaLabel?: string;
  variant?: "featured" | "compact";
}

export function PatternCard({
  id,
  label = "Pattern surfaced",
  lensLabel,
  title,
  summary,
  evidence,
  count,
  ctaLabel = "View related records",
  variant = "featured",
}: Pattern) {
  const compact = variant === "compact";
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={
        compact
          ? "rounded-2xl border border-border bg-card p-3.5 shadow-soft"
          : "relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-warm p-5 shadow-soft"
      }
    >
      {!compact && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-primary/10 text-primary"
        >
          <Layers className="size-4" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={
            compact
              ? "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
              : "inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
          }
        >
          {label}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/80 px-2 py-0.5 text-[10px] font-medium text-foreground/75">
          <ScanLine className="size-2.5" />
          {lensLabel}
        </span>
      </div>

      <h3
        className={
          compact
            ? "mt-2 font-display text-[15px] leading-snug text-foreground"
            : "mt-3 font-display text-lg leading-snug text-foreground"
        }
      >
        {title}
      </h3>

      <p
        className={
          compact
            ? "mt-1.5 text-[12px] leading-relaxed text-foreground/75"
            : "mt-2 text-[13px] leading-relaxed text-foreground/80"
        }
      >
        {summary}
      </p>

      {evidence.length > 0 && !compact && (
        <ul className="mt-3 space-y-1.5">
          {evidence.slice(0, 2).map((e, i) => (
            <li
              key={i}
              className="border-l-2 border-primary/50 bg-surface/60 px-3 py-1.5 text-[12px] italic leading-snug text-muted-foreground"
            >
              "{e}"
            </li>
          ))}
        </ul>
      )}

      <div
        className={
          compact
            ? "mt-2.5 flex items-center justify-between"
            : "mt-4 flex items-center justify-between border-t border-border/60 pt-3"
        }
      >
        <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
          Built from {count} observations
        </span>
        {id ? (
          <Link
            to="/pattern/$id"
            params={{ id }}
            className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary hover:underline"
          >
            {ctaLabel} <ArrowRight className="size-3" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted-foreground">
            {ctaLabel} <ArrowRight className="size-3" />
          </span>
        )}
      </div>
    </motion.article>
  );
}
