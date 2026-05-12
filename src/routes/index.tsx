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
import { cn } from "@/lib/utils";

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
  const {
    companion,
    entries,
    myBoardPosts,
    setCompanion,
    addEntry,
    addBoardPost,
    reset,
  } = useLumi();
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
    <div className="min-h-[100dvh] pb-28 lg:pb-8">
      <header className="mx-auto flex w-full items-center justify-between px-6 pb-4 pt-6 md:pt-8">
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

      <main className="mx-auto w-full px-6">
        {/* Desktop: 3 columns. Mobile: single column based on tab */}
        <div className="lg:grid lg:grid-cols-[1fr_minmax(500px,2fr)_1.5fr] lg:gap-6">
          {/* Left — Journal */}
          <aside
            className={cn(
              "lg:block lg:border-r lg:border-border/60 lg:pr-6",
              view === "journal" ? "block" : "hidden",
            )}
          >
            <ColumnContent activeKey="journal" view={view}>
              <Journal entries={entries} />
            </ColumnContent>
          </aside>

          {/* Center — Workspace (primary) */}
          <section
            className={cn(
              "lg:block",
              view === "workspace" ? "block" : "hidden",
            )}
          >
            <ColumnContent activeKey="workspace" view={view}>
              <Workspace
                entriesCount={entries.length}
                onSaved={(entry, newSkill) => {
                  addEntry(entry);
                  setPulseKey(Date.now());
                  setLastUnlock(newSkill);
                }}
              />
            </ColumnContent>
          </section>

          {/* Right — Community */}
          <aside
            className={cn(
              "lg:block lg:border-l lg:border-border/60 lg:pl-6",
              view === "community" ? "block" : "hidden",
            )}
          >
            <ColumnContent activeKey="community" view={view}>
              <Community
                companion={companion}
                entries={entries}
                myBoardPosts={myBoardPosts}
                onPost={addBoardPost}
              />
            </ColumnContent>
          </aside>
        </div>
      </main>

      <PetDock
        companion={companion}
        entriesCount={entries.length}
        pulseKey={pulseKey}
        lastSkillUnlock={lastUnlock}
      />
      <div className="lg:hidden">
        <BottomNav view={view} onChange={setView} />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

// Animate column changes only on mobile (when view actually swaps)
function ColumnContent({
  children,
  activeKey,
  view,
}: {
  children: React.ReactNode;
  activeKey: ViewKey;
  view: ViewKey;
}) {
  return (
    <AnimatePresence mode="wait">
      {view === activeKey || typeof window === "undefined" ? (
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      ) : (
        <div>{children}</div>
      )}
    </AnimatePresence>
  );
}
