import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, GraduationCap } from "lucide-react";
import { useGame } from "@/lib/gamification";
import { toast } from "sonner";

const STEPS = [
  {
    title: "1 · Voter Registration",
    emoji: "📝",
    short: "Get on the rolls",
    body: {
      beginner: "Before voting, citizens must register so officials know who's eligible. Like signing up for the world's biggest team — once you're in, your voice counts on game day.",
      student: "Registration verifies eligibility (age, citizenship, residence). Most regions allow online and in-person registration with deadlines weeks before election day.",
      advanced: "Registration regimes vary: automatic, opt-in, same-day. Voter file hygiene affects turnout, mail-in ballots, and rolls accuracy. Disputes often arise over purges and ID requirements.",
    },
  },
  {
    title: "2 · Campaigning",
    emoji: "📣",
    short: "The persuasion phase",
    body: {
      beginner: "Candidates travel, give speeches, run ads, and meet voters to share their ideas — like job interviews where everyone in the country is the boss.",
      student: "Campaigns build coalitions through messaging, debates, ground-game canvassing, and digital outreach. Spending is regulated by election commissions.",
      advanced: "Modern campaigns are data-driven: micro-targeting, A/B-tested creatives, GOTV models, and field-organizing dashboards. Media strategy and earned-media moments shape narrative.",
    },
  },
  {
    title: "3 · Voting Day",
    emoji: "🗳️",
    short: "Citizens cast ballots",
    body: {
      beginner: "On election day, you visit a polling place, prove who you are, and mark your choice in private. It only takes minutes — but those minutes shape years.",
      student: "Voters use paper ballots, EVMs, or mail-in ballots. Polling stations follow strict secrecy and chain-of-custody protocols overseen by officials and observers.",
      advanced: "Election integrity hinges on accessibility, throughput, and audit trails. Risk-limiting audits, VVPATs, and bipartisan observation are key safeguards.",
    },
  },
  {
    title: "4 · Counting & Tally",
    emoji: "🧮",
    short: "Every vote tallied",
    body: {
      beginner: "After voting closes, ballots are counted carefully — like sorting a giant mailbag — and results are announced step by step.",
      student: "Counting happens at constituency centers under observer supervision. Results are aggregated upward; recounts may be triggered by close margins.",
      advanced: "Tabulation pipelines combine precinct returns, provisional ballots, and absentees. Statistical anomaly checks and reconciliation logs deter fraud.",
    },
  },
  {
    title: "5 · Results & Transition",
    emoji: "🏛️",
    short: "Power, peacefully passed",
    body: {
      beginner: "Winners are announced, losers concede, and the new leaders take office. The peaceful handover is democracy's quiet superpower.",
      student: "Election commissions certify results; oaths of office follow. Coalition negotiations may be needed in parliamentary systems.",
      advanced: "Transitions involve briefings, security clearances, and policy continuity. Litigation windows and certification disputes can extend the timeline.",
    },
  },
];

const LEVELS = [
  { id: "beginner", label: "Beginner" },
  { id: "student", label: "Student" },
  { id: "advanced", label: "Advanced" },
] as const;

export const JourneySection = () => {
  const { state, completeStep } = useGame();
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState<typeof LEVELS[number]["id"]>("beginner");
  const completed = state.steps;
  const progress = (completed.length / STEPS.length) * 100;

  const markComplete = () => {
    if (!completed.includes(active)) {
      completeStep(active);
      toast.success(`+25 XP — ${STEPS[active].title} completed!`, {
        description: active === STEPS.length - 1 ? "👑 Royal Path Walker badge unlocked!" : undefined,
      });
    }
    if (active < STEPS.length - 1) setActive(active + 1);
  };

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <GraduationCap className="h-3 w-3 mr-1" /> Interactive Journey
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">The Royal <span className="gold-text">Election Path</span></h2>
        <p className="text-muted-foreground max-w-xl mx-auto">A guided five-step path. Choose your depth — explanations adapt to you.</p>
      </div>

      {/* Level switcher */}
      <div className="flex justify-center gap-2 mb-8">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            className={`px-4 py-2 text-sm rounded-full border transition-all ${
              level === l.id ? "bg-primary text-primary-foreground border-primary shadow-glow" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Journey progress</span>
          <span>{completed.length}/{STEPS.length} steps</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step rail */}
      <div className="grid grid-cols-5 gap-2 max-w-4xl mx-auto mb-8">
        {STEPS.map((s, i) => {
          const isDone = completed.includes(i);
          const isActive = active === i;
          return (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              className={`royal-card p-3 text-center transition-all ${isActive ? "royal-border ring-2 ring-primary/40" : ""}`}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Step {i+1}</div>
              <div className="mt-1">
                {isDone ? <CheckCircle2 className="h-4 w-4 text-success mx-auto" /> : <Circle className="h-4 w-4 text-muted-foreground mx-auto" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active step card */}
      <div className="royal-card royal-border max-w-3xl mx-auto p-8 animate-scale-in" key={active}>
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl">{STEPS[active].emoji}</div>
          <div>
            <h3 className="font-display text-2xl font-bold">{STEPS[active].title}</h3>
            <p className="text-sm text-muted-foreground">{STEPS[active].short}</p>
          </div>
        </div>
        <p className="text-base leading-relaxed mb-6">{STEPS[active].body[level]}</p>
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled={active === 0} onClick={() => setActive(active - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button onClick={markComplete} className="bg-gradient-gold text-primary-foreground">
            {completed.includes(active) ? "Next Step" : "Complete +25 XP"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
