
export class OpenAi {
  public async validateImage(image: string, prompt: string) {
    const apiKey = process.env.OPEN_API_KEY;
    if (!apiKey) throw new Error("Missing OPEN_API_KEY secret");
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
                text: `Describe this image based on this prompt: ${prompt}`
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
      }),
    });
    const result = await response.json();
    return result.choices?.[0]?.message?.content || "No response.";
  }
}
