type AgentOutput = {
  freeTitle: string;
  freeMarkdown: string;
  premiumTitle: string;
  premiumMarkdown: string;
  notes: string;
};

type RunInput = {
  topic: string;
  referenceMaterial: string;
};

function getProviderConfig() {
  const provider = (process.env.AGENT_PROVIDER || "venice").toLowerCase();

  if (provider === "akashml") {
    return {
      provider,
      baseUrl: process.env.AKASHML_BASE_URL || "https://chatapi.akash.network/api/v1",
      apiKey: process.env.AKASHML_API_KEY,
      model: process.env.AKASHML_MODEL || "Meta-Llama-3.1-70B-Instruct-FP8",
    };
  }

  if (provider === "openai") {
    return {
      provider,
      baseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    };
  }

  return {
    provider: "venice",
    baseUrl: process.env.VENICE_BASE_URL || "https://api.venice.ai/api/v1",
    apiKey: process.env.VENICE_API_KEY,
    model: process.env.VENICE_MODEL || "llama-3.1-405b",
  };
}

function extractJson(text: string): AgentOutput {
  const maybe = text.trim();
  const start = maybe.indexOf("{");
  const end = maybe.lastIndexOf("}");
  const raw = start >= 0 && end > start ? maybe.slice(start, end + 1) : maybe;
  const parsed = JSON.parse(raw) as AgentOutput;

  if (!parsed.freeTitle || !parsed.freeMarkdown || !parsed.premiumTitle || !parsed.premiumMarkdown) {
    throw new Error("Agent output missing required fields");
  }

  return parsed;
}

export async function generateResearchPosts(input: RunInput): Promise<AgentOutput> {
  const cfg = getProviderConfig();
  if (!cfg.apiKey) {
    throw new Error(`Missing API key for provider: ${cfg.provider}`);
  }

  const system = `You are VibePost Research Agent.
Return ONLY valid JSON with keys: freeTitle, freeMarkdown, premiumTitle, premiumMarkdown, notes.
Rules:
- Free post is concise (400-700 words), high-signal teaser with 3 actionable takeaways.
- Premium post is deep (1200+ words), includes architecture analysis, tradeoffs, implementation plan, and at least 2 code blocks.
- Keep claims grounded in provided references. If uncertain, say so.
- Use markdown headings and lists.
- No markdown fences wrapping the whole JSON.`;

  const user = `Topic: ${input.topic}

Reference material:
${input.referenceMaterial}

Generate free + premium outputs now.`;

  const response = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM request failed (${response.status}): ${text.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty model response");

  return extractJson(content);
}
