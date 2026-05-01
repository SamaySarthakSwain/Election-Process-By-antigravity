import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { candidate, budget, audience, strategy, region } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const tools = [{
      type: "function",
      function: {
        name: "evaluate_candidate",
        description: "Evaluate a candidate's election strategy",
        parameters: {
          type: "object",
          properties: {
            winProbability: { type: "number", description: "0-100 percent" },
            confidence: { type: "string", enum: ["Low", "Medium", "High"] },
            strengths: { type: "array", items: { type: "string" } },
            weaknesses: { type: "array", items: { type: "string" } },
            improvements: { type: "array", items: { type: "string" } },
            budgetVerdict: { type: "string" },
            audienceFit: { type: "string" },
            keyRisk: { type: "string" },
            narrative: { type: "string", description: "2-3 sentence verdict" },
          },
          required: ["winProbability", "confidence", "strengths", "weaknesses", "improvements", "budgetVerdict", "audienceFit", "keyRisk", "narrative"],
        },
      },
    }];

    const userPrompt = `Evaluate this candidate strategy:
- Candidate: ${candidate}
- Region: ${region}
- Budget: $${budget.toLocaleString()}
- Target Audience: ${audience}
- Strategy: ${strategy}

Estimate win probability, confidence level, strengths, weaknesses, 3 concrete improvements, budget verdict, audience fit, the biggest risk, and a punchy 2-3 sentence narrative verdict.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a seasoned political campaign strategist with decades of experience. Be honest, specific, and tactically useful." },
          { role: "user", content: userPrompt },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "evaluate_candidate" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit reached." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI error ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    const args = toolCall ? JSON.parse(toolCall.function.arguments) : null;
    return new Response(JSON.stringify({ evaluation: args }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("strategy-eval error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
