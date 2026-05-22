import { motion } from "framer-motion";
import type { ViewKey } from "@/lib/lumi/types";
import { Sparkles, NotebookText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const items: { key: ViewKey; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "workspace", label: "Workspace", Icon: Sparkles },
  { key: "journal", label: "Log", Icon: NotebookText },
  { key: "community", label: "Community", Icon: Users },
];

export function BottomNav({
  view,
  onChange,
}: {
  view: ViewKey;
  onChange: (v: ViewKey) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-card/85 p-1.5 shadow-glow backdrop-blur">
      {items.map(({ key, label, Icon }) => {
        const active = view === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-gradient-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <Icon className="size-4" />
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
