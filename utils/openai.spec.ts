import { request } from "@playwright/test";

export class OpenAi {
  public async compareContentOnText(image: string, prompt: string) {
    const apiKey = "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";
    if (!apiKey) throw new Error("Missing OPEN_AI_API secret");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
      }),
    });

    const result = await response.json();
    return result.choices?.[0]?.message?.content || "No response.";
  }
}
