export class OpenAi {
  private apiKey = process.env.OPEN_API_KEY;

  constructor() {
    if (!this.apiKey) throw new Error("Missing OPEN_API_KEY secret");
    
  }

  private async sendToOpenAI(content: any[]) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error: ${errText}`);
    }

    const result = await response.json();
    return result.choices?.[0]?.message?.content || "No response.";
  }

  public async validateImage(image: string, prompt: string) {
    return this.sendToOpenAI([
      { type: "text", text: `Describe this image based on this prompt: ${prompt}` },
      { type: "image_url", image_url: { url: image } },
    ]);
  }

  public async validateVideo(video: string, prompt: string) {
    return this.sendToOpenAI([
      { type: "text", text: `Analyze this video based on this prompt: ${prompt}` },
      { type: "video_url", video_url: { url: video } },
    ]);
  }
}