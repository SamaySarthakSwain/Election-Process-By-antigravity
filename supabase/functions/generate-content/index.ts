import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, topic } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    let prompt = "";
    if (type === "blog") {
      prompt = `Write a polished, technical blog post (700-900 words) titled creatively about ElectionVerse AI — an interactive, AI-powered election learning platform with a royal aesthetic. Topic context: ${topic || "Building ElectionVerse AI"}.
Cover: vision, key features (Interactive Journey, AI Mentor with Teacher/Analyst/Story modes, What-If Simulator, Candidate Strategy Lab, One-Prompt Intelligence, Explainable AI, Gamification), tech stack (React, TypeScript, Tailwind, Lovable Cloud, Lovable AI Gateway with Gemini), and impact on civic learning. Use markdown headings.`;
    } else if (type === "linkedin") {
      prompt = `Write a punchy "Build in Public" LinkedIn post (180-260 words) about shipping ElectionVerse AI. Storytelling tone, first person, opens with a hook, lists 3-4 unique features (AI Mentor with multi-modes, What-If Simulator, Candidate Strategy Lab, Explainable AI), ends with a call-to-action. Use line breaks and 3-5 relevant emojis. Add 5 hashtags at the end.`;
    } else if (type === "onePrompt") {
      prompt = `User asked: "${topic}". Generate a structured JSON-like markdown response covering an election topic with these sections: ## Timeline (5-7 phases with dates/durations), ## Key Steps (numbered, concise), ## Visual Flow (arrow-based ascii or step list), ## Important Rules (bullet list). Be factual, vivid, well-formatted.`;
    } else {
      prompt = topic;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a world-class writer and civic educator. Output clean markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit reached." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI error ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
