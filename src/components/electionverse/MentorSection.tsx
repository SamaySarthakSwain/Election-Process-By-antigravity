import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, BookOpen, Sparkles, Drama, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { useGame } from "@/lib/gamification";

type Msg = { role: "user" | "assistant"; content: string };

const MODES = [
  { id: "teacher", label: "Teacher", icon: BookOpen, desc: "Simple, kind explanations" },
  { id: "analyst", label: "Analyst", icon: Sparkles, desc: "Deep, data-driven insights" },
  { id: "story", label: "Story", icon: Drama, desc: "Narrative, immersive" },
] as const;

const SUGGESTIONS = [
  "Explain voting like I'm 10",
  "How does vote counting work technically?",
  "What are the biggest threats to election integrity?",
  "Tell me elections through a story",
];

export const MentorSection = () => {
  const { askedQuestion } = useGame();
  const [mode, setMode] = useState<typeof MODES[number]["id"]>("teacher");
  const [level, setLevel] = useState("beginner");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    askedQuestion();

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/election-ai`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: next, mode, level }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Rate limit reached — please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Mentor is unavailable.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistant } : m));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <Bot className="h-3 w-3 mr-1" /> AI Election Mentor
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Civic <span className="gold-text">Intelligence Mentor</span></h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Three modes. One brilliant assistant. Every answer ships with explainable reasoning.</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 max-w-6xl mx-auto">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="impact-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Mentor Mode</div>
            <div className="space-y-2">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <button key={m.id} onClick={() => setMode(m.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex gap-3 ${mode === m.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary/50"}`}>
                    <Icon className={`h-4 w-4 mt-0.5 ${mode === m.id ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <div className="text-sm font-semibold">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="impact-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Your Level</div>
            <div className="flex gap-2 flex-wrap">
              {["beginner","student","advanced"].map((l) => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`px-3 py-1 text-xs rounded-full border ${level === l ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="impact-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Quick Asks</div>
            <div className="space-y-1.5">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="w-full text-left text-xs p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors">
                  💬 {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="impact-card precision-border flex flex-col h-[640px]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <Bot className="h-14 w-14 mb-3 text-primary opacity-60" />
                <div className="font-display text-xl mb-1">The system awaits your query</div>
                <div className="text-sm max-w-sm">Switch modes on the left to change the mentor's voice. Ask anything about elections.</div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-gradient-gold text-primary-foreground" : "bg-secondary/70 border border-border/60"}`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none prose-headings:font-display prose-headings:text-primary prose-strong:text-primary prose-hr:border-primary/30">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || "…"}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-sm">{m.content}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && messages[messages.length-1]?.role === "user" && (
              <div className="flex justify-start"><div className="bg-secondary/70 border border-border/60 rounded-2xl px-4 py-3"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div></div>
            )}
          </div>
          <div className="border-t border-border/60 p-4 flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask about elections — registration, campaigns, counting, anything…"
              rows={1}
              className="resize-none bg-background/60"
            />
            <Button onClick={() => send()} disabled={loading || !input.trim()} className="bg-gradient-gold text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
