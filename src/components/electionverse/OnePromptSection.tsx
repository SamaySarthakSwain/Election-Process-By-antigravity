import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EXAMPLES = [
  "Explain elections in India",
  "How does a US presidential election work?",
  "Walk me through a UK general election",
  "Compare parliamentary vs presidential systems",
];

export const OnePromptSection = () => {
  const [prompt, setPrompt] = useState("Explain elections in India");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const generate = async (text?: string) => {
    const q = (text ?? prompt).trim();
    if (!q) return;
    setPrompt(q);
    setLoading(true);
    setContent("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { type: "onePrompt", topic: q },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setContent(data.content);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <Wand2 className="h-3 w-3 mr-1" /> One-Prompt Intelligence
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Ask Once. <span className="gold-text">Understand Everything.</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Type any election topic. Get a structured breakdown — timeline, key steps, visual flow, and rules.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="royal-card royal-border p-4 flex gap-2 mb-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. Explain elections in India"
            className="bg-background/60"
          />
          <Button onClick={() => generate()} disabled={loading} className="bg-gradient-gold text-primary-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Wand2 className="h-4 w-4 mr-2" />Generate</>}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {EXAMPLES.map((ex) => (
            <button key={ex} onClick={() => generate(ex)} className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
              ✨ {ex}
            </button>
          ))}
        </div>

        <div className="royal-card p-6 min-h-[400px]">
          {!content && !loading && (
            <div className="text-center text-muted-foreground py-20">
              <Wand2 className="h-12 w-12 mx-auto mb-3 opacity-50 text-primary" />
              <div className="text-sm">Your structured intelligence will appear here.</div>
            </div>
          )}
          {loading && <div className="text-center py-20"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>}
          {content && (
            <div className="prose prose-sm prose-invert max-w-none animate-fade-in
              prose-headings:font-display prose-headings:gold-text
              prose-h2:border-b prose-h2:border-primary/20 prose-h2:pb-2
              prose-strong:text-primary prose-li:marker:text-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
