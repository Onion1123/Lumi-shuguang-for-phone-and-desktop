import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { useLumi } from "@/lib/lumi/store";
import type { ViewKey } from "@/lib/lumi/types";
import { Onboarding } from "@/components/lumi/Onboarding";
import { Workspace } from "@/components/lumi/Workspace";
import { Journal } from "@/components/lumi/Journal";
import { Community } from "@/components/lumi/Community";
import { BottomNav } from "@/components/lumi/BottomNav";
import { PetDock } from "@/components/lumi/PetDock";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumi — Notes that grow with you" },
      {
        name: "description",
        content:
          "Lumi turns daily content observations into visible personal judgment growth. A warm, lightweight companion for content ecosystem observers.",
      },
      { property: "og:title", content: "Lumi — Notes that grow with you" },
      {
        property: "og:description",
        content:
          "Save a post, drop your one-sentence read, and watch your judgment sharpen over time.",
      },
    ],
  }),
  component: LumiApp,
});

function LumiApp() {
  const { companion, entries, setCompanion, addEntry, reset } = useLumi();
  const [view, setView] = useState<ViewKey>("workspace");
  const [pulseKey, setPulseKey] = useState<number | undefined>(undefined);
  const [lastUnlock, setLastUnlock] = useState<string | null>(null);

  if (!companion) {
    return (
      <>
        <Onboarding onDone={setCompanion} />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <div className="min-h-[100dvh] pb-28">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-4 pt-6 md:pt-10">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <span className="font-display text-lg font-semibold leading-none">
              L
            </span>
          </div>
          <div>
            <div className="font-display text-lg leading-tight">Lumi</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Internal preview
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => {
            if (confirm("Reset companion and clear all saved notes?")) reset();
          }}
        >
          <RotateCcw className="size-3.5" /> Reset demo
        </Button>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {view === "workspace" && (
              <Workspace
                entriesCount={entries.length}
                onSaved={(entry, newSkill) => {
                  addEntry(entry);
                  setPulseKey(Date.now());
                  setLastUnlock(newSkill);
                }}
              />
            )}
            {view === "journal" && (
              <Journal companion={companion} entries={entries} />
            )}
            {view === "community" && (
              <Community companion={companion} myCount={entries.length} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <PetDock
        companion={companion}
        entriesCount={entries.length}
        pulseKey={pulseKey}
        lastSkillUnlock={lastUnlock}
      />
      <BottomNav view={view} onChange={setView} />
      <Toaster position="top-center" />
    </div>
  );
}
