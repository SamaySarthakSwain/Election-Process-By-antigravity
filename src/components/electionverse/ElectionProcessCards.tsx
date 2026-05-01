import { ArrowRight, FileSignature, Mic, Vote, Calculator, Trophy } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Registration",
    icon: <FileSignature className="h-8 w-8 text-primary" />,
    description: "Voter registration is a requirement in some democracies for citizens and residents to check in with a central registry specifically for the purpose of being allowed to vote in elections. The process helps electoral authorities confirm voter eligibility, prevent multiple voting, and maintain accurate voter rolls. Methods include automatic registration, same-day registration, and pre-registration for youth. It ensures election integrity but can also be a barrier to participation if procedures are overly complex.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    id: 2,
    title: "Campaigning",
    icon: <Mic className="h-8 w-8 text-purple-500" />,
    description: "A political campaign is an organized effort to influence the decision-making process within a specific group. In democracies, campaigns involve candidates reaching out to voters through stump speeches, debates, digital marketing, canvassing, and mass media advertising. Modern campaigns rely heavily on data analytics, polling, micro-targeting, and massive fundraising operations. This phase determines the narrative and defines the contrast between competing political ideologies.",
    color: "from-purple-500/20 to-fuchsia-500/20",
    border: "border-purple-500/30",
  },
  {
    id: 3,
    title: "Voting Day",
    icon: <Vote className="h-8 w-8 text-rose-500" />,
    description: "Election Day is the designated date for holding general elections. Voters cast their ballots at designated polling places or via absentee/mail-in voting. Depending on the jurisdiction, voting methods may include hand-counted paper ballots, mechanical voting machines, optical scan systems, or Direct-recording electronic (DRE) voting machines. Election observers, both partisan and non-partisan, monitor the process to ensure strict adherence to voting laws, secrecy of the ballot, and overall election integrity.",
    color: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-500/30",
  },
  {
    id: 4,
    title: "Counting",
    icon: <Calculator className="h-8 w-8 text-emerald-500" />,
    description: "Ballot counting or tabulation is the process of counting votes cast in an election. Once polls close, polling station staff secure the ballot boxes and electronic records. Votes are tabulated locally and aggregated at regional or national centers. Systems utilize redundancy checks, hash totals, and risk-limiting audits to verify accuracy. In close races, mandatory or requested recounts may occur. Transparency throughout this phase is critical for public trust in the final outcome.",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
  },
  {
    id: 5,
    title: "Results & Declaration",
    icon: <Trophy className="h-8 w-8 text-amber-500" />,
    description: "The declaration of results is the formal certification of an election's outcome by the electoral commission. Following the resolution of any legal disputes and mandatory audits, the winners are officially declared. This leads to the transition of power or the formation of a new government (e.g., coalition building in parliamentary systems). The peaceful acceptance of these results by competing parties is considered the ultimate test of a functioning democratic institution.",
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
            Understand the complete lifecycle of a democratic election. Follow the flow from registration to the final declaration with detailed insights.
          </p>
        </div>

        <div className="relative">
          {/* Flowchart Connector Line */}
          <div className="absolute top-[80px] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden xl:block rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {STEPS.map((step, index) => (
              <div key={step.id} className="relative group">
                <div 
                  className={`royal-card w-full h-full p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-glow ${step.border} flex flex-col bg-card/80`}
                >
                  <div className="flex flex-col items-center sm:flex-row xl:flex-col sm:items-start xl:items-center gap-4 mb-5 text-center sm:text-left xl:text-center z-10">
                    <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.color} shadow-inner`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">
                        Phase 0{step.id}
                      </div>
                      <h3 className="font-display text-xl font-bold">{step.title}</h3>
                    </div>
                  </div>
                  
                  <div className="text-sm text-foreground/80 leading-relaxed text-justify flex-1 pt-4 border-t border-border/50">
                    {step.description}
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
