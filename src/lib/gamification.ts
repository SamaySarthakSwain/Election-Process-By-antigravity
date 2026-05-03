// Local gamification store (XP, levels, badges) using localStorage.
import { useEffect, useState, useCallback } from "react";

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

export const ALL_BADGES: Badge[] = [
  { id: "first-voter", name: "First-Time Voter", emoji: "🗳️", description: "Completed Step 1 of the Election Journey" },
  { id: "explorer", name: "Democracy Explorer", emoji: "🧭", description: "Visited 4+ sections of ElectionVerse" },
  { id: "strategist", name: "Election Strategist", emoji: "♟️", description: "Ran a Candidate Strategy evaluation" },
  { id: "simulator", name: "What-If Wizard", emoji: "🔮", description: "Completed a simulation run" },
  { id: "scholar", name: "Civic Scholar", emoji: "🎓", description: "Asked the AI Mentor 5 questions" },
  { id: "journey", name: "Civic Architect", emoji: "🏛️", description: "Completed the entire Election Journey" },
];

type GameState = {
  xp: number;
  level: number;
  badges: string[];
  visited: string[];
  questions: number;
  steps: number[];
};

const KEY = "electionverse-game-v1";

const defaultState: GameState = { xp: 0, level: 1, badges: [], visited: [], questions: 0, steps: [] };

const xpForLevel = (lvl: number) => lvl * 100;

export function useGame() {
  const [state, setState] = useState<GameState>(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = useCallback((s: GameState) => {
    setState(s);
    localStorage.setItem(KEY, JSON.stringify(s));
  }, []);

  const addXP = useCallback((amount: number, badgeId?: string) => {
    setState((prev) => {
      let xp = prev.xp + amount;
      let level = prev.level;
      while (xp >= xpForLevel(level)) {
        xp -= xpForLevel(level);
        level += 1;
      }
      const badges = badgeId && !prev.badges.includes(badgeId) ? [...prev.badges, badgeId] : prev.badges;
      const next = { ...prev, xp, level, badges };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const visit = useCallback((section: string) => {
    setState((prev) => {
      if (prev.visited.includes(section)) return prev;
      const visited = [...prev.visited, section];
      let badges = prev.badges;
      if (visited.length >= 4 && !badges.includes("explorer")) badges = [...badges, "explorer"];
      const next = { ...prev, visited, badges };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const askedQuestion = useCallback(() => {
    setState((prev) => {
      const questions = prev.questions + 1;
      let badges = prev.badges;
      if (questions >= 5 && !badges.includes("scholar")) badges = [...badges, "scholar"];
      const next = { ...prev, questions, badges };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const completeStep = useCallback((step: number) => {
    setState((prev) => {
      if (prev.steps.includes(step)) return prev;
      const steps = [...prev.steps, step];
      let badges = prev.badges;
      if (step === 0 && !badges.includes("first-voter")) badges = [...badges, "first-voter"];
      if (steps.length >= 5 && !badges.includes("journey")) badges = [...badges, "journey"];
      let xp = prev.xp + 25;
      let level = prev.level;
      while (xp >= xpForLevel(level)) { xp -= xpForLevel(level); level += 1; }
      const next = { ...prev, steps, badges, xp, level };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => persist(defaultState), [persist]);

  return {
    state,
    addXP,
    visit,
    askedQuestion,
    completeStep,
    reset,
    xpToNext: xpForLevel(state.level),
  };
}
