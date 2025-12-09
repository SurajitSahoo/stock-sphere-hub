import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { currentStock } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating stock predictions for:", currentStock);

    const prompt = `You are a warehouse stock prediction AI. Based on the current stock levels and upcoming events, predict how much stock should be increased for each category.

Current Stock Levels:
- Raw Materials: ${currentStock.rawMaterials} units
- Finished Goods: ${currentStock.finishedGoods} units
- Packaging: ${currentStock.packaging} units

Generate predictions for upcoming events that would affect warehouse stock. Consider seasonal events, holidays, festivals, sales events, etc.

Respond with a JSON object in this exact format:
{
  "predictions": [
    {
      "eventName": "Event Name",
      "eventDate": "Date in format like Dec 15, 2025",
      "category": "Raw Materials|Finished Goods|Packaging",
      "currentStock": number,
      "recommendedIncrease": number,
      "reason": "Brief reason for the increase"
    }
  ]
}

Generate 4-6 realistic predictions for the next 30 days.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a warehouse inventory prediction AI. Always respond with valid JSON only." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log("AI Response:", content);

    // Parse the JSON from the response
    let predictions;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      predictions = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse AI predictions");
    }

    return new Response(JSON.stringify(predictions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in predict-stock function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
