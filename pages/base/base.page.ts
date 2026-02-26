import { Page } from '@playwright/test';
const { allure } = require('allure-playwright');

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await allure.step('Navigate', async () => {
            await this.page.goto(url);
        })
    }

    async waitForPageLoad() {
        await allure.step('Wait for page to load', async () => {
            await this.page.waitForLoadState('networkidle');
        });
    }
}