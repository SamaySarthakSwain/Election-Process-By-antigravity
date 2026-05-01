import { useEffect, useRef } from "react";
import { FileSignature, Mic, Vote, Calculator, Trophy, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Voter Registration & Eligibility",
    icon: <FileSignature className="h-10 w-10 text-blue-500" />,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    description: "Voter registration is the foundational pillar of any democratic election. Before a citizen can cast a ballot, the electoral commission must verify their identity, age, citizenship, and residency.",
    bullets: [
      "Active vs Passive Registration: Some countries automatically register citizens (passive), while others require individuals to actively opt-in.",
      "Voter Roll Purges: Regular maintenance of voter lists removes deceased individuals or those who have moved, though this can lead to wrongful disenfranchisement if not done carefully.",
      "Voter ID Laws: Jurisdictions vary greatly; some require strict photo ID, while others rely on signatures or sworn affidavits."
    ]
  },
  {
    id: 2,
    title: "Campaigning & The Information War",
    icon: <Mic className="h-10 w-10 text-purple-500" />,
    color: "from-purple-500/20 to-fuchsia-500/20",
    border: "border-purple-500/30",
    description: "Political campaigns are multi-million dollar operations designed to influence public opinion, mobilize supporters, and persuade undecided swing voters through strategic messaging.",
    bullets: [
      "Data-Driven Micro-Targeting: Campaigns use vast databases to serve hyper-specific ads to voters based on their online behavior and consumer habits.",
      "The Ground Game: Field organizing, door-to-door canvassing, and phone banking remain critical for Get Out The Vote (GOTV) efforts.",
      "Debates and Earned Media: Free press coverage (earned media) and televised debates can dramatically shift polling numbers overnight."
    ]
  },
  {
    id: 3,
    title: "Voting Day Operations",
    icon: <Vote className="h-10 w-10 text-rose-500" />,
    color: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-500/30",
    description: "Election Day is an immense logistical undertaking, requiring hundreds of thousands of poll workers and highly secure chain-of-custody protocols for ballots.",
    bullets: [
      "Voting Modalities: Includes hand-marked paper ballots, Direct-Recording Electronic (DRE) machines, and Mail-In/Absentee voting.",
      "Poll Watching: Partisan and non-partisan observers monitor polling locations to prevent voter intimidation and ensure legal compliance.",
      "Provisional Ballots: If a voter's eligibility is questioned at the polls, they cast a provisional ballot which is counted only after verification."
    ]
  },
  {
    id: 4,
    title: "Tabulation & Risk-Limiting Audits",
    icon: <Calculator className="h-10 w-10 text-emerald-500" />,
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    description: "Once polls close, the race against time begins. Ballots must be counted swiftly but with 100% accuracy, balancing public impatience with the need for rigorous security.",
    bullets: [
      "Optical Scanners: High-speed scanners read filled bubbles on paper ballots, instantly transmitting encrypted results to a central database.",
      "Risk-Limiting Audits (RLA): Statisticians randomly sample paper ballots to guarantee that the machine-tabulated results mathematically match the physical votes.",
      "Recount Triggers: Extremely close margins (often less than 0.5%) legally trigger mandatory manual recounts."
    ]
  },
  {
    id: 5,
    title: "Results Certification & Transition",
    icon: <Trophy className="h-10 w-10 text-amber-500" />,
    color: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/30",
    description: "The media may call an election on election night, but the official result is only final after formal certification and the resolution of legal challenges.",
    bullets: [
      "Canvassing Boards: Local and state officials convene to certify the aggregate totals and resolve any discrepancies.",
      "Litigation Window: Candidates have a defined legal period to contest results based on allegations of fraud or procedural errors.",
      "The Peaceful Transfer: Once certified, the transition phase begins, involving security briefings and the peaceful handover of executive power."
    ]
  }
];

export const ElectionProcessCards = () => {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-24");
          }
        });
      },
      { threshold: 0.15 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <div className="container relative z-10">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            The Anatomy of an <span className="gold-text">Election</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Elections are complex, high-stakes logistical miracles. Scroll down to explore the intricate, multi-phase journey of a modern democratic election.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 rounded-full" />

          <div className="space-y-16 md:space-y-32 pl-12 md:pl-0">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.id}
                  ref={(el) => (observerRefs.current[index] = el)}
                  className="relative flex flex-col md:flex-row items-center justify-between opacity-0 translate-y-24 transition-all duration-1000 ease-out"
                >
                  {/* Center Dot for Desktop Timeline */}
                  <div className="absolute left-[-3rem] md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center z-20 shadow-glow">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-primary animate-pulse" />
                  </div>

                  {/* Content Container */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left md:order-last"}`}>
                    <div className={`royal-card p-6 md:p-10 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 ${step.border} group`}>
                      <div className={`flex flex-col md:flex-row items-start md:items-center gap-5 mb-6 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.color} shadow-inner transition-transform duration-500 group-hover:scale-110`}>
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold tracking-widest uppercase text-primary mb-2">
                            Phase 0{step.id}
                          </div>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-base text-foreground/80 leading-relaxed mb-6 text-left">
                        {step.description}
                      </p>
                      
                      <div className="space-y-3 text-left">
                        {step.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-colors">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground/90 leading-snug">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for the other half */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
