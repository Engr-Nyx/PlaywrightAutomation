import { Browser, BrowserContext, Page } from '@playwright/test';
import { attachAIResponse, takeScreenshot } from '../../utils/helper.utils';
import { OpenAi } from '../../utils/open-ai.utils';
import { readFileSync, existsSync } from 'fs';
import { basename } from 'path';
const { allure } = require('allure-playwright');
const openai = new OpenAi();

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
			attachAIResponse(await openai.validateImage(imageString, prompt))
		});
	}

	async startRecording() {
		this.recordingContext = await this.browser.newContext({
			recordVideo: { dir: 'videos/' }
		});
		this.recordingPage = await this.recordingContext.newPage();
		await this.recordingPage.goto(this.page.url());
		return this.recordingPage;
	}

	async stopRecording() {
		if (!this.recordingContext || !this.recordingPage) {
			throw new Error("No recording in progress");
		}

		const videoPath = await this.recordingPage.video()?.path();

		await this.recordingContext.close();
		this.recordingContext = null;
		this.recordingPage = null;

		if (!videoPath || !existsSync(videoPath)) {
			throw new Error("Video file not found");
		}

		return {
			path: videoPath,
			name: basename(videoPath),
			buffer: readFileSync(videoPath),
			mimeType: 'video/webm'
		};
	}

	async validateVideo(prompt: string) {
		await allure.step('Video validation', async () => {
			const videoFile = await this.stopRecording();
			attachAIResponse(await openai.validateVideo(videoFile.path, prompt));
		});
	}

	private async waitForPageLoad() {
		await allure.step('Wait for page to load', async () => {
			await this.page.waitForLoadState('networkidle');
		});
	}
}