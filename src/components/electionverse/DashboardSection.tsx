import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ALL_BADGES, useGame } from "@/lib/gamification";
import { Crown, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

export const DashboardSection = () => {
  const { state, reset, xpToNext } = useGame();
  const earned = ALL_BADGES.filter((b) => state.badges.includes(b.id));
  const locked = ALL_BADGES.filter((b) => !state.badges.includes(b.id));
  const xpPct = (state.xp / xpToNext) * 100;

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <Trophy className="h-3 w-3 mr-1" /> Royal Dashboard
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Your <span className="gold-text">Civic Realm</span></h2>
        <p className="text-muted-foreground">Track XP, levels, and badges as you master democracy.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
        <div className="royal-card royal-border p-6 text-center">
          <Crown className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Level</div>
          <div className="font-display text-5xl font-bold gold-text">{state.level}</div>
        </div>
        <div className="royal-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">XP Progress</div>
          <div className="font-display text-3xl font-bold mb-3">{state.xp} / {xpToNext}</div>
          <Progress value={xpPct} className="h-3" />
          <div className="text-xs text-muted-foreground mt-2">{xpToNext - state.xp} XP to Level {state.level + 1}</div>
        </div>
        <div className="royal-card p-6 text-center">
          <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Badges</div>
          <div className="font-display text-5xl font-bold">{earned.length}<span className="text-muted-foreground text-2xl">/{ALL_BADGES.length}</span></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8">
        <div className="royal-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Activity</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Journey steps completed</span><span className="font-semibold">{state.steps.length}/5</span></div>
            <div className="flex justify-between"><span>Mentor questions asked</span><span className="font-semibold">{state.questions}</span></div>
            <div className="flex justify-between"><span>Sections visited</span><span className="font-semibold">{state.visited.length}</span></div>
          </div>
        </div>
        <div className="royal-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Reset</div>
          <p className="text-sm text-muted-foreground mb-3">Wipe progress and start the royal journey anew.</p>
          <Button variant="outline" size="sm" onClick={() => { reset(); toast.success("Progress reset"); }}>
            <RotateCcw className="h-4 w-4 mr-2" /> Reset Progress
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h3 className="font-display text-2xl mb-4">Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...earned, ...locked].map((b) => {
            const owned = state.badges.includes(b.id);
            return (
              <div key={b.id} className={`royal-card p-4 flex gap-3 items-start ${!owned ? "opacity-40" : "royal-border"}`}>
                <div className="text-3xl">{b.emoji}</div>
                <div>
                  <div className="font-semibold text-sm">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.description}</div>
                  {owned && <Badge variant="outline" className="mt-2 text-[10px] border-primary/40 text-primary">Earned</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
