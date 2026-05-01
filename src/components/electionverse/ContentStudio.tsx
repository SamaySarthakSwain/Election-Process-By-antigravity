import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Linkedin, Copy, CheckCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ContentStudio = () => {
  const [type, setType] = useState<"blog" | "linkedin">("blog");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true);
    setContent("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { type, topic: "ElectionVerse AI - the royal civic intelligence platform" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setContent(data.content);
      toast.success("Content generated!");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/40 text-primary mb-4">
          <FileText className="h-3 w-3 mr-1" /> Auto Content Studio
        </Badge>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">Story <span className="gold-text">Generator</span></h2>
        <p className="text-muted-foreground">One click → a polished blog post or "Build in Public" LinkedIn story.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 justify-center mb-6">
          <Button variant={type === "blog" ? "default" : "outline"} onClick={() => setType("blog")} className={type === "blog" ? "bg-gradient-gold text-primary-foreground" : ""}>
            <FileText className="h-4 w-4 mr-2" /> Technical Blog
          </Button>
          <Button variant={type === "linkedin" ? "default" : "outline"} onClick={() => setType("linkedin")} className={type === "linkedin" ? "bg-gradient-gold text-primary-foreground" : ""}>
            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn Post
          </Button>
        </div>

        <div className="text-center mb-6">
          <Button size="lg" onClick={generate} disabled={loading} className="bg-gradient-gold text-primary-foreground shadow-glow">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Crafting…</> : <>✨ Generate {type === "blog" ? "Blog Post" : "LinkedIn Post"}</>}
          </Button>
        </div>

        <div className="royal-card royal-border p-6 min-h-[400px] relative">
          {content && (
            <Button size="sm" variant="outline" className="absolute top-4 right-4 z-10" onClick={copy}>
              {copied ? <CheckCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          )}
          {!content && !loading && (
            <div className="text-center text-muted-foreground py-20">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50 text-primary" />
              <div className="text-sm">Generated content will appear here, ready to copy.</div>
            </div>
          )}
          {loading && <div className="text-center py-20"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>}
          {content && (
            <div className="prose prose-sm prose-invert max-w-none animate-fade-in
              prose-headings:font-display prose-headings:gold-text
              prose-strong:text-primary prose-li:marker:text-primary whitespace-pre-wrap">
              {type === "linkedin"
                ? <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{content}</div>
                : <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
