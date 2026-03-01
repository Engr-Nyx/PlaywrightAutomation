import { Browser, BrowserContext, Page, expect } from '@playwright/test';
import { attachAIResponse, takeScreenshot } from '../../utils/helper.utils';
import { GeminiAI } from '../../utils/gemini-ai.utils';
import { readFileSync, existsSync, unlinkSync } from 'fs';
import path from 'path';
import os from 'os'
const { allure } = require('allure-playwright');
const gemini = new GeminiAI();

export class BasePage {
	readonly page: Page;
	readonly browser: Browser;
	private recordingContext: BrowserContext | null = null;
	private recordingPage: Page | null = null;

	constructor(page: Page, browser: Browser) {
		this.page = page;
		this.browser = browser;
	}

	async navigate(url: string) {
		await allure.step('Navigate', async () => {
			await this.page.goto(url);
		});
	}

	async validateImage(prompt: string) {
		await allure.step('Image validation', async () => {
			const imageString = await takeScreenshot(this.page);
			attachAIResponse(await gemini.validateImage(imageString, prompt))
		});
	}

	async startRecording() {
		const tempDir = path.join(os.tmpdir(), 'playwright-recordings');
    
    this.recordingContext = await this.browser.newContext({
      recordVideo: { dir: tempDir },
    });
		this.recordingPage = await this.recordingContext.newPage();
		await this.recordingPage.goto(this.page.url());
		return this.recordingPage;
	}

	async stopRecording() {
		if (!this.recordingContext || !this.recordingPage) {
			throw new Error('No recording in progress');
		}

		const videoPath = await this.recordingPage.video()?.path();
		await this.recordingContext.close();
		this.recordingContext = null;
		this.recordingPage = null;

		if (!videoPath || !existsSync(videoPath)) {
			throw new Error('Video file not found');
		}
		return videoPath;
	}

	async validateVideo(prompt: string) {
		await allure.step('Video validation', async () => {
			const videoPath = await this.stopRecording();

			try {
				const videoBuffer = readFileSync(videoPath);
				allure.attachment('Test Recording', videoBuffer, 'video/webm');
				const response = await gemini.validateVideo(videoPath, prompt);

				unlinkSync(videoPath);

				expect(response.toLowerCase()).toContain('yes');
				attachAIResponse(response);
			} catch (error) {
				if (existsSync(videoPath)) unlinkSync(videoPath);
				throw error;
			}
		});
	}

	private async waitForPageLoad() {
		await allure.step('Wait for page to load', async () => {
			await this.page.waitForLoadState('networkidle');
		});
	}
}