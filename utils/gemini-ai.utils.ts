import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";

export class GeminiAI {
  private ai: any;
  private modelId = "gemini-3-flash-preview";

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  public async validateImage(imagePath: string, prompt: string) {
    const base64Data = fs.readFileSync(imagePath).toString("base64");
    
    const result = await this.ai.models.generateContent({
      model: this.modelId,
      contents: [
        { inlineData: { mimeType: "image/jpeg", data: base64Data } },
        { text: prompt }
      ]
    });

    return result.text;
  }

  public async validateVideo(videoPath: string, prompt: string) {
    const uploadedFile = await this.ai.files.upload({
      file: videoPath,
      config: { mimeType: "video/mp4" }
    });

    let file = await this.ai.files.get({ name: uploadedFile.name });
    while (file.state === "PROCESSING") {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      file = await this.ai.files.get({ name: uploadedFile.name });
    }

    if (file.state === "FAILED") {
      throw new Error("Video processing failed.");
    }

    const result = await this.ai.models.generateContent({
      model: this.modelId,
      contents: [
        {
          fileData: {
            mimeType: file.mimeType,
            fileUri: file.uri
          }
        },
        { text: prompt }
      ]
    });

    return result.text;
  }
}