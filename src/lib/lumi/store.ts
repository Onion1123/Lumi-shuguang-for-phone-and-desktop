import { useEffect, useState, useCallback } from "react";
import type { Companion, JournalEntry } from "./types";
import { unlockedFromCount } from "./analyze";

const KEY = "lumi-state-v1";

interface LumiState {
  companion: Companion | null;
  entries: JournalEntry[];
}

const initial: LumiState = { companion: null, entries: [] };

function load(): LumiState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return JSON.parse(raw) as LumiState;
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

// Simple shared store with subscribe pattern
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

  const reset = useCallback(() => {
    setState(() => ({ companion: null, entries: [] }));
  }, []);

  return {
    companion: state.companion,
    entries: state.entries,
    setCompanion,
    addEntry,
    reset,
  };
}
