import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2, Link2 } from "lucide-react";
import { toast } from "sonner";
import type {
  Analysis,
  CompanionStyle,
  JournalEntry,
  LensId,
} from "@/lib/lumi/types";
import {
  mockAnalyze,
  SKILLS,
  LENSES,
  getLens,
  unlockedFromCount,
} from "@/lib/lumi/analyze";
import { getCopy } from "@/lib/lumi/copy";
import { pickRandomSample, samplePosts } from "@/lib/lumi/samples";
import { AnalysisPanel } from "./AnalysisPanel";
import { cn } from "@/lib/utils";

interface Props {
  entriesCount: number;
  style: CompanionStyle;
  onSaved: (entry: JournalEntry, newSkill: string | null) => void;
}

export function Workspace({ entriesCount, style, onSaved }: Props) {
  const copy = getCopy(style);
  const STAGES = copy.loadingStages;
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [observation, setObservation] = useState("");
  const [lens, setLens] = useState<LensId | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(STAGES[0]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [savedObservation, setSavedObservation] = useState("");

  const hasPost = !!(link.trim() || title.trim() || content.trim());
  const canSubmit =
    hasPost && observation.trim().length > 0 && !!lens && !loading;

  function loadSample() {
    const s = pickRandomSample();
    setLink(s.link);
    setTitle(s.title);
    setContent(s.content);
    setObservation(s.observation);
    setLens(s.analysis.lens);
    toast.success("示例已加载", {
      description: "点「让 Lumi 解读」看完整结构化解析。",
    });
  }

  async function analyze() {
    if (!canSubmit || !lens) return;
    setLoading(true);
    setAnalysis(null);
    for (let i = 0; i < STAGES.length; i++) {
      setStage(STAGES[i]);
      await wait(420 + Math.random() * 280);
    }
    const matched = samplePosts.find(
      (s) =>
        s.title === title.trim() &&
        s.content === content.trim() &&
        s.observation === observation.trim(),
    );
    const result: Analysis = matched
      ? { ...matched.analysis, lens }
      : mockAnalyze({ link, title, content, observation, lens });
    setAnalysis(result);
    setSavedObservation(observation);
    setLoading(false);

    const before = unlockedFromCount(entriesCount);
    const after = unlockedFromCount(entriesCount + 1);
    const newlyUnlocked = after.find((id) => !before.includes(id)) ?? null;

    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      link: link.trim() || undefined,
      title: title.trim() || undefined,
      content: content.trim() || undefined,
      observation: observation.trim(),
      analysis: result,
    };
    onSaved(entry, newlyUnlocked);

    if (newlyUnlocked) {
      const skill = SKILLS.find((s) => s.id === newlyUnlocked);
      if (skill) {
        toast(`✨ ${copy.skillUnlockedPrefix}：${skill.name}`, {
          description: skill.desc,
        });
      }
    }
    setObservation("");
    setLens(null);
  }

  const selectedLens = lens ? getLens(lens) : null;

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl">记录一条观察</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {copy.workspaceSubtitle}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadSample}
            className="gap-1.5 rounded-full border-dashed text-xs"
          >
            <Wand2 className="size-3.5" /> 试试示例
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          <Field label="笔记链接" optional>
            <div className="relative">
              <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="xhs.link/note/…"
                className="h-11 rounded-xl pl-9"
              />
            </div>
          </Field>

          <Field label="笔记标题" optional>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="让你停下来的那个标题"
              className="h-11 rounded-xl"
            />
          </Field>

          <Field label="粘贴笔记正文" optional>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="把笔记正文粘贴进来…"
              rows={4}
              className="resize-none rounded-xl"
            />
          </Field>

          <Field label="观察视角" required>
            <div className="flex flex-wrap gap-1.5">
              {LENSES.map((l) => {
                const active = lens === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLens(l.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-surface text-foreground/75 hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {copy.lensLabel[l.id]}
                  </button>
                );
              })}
            </div>
            {selectedLens && (
              <p className="mt-2 text-[11px] italic text-muted-foreground">
                {copy.lensHint[selectedLens.id]}
              </p>
            )}
          </Field>

          <Field label="你的一句话判断" required>
            <Textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="你到底注意到了什么？一句话说清楚。"
              rows={2}
              className="resize-none rounded-xl bg-surface-soft"
            />
          </Field>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="text-xs text-muted-foreground">
              {!hasPost
                ? "贴个链接、标题或正文，就可以开始了。"
                : !lens
                  ? "挑一个你用来读它的视角。"
                  : !observation.trim()
                    ? "写一句你的判断。"
                    : "随时可以开始。"}
            </div>
            <Button
              type="button"
              size="lg"
              disabled={!canSubmit}
              onClick={analyze}
              className="h-11 gap-2 rounded-xl bg-gradient-primary px-5 shadow-glow"
            >
              <Sparkles className="size-4" /> 让 Lumi 解读
            </Button>
          </div>
        </div>
      </motion.div>

      <AnalysisPanel
        loading={loading}
        loadingStage={stage}
        analysis={analysis}
        observation={savedObservation}
        style={style}
      />
    </div>
  );
}

function Field({
  label,
  optional,
  required,
  children,
}: {
  label: string;
  optional?: boolean;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        {optional && (
          <span className="text-[10px] text-muted-foreground/70">选填</span>
        )}
        {required && (
          <span className="text-[10px] font-medium text-primary">必填</span>
        )}
      </div>
      {children}
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
