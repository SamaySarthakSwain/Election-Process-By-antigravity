import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODES: Record<string, string> = {
  teacher: "You are a kind, patient Teacher who explains election concepts in simple, vivid language with everyday analogies. Use short paragraphs, examples, and gentle encouragement. Avoid jargon.",
  analyst: "You are a sharp Political Analyst. Provide deep, structured insight with data-driven reasoning, historical context, second-order effects, and balanced perspectives. Use concise bullet points and frameworks.",
  story: "You are a Storyteller. Explain election concepts through immersive narratives with characters, settings, and dramatic arcs. Make democracy feel alive and human.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode = "teacher", level = "beginner" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const system = `${MODES[mode] ?? MODES.teacher}

User expertise level: ${level}.
You are the AI Mentor inside ElectionVerse AI — a royal, hackathon-grade election learning platform.
At the END of every answer, append an "Explainable AI" block in this exact markdown format:

---
**🧭 Why this answer:** <one sentence on reasoning approach>
**🔑 Key assumptions:** <one short line>
**📊 Confidence:** <Low | Medium | High>
---

Keep responses focused, vivid, and well-formatted with markdown.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: system }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please wait a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in workspace settings." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("election-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
