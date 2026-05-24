import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Companion,
  CompanionStyle,
  CompanionType,
} from "@/lib/lumi/types";
import { PetAvatar, labelFor } from "./PetAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Briefcase, Heart } from "lucide-react";

const choices: { type: CompanionType; tagline: string }[] = [
  { type: "cat", tagline: "看在眼里，默默判断。" },
  { type: "dog", tagline: "陪你翻完每一篇笔记。" },
  { type: "box", tagline: "默默收下你的所有想法。" },
  { type: "soda", tagline: "每次保存都嘶嘶作响。" },
];

const styleChoices: {
  id: CompanionStyle;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "professional",
    title: "专业型",
    subtitle:
      "像一个细心的同事，帮你把内容判断结构化。",
    Icon: Briefcase,
  },
  {
    id: "warm",
    title: "陪伴型",
    subtitle:
      "像一个亲密的伙伴，帮你接住每一个一闪而过的念头。",
    Icon: Heart,
  },
];

export function Onboarding({
  onDone,
}: {
  onDone: (c: Companion) => void;
}) {
  const [picked, setPicked] = useState<CompanionType | null>(null);
  const [name, setName] = useState("");
  const [style, setStyle] = useState<CompanionStyle | null>(null);

  const nameReady = !!picked && name.trim().length > 0;
  const canStart = nameReady && !!style;

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
          Lumi · 内部预览
        </div>
        <h1 className="mt-6 text-5xl font-medium tracking-tight md:text-6xl">
          给你的阅读， <br /> 找一个小伙伴。
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Lumi 把你每天观察到的笔记，变成看得见的判断力成长。
          <br className="hidden md:block" />
          挑一个小伙伴 —— 你每记录一条观察，它都会跟着长大。
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
          给它起个名字
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="比如 麻薯、南瓜、盒盒…"
          disabled={!picked}
          className="h-12 rounded-xl text-base"
        />
      </motion.div>

      <AnimatePresence>
        {nameReady && (
          <motion.div
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-md overflow-hidden"
          >
            <div className="mt-8">
              <div className="text-sm font-medium text-muted-foreground">
                选择陪伴方式
              </div>
              <p className="mt-1 text-xs text-muted-foreground/80">
                决定 {name.trim() || "它"} 在 app 里说话的语气，其余的你可以自己想象。
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {styleChoices.map(({ id, title, subtitle, Icon }) => {
                  const active = style === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setStyle(id)}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                        "hover:-translate-y-0.5 hover:shadow-soft",
                        active
                          ? "border-primary bg-gradient-warm shadow-glow ring-1 ring-primary/20"
                          : "border-border bg-card",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full",
                          active
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">{title}</div>
                        <div className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                          {subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 w-full max-w-md">
        <Button
          size="lg"
          disabled={!canStart}
          onClick={() =>
            picked &&
            style &&
            onDone({
              type: picked,
              name: name.trim(),
              style,
              xp: 0,
              level: 1,
              unlockedSkills: [],
            })
          }
          className="h-12 w-full rounded-xl bg-gradient-primary text-base shadow-glow"
        >
          开始观察 →
        </Button>
      </div>
    </div>
  );
}
