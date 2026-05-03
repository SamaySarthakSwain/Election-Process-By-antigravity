import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, ChevronUp, AlertTriangle, Sparkles, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useGame } from "@/lib/gamification";

type Evaluation = {
  winProbability: number;
  confidence: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  budgetVerdict: string;
  audienceFit: string;
  keyRisk: string;
  narrative: string;
};

export const StrategySection = () => {
  const { addXP } = useGame();
  const [candidate, setCandidate] = useState("Aria Kapoor");
  const [region, setRegion] = useState("Northern Province");
  const [budget, setBudget] = useState(2_500_000);
  const [audience, setAudience] = useState("Young urban professionals, 22-35");
  const [strategy, setStrategy] = useState("Run a digital-first campaign focused on jobs, transit, and climate. Three town halls per week.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Evaluation | null>(null);

  const evaluate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/strategy-eval`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate, region, budget, audience, strategy }),
      });
      
      if (!res.ok) {
        throw new Error("Make sure the Python backend is running on port 8000!");
      }
      
      const data = await res.json();
      setResult(data.evaluation);
      addXP(50, "strategist");
      toast.success("+50 XP — Election Strategist badge!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Evaluation failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <Target className="h-3 w-3 mr-1" /> Candidate Strategy Lab
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Be the <span className="gold-text">Candidate</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Set your budget, audience, and battle plan. The precision AI strategist returns a brutally honest verdict.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Form */}
        <div className="impact-card precision-border p-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Candidate Name</label>
            <Input value={candidate} onChange={(e) => setCandidate(e.target.value)} className="bg-background/60 mt-1" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Region</label>
            <Input value={region} onChange={(e) => setRegion(e.target.value)} className="bg-background/60 mt-1" />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Campaign Budget</label>
              <span className="gold-text font-display">${budget.toLocaleString()}</span>
            </div>
            <Slider value={[budget]} min={100_000} max={20_000_000} step={100_000} onValueChange={(v) => setBudget(v[0])} className="mt-3" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Target Audience</label>
            <Input value={audience} onChange={(e) => setAudience(e.target.value)} className="bg-background/60 mt-1" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Strategy</label>
            <Textarea value={strategy} onChange={(e) => setStrategy(e.target.value)} rows={5} className="bg-background/60 mt-1" />
          </div>
          <Button onClick={evaluate} disabled={loading} className="w-full bg-gradient-gold text-primary-foreground">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Strategist deliberating…</> : <><Sparkles className="h-4 w-4 mr-2" /> Evaluate My Campaign</>}
          </Button>
        </div>

        {/* Result */}
        <div className="impact-card precision-border p-6 min-h-[500px]">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <Trophy className="h-14 w-14 mb-3 text-primary opacity-60" />
              <div className="font-display text-xl mb-1">Awaiting your strategy</div>
              <div className="text-sm max-w-sm">Submit your plan to receive a strategic assessment — win probability, strengths, weaknesses, and improvements.</div>
            </div>
          )}
          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
              <div className="text-sm">Consulting the strategist…</div>
            </div>
          )}
          {result && (
            <div className="space-y-5 animate-fade-in">
              {/* Big number */}
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Win Probability</div>
                <div className="font-display text-7xl font-bold gold-text leading-none">{result.winProbability}%</div>
                <div className="text-xs mt-1 text-muted-foreground">Confidence: <span className="text-primary font-semibold">{result.confidence}</span></div>
              </div>

              {/* Probability bar */}
              <div className="h-3 rounded-full bg-secondary/60 overflow-hidden">
                <div className="h-full bg-gradient-gold transition-all duration-700" style={{ width: `${result.winProbability}%` }} />
              </div>

              <div className="text-sm italic text-foreground/90 p-4 rounded-lg bg-background/40 border border-border/60">
                "{result.narrative}"
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-success mb-2 flex items-center gap-1"><ChevronUp className="h-3 w-3" /> Strengths</div>
                  <ul className="space-y-1">{result.strengths.map((s,i) => <li key={i} className="text-xs">✓ {s}</li>)}</ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-destructive mb-2 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Weaknesses</div>
                  <ul className="space-y-1">{result.weaknesses.map((s,i) => <li key={i} className="text-xs">✗ {s}</li>)}</ul>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-primary mb-2">⚡ Improvements</div>
                <ul className="space-y-1.5">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="text-sm p-2 rounded-md bg-primary/5 border border-primary/20">{i+1}. {imp}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-md bg-background/40 border border-border/60"><div className="text-muted-foreground">Budget</div><div className="text-foreground font-semibold mt-0.5">{result.budgetVerdict}</div></div>
                <div className="p-2 rounded-md bg-background/40 border border-border/60"><div className="text-muted-foreground">Audience</div><div className="text-foreground font-semibold mt-0.5">{result.audienceFit}</div></div>
                <div className="p-2 rounded-md bg-background/40 border border-destructive/30"><div className="text-destructive">Key Risk</div><div className="text-foreground font-semibold mt-0.5">{result.keyRisk}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
