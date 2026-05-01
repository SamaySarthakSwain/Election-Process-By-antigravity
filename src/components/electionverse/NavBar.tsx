import { Crown, Sparkles } from "lucide-react";
import { useGame } from "@/lib/gamification";

interface NavBarProps {
  active: string;
  onChange: (id: string) => void;
}

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: "mentor", label: "AI Mentor" },
  { id: "simulator", label: "Simulator" },
  { id: "strategy", label: "Strategy Lab" },
  { id: "oneprompt", label: "One-Prompt" },
  { id: "dashboard", label: "Dashboard" },
  { id: "studio", label: "Content Studio" },
];

export const NavBar = ({ active, onChange }: NavBarProps) => {
  const { state } = useGame();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container flex h-16 items-center justify-between gap-4">
        <button onClick={() => onChange("home")} className="flex items-center gap-2 group">
          <div className="relative">
            <Crown className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-primary-glow animate-pulse" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold gold-text">ElectionVerse</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">AI · Royal Civic Intelligence</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                active === s.id
                  ? "text-primary bg-primary/10 border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            <span className="text-xs font-semibold gold-text">Lvl {state.level}</span>
            <span className="text-xs text-muted-foreground">{state.xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
};
