import { Button } from "@/components/ui/button";
import { Crown, Sparkles, ArrowRight, Bot, BarChart3, ChevronRight } from "lucide-react";

export const Hero = ({ onCta }: { onCta: (id: string) => void }) => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Animated Decorative orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px] animate-float opacity-50 mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-[120px] animate-float opacity-50 mix-blend-multiply" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[80px] animate-float opacity-30 mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }} />

      <div className="container relative pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs tracking-widest uppercase text-primary">A Hackathon-Grade Civic AI</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in">
          Where <span className="gold-text">Democracy</span> Meets
          <br />
          <span className="gold-text">Royal Intelligence</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 animate-fade-in">
          ElectionVerse AI is your royal court of civic learning — guided journeys, multi-mode AI mentors,
          what-if simulators, and a strategy lab to think like a candidate.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in">
          <Button size="lg" onClick={() => onCta("journey")} className="bg-gradient-gold text-primary-foreground hover:opacity-95 shadow-glow">
            Begin the Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => onCta("mentor")} className="border-primary/40">
            <Bot className="mr-2 h-4 w-4" /> Ask the AI Mentor
          </Button>
          <Button size="lg" variant="ghost" onClick={() => onCta("simulator")}>
            <BarChart3 className="mr-2 h-4 w-4" /> Try the Simulator
          </Button>
        </div>

        {/* Feature crown row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { icon: "🗺️", label: "Interactive Journey", desc: "Step-by-step civic path" },
            { icon: "🤖", label: "AI Mentor · 3 Modes", desc: "Teacher · Analyst · Story" },
            { icon: "🔮", label: "What-If Simulator", desc: "Real-time vote scenarios" },
            { icon: "♟️", label: "Strategy Lab", desc: "Be the candidate" },
          ].map((f, i) => (
            <button
              key={f.label}
              onClick={() => onCta(["journey","mentor","simulator","strategy"][i])}
              className="royal-card royal-border glow-on-hover p-5 text-left animate-scale-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-semibold text-sm mb-1">{f.label}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {f.desc} <ChevronRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>

        <div className="ornament-divider mt-20 max-w-md mx-auto">
          <Crown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
};
