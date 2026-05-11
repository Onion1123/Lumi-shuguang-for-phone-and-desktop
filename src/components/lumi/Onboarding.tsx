import { useState } from "react";
import { motion } from "framer-motion";
import type { Companion, CompanionType } from "@/lib/lumi/types";
import { PetAvatar, labelFor } from "./PetAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const choices: { type: CompanionType; tagline: string }[] = [
  { type: "cat", tagline: "Observes everything, judges quietly." },
  { type: "dog", tagline: "Follows you through every note." },
  { type: "box", tagline: "Holds your thoughts, no questions asked." },
  { type: "soda", tagline: "Pops with energy on every save." },
];

export function Onboarding({
  onDone,
}: {
  onDone: (c: Companion) => void;
}) {
  const [picked, setPicked] = useState<CompanionType | null>(null);
  const [name, setName] = useState("");

  const canStart = picked && name.trim().length > 0;

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Lumi · internal preview
        </div>
        <h1 className="mt-6 text-5xl font-medium tracking-tight md:text-6xl">
          Bring a small companion <br /> to your reading.
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Lumi turns the notes you observe each day into visible, growing
          judgment.
          <br className="hidden md:block" />
          Pick a companion — they'll grow with every observation you save.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="mt-12 grid w-full grid-cols-2 gap-3 md:grid-cols-4"
      >
        {choices.map((c) => {
          const active = picked === c.type;
          return (
            <button
              key={c.type}
              type="button"
              onClick={() => setPicked(c.type)}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-left transition-all",
                "hover:-translate-y-0.5 hover:shadow-soft",
                active
                  ? "border-primary shadow-glow ring-1 ring-primary/20"
                  : "border-border",
              )}
            >
              <PetAvatar type={c.type} size={64} animate />
              <div className="text-sm font-semibold">{labelFor(c.type)}</div>
              <div className="text-center text-xs leading-snug text-muted-foreground">
                {c.tagline}
              </div>
            </button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: picked ? 1 : 0.4, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 flex w-full max-w-md flex-col gap-3"
      >
        <label className="text-sm font-medium text-muted-foreground">
          Give them a name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Mochi, Pumpkin, Box-kun…"
          disabled={!picked}
          className="h-12 rounded-xl text-base"
        />
        <Button
          size="lg"
          disabled={!canStart}
          onClick={() =>
            picked &&
            onDone({
              type: picked,
              name: name.trim(),
              xp: 0,
              level: 1,
              unlockedSkills: [],
            })
          }
          className="h-12 rounded-xl bg-gradient-primary text-base shadow-glow"
        >
          Start observing →
        </Button>
      </motion.div>
    </div>
  );
}
