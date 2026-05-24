import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Companion } from "@/lib/lumi/types";
import { PetAvatar } from "./PetAvatar";
import { xpFor, SKILLS } from "@/lib/lumi/analyze";
import { getCopy } from "@/lib/lumi/copy";

interface Props {
  companion: Companion;
  entriesCount: number;
  pulseKey?: number;
  lastSkillUnlock?: string | null;
}

export function PetDock({ companion, entriesCount, pulseKey, lastSkillUnlock }: Props) {
  const { level, xpInLevel, xpToNext } = xpFor(entriesCount);
  const pct = Math.min(100, Math.round((xpInLevel / xpToNext) * 100));
  const [bubble, setBubble] = useState<string | null>(null);
  const copy = getCopy(companion.style);

  useEffect(() => {
    if (pulseKey === undefined) return;
    const skill = lastSkillUnlock
      ? SKILLS.find((s) => s.id === lastSkillUnlock)
      : null;
    const messages = skill
      ? [`${skill.name} ${companion.style === "warm" ? "✨ 我们做到了" : "已解锁 ✨"}`]
      : copy.petBubbles;
    setBubble(messages[Math.floor(Math.random() * messages.length)]);
    const t = setTimeout(() => setBubble(null), 2600);
    return () => clearTimeout(t);
  }, [pulseKey, lastSkillUnlock, copy.petBubbles, companion.style]);

  return (
    <div className="pointer-events-none fixed bottom-24 right-0 z-30 flex flex-col items-end md:bottom-8">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            className="pointer-events-auto mb-2 mr-4 max-w-[200px] rounded-2xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-soft"
          >
            {bubble}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          pulseKey !== undefined
            ? { scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] }
            : {}
        }
        key={pulseKey}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="group pointer-events-auto flex translate-x-[calc(100%-58px)] items-center gap-3 rounded-l-full border border-r-0 border-border bg-card/90 p-2 pr-4 shadow-soft backdrop-blur transition-transform duration-500 ease-out hover:translate-x-0"
      >
        <PetAvatar type={companion.type} size={44} />
        <div className="min-w-[120px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-semibold">{companion.name}</span>
            <span className="text-[10px] text-muted-foreground">
              Lv.{level}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-primary"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
