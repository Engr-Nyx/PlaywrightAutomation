import { Page } from '@playwright/test';
const {allure} = require('allure-playwright');

export async function attachAIResponse(response: string) {
  await allure.attachment('AI validation response', response, "text/plain");
}

export async function takeScreenshot(page: Page){
  const screenshotBuffer = await page.screenshot({ fullPage: false });
  await allure.attachment('Visual Checkpoint', screenshotBuffer, 'image/png');
  const base64Image = screenshotBuffer.toString("base64");
  const dataUrl = `data:image/png;base64,${base64Image}`;
  return dataUrl;
}