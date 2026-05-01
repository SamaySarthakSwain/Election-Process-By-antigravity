import { ArrowRight, FileSignature, Mic, Vote, Calculator, Trophy } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Registration",
    icon: <FileSignature className="h-8 w-8 text-primary" />,
    description: "Citizens register to vote. Verification of age, citizenship, and residency occurs to maintain election integrity.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    id: 2,
    title: "Campaigning",
    icon: <Mic className="h-8 w-8 text-purple-500" />,
    description: "Candidates present their platforms, debate policies, and rally supporters to win over the electorate.",
    color: "from-purple-500/20 to-fuchsia-500/20",
    border: "border-purple-500/30",
  },
  {
    id: 3,
    title: "Voting Day",
    icon: <Vote className="h-8 w-8 text-rose-500" />,
    description: "Voters cast their ballots at polling stations or via mail. The core of democracy in action.",
    color: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-500/30",
  },
  {
    id: 4,
    title: "Counting",
    icon: <Calculator className="h-8 w-8 text-emerald-500" />,
    description: "Ballots are securely collected and tabulated. Electronic and manual verifications ensure accuracy.",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
  },
  {
    id: 5,
    title: "Results & Declaration",
    icon: <Trophy className="h-8 w-8 text-amber-500" />,
    description: "Winners are officially announced and certified, paving the way for the transition of power.",
    color: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/30",
  }
];

export const ElectionProcessCards = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-secondary/30">
      <div className="container relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Anatomy of an <span className="gold-text">Election</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Understand the complete lifecycle of a democratic election through our interactive 3D flashcards. Follow the flow from registration to the final declaration.
          </p>
        </div>

        <div className="relative">
          {/* Flowchart Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden xl:block rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {STEPS.map((step, index) => (
              <div key={step.id} className="relative group perspective-1000 h-[320px]">
                {/* 3D Flashcard */}
                <div 
                  className={`royal-card relative w-full h-full transition-all duration-700 transform-3d group-hover:rotateY-180 group-hover:-translate-y-4 ${step.border}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-b bg-card rounded-[1.5rem] shadow-elegant">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${step.color} shadow-inner`}>
                      {step.icon}
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
                      Phase 0{step.id}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                    <div className="mt-auto flex items-center text-xs text-primary font-semibold">
                      Hover to flip <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div 
                    className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-gradient-royal rounded-[1.5rem] shadow-royal border border-primary/20"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="font-display text-lg font-bold mb-3 gold-text">{step.title} Details</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Arrow for Mobile/Tablet */}
                {index < STEPS.length - 1 && (
                  <div className="xl:hidden flex justify-center py-4">
                    <ArrowRight className="h-6 w-6 text-primary/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
