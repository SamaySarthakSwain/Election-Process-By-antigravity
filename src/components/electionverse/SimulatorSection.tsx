import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, RotateCcw, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useGame } from "@/lib/gamification";
import { toast } from "sonner";

const PARTIES = [
  { id: "gold", name: "Gold Coalition", color: "hsl(43 74% 56%)" },
  { id: "violet", name: "Violet Front", color: "hsl(260 55% 60%)" },
  { id: "azure", name: "Azure League", color: "hsl(205 80% 55%)" },
  { id: "emerald", name: "Emerald Union", color: "hsl(150 60% 45%)" },
];

const REGIONS = ["North", "South", "East", "West", "Central"];

type RegionPref = Record<string, Record<string, number>>; // region -> party -> weight

const defaultPrefs: RegionPref = REGIONS.reduce((acc, r) => {
  acc[r] = { gold: 30, violet: 25, azure: 25, emerald: 20 };
  return acc;
}, {} as RegionPref);

export const SimulatorSection = () => {
  const { addXP, state } = useGame();
  const [turnout, setTurnout] = useState(65);
  const [vote, setVote] = useState({ gold: 32, violet: 28, azure: 22, emerald: 18 });
  const [regionWeight, setRegionWeight] = useState<Record<string, number>>({ North: 22, South: 20, East: 18, West: 18, Central: 22 });
  const [hasRun, setHasRun] = useState(false);

  const seatProjection = useMemo(() => {
    // Simplified seat projection: party seats proportional to party share weighted by turnout regions
    const totalRegionWeight = Object.values(regionWeight).reduce((a, b) => a + b, 0) || 1;
    const totalSeats = 543;
    const totalVote = Object.values(vote).reduce((a, b) => a + b, 0) || 1;
    return PARTIES.map((p) => {
      const share = vote[p.id as keyof typeof vote] / totalVote;
      // small region modifier (sum of regional weight times turnout factor)
      const turnoutFactor = 0.7 + (turnout / 100) * 0.6;
      const regionMod = Object.values(regionWeight).reduce((s, w) => s + w, 0) / totalRegionWeight;
      const seats = Math.round(share * totalSeats * turnoutFactor * regionMod / 1.0);
      return { name: p.name, party: p.id, seats, color: p.color, share: +(share * 100).toFixed(1) };
    });
  }, [vote, turnout, regionWeight]);

  const winner = useMemo(() => [...seatProjection].sort((a,b) => b.seats - a.seats)[0], [seatProjection]);
  const majority = 272;

  const radarData = REGIONS.map((r) => ({
    region: r,
    Gold: vote.gold + (regionWeight[r] - 20) / 4,
    Violet: vote.violet + (regionWeight[r] - 20) / 5,
    Azure: vote.azure - (regionWeight[r] - 20) / 6,
  }));

  const reset = () => {
    setTurnout(65);
    setVote({ gold: 32, violet: 28, azure: 22, emerald: 18 });
    setRegionWeight({ North: 22, South: 20, East: 18, West: 18, Central: 22 });
    toast.info("Simulation reset to defaults");
  };

  const runSim = () => {
    if (!hasRun) addXP(40, "simulator");
    setHasRun(true);
    toast.success(hasRun ? "Re-simulated!" : "+40 XP — What-If Wizard badge!");
  };

  const updateVote = (id: string, value: number) => {
    setVote((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <BarChart3 className="h-3 w-3 mr-1" /> What-If Election Simulator
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">The <span className="gold-text">Simulation Chamber</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Twist the dials of democracy. Turnout, party share, regions — watch outcomes shift in real-time.</p>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-6 max-w-7xl mx-auto">
        {/* Controls */}
        <div className="space-y-4">
          <div className="impact-card p-5">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-semibold">Voter Turnout</div>
              <span className="gold-text font-display text-xl">{turnout}%</span>
            </div>
            <Slider value={[turnout]} min={20} max={95} step={1} onValueChange={(v) => setTurnout(v[0])} />
            <div className="text-xs text-muted-foreground mt-2">Higher turnout amplifies coalition power.</div>
          </div>

          <div className="impact-card p-5">
            <div className="text-sm font-semibold mb-3">Party Vote Share</div>
            <div className="space-y-3">
              {PARTIES.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background: p.color}} />{p.name}</span>
                    <span className="font-semibold">{vote[p.id as keyof typeof vote]}%</span>
                  </div>
                  <Slider value={[vote[p.id as keyof typeof vote]]} min={0} max={60} step={1} onValueChange={(v) => updateVote(p.id, v[0])} />
                </div>
              ))}
            </div>
          </div>

          <div className="impact-card p-5">
            <div className="text-sm font-semibold mb-3">Regional Weight</div>
            <div className="space-y-2.5">
              {REGIONS.map((r) => (
                <div key={r}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{r}</span><span className="font-semibold">{regionWeight[r]}</span>
                  </div>
                  <Slider value={[regionWeight[r]]} min={5} max={40} step={1} onValueChange={(v) => setRegionWeight({...regionWeight, [r]: v[0]})} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={runSim} className="flex-1 bg-gradient-gold text-primary-foreground">Run Simulation</Button>
            <Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Visualizations */}
        <div className="space-y-4">
          {/* Verdict */}
          <div className="impact-card precision-border p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Projected Winner</div>
                <div className="font-display text-3xl font-bold gold-text">{winner.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {winner.seats} seats · {winner.seats >= majority ? "Clear Majority 🏆" : "Hung Parliament — coalition required 🤝"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Confidence</div>
                <div className="font-display text-2xl">{turnout > 60 ? "High" : turnout > 40 ? "Medium" : "Low"}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex items-start gap-2 p-3 rounded-lg bg-background/40 border border-border/50">
              <Info className="h-3.5 w-3.5 mt-0.5 text-info shrink-0" />
              <span><strong className="text-foreground">Why:</strong> Highest weighted vote share across regions. <strong className="text-foreground">Assumption:</strong> uniform swing, simplified seat conversion. <strong className="text-foreground">Confidence:</strong> {turnout > 60 ? "High" : "Medium"}.</span>
            </div>
          </div>

          {/* Bar */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="impact-card p-5">
              <div className="text-sm font-semibold mb-3">Seats Projection</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={seatProjection}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="seats" radius={[6,6,0,0]}>
                    {seatProjection.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="impact-card p-5">
              <div className="text-sm font-semibold mb-3">Vote Share</div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={seatProjection} dataKey="share" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                    {seatProjection.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar */}
          <div className="impact-card p-5">
            <div className="text-sm font-semibold mb-3">Regional Strength (top 3 parties)</div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="region" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name="Gold" dataKey="Gold" stroke="hsl(43 74% 56%)" fill="hsl(43 74% 56%)" fillOpacity={0.35} />
                <Radar name="Violet" dataKey="Violet" stroke="hsl(260 55% 60%)" fill="hsl(260 55% 60%)" fillOpacity={0.3} />
                <Radar name="Azure" dataKey="Azure" stroke="hsl(205 80% 55%)" fill="hsl(205 80% 55%)" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
