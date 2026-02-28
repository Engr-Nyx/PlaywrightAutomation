import { Page } from '@playwright/test';
import { attachAIResponse, takeScreenshot } from '../../utils/helper.utils';
import { OpenAi } from '../../utils/open-ai.utils';
const { allure } = require('allure-playwright');
const openai = new OpenAi();

export class BasePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
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

	private async waitForPageLoad() {
		await allure.step('Wait for page to load', async () => {
			await this.page.waitForLoadState('networkidle');
		});
	}
}