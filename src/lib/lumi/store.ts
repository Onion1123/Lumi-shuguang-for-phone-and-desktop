import { useEffect, useState, useCallback } from "react";
import type { BoardPost, Companion, JournalEntry } from "./types";
import { unlockedFromCount } from "./analyze";

const KEY = "lumi-state-v2";

interface LumiState {
  companion: Companion | null;
  entries: JournalEntry[];
  myBoardPosts: BoardPost[];
}

const initial: LumiState = { companion: null, entries: [], myBoardPosts: [] };

function load(): LumiState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<LumiState>;
    const companion = parsed.companion
      ? { ...parsed.companion, style: parsed.companion.style ?? "professional" }
      : null;
    return {
      companion,
      entries: parsed.entries ?? [],
      myBoardPosts: parsed.myBoardPosts ?? [],
    };
  } catch {
    return initial;
  }
}

function save(s: LumiState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* no-op */
  }
}

let state: LumiState = initial;
let hydrated = false;
const listeners = new Set<() => void>();

function setState(updater: (s: LumiState) => LumiState) {
  state = updater(state);
  save(state);
  listeners.forEach((l) => l());
}

export function useLumi() {
  const [, force] = useState(0);

  useEffect(() => {
    if (!hydrated) {
      state = load();
      hydrated = true;
    }
    const l = () => force((n) => n + 1);
    listeners.add(l);
    force((n) => n + 1);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const setCompanion = useCallback((c: Companion) => {
    setState((s) => ({ ...s, companion: c }));
  }, []);

  const addEntry = useCallback((entry: JournalEntry) => {
    setState((s) => {
      const entries = [entry, ...s.entries];
      const unlocked = unlockedFromCount(entries.length);
      const companion = s.companion
        ? { ...s.companion, unlockedSkills: unlocked }
        : s.companion;
      return { ...s, entries, companion };
    });
  }, []);

  const addBoardPost = useCallback((post: BoardPost) => {
    setState((s) => ({ ...s, myBoardPosts: [post, ...s.myBoardPosts] }));
  }, []);

  const reset = useCallback(() => {
    setState(() => ({ companion: null, entries: [], myBoardPosts: [] }));
  }, []);

  return {
    companion: state.companion,
    entries: state.entries,
    myBoardPosts: state.myBoardPosts,
    setCompanion,
    addEntry,
    addBoardPost,
    reset,
  };
}
